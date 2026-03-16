export interface PracticeChallenge {
  id: number;
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tool: string;
  xpReward: number;
  hints: string[];
  hintsRu: string[];
  examplePrompt: string;
  examplePromptRu: string;
}

export const PRACTICE_CHALLENGES: PracticeChallenge[] = [
  {
    id: 1,
    title: "Build a hero section for a SaaS landing page",
    titleRu: "Создай hero-секцию для SaaS лендинга",
    description: "Create a compelling hero section with a headline, subheadline, CTA button, and a product screenshot placeholder.",
    descriptionRu: "Создай привлекательную hero-секцию с заголовком, подзаголовком, CTA-кнопкой и местом для скриншота продукта.",
    difficulty: "beginner",
    tool: "lovable",
    xpReward: 30,
    hints: [
      "Start with the headline — make it benefit-focused",
      "Add a subheadline that explains what the product does",
      "Include a clear CTA button with contrasting color",
    ],
    hintsRu: [
      "Начни с заголовка — сфокусируйся на пользе",
      "Добавь подзаголовок, объясняющий суть продукта",
      "Добавь яркую CTA-кнопку контрастного цвета",
    ],
    examplePrompt: "Create a hero section for a project management SaaS. Headline: 'Ship faster with AI-powered workflows'. Subheadline explaining the tool. Purple CTA button 'Start Free Trial'. Product screenshot placeholder on the right. Clean white background, modern sans-serif font.",
    examplePromptRu: "Создай hero-секцию для SaaS по управлению проектами. Заголовок: 'Запускай быстрее с AI-воркфлоу'. Подзаголовок с описанием. Фиолетовая CTA-кнопка 'Начать бесплатно'. Скриншот продукта справа. Белый фон, современный шрифт.",
  },
  {
    id: 2,
    title: "Create a pricing table with 3 tiers",
    titleRu: "Создай таблицу тарифов с 3 планами",
    description: "Design a pricing section with Free, Pro, and Enterprise tiers. Include features list, prices, and CTA buttons.",
    descriptionRu: "Создай секцию тарифов с планами Free, Pro и Enterprise. Включи список фич, цены и кнопки.",
    difficulty: "beginner",
    tool: "v0",
    xpReward: 30,
    hints: [
      "Highlight the most popular plan visually",
      "Use checkmarks for included features and X for missing ones",
      "Make the CTA button of the popular plan stand out",
    ],
    hintsRu: [
      "Визуально выдели самый популярный план",
      "Используй галочки для включённых фич и крестики для отсутствующих",
      "Сделай кнопку популярного плана заметнее",
    ],
    examplePrompt: "Create a pricing section with 3 tiers: Free ($0, 3 features), Pro ($19/mo, 8 features, highlighted as popular), Enterprise ($49/mo, all features). White cards with rounded corners, purple accent for Pro tier. Include toggle for monthly/yearly billing.",
    examplePromptRu: "Создай секцию тарифов с 3 планами: Free ($0, 3 фичи), Pro ($19/мес, 8 фич, выделен как популярный), Enterprise ($49/мес, все фичи). Белые карточки с скруглением, фиолетовый акцент для Pro. Переключатель месяц/год.",
  },
  {
    id: 3,
    title: "Design a dark mode dashboard sidebar",
    titleRu: "Создай сайдбар дашборда в тёмной теме",
    description: "Build a vertical sidebar navigation for a dashboard with icons, labels, active state, and a user avatar at the bottom.",
    descriptionRu: "Создай вертикальный сайдбар навигации для дашборда с иконками, подписями, активным состоянием и аватаром пользователя.",
    difficulty: "intermediate",
    tool: "cursor",
    xpReward: 50,
    hints: [
      "Use a dark background (gray-900 or slate-900)",
      "Add subtle hover effects with lighter background",
      "Include sections: main nav, settings, user profile at bottom",
    ],
    hintsRu: [
      "Используй тёмный фон (gray-900 или slate-900)",
      "Добавь тонкие hover-эффекты с более светлым фоном",
      "Включи секции: основная навигация, настройки, профиль внизу",
    ],
    examplePrompt: "Create a dark mode dashboard sidebar. Width 260px, dark gray background (#1a1a2e). Navigation items: Dashboard, Analytics, Projects, Team, Settings. Each with an icon and label. Active item has purple left border and lighter bg. User avatar and name at the bottom. Subtle hover animations.",
    examplePromptRu: "Создай сайдбар дашборда в тёмной теме. Ширина 260px, тёмно-серый фон (#1a1a2e). Пункты: Dashboard, Analytics, Projects, Team, Settings. Каждый с иконкой. Активный — фиолетовая полоса слева. Аватар и имя пользователя внизу.",
  },
  {
    id: 4,
    title: "Build a user profile card with avatar",
    titleRu: "Создай карточку профиля пользователя",
    description: "Create a user profile card with avatar, name, bio, stats (followers, following, posts), and action buttons.",
    descriptionRu: "Создай карточку профиля с аватаром, именем, био, статистикой (подписчики, подписки, посты) и кнопками действий.",
    difficulty: "beginner",
    tool: "lovable",
    xpReward: 30,
    hints: [
      "Center the avatar at the top of the card",
      "Use a clean layout with clear visual hierarchy",
      "Add Follow and Message buttons with different styles",
    ],
    hintsRu: [
      "Размести аватар по центру вверху карточки",
      "Используй чистый макет с понятной иерархией",
      "Добавь кнопки Follow и Message с разными стилями",
    ],
    examplePrompt: "Create a user profile card component. Rounded white card with shadow. Circular avatar (80px) centered at top. User name in bold, @username below in gray. Short bio text. Stats row: 1.2K followers, 340 following, 89 posts. Two buttons: 'Follow' (purple filled) and 'Message' (outline).",
    examplePromptRu: "Создай карточку профиля. Белая карточка с тенью. Круглый аватар (80px) по центру вверху. Имя жирным, @username серым. Короткое био. Статистика: 1.2K подписчиков, 340 подписок, 89 постов. Кнопки: 'Подписаться' (фиолетовая) и 'Сообщение' (обводка).",
  },
  {
    id: 5,
    title: "Create an email signup form with validation",
    titleRu: "Создай форму подписки с валидацией",
    description: "Build an email signup form with input validation, error states, success message, and a clean design.",
    descriptionRu: "Создай форму подписки на email с валидацией ввода, состояниями ошибки, сообщением об успехе и чистым дизайном.",
    difficulty: "intermediate",
    tool: "bolt",
    xpReward: 50,
    hints: [
      "Add real-time email validation on blur",
      "Show error messages below the input in red",
      "Add a success animation or checkmark after submission",
    ],
    hintsRu: [
      "Добавь валидацию email в реальном времени при потере фокуса",
      "Показывай ошибки под полем ввода красным цветом",
      "Добавь анимацию успеха или галочку после отправки",
    ],
    examplePrompt: "Create an email signup form. Centered card with 'Join our newsletter' heading. Email input with placeholder. Validate email format on blur — show red border and error text for invalid email. Purple 'Subscribe' button. On success: show green checkmark animation and 'You're in!' message. Subtle shadow, rounded corners.",
    examplePromptRu: "Создай форму подписки. Карточка по центру с заголовком 'Подпишись на рассылку'. Поле email с плейсхолдером. Валидация при потере фокуса — красная рамка и текст ошибки. Фиолетовая кнопка 'Подписаться'. При успехе: зелёная галочка и 'Вы подписаны!'. Тень, скругление.",
  },
  {
    id: 6,
    title: "Design a mobile app bottom navigation",
    titleRu: "Создай нижнюю навигацию мобильного приложения",
    description: "Build a mobile bottom navigation bar with 5 tabs, icons, labels, active state indicator, and a floating action button.",
    descriptionRu: "Создай нижнюю навигационную панель с 5 табами, иконками, подписями, индикатором активного таба и плавающей кнопкой.",
    difficulty: "intermediate",
    tool: "lovable",
    xpReward: 50,
    hints: [
      "Use a safe area padding at the bottom for modern phones",
      "Make the center tab a floating action button that stands out",
      "Add smooth color transition for active/inactive states",
    ],
    hintsRu: [
      "Используй safe area отступ внизу для современных телефонов",
      "Сделай центральный таб плавающей кнопкой, которая выделяется",
      "Добавь плавный переход цвета для активного/неактивного состояния",
    ],
    examplePrompt: "Create a mobile bottom navigation bar. 5 tabs: Home, Search, Add (center, elevated circle button with + icon), Notifications, Profile. White background with top shadow. Active tab: purple icon and label. Inactive: gray. Center button is a purple circle elevated above the bar. Smooth transitions on tap.",
    examplePromptRu: "Создай нижнюю навигацию. 5 табов: Главная, Поиск, Добавить (центр, приподнятая круглая кнопка с +), Уведомления, Профиль. Белый фон с тенью сверху. Активный: фиолетовые иконка и текст. Неактивный: серый. Центральная кнопка — фиолетовый круг выше панели.",
  },
  {
    id: 7,
    title: "Build a product comparison table",
    titleRu: "Создай таблицу сравнения продуктов",
    description: "Create a responsive comparison table for 3 products with features, prices, ratings, and a recommendation badge.",
    descriptionRu: "Создай адаптивную таблицу сравнения 3 продуктов с характеристиками, ценами, рейтингами и бейджем рекомендации.",
    difficulty: "intermediate",
    tool: "cursor",
    xpReward: 50,
    hints: [
      "Use sticky headers so product names stay visible on scroll",
      "Highlight the recommended product column with a colored border",
      "Make it horizontally scrollable on mobile",
    ],
    hintsRu: [
      "Используй sticky-заголовки, чтобы имена продуктов были видны при прокрутке",
      "Выдели рекомендуемый продукт цветной рамкой",
      "Сделай горизонтальную прокрутку на мобильных",
    ],
    examplePrompt: "Create a product comparison table for 3 headphones. Columns: Basic ($49), Pro ($99, 'Best Value' badge), Premium ($199). Rows: Battery life, Noise cancelling, Water resistance, Weight, Warranty. Use checkmarks/crosses. Pro column highlighted with purple border. Responsive — horizontal scroll on mobile.",
    examplePromptRu: "Создай таблицу сравнения 3 наушников. Столбцы: Basic ($49), Pro ($99, бейдж 'Лучший выбор'), Premium ($199). Строки: Батарея, Шумоподавление, Водозащита, Вес, Гарантия. Галочки/крестики. Pro выделен фиолетовой рамкой. Адаптивно — скролл на мобильных.",
  },
  {
    id: 8,
    title: "Create a testimonials carousel",
    titleRu: "Создай карусель отзывов",
    description: "Build an auto-scrolling testimonials carousel with avatar, quote, name, role, and navigation dots.",
    descriptionRu: "Создай автоматически прокручивающуюся карусель отзывов с аватаром, цитатой, именем, должностью и точками навигации.",
    difficulty: "advanced",
    tool: "v0",
    xpReward: 70,
    hints: [
      "Use CSS scroll-snap for smooth snapping between slides",
      "Add auto-play with pause on hover",
      "Include both dot indicators and arrow navigation",
    ],
    hintsRu: [
      "Используй CSS scroll-snap для плавного переключения слайдов",
      "Добавь автовоспроизведение с паузой при наведении",
      "Включи и точки-индикаторы, и стрелки навигации",
    ],
    examplePrompt: "Create a testimonials carousel. Auto-scrolling every 5 seconds, pauses on hover. Each slide: large quote icon, testimonial text in italics, avatar (48px circle), person name and job title. Navigation dots below. Left/right arrow buttons on sides. Smooth slide animation. White cards on light gray background.",
    examplePromptRu: "Создай карусель отзывов. Автопрокрутка каждые 5 секунд, пауза при наведении. Каждый слайд: большая иконка кавычек, текст курсивом, аватар (круг 48px), имя и должность. Точки навигации внизу. Стрелки по бокам. Плавная анимация. Белые карточки на светло-сером фоне.",
  },
  {
    id: 9,
    title: "Design a multi-step checkout flow",
    titleRu: "Создай многошаговый процесс оформления заказа",
    description: "Build a 3-step checkout flow: Cart review, Shipping info, Payment. Include a progress bar and step navigation.",
    descriptionRu: "Создай 3-шаговый процесс оформления: Корзина, Доставка, Оплата. Включи прогресс-бар и навигацию по шагам.",
    difficulty: "advanced",
    tool: "bolt",
    xpReward: 70,
    hints: [
      "Show a horizontal stepper at the top with numbered steps",
      "Validate each step before allowing to proceed",
      "Show order summary sidebar on desktop, collapsible on mobile",
    ],
    hintsRu: [
      "Покажи горизонтальный степпер вверху с номерами шагов",
      "Валидируй каждый шаг перед переходом к следующему",
      "Покажи сводку заказа в сайдбаре на десктопе, сворачиваемую на мобильных",
    ],
    examplePrompt: "Create a 3-step checkout flow. Step indicator at top: 1. Cart (review items with quantities) → 2. Shipping (form: name, address, city, zip) → 3. Payment (card form). 'Back' and 'Continue' buttons. Order summary on the right with subtotal, shipping, total. Purple accent color. Validate fields before next step.",
    examplePromptRu: "Создай 3-шаговый чекаут. Индикатор шагов вверху: 1. Корзина (список товаров) → 2. Доставка (форма: имя, адрес, город, индекс) → 3. Оплата (форма карты). Кнопки 'Назад' и 'Далее'. Сводка заказа справа. Фиолетовый акцент. Валидация полей.",
  },
  {
    id: 10,
    title: "Build a real-time chat interface",
    titleRu: "Создай интерфейс чата в реальном времени",
    description: "Create a chat UI with message bubbles, timestamps, typing indicator, message input, and send button.",
    descriptionRu: "Создай интерфейс чата с пузырями сообщений, временными метками, индикатором набора, полем ввода и кнопкой отправки.",
    difficulty: "advanced",
    tool: "claude",
    xpReward: 70,
    hints: [
      "Differentiate sent and received messages with alignment and color",
      "Add a typing indicator with animated dots",
      "Auto-scroll to the latest message",
    ],
    hintsRu: [
      "Различай отправленные и полученные сообщения выравниванием и цветом",
      "Добавь индикатор набора с анимированными точками",
      "Авто-скролл к последнему сообщению",
    ],
    examplePrompt: "Create a chat interface. Header with contact name and online status. Message area: sent messages (purple bg, right-aligned), received (gray bg, left-aligned). Each message has timestamp. Typing indicator with 3 animated dots. Input bar at bottom: text field with placeholder, send button (purple). Auto-scroll to newest message.",
    examplePromptRu: "Создай интерфейс чата. Шапка с именем контакта и статусом онлайн. Область сообщений: отправленные (фиолетовый фон, справа), полученные (серый фон, слева). Время на каждом сообщении. Индикатор набора с 3 анимированными точками. Поле ввода внизу с кнопкой отправки (фиолетовая). Авто-скролл.",
  },
];
