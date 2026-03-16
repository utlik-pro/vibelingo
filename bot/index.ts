import "dotenv/config";
import { Telegraf, Markup } from "telegraf";

const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN || "");
const WEBAPP_URL = process.env.WEBAPP_URL || "http://localhost:5173";

// /start command
bot.command("start", (ctx) => {
  ctx.reply(
    "Welcome to VibeLingo! Learn to build apps with AI in just 5 minutes a day.",
    Markup.inlineKeyboard([
      [Markup.button.webApp("Open VibeLingo", WEBAPP_URL)],
    ])
  );
});

// /learn command - opens mini app
bot.command("learn", (ctx) => {
  ctx.reply(
    "Ready to learn? Tap the button below!",
    Markup.inlineKeyboard([
      [Markup.button.webApp("Start Learning", WEBAPP_URL)],
    ])
  );
});

// /streak command - check streak (placeholder)
bot.command("streak", (ctx) => {
  ctx.reply("Your current streak: check in the app!\n\nKeep learning every day to maintain your streak.");
});

// /battle command
bot.command("battle", (ctx) => {
  ctx.reply(
    "Ready for a prompt battle?",
    Markup.inlineKeyboard([
      [Markup.button.webApp("Start Battle", WEBAPP_URL + "?screen=battle")],
    ])
  );
});

// /pro command
bot.command("pro", (ctx) => {
  ctx.reply(
    "VibeLingo PRO — Unlimited lessons, all tools, battles, and no ads!\n\n$4.99/month or $39.99/year",
    Markup.inlineKeyboard([
      [Markup.button.webApp("Upgrade to PRO", WEBAPP_URL + "?screen=payment")],
    ])
  );
});

// /help command
bot.command("help", (ctx) => {
  ctx.reply(
    "VibeLingo Commands:\n\n" +
    "/start - Open VibeLingo\n" +
    "/learn - Start a lesson\n" +
    "/battle - Start a prompt battle\n" +
    "/streak - Check your streak\n" +
    "/pro - Upgrade to PRO\n" +
    "/help - Show this message\n\n" +
    "Learn vibecoding — build apps with AI tools like Lovable, Cursor, Claude Code, Bolt.new, and v0!"
  );
});

// Handle text messages
bot.on("text", (ctx) => {
  ctx.reply(
    "Tap the button to open VibeLingo!",
    Markup.inlineKeyboard([
      [Markup.button.webApp("Open VibeLingo", WEBAPP_URL)],
    ])
  );
});

// Launch
bot.launch().then(() => {
  console.log("VibeLingo bot is running!");
});

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
