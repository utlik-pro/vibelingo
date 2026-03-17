import "dotenv/config";
import { Telegraf, Markup } from "telegraf";
import { readFileSync, writeFileSync, existsSync } from "fs";

const REMINDERS_FILE = "./bot/reminders.json";

function loadReminders(): number[] {
  if (!existsSync(REMINDERS_FILE)) return [];
  try {
    return JSON.parse(readFileSync(REMINDERS_FILE, "utf-8"));
  } catch {
    return [];
  }
}

function saveReminders(ids: number[]) {
  writeFileSync(REMINDERS_FILE, JSON.stringify(ids));
}

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

// /remind command - enable daily reminders
bot.command("remind", (ctx) => {
  const chatId = ctx.chat.id;
  const reminders = loadReminders();
  if (reminders.includes(chatId)) {
    ctx.reply("Reminders are already enabled! You'll get a daily reminder to practice.");
  } else {
    reminders.push(chatId);
    saveReminders(reminders);
    ctx.reply("Daily reminders enabled! I'll remind you to practice every day.");
  }
});

// /stopremind command - disable daily reminders
bot.command("stopremind", (ctx) => {
  const chatId = ctx.chat.id;
  const reminders = loadReminders().filter((id) => id !== chatId);
  saveReminders(reminders);
  ctx.reply("Reminders disabled.");
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
    "/remind - Enable daily reminders\n" +
    "/stopremind - Disable daily reminders\n" +
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

// Daily reminder scheduler - sends reminders at 10:00
function scheduleReminders() {
  setInterval(async () => {
    const now = new Date();
    if (now.getHours() === 10 && now.getMinutes() === 0) {
      const ids = loadReminders();
      for (const chatId of ids) {
        try {
          await bot.telegram.sendMessage(
            chatId,
            "Time to practice! Open VibeLingo and keep your streak going.",
            Markup.inlineKeyboard([
              [Markup.button.webApp("Open VibeLingo", WEBAPP_URL)],
            ])
          );
        } catch {
          // Ignore errors for individual chat messages
        }
      }
    }
  }, 60 * 1000); // Check every minute
}

scheduleReminders();

// Launch
bot.launch().then(() => {
  console.log("VibeLingo bot is running!");
});

// Graceful shutdown
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
