import "dotenv/config";
import express from "express";
import type { Request, Response } from "express";
import Stripe from "stripe";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

const app = express();
const port = process.env.PORT || 3001;

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("WARNING: STRIPE_SECRET_KEY is not set. Stripe API calls will fail.");
  console.warn("Copy .env.example to .env and add your keys from https://dashboard.stripe.com/apikeys");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder");

// Supabase client for server-side operations (optional)
const supabaseUrl = process.env.VITE_SUPABASE_URL || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";
const isSupabaseConfigured = !!supabaseUrl && !!supabaseServiceKey;
const supabase = isSupabaseConfigured ? createClient(supabaseUrl, supabaseServiceKey) : null;

async function updateUserProStatus(userId: string, isPro: boolean, stripeCustomerId?: string) {
  if (!supabase) return;
  try {
    const updateData: Record<string, unknown> = {
      is_pro: isPro,
      updated_at: new Date().toISOString(),
    };
    if (stripeCustomerId) {
      updateData.stripe_customer_id = stripeCustomerId;
    }
    const { error } = await supabase.from("users").update(updateData).eq("id", userId);
    if (error) {
      console.warn("Failed to update pro status in Supabase:", error.message);
    } else {
      console.log(`Updated pro status for user ${userId}: isPro=${isPro}`);
    }
  } catch (err) {
    console.warn("Failed to update pro status in Supabase:", err);
  }
}

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:3000"] }));

// Webhook endpoint needs raw body - must be before express.json()
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  async (req: Request, res: Response) => {
    const sig = req.headers["stripe-signature"] as string;
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET || "";

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      console.error("Webhook signature verification failed:", message);
      res.status(400).send(`Webhook Error: ${message}`);
      return;
    }

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        console.log("Payment successful for session:", session.id);
        console.log("Customer:", session.customer);
        console.log("Subscription:", session.subscription);
        // Update pro status in Supabase if configured
        const userId = session.client_reference_id;
        const customerId = typeof session.customer === "string" ? session.customer : undefined;
        if (userId) {
          await updateUserProStatus(userId, true, customerId);
        }
        break;
      }
      case "customer.subscription.updated": {
        const subscription = event.data.object;
        console.log("Subscription updated:", subscription.id, "Status:", subscription.status);
        // TODO: Update subscription status in database
        break;
      }
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        console.log("Subscription cancelled:", subscription.id);
        // Revoke PRO access in database if Supabase is configured
        if (supabase && typeof subscription.customer === "string") {
          try {
            const { data } = await supabase
              .from("users")
              .select("id")
              .eq("stripe_customer_id", subscription.customer)
              .single();
            if (data) {
              await updateUserProStatus(data.id, false);
            }
          } catch (err) {
            console.warn("Failed to revoke pro status:", err);
          }
        }
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object;
        console.log("Payment failed for invoice:", invoice.id);
        // TODO: Notify user about failed payment
        break;
      }
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    res.json({ received: true });
  }
);

// All other routes use JSON body parser
app.use(express.json());

const isDemoMode = !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.startsWith("sk_test_placeholder");

// Health check
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", stripe: !isDemoMode, demo: isDemoMode });
});

// Create Checkout Session for subscription
app.post("/api/create-checkout-session", async (req: Request, res: Response) => {
  const { priceId, successUrl, cancelUrl, userId } = req.body;

  if (!priceId) {
    res.status(400).json({ error: "priceId is required" });
    return;
  }

  // Demo mode — redirect to success without real Stripe
  if (isDemoMode) {
    console.log(`[DEMO] Checkout session for price: ${priceId}, user: ${userId}`);
    const url = (successUrl || `${req.headers.origin}/?payment=success`) + "&demo=true";
    res.json({ url, sessionId: "demo_session_" + Date.now(), demo: true });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl || `${req.headers.origin}/?payment=success`,
      cancel_url: cancelUrl || `${req.headers.origin}/?payment=cancelled`,
      client_reference_id: userId,
      allow_promotion_codes: true,
      billing_address_collection: "auto",
      locale: "auto",
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating checkout session:", message);
    res.status(500).json({ error: message });
  }
});

// Create one-time payment session (for Telegram Stars alternative)
app.post("/api/create-payment", async (req: Request, res: Response) => {
  const { priceId, successUrl, cancelUrl, userId } = req.body;

  if (!priceId) {
    res.status(400).json({ error: "priceId is required" });
    return;
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl || `${req.headers.origin}/?payment=success`,
      cancel_url: cancelUrl || `${req.headers.origin}/?payment=cancelled`,
      client_reference_id: userId,
      locale: "auto",
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating payment session:", message);
    res.status(500).json({ error: message });
  }
});

// Customer portal for managing subscriptions
app.post("/api/create-portal-session", async (req: Request, res: Response) => {
  const { customerId } = req.body;

  if (!customerId) {
    res.status(400).json({ error: "customerId is required" });
    return;
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: (req.headers.origin as string) || "http://localhost:5173",
    });

    res.json({ url: session.url });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("Error creating portal session:", message);
    res.status(500).json({ error: message });
  }
});

// Get subscription status
app.get("/api/subscription/:customerId", async (req: Request, res: Response) => {
  try {
    const subscriptions = await stripe.subscriptions.list({
      customer: req.params.customerId,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      const sub = subscriptions.data[0];
      res.json({
        active: true,
        plan: sub.items.data[0]?.price.id,
        currentPeriodEnd: sub.current_period_end,
        cancelAtPeriodEnd: sub.cancel_at_period_end,
      });
    } else {
      res.json({ active: false });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ error: message });
  }
});

// Referral count endpoint — reads from bot's referrals.json
app.get("/api/referrals/:code", (req: Request, res: Response) => {
  try {
    const { code } = req.params;
    const { readFileSync, existsSync } = require("fs");
    const filePath = "./bot/referrals.json";
    if (!existsSync(filePath)) {
      res.json({ count: 0 });
      return;
    }
    const data = JSON.parse(readFileSync(filePath, "utf-8"));
    const count = data[code]?.length || 0;
    res.json({ count });
  } catch {
    res.json({ count: 0 });
  }
});

app.listen(port, () => {
  console.log(`Stripe API server running on http://localhost:${port}`);
  console.log(`Stripe configured: ${!!process.env.STRIPE_SECRET_KEY}`);
});
