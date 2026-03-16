import "dotenv/config";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

async function createProducts() {
  if (!process.env.STRIPE_SECRET_KEY) {
    console.error("STRIPE_SECRET_KEY is not set in .env");
    console.error("Get your key from: https://dashboard.stripe.com/apikeys");
    process.exit(1);
  }

  console.log("Creating VibeLingo products in Stripe...\n");

  // 1. Create the product
  const product = await stripe.products.create({
    name: "VibeLingo PRO",
    description: "Full access to VibeLingo: unlimited lessons, all tools, battles, PRO badges, no ads",
    metadata: {
      app: "vibelingo",
    },
  });
  console.log(`Product created: ${product.id} (${product.name})`);

  // 2. Create monthly price ($4.99 USD)
  const monthlyPrice = await stripe.prices.create({
    product: product.id,
    unit_amount: 499, // $4.99 USD in cents
    currency: "usd",
    recurring: {
      interval: "month",
    },
    metadata: {
      plan: "pro_monthly",
    },
  });
  console.log(`Monthly price: ${monthlyPrice.id} — $4.99 USD/month`);

  // 3. Create yearly price ($39.99 USD)
  const yearlyPrice = await stripe.prices.create({
    product: product.id,
    unit_amount: 3999, // $39.99 USD in cents
    currency: "usd",
    recurring: {
      interval: "year",
    },
    metadata: {
      plan: "pro_yearly",
    },
  });
  console.log(`Yearly price: ${yearlyPrice.id} — $39.99 USD/year`);

  console.log("\n========================================");
  console.log("Add these to your .env file:\n");
  console.log(`STRIPE_PRICE_PRO_MONTHLY=${monthlyPrice.id}`);
  console.log(`STRIPE_PRICE_PRO_YEARLY=${yearlyPrice.id}`);
  console.log("\n========================================");
  console.log("\nNow update src/components/payment-screen.tsx:");
  console.log(`  priceId: "${monthlyPrice.id}"  // PRO monthly`);
  console.log(`  priceId: "${yearlyPrice.id}"  // PRO yearly`);
  console.log("\nDone!");
}

createProducts().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
