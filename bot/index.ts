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

// Referral tracking
const REFERRALS_FILE = "./bot/referrals.json";

function loadReferrals(): Record<string, string[]> {
  if (!existsSync(REFERRALS_FILE)) return {};
  try { return JSON.parse(readFileSync(REFERRALS_FILE, "utf-8")); } catch { return {}; }
}

function saveReferrals(data: Record<string, string[]>) {
  writeFileSync(REFERRALS_FILE, JSON.stringify(data, null, 2));
}

function trackReferral(referrerCode: string, newUserId: string) {
  const data = loadReferrals();
  if (!data[referrerCode]) data[referrerCode] = [];
  if (!data[referrerCode].includes(newUserId)) {
    data[referrerCode].push(newUserId);
    saveReferrals(data);
    return true; // new referral
  }
  return false; // already tracked
}

function getReferralCount(code: string): number {
  const data = loadReferrals();
  return data[code]?.length || 0;
}

// /start command — handle referral codes
bot.command("start", (ctx) => {
  const payload = ctx.message.text.split(" ")[1]; // e.g. "VLABCD1234"
  const userId = String(ctx.from.id);

  if (payload && payload.startsWith("VL")) {
    // Someone joined via referral link
    const isNew = trackReferral(payload, userId);
    if (isNew) {
      const count = getReferralCount(payload);
      console.log(`Referral: code=${payload}, new user=${userId}, total=${count}`);
    }
    ctx.reply(
      "Welcome to VibeLingo! Your friend invited you. Start learning now!",
      Markup.inlineKeyboard([
        [Markup.button.webApp("Open VibeLingo", WEBAPP_URL)],
      ])
    );
  } else if (payload === "battle") {
    // Someone joined via battle invite
    ctx.reply(
      "⚔️ Your friend challenged you to a Prompt Battle! Accept the challenge:",
      Markup.inlineKeyboard([
        [Markup.button.webApp("Start Battle", WEBAPP_URL + "?screen=battle")],
      ])
    );
  } else {
    ctx.reply(
      "Welcome to VibeLingo! Learn to build apps with AI in just 5 minutes a day.",
      Markup.inlineKeyboard([
        [Markup.button.webApp("Open VibeLingo", WEBAPP_URL)],
      ])
    );
  }
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

// /referral command - show referral stats
bot.command("referral", (ctx) => {
  const userId = String(ctx.from.id);
  // Generate same code as frontend
  const code = "VL" + Buffer.from(userId).toString("base64").replace(/[^a-zA-Z0-9]/g, "").slice(0, 8).toUpperCase();
  const count = getReferralCount(code);
  const link = `https://t.me/vibelingo_learn_bot?start=${code}`;

  ctx.reply(
    `Your referral link:\n${link}\n\nFriends invited: ${count}\n\nShare this link and earn XP when friends join!`
  );
});

// /quiz command — daily quiz in chat
bot.command("quiz", (ctx) => {
  const quizzes = [
    { q: "What tool generates React apps from prompts?", options: ["Lovable", "Photoshop", "Excel", "Word"], correct: 0 },
    { q: "What does Cursor AI understand?", options: ["Only current file", "Entire project context", "Nothing", "Only HTML"], correct: 1 },
    { q: "What is vibecoding?", options: ["Coding with music", "Building apps with AI", "A dance style", "A video game"], correct: 1 },
    { q: "Best font for avoiding AI slop?", options: ["Inter", "Comic Sans", "Unique character fonts", "Arial"], correct: 2 },
    { q: "Where should you store API keys?", options: ["In HTML", "In .env file", "In README", "In CSS"], correct: 1 },
  ];
  const quiz = quizzes[Math.floor(Math.random() * quizzes.length)];

  ctx.sendQuiz(quiz.q, quiz.options, {
    correct_option_id: quiz.correct,
    is_anonymous: false,
    explanation: "Learn more in VibeLingo!",
  });
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
    "/quiz - Take a quick quiz\n" +
    "/referral - Your referral link & stats\n" +
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
