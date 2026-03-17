import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const translations: Record<string, Record<string, string>> = {
  en: {
    // Onboarding
    "onboarding.welcome.title": "Welcome to VibeLingo",
    "onboarding.welcome.subtitle": "Learn to build apps with AI in 5 minutes a day",
    "onboarding.who.title": "Who are you?",
    "onboarding.who.highschool": "High Schooler",
    "onboarding.who.student": "Student",
    "onboarding.who.working": "Working",
    "onboarding.who.selfEmployed": "Self-Employed",
    "onboarding.who.other": "Other",
    "onboarding.goal.title": "What is your goal?",
    "onboarding.goal.saas": "Build my own SaaS",
    "onboarding.goal.freelance": "Freelance",
    "onboarding.goal.automate": "Automate my work",
    "onboarding.goal.curious": "Just curious",
    "onboarding.time.title": "How much time per day?",
    "onboarding.time.5": "5 min",
    "onboarding.time.10": "10 min",
    "onboarding.time.15": "15 min",
    "onboarding.time.20": "20+ min",
    "onboarding.startLearning": "Start Learning",
    "onboarding.next": "Next",

    // Home
    "home.dailyGoal": "Daily Goal",
    "home.lessonsToday": "{done}/{target} lessons today",
    "home.league": "League",
    "home.xpTo": "{xp} XP to {name}",
    "home.continue": "Continue",
    "home.lesson": "Lesson {n}",
    "home.battle": "Battle",
    "home.oneOnOne": "1 on 1",
    "home.badges": "Badges",

    // Learn
    "learn.title": "Lessons",
    "learn.modules.basics": "Basics",
    "learn.modules.tools": "Tools",
    "learn.modules.design": "Design",
    "learn.modules.advanced": "Advanced",
    "learn.modules.monetization": "Monetization",

    // Lesson
    "lesson.next": "Next",
    "lesson.finish": "Finish Lesson",

    // Lesson complete
    "lessonComplete.excellent": "Excellent!",
    "lessonComplete.goodJob": "Good Job!",
    "lessonComplete.canDoBetter": "Can Do Better!",
    "lessonComplete.xpEarned": "XP Earned",
    "lessonComplete.accuracy": "Accuracy",
    "lessonComplete.correct": "Correct",
    "lessonComplete.tool": "Tool",
    "lessonComplete.shareResult": "Share Result",
    "lessonComplete.continueLearning": "Continue Learning",

    // Leaderboard
    "leaderboard.title": "Leaderboard",
    "leaderboard.subtitle": "Weekly ranking",
    "leaderboard.you": "You",
    "leaderboard.promotionZone": "Promotion zone: Top 3 advance to next league",
    "leaderboard.demotionZone": "Demotion zone: Bottom 3 get demoted",

    // Battle
    "battle.title": "Battles",
    "battle.subtitle": "Compete 1 on 1 and earn XP",
    "battle.quickBattle": "Quick Battle",
    "battle.quickBattleDesc": "One task, two players, voting",
    "battle.reward": "Reward",
    "battle.findOpponent": "Find Opponent",
    "battle.challengeFriend": "Challenge a Friend",
    "battle.challengeFriendDesc": "Send a link and compare results",
    "battle.weeklyChallenge": "Weekly Challenge",
    "battle.landingIn3Min": "Landing page in 3 minutes",
    "battle.landingDesc": "Build a landing page for a coffee shop. Timer: 3 minutes. Best result wins 200 XP.",
    "battle.participants": "{n} participants",
    "battle.daysLeft": "{n} days left",
    "battle.searching": "Searching for opponent...",
    "battle.searchingDesc": "Finding a worthy rival for you",
    "battle.cancel": "Cancel",
    "battle.you": "You",
    "battle.vs": "VS",
    "battle.go": "GO!",
    "battle.timeLeft": "Time left",
    "battle.writePrompt": "Your prompt",
    "battle.promptPlaceholder": "Describe your solution here...",
    "battle.submit": "Submit",
    "battle.evaluating": "Evaluating results...",
    "battle.youWin": "You Win!",
    "battle.youLose": "You Lose",
    "battle.xpEarned": "XP Earned",
    "battle.playAgain": "Play Again",
    "battle.back": "Back",
    "battle.linkCopied": "Link copied!",

    // Profile
    "profile.upgradeToPro": "Upgrade to PRO",
    "profile.lessons": "Lessons",
    "profile.skillScore": "Skill Score",
    "profile.skill.prompting": "Prompting",
    "profile.skill.design": "Design",
    "profile.skill.architecture": "Architecture",
    "profile.skill.deploy": "Deploy",
    "profile.skill.speed": "Speed",
    "profile.skill.tools": "Tools",
    "profile.skill.monetization": "Monetization",
    "profile.badges": "Badges",
    "profile.certificates": "Certificates",
    "profile.certificatesDesc": "Complete a track to get a certificate",
    "profile.shareProgress": "Share Progress",
    "profile.language": "Language",

    // Payment
    "payment.unlockPro": "Unlock VibeLingo PRO",
    "payment.proDesc": "Unlimited lessons, all tools, battles, and exclusive content",
    "payment.free": "Free",
    "payment.free.feature1": "3 lessons per day",
    "payment.free.feature2": "Basic modules",
    "payment.free.feature3": "Leaderboard",
    "payment.free.missing1": "All modules and tools",
    "payment.free.missing2": "Unlimited battles",
    "payment.free.missing3": "PRO badges",
    "payment.free.missing4": "No ads",
    "payment.pro": "PRO",
    "payment.pro.feature1": "Unlimited lessons",
    "payment.pro.feature2": "All modules and tools",
    "payment.pro.feature3": "Unlimited battles",
    "payment.pro.feature4": "PRO badges",
    "payment.pro.feature5": "No ads",
    "payment.pro.feature6": "Early access to content",
    "payment.proYear": "PRO Year",
    "payment.proYear.feature1": "Everything from PRO",
    "payment.proYear.feature2": "33% discount",
    "payment.proYear.feature3": "Exclusive badges",
    "payment.proYear.feature4": "Priority support",
    "payment.popular": "Popular",
    "payment.continueFree": "Continue for Free",
    "payment.subscribe": "Subscribe",
    "payment.loading": "Loading...",
    "payment.cancelAnytime": "Cancel anytime. Payment via Stripe.",
    "payment.error": "Failed to create payment: {message}",
    "payment.perMonth": "/mo",
    "payment.perYear": "/yr",

    // Share
    "share.myProgress": "My Progress",
    "share.league": "League",
    "share.lessons": "Lessons",
    "share.streakDays": "{n} days",
    "share.learnFree": "Learn vibecoding for free",
    "share.close": "Close",
    "share.shareNow": "Share",

    // Common
    "common.xp": "XP",
    "common.streak": "Streak",
    "common.league.mercury": "Mercury",
    "common.league.venus": "Venus",
    "common.league.earth": "Earth",
    "common.league.mars": "Mars",
    "common.league.jupiter": "Jupiter",
    "common.league.saturn": "Saturn",

    // Bottom nav
    "nav.home": "Home",
    "nav.learn": "Lessons",
    "nav.battle": "Battles",
    "nav.leaderboard": "Ranking",
    "nav.profile": "Profile",

    // Badges
    "badge.first_landing": "First Landing",
    "badge.streak_7": "Week of Fire",
    "badge.speed_demon": "Speed Demon",
    "badge.prompt_master": "Prompt Master",
    "badge.social_butterfly": "Networker",
    "badge.battle_winner": "Winner",
    "badge.design_pro": "No-Slop Design",
    "badge.saas_builder": "SaaS Builder",

    // Order step
    "order.hint": "Use arrows to change order",
    "order.check": "Check Order",

    // Mascot
    "mascot.correct1": "Great! Keep it up!",
    "mascot.correct2": "Well done! Correct answer!",

    // Difficulty labels
    "difficulty.beginner": "Beginner",
    "difficulty.intermediate": "Intermediate",
    "difficulty.advanced": "Advanced",

    // Profile PRO active
    "profile.proActive": "VibeLingo PRO Active",

    // Referral
    "profile.referral": "Referral",
    "profile.referralCode": "Your referral code",
    "profile.copyLink": "Copy Link",
    "profile.linkCopied": "Link copied!",
    "profile.friendsInvited": "{count} friends invited",
    "profile.referralBonus": "Invite 3 friends = 100 XP bonus",

    // Certificates
    "certificates.title": "Certificates",
    "certificates.earned": "Earned",
    "certificates.locked": "Complete all lessons to unlock",
    "certificates.download": "Download",
    "certificates.complete": "Module completed!",
    "certificates.progress": "{percent}%",

    // Practice
    "practice.title": "Practice",
    "practice.subtitle": "Write prompts for real challenges",
    "practice.writePrompt": "Your Prompt",
    "practice.submit": "Submit",
    "practice.showExample": "Show Example",
    "practice.hints": "Hints",
    "practice.showHints": "Show Hints",
    "practice.submitted": "Challenge Complete!",
    "practice.xpEarned": "+{xp} XP earned",
    "nav.practice": "Practice",

    // Daily Reward
    "dailyReward.title": "Daily Reward",
    "dailyReward.day": "Day {n}",
    "dailyReward.claim": "Claim",
    "dailyReward.xpBonus": "XP Bonus",

    // Streak Freeze
    "profile.streakFreeze": "Streak Freeze",
    "profile.streakFreezeDesc": "Protects your streak if you miss a day",
    "profile.streakFreezeAvailable": "Available",
    "profile.streakFreezeUsed": "Used this week",

    // Achievement
    "achievement.unlocked": "Achievement Unlocked",

    // Shop (in-app purchases)
    "shop.title": "Shop",
    "shop.hearts": "5 Extra Hearts",
    "shop.freeze": "Streak Freeze x3",
    "shop.xpBoost": "XP Boost 2x (24h)",
    "shop.buy": "Buy",

    // Battle share
    "battle.shareResult": "Share Result",
    "battle.shareText": "I just won a VibeLingo prompt battle! Challenge: {title}. Try to beat me: t.me/vibelingo_learn_bot",

    // Activity calendar
    "profile.activity": "Activity",

    // Level system
    "level.title": "Level",
    "level.xpToNext": "{xp} XP to level {level}",

    // Landing page
    "landing.hero.title": "Build Apps Without Code — Using AI",
    "landing.hero.subtitle": "Learn vibecoding in just 5 minutes a day. No coding experience needed. Master tools like Lovable, Cursor, Claude Code, and more.",
    "landing.hero.cta": "Start Learning Free",
    "landing.hero.stat.lessons": "Lessons",
    "landing.hero.stat.modules": "Modules",
    "landing.hero.stat.challenges": "Practice Challenges",
    "landing.features.title": "How You'll Learn",
    "landing.features.lessons.title": "Interactive Lessons",
    "landing.features.lessons.desc": "Quiz-style learning with XP rewards. Short lessons you can finish in 5 minutes.",
    "landing.features.battles.title": "Prompt Battles",
    "landing.features.battles.desc": "Compete 1v1 against other learners. Write better prompts to win XP.",
    "landing.features.practice.title": "Practice Mode",
    "landing.features.practice.desc": "Write real prompts for real challenges. Build actual projects step by step.",
    "landing.tools.title": "Tools You'll Master",
    "landing.tools.subtitle": "Learn the most popular AI-powered development tools",
    "landing.tools.lovable": "AI app builder for MVPs",
    "landing.tools.cursor": "AI-powered code editor",
    "landing.tools.claudeCode": "CLI coding assistant",
    "landing.tools.bolt": "Full-stack AI builder",
    "landing.tools.v0": "UI component generator",
    "landing.pricing.title": "Simple Pricing",
    "landing.pricing.free": "Free",
    "landing.pricing.free.f1": "3 lessons per day",
    "landing.pricing.free.f2": "Basic modules",
    "landing.pricing.free.f3": "Leaderboard access",
    "landing.pricing.free.m1": "All modules and tools",
    "landing.pricing.free.m2": "Unlimited battles",
    "landing.pricing.pro": "PRO",
    "landing.pricing.perMonth": "/mo",
    "landing.pricing.pro.f1": "Unlimited lessons",
    "landing.pricing.pro.f2": "All modules and tools",
    "landing.pricing.pro.f3": "Unlimited battles",
    "landing.pricing.pro.f4": "PRO badges",
    "landing.pricing.pro.f5": "No ads",
    "landing.pricing.getCta": "Get Started",
    "landing.footer.openTelegram": "Open in Telegram",
    "landing.footer.tryInBrowser": "or try in browser",
    "landing.footer.builtWith": "Built with VibeLingo",

    // Landing — How It Works
    "landing.howItWorks.title": "How It Works",
    "landing.howItWorks.step1.title": "Learn",
    "landing.howItWorks.step1.desc": "Short 5-minute lessons on AI tools with quiz-style exercises and XP rewards",
    "landing.howItWorks.step2.title": "Practice",
    "landing.howItWorks.step2.desc": "Write real prompts for real tasks. Build landing pages, apps, and automations",
    "landing.howItWorks.step3.title": "Compete",
    "landing.howItWorks.step3.desc": "Challenge other learners in prompt battles. Best prompt wins XP and climbs the leaderboard",

    // Landing — Social proof
    "landing.social.trusted": "Trusted by vibecoding learners",
    "landing.social.review1": "I built my first app in 2 days after learning with VibeLingo. The prompt battles are addicting!",
    "landing.social.review1.name": "Alex K.",
    "landing.social.review2": "Finally an app that teaches AI tools, not just theory. Love the Duolingo-style lessons.",
    "landing.social.review2.name": "Maria S.",
    "landing.social.review3": "The practice challenges are genius. I went from zero to deploying a SaaS landing page.",
    "landing.social.review3.name": "James L.",

    // Landing — FAQ
    "landing.faq.title": "Frequently Asked Questions",
    "landing.faq.q1": "Is VibeLingo free?",
    "landing.faq.a1": "Yes! The free plan includes 3 lessons per day, leaderboard access, and basic modules. Upgrade to PRO for unlimited access.",
    "landing.faq.q2": "Do I need coding experience?",
    "landing.faq.a2": "Not at all. VibeLingo teaches you to build apps using AI — no prior coding knowledge required.",
    "landing.faq.q3": "What are prompt battles?",
    "landing.faq.a3": "1v1 competitions where you write prompts to solve a challenge. The best solution wins XP and bragging rights.",
    "landing.faq.q4": "How much time do I need?",
    "landing.faq.a4": "Just 5 minutes a day. Lessons are designed to fit into your coffee break.",
    "landing.faq.q5": "What tools will I learn?",
    "landing.faq.a5": "Lovable, Cursor, Claude Code, Bolt.new, v0, and more. We cover the most popular AI development tools.",

    // Landing — Final CTA
    "landing.finalCta.title": "Start Building with AI Today",
    "landing.finalCta.subtitle": "Join thousands of learners mastering vibecoding — free, fun, and 5 minutes a day",
    "landing.finalCta.cta": "Start Free in Telegram",

    // Landing — Stats bar
    "landing.stats.learners": "Learners",
    "landing.stats.lessonsCompleted": "Lessons Completed",
    "landing.stats.rating": "App Rating",

    // Landing — Big stat
    "landing.bigStat.number": "87%",
    "landing.bigStat.text": "of non-technical founders who learned vibecoding shipped their first product within 30 days",
    "landing.bigStat.source": "Based on VibeLingo user surveys, 2025",

    // Landing — Who is this for
    "landing.whoFor.title": "Who Is VibeLingo For?",
    "landing.whoFor.subtitle": "Whether you want to build a startup or automate your job — vibecoding is the skill of the future",
    "landing.whoFor.founder.title": "Startup Founders",
    "landing.whoFor.founder.desc": "Build and launch your MVP without hiring developers. Ship products faster than your competition.",
    "landing.whoFor.freelancer.title": "Freelancers",
    "landing.whoFor.freelancer.desc": "Offer AI-powered web development services to clients. Increase your rates by 3x with vibecoding skills.",
    "landing.whoFor.marketer.title": "Marketers & Creators",
    "landing.whoFor.marketer.desc": "Create landing pages, automate workflows, and build tools for your audience — no code needed.",
    "landing.whoFor.student.title": "Students & Learners",
    "landing.whoFor.student.desc": "Learn the most in-demand AI skills while they're still new. Get ahead of 99% of your peers.",

    // Landing — What you'll build
    "landing.build.title": "What You'll Build",
    "landing.build.subtitle": "Real projects, not toy examples",
    "landing.build.p1": "SaaS landing pages",
    "landing.build.p2": "Portfolio websites",
    "landing.build.p3": "E-commerce storefronts",
    "landing.build.p4": "Dashboard UIs",
    "landing.build.p5": "Mobile app prototypes",
    "landing.build.p6": "Automation workflows",

    // Landing — More reviews
    "landing.social.review4": "I'm a marketer with zero coding skills. After 2 weeks of VibeLingo, I built a landing page that converts better than our agency-made one.",
    "landing.social.review4.name": "Sarah M.",
    "landing.social.review5": "The gamification is so well done. I'm actually looking forward to my daily lesson. Haven't missed a day in 3 weeks.",
    "landing.social.review5.name": "David R.",
    "landing.social.review6": "Prompt battles are the killer feature. Nothing teaches you faster than competing against real people.",
    "landing.social.review6.name": "Emma T.",

    // Landing — Telegram section
    "landing.telegram.title": "Learn Anywhere via Telegram",
    "landing.telegram.subtitle": "VibeLingo lives inside Telegram as a mini-app. No downloads, no accounts — just open and start learning. Get daily reminders, track your streak, and compete with friends.",
    "landing.telegram.feature1": "Instant access via Telegram bot",
    "landing.telegram.feature2": "Daily push reminders to keep your streak",
    "landing.telegram.feature3": "Share results and challenge friends",
    "landing.telegram.feature4": "Works on any device with Telegram",

    // Landing — More FAQ
    "landing.faq.q6": "How is VibeLingo different from YouTube tutorials?",
    "landing.faq.a6": "YouTube teaches passively. VibeLingo is interactive — every lesson has quizzes, every challenge requires you to write real prompts. Plus, prompt battles make learning competitive and fun.",
    "landing.faq.q7": "Can I really build apps without coding?",
    "landing.faq.a7": "Yes! That's what vibecoding is. AI tools like Lovable, Cursor, and Bolt.new generate code from your descriptions. You learn to communicate with AI effectively — that's the skill.",
    "landing.faq.q8": "What if I get stuck?",
    "landing.faq.a8": "Every lesson has hints and example prompts. Practice challenges show you ideal solutions. And the community in Telegram is always there to help.",

    // Landing — Gallery
    "landing.gallery.title": "Everything You Need to Master Vibecoding",
    "landing.gallery.subtitle": "Inside the App",
  },
  ru: {
    // Onboarding
    "onboarding.welcome.title": "Добро пожаловать в VibeLingo",
    "onboarding.welcome.subtitle": "Научись создавать приложения с помощью AI за 5 минут в день",
    "onboarding.who.title": "Кто ты?",
    "onboarding.who.highschool": "Старшеклассник",
    "onboarding.who.student": "Студент",
    "onboarding.who.working": "Работаю",
    "onboarding.who.selfEmployed": "Самозанятый",
    "onboarding.who.other": "Другое",
    "onboarding.goal.title": "Какая у тебя цель?",
    "onboarding.goal.saas": "Создать свой SaaS",
    "onboarding.goal.freelance": "Фриланс",
    "onboarding.goal.automate": "Автоматизировать работу",
    "onboarding.goal.curious": "Просто интересно",
    "onboarding.time.title": "Сколько времени в день?",
    "onboarding.time.5": "5 мин",
    "onboarding.time.10": "10 мин",
    "onboarding.time.15": "15 мин",
    "onboarding.time.20": "20+ мин",
    "onboarding.startLearning": "Начать обучение",
    "onboarding.next": "Далее",

    // Home
    "home.dailyGoal": "Дневная цель",
    "home.lessonsToday": "{done}/{target} уроков сегодня",
    "home.league": "Лига",
    "home.xpTo": "{xp} XP до {name}",
    "home.continue": "Продолжить",
    "home.lesson": "Урок {n}",
    "home.battle": "Батл",
    "home.oneOnOne": "1 на 1",
    "home.badges": "Бейджи",

    // Learn
    "learn.title": "Уроки",
    "learn.modules.basics": "Основы",
    "learn.modules.tools": "Инструменты",
    "learn.modules.design": "Дизайн",
    "learn.modules.advanced": "Продвинутый",
    "learn.modules.monetization": "Монетизация",

    // Lesson
    "lesson.next": "Далее",
    "lesson.finish": "Завершить урок",

    // Lesson complete
    "lessonComplete.excellent": "Великолепно!",
    "lessonComplete.goodJob": "Хорошая работа!",
    "lessonComplete.canDoBetter": "Можно лучше!",
    "lessonComplete.xpEarned": "XP заработано",
    "lessonComplete.accuracy": "Точность",
    "lessonComplete.correct": "Правильных",
    "lessonComplete.tool": "Инструмент",
    "lessonComplete.shareResult": "Поделиться результатом",
    "lessonComplete.continueLearning": "Продолжить обучение",

    // Leaderboard
    "leaderboard.title": "Лидерборд",
    "leaderboard.subtitle": "Еженедельный рейтинг",
    "leaderboard.you": "Ты",
    "leaderboard.promotionZone": "Зона повышения: Топ-3 переходят в следующую лигу",
    "leaderboard.demotionZone": "Зона понижения: Последние 3 понижаются",

    // Battle
    "battle.title": "Батлы",
    "battle.subtitle": "Соревнуйся 1 на 1 и зарабатывай XP",
    "battle.quickBattle": "Быстрый батл",
    "battle.quickBattleDesc": "Одно задание, два игрока, голосование",
    "battle.reward": "Награда",
    "battle.findOpponent": "Найти соперника",
    "battle.challengeFriend": "Вызов другу",
    "battle.challengeFriendDesc": "Отправь ссылку и сравните результаты",
    "battle.weeklyChallenge": "Челлендж недели",
    "battle.landingIn3Min": "Лендинг за 3 минуты",
    "battle.landingDesc": "Создай лендинг для кофейни. Таймер: 3 минуты. Лучший результат выигрывает 200 XP.",
    "battle.participants": "{n} участников",
    "battle.daysLeft": "Осталось {n} дня",
    "battle.searching": "Ищем соперника...",
    "battle.searchingDesc": "Подбираем достойного соперника",
    "battle.cancel": "Отмена",
    "battle.you": "Ты",
    "battle.vs": "VS",
    "battle.go": "СТАРТ!",
    "battle.timeLeft": "Осталось времени",
    "battle.writePrompt": "Твой промпт",
    "battle.promptPlaceholder": "Опиши своё решение здесь...",
    "battle.submit": "Отправить",
    "battle.evaluating": "Оцениваем результаты...",
    "battle.youWin": "Ты победил!",
    "battle.youLose": "Ты проиграл",
    "battle.xpEarned": "XP заработано",
    "battle.playAgain": "Играть снова",
    "battle.back": "Назад",
    "battle.linkCopied": "Ссылка скопирована!",

    // Profile
    "profile.upgradeToPro": "Перейти на PRO",
    "profile.lessons": "Уроков",
    "profile.skillScore": "Skill Score",
    "profile.skill.prompting": "Промптинг",
    "profile.skill.design": "Дизайн",
    "profile.skill.architecture": "Архитектура",
    "profile.skill.deploy": "Деплой",
    "profile.skill.speed": "Скорость",
    "profile.skill.tools": "Инструменты",
    "profile.skill.monetization": "Монетизация",
    "profile.badges": "Бейджи",
    "profile.certificates": "Сертификаты",
    "profile.certificatesDesc": "Завершите трэк для получения сертификата",
    "profile.shareProgress": "Поделиться прогрессом",
    "profile.language": "Язык",

    // Payment
    "payment.unlockPro": "Разблокируй VibeLingo PRO",
    "payment.proDesc": "Безлимитные уроки, все инструменты, батлы и эксклюзивный контент",
    "payment.free": "Бесплатно",
    "payment.free.feature1": "3 урока в день",
    "payment.free.feature2": "Базовые модули",
    "payment.free.feature3": "Лидерборд",
    "payment.free.missing1": "Все модули и инструменты",
    "payment.free.missing2": "Батлы без лимитов",
    "payment.free.missing3": "Бейджи PRO",
    "payment.free.missing4": "Без рекламы",
    "payment.pro": "PRO",
    "payment.pro.feature1": "Безлимитные уроки",
    "payment.pro.feature2": "Все модули и инструменты",
    "payment.pro.feature3": "Батлы без лимитов",
    "payment.pro.feature4": "Бейджи PRO",
    "payment.pro.feature5": "Без рекламы",
    "payment.pro.feature6": "Ранний доступ к контенту",
    "payment.proYear": "PRO Год",
    "payment.proYear.feature1": "Всё из PRO",
    "payment.proYear.feature2": "Скидка 33%",
    "payment.proYear.feature3": "Эксклюзивные бейджи",
    "payment.proYear.feature4": "Приоритетная поддержка",
    "payment.popular": "Популярный",
    "payment.continueFree": "Продолжить бесплатно",
    "payment.subscribe": "Подписаться",
    "payment.loading": "Загрузка...",
    "payment.cancelAnytime": "Отмена подписки в любой момент. Оплата через Stripe.",
    "payment.error": "Не удалось создать платёж: {message}",
    "payment.perMonth": "/мес",
    "payment.perYear": "/год",

    // Share
    "share.myProgress": "Мой прогресс",
    "share.league": "Лига",
    "share.lessons": "Уроков",
    "share.streakDays": "{n} дней",
    "share.learnFree": "Учись вайбкодингу бесплатно",
    "share.close": "Закрыть",
    "share.shareNow": "Поделиться",

    // Common
    "common.xp": "XP",
    "common.streak": "Серия",
    "common.league.mercury": "Mercury",
    "common.league.venus": "Venus",
    "common.league.earth": "Earth",
    "common.league.mars": "Mars",
    "common.league.jupiter": "Jupiter",
    "common.league.saturn": "Saturn",

    // Bottom nav
    "nav.home": "Главная",
    "nav.learn": "Уроки",
    "nav.battle": "Батлы",
    "nav.leaderboard": "Рейтинг",
    "nav.profile": "Профиль",

    // Badges
    "badge.first_landing": "Первый лендинг",
    "badge.streak_7": "Неделя огня",
    "badge.speed_demon": "Speed Demon",
    "badge.prompt_master": "Мастер промптов",
    "badge.social_butterfly": "Нетворкер",
    "badge.battle_winner": "Победитель",
    "badge.design_pro": "Дизайн без слопа",
    "badge.saas_builder": "SaaS Builder",

    // Order step
    "order.hint": "Нажимай стрелки чтобы поменять порядок",
    "order.check": "Проверить порядок",

    // Mascot
    "mascot.correct1": "Отлично! Так держать!",
    "mascot.correct2": "Молодец! Правильный ответ!",

    // Difficulty labels
    "difficulty.beginner": "Начинающий",
    "difficulty.intermediate": "Средний",
    "difficulty.advanced": "Продвинутый",

    // Profile PRO active
    "profile.proActive": "VibeLingo PRO активен",

    // Referral
    "profile.referral": "Реферальная программа",
    "profile.referralCode": "Ваш реферальный код",
    "profile.copyLink": "Скопировать ссылку",
    "profile.linkCopied": "Ссылка скопирована!",
    "profile.friendsInvited": "{count} друзей приглашено",
    "profile.referralBonus": "Пригласи 3 друзей = 100 XP бонус",

    // Certificates
    "certificates.title": "Сертификаты",
    "certificates.earned": "Получен",
    "certificates.locked": "Завершите все уроки для разблокировки",
    "certificates.download": "Скачать",
    "certificates.complete": "Модуль завершён!",
    "certificates.progress": "{percent}%",

    // Practice
    "practice.title": "Практика",
    "practice.subtitle": "Пиши промпты для реальных задач",
    "practice.writePrompt": "Твой промпт",
    "practice.submit": "Отправить",
    "practice.showExample": "Показать пример",
    "practice.hints": "Подсказки",
    "practice.showHints": "Показать подсказки",
    "practice.submitted": "Задание выполнено!",
    "practice.xpEarned": "+{xp} XP заработано",
    "nav.practice": "Практика",

    // Daily Reward
    "dailyReward.title": "Ежедневная награда",
    "dailyReward.day": "День {n}",
    "dailyReward.claim": "Забрать",
    "dailyReward.xpBonus": "Бонус XP",

    // Streak Freeze
    "profile.streakFreeze": "Заморозка серии",
    "profile.streakFreezeDesc": "Защищает вашу серию, если вы пропустите день",
    "profile.streakFreezeAvailable": "Доступна",
    "profile.streakFreezeUsed": "Использована на этой неделе",

    // Achievement
    "achievement.unlocked": "Достижение разблокировано",

    // Shop (in-app purchases)
    "shop.title": "Магазин",
    "shop.hearts": "5 доп. сердец",
    "shop.freeze": "Заморозка серии x3",
    "shop.xpBoost": "XP Буст 2x (24ч)",
    "shop.buy": "Купить",

    // Battle share
    "battle.shareResult": "Поделиться результатом",
    "battle.shareText": "Я только что выиграл промпт-батл в VibeLingo! Задание: {title}. Попробуй побить мой рекорд: t.me/vibelingo_learn_bot",

    // Activity calendar
    "profile.activity": "Активность",

    // Level system
    "level.title": "Уровень",
    "level.xpToNext": "{xp} XP до уровня {level}",

    // Landing page
    "landing.hero.title": "Создавай приложения без кода — с помощью AI",
    "landing.hero.subtitle": "Освой вайбкодинг за 5 минут в день. Опыт программирования не нужен. Научись работать с Lovable, Cursor, Claude Code и другими инструментами.",
    "landing.hero.cta": "Начать бесплатно",
    "landing.hero.stat.lessons": "Уроков",
    "landing.hero.stat.modules": "Модулей",
    "landing.hero.stat.challenges": "Практических заданий",
    "landing.features.title": "Как ты будешь учиться",
    "landing.features.lessons.title": "Интерактивные уроки",
    "landing.features.lessons.desc": "Обучение в формате квизов с наградами XP. Короткие уроки за 5 минут.",
    "landing.features.battles.title": "Промпт-батлы",
    "landing.features.battles.desc": "Соревнуйся 1 на 1 с другими учениками. Пиши лучшие промпты и выигрывай XP.",
    "landing.features.practice.title": "Режим практики",
    "landing.features.practice.desc": "Пиши реальные промпты для реальных задач. Создавай проекты шаг за шагом.",
    "landing.tools.title": "Инструменты, которые ты освоишь",
    "landing.tools.subtitle": "Изучи самые популярные AI-инструменты разработки",
    "landing.tools.lovable": "AI-конструктор приложений",
    "landing.tools.cursor": "AI-редактор кода",
    "landing.tools.claudeCode": "CLI-ассистент для кода",
    "landing.tools.bolt": "Фулстек AI-билдер",
    "landing.tools.v0": "Генератор UI-компонентов",
    "landing.pricing.title": "Простые тарифы",
    "landing.pricing.free": "Бесплатно",
    "landing.pricing.free.f1": "3 урока в день",
    "landing.pricing.free.f2": "Базовые модули",
    "landing.pricing.free.f3": "Доступ к лидерборду",
    "landing.pricing.free.m1": "Все модули и инструменты",
    "landing.pricing.free.m2": "Батлы без лимитов",
    "landing.pricing.pro": "PRO",
    "landing.pricing.perMonth": "/мес",
    "landing.pricing.pro.f1": "Безлимитные уроки",
    "landing.pricing.pro.f2": "Все модули и инструменты",
    "landing.pricing.pro.f3": "Батлы без лимитов",
    "landing.pricing.pro.f4": "Бейджи PRO",
    "landing.pricing.pro.f5": "Без рекламы",
    "landing.pricing.getCta": "Начать",
    "landing.footer.openTelegram": "Открыть в Telegram",
    "landing.footer.tryInBrowser": "или попробовать в браузере",
    "landing.footer.builtWith": "Сделано с VibeLingo",

    // Landing — How It Works
    "landing.howItWorks.title": "Как это работает",
    "landing.howItWorks.step1.title": "Учись",
    "landing.howItWorks.step1.desc": "Короткие 5-минутные уроки по AI-инструментам с квизами и наградами XP",
    "landing.howItWorks.step2.title": "Практикуйся",
    "landing.howItWorks.step2.desc": "Пиши реальные промпты для реальных задач. Создавай лендинги, приложения и автоматизации",
    "landing.howItWorks.step3.title": "Соревнуйся",
    "landing.howItWorks.step3.desc": "Бросай вызов другим ученикам в промпт-батлах. Лучший промпт получает XP и поднимается в рейтинге",

    // Landing — Social proof
    "landing.social.trusted": "Нам доверяют ученики вайбкодинга",
    "landing.social.review1": "Я создал первое приложение за 2 дня после обучения в VibeLingo. Промпт-батлы затягивают!",
    "landing.social.review1.name": "Алексей К.",
    "landing.social.review2": "Наконец-то приложение, которое учит AI-инструментам, а не просто теории. Обожаю уроки в стиле Duolingo.",
    "landing.social.review2.name": "Мария С.",
    "landing.social.review3": "Практические задания — это гениально. Я прошёл путь от нуля до деплоя SaaS-лендинга.",
    "landing.social.review3.name": "Дмитрий Л.",

    // Landing — FAQ
    "landing.faq.title": "Часто задаваемые вопросы",
    "landing.faq.q1": "VibeLingo бесплатный?",
    "landing.faq.a1": "Да! Бесплатный план включает 3 урока в день, доступ к лидерборду и базовые модули. Перейди на PRO для безлимитного доступа.",
    "landing.faq.q2": "Нужен ли опыт программирования?",
    "landing.faq.a2": "Вовсе нет. VibeLingo учит создавать приложения с помощью AI — никакого предварительного опыта не нужно.",
    "landing.faq.q3": "Что такое промпт-батлы?",
    "landing.faq.a3": "Соревнования 1 на 1, где ты пишешь промпты для решения задачи. Лучшее решение получает XP и славу.",
    "landing.faq.q4": "Сколько времени нужно?",
    "landing.faq.a4": "Всего 5 минут в день. Уроки созданы так, чтобы поместиться в перерыв на кофе.",
    "landing.faq.q5": "Какие инструменты я изучу?",
    "landing.faq.a5": "Lovable, Cursor, Claude Code, Bolt.new, v0 и другие. Мы покрываем самые популярные AI-инструменты разработки.",

    // Landing — Final CTA
    "landing.finalCta.title": "Начни создавать с AI уже сегодня",
    "landing.finalCta.subtitle": "Присоединяйся к тысячам учеников, осваивающих вайбкодинг — бесплатно, весело и за 5 минут в день",
    "landing.finalCta.cta": "Начать бесплатно в Telegram",

    // Landing — Stats bar
    "landing.stats.learners": "Учеников",
    "landing.stats.lessonsCompleted": "Уроков пройдено",
    "landing.stats.rating": "Рейтинг",

    // Landing — Big stat
    "landing.bigStat.number": "87%",
    "landing.bigStat.text": "нетехнических основателей, изучивших вайбкодинг, запустили свой первый продукт за 30 дней",
    "landing.bigStat.source": "По данным опросов пользователей VibeLingo, 2025",

    // Landing — Who is this for
    "landing.whoFor.title": "Для кого VibeLingo?",
    "landing.whoFor.subtitle": "Хочешь запустить стартап или автоматизировать работу — вайбкодинг для каждого",
    "landing.whoFor.founder.title": "Основатели стартапов",
    "landing.whoFor.founder.desc": "Создай и запусти MVP без найма разработчиков. Выпускай продукты быстрее конкурентов.",
    "landing.whoFor.freelancer.title": "Фрилансеры",
    "landing.whoFor.freelancer.desc": "Предлагай услуги AI-разработки клиентам. Увеличь ставку в 3 раза с навыками вайбкодинга.",
    "landing.whoFor.marketer.title": "Маркетологи и креаторы",
    "landing.whoFor.marketer.desc": "Создавай лендинги, автоматизируй процессы и строй инструменты для аудитории — без кода.",
    "landing.whoFor.student.title": "Студенты",
    "landing.whoFor.student.desc": "Освой самые востребованные AI-навыки, пока они ещё новые. Опереди 99% ровесников.",

    // Landing — What you'll build
    "landing.build.title": "Что ты построишь",
    "landing.build.subtitle": "Реальные проекты, а не игрушечные примеры",
    "landing.build.p1": "SaaS-лендинги",
    "landing.build.p2": "Портфолио-сайты",
    "landing.build.p3": "Интернет-магазины",
    "landing.build.p4": "Дашборды",
    "landing.build.p5": "Прототипы мобильных приложений",
    "landing.build.p6": "Автоматизации",

    // Landing — More reviews
    "landing.social.review4": "Я маркетолог с нулевым опытом в коде. Через 2 недели VibeLingo я создала лендинг, который конвертит лучше агентского.",
    "landing.social.review4.name": "Ирина М.",
    "landing.social.review5": "Геймификация сделана превосходно. Реально жду свой ежедневный урок. 3 недели без пропуска.",
    "landing.social.review5.name": "Антон Р.",
    "landing.social.review6": "Промпт-батлы — это киллер-фича. Ничто не учит быстрее, чем соревнование с реальными людьми.",
    "landing.social.review6.name": "Елена Т.",

    // Landing — Telegram section
    "landing.telegram.title": "Учись где угодно через Telegram",
    "landing.telegram.subtitle": "VibeLingo работает как мини-приложение внутри Telegram. Никаких загрузок и регистраций — просто открой и начни учиться. Получай напоминания, следи за серией и соревнуйся с друзьями.",
    "landing.telegram.feature1": "Мгновенный доступ через Telegram-бота",
    "landing.telegram.feature2": "Ежедневные push-напоминания для серии",
    "landing.telegram.feature3": "Делись результатами и вызывай друзей",
    "landing.telegram.feature4": "Работает на любом устройстве с Telegram",

    // Landing — More FAQ
    "landing.faq.q6": "Чем VibeLingo отличается от YouTube-туториалов?",
    "landing.faq.a6": "YouTube учит пассивно. VibeLingo интерактивен — каждый урок с квизами, каждое задание требует написания реальных промптов. Плюс промпт-батлы делают обучение соревновательным и весёлым.",
    "landing.faq.q7": "Правда можно создавать приложения без кода?",
    "landing.faq.a7": "Да! В этом суть вайбкодинга. AI-инструменты вроде Lovable, Cursor и Bolt.new генерируют код из описаний. Ты учишься эффективно общаться с AI — это и есть навык.",
    "landing.faq.q8": "Что если я застряну?",
    "landing.faq.a8": "Каждый урок имеет подсказки и примеры промптов. Практические задания показывают идеальные решения. А сообщество в Telegram всегда поможет.",

    // Landing — Gallery
    "landing.gallery.title": "Всё для освоения вайбкодинга",
    "landing.gallery.subtitle": "Внутри приложения",
  },
};

interface I18nContextValue {
  t: (key: string, params?: Record<string, string | number>) => string;
  locale: string;
  setLocale: (l: string) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<string>(() => {
    try {
      return localStorage.getItem("vibelingo_locale") || "en";
    } catch {
      return "en";
    }
  });

  const setLocale = useCallback((l: string) => {
    setLocaleState(l);
    try {
      localStorage.setItem("vibelingo_locale", l);
    } catch {
      // ignore
    }
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      let str = translations[locale]?.[key] || translations["en"]?.[key] || key;
      if (params) {
        for (const [k, v] of Object.entries(params)) {
          str = str.replace(`{${k}}`, String(v));
        }
      }
      return str;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
