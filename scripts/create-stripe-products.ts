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

  // 4. Create one-time purchase products
  const shopProduct = await stripe.products.create({
    name: "VibeLingo Shop Items",
    description: "One-time in-app purchases for VibeLingo",
    metadata: { app: "vibelingo", type: "shop" },
  });
  console.log(`\nShop product created: ${shopProduct.id}`);

  const heartsPrice = await stripe.prices.create({
    product: shopProduct.id,
    unit_amount: 99, // $0.99
    currency: "usd",
    metadata: { item: "extra_hearts_5" },
  });
  console.log(`Extra Hearts x5 price: ${heartsPrice.id} — $0.99`);

  const freezePrice = await stripe.prices.create({
    product: shopProduct.id,
    unit_amount: 199, // $1.99
    currency: "usd",
    metadata: { item: "streak_freeze_3" },
  });
  console.log(`Streak Freeze x3 price: ${freezePrice.id} — $1.99`);

  const xpBoostPrice = await stripe.prices.create({
    product: shopProduct.id,
    unit_amount: 299, // $2.99
    currency: "usd",
    metadata: { item: "xp_boost_2x_24h" },
  });
  console.log(`XP Boost 2x 24h price: ${xpBoostPrice.id} — $2.99`);

  console.log("\n========================================");
  console.log("Add these to your .env file:\n");
  console.log(`STRIPE_PRICE_PRO_MONTHLY=${monthlyPrice.id}`);
  console.log(`STRIPE_PRICE_PRO_YEARLY=${yearlyPrice.id}`);
  console.log(`STRIPE_PRICE_HEARTS_5=${heartsPrice.id}`);
  console.log(`STRIPE_PRICE_FREEZE_3=${freezePrice.id}`);
  console.log(`STRIPE_PRICE_XP_BOOST=${xpBoostPrice.id}`);
  console.log("\n========================================");
  console.log("\nNow update src/components/payment-screen.tsx:");
  console.log(`  priceId: "${monthlyPrice.id}"  // PRO monthly`);
  console.log(`  priceId: "${yearlyPrice.id}"  // PRO yearly`);
  console.log(`  priceId: "${heartsPrice.id}"  // Extra Hearts x5`);
  console.log(`  priceId: "${freezePrice.id}"  // Streak Freeze x3`);
  console.log(`  priceId: "${xpBoostPrice.id}"  // XP Boost 2x 24h`);
  console.log("\nDone!");
}

createProducts().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
