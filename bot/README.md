# VibeLingo Telegram Bot

Entry point for the VibeLingo mini-app on Telegram.

## Setup

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Create a new bot with `/newbot`
3. Copy the token to your `.env` file as `TELEGRAM_BOT_TOKEN`
4. Set up the Web App URL in BotFather: `/mybots` -> your bot -> Bot Settings -> Menu Button -> Set URL
5. Set `WEBAPP_URL` in `.env` to your deployed frontend URL

## Run

```bash
npm run bot
```

## Commands

| Command   | Description              |
| --------- | ------------------------ |
| `/start`  | Welcome + open mini-app  |
| `/learn`  | Start a lesson           |
| `/battle` | Start a prompt battle    |
| `/streak` | Check your streak        |
| `/pro`    | Upgrade to PRO           |
| `/help`   | Show available commands  |
