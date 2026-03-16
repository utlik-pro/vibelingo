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

    // Achievement
    "achievement.unlocked": "Achievement Unlocked",
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

    // Achievement
    "achievement.unlocked": "Достижение разблокировано",
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
