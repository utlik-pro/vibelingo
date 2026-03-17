export interface LevelInfo {
  level: number;
  title: string;
  titleRu: string;
  xpRequired: number;
  xpForNext: number;
  progress: number; // 0-1
}

// XP thresholds: level 1 = 0, level 2 = 50, level 3 = 120, etc (exponential)
const LEVELS = Array.from({ length: 50 }, (_, i) => ({
  level: i + 1,
  xpRequired: Math.floor(i === 0 ? 0 : 30 * Math.pow(1.15, i)),
}));

const LEVEL_TITLES: Array<{ title: string; titleRu: string }> = [
  { title: "Newbie", titleRu: "Новичок" },           // 1-5
  { title: "Learner", titleRu: "Ученик" },            // 6-10
  { title: "Apprentice", titleRu: "Подмастерье" },    // 11-15
  { title: "Builder", titleRu: "Строитель" },         // 16-20
  { title: "Creator", titleRu: "Создатель" },         // 21-25
  { title: "Engineer", titleRu: "Инженер" },          // 26-30
  { title: "Architect", titleRu: "Архитектор" },      // 31-35
  { title: "Master", titleRu: "Мастер" },             // 36-40
  { title: "Expert", titleRu: "Эксперт" },            // 41-45
  { title: "Legend", titleRu: "Легенда" },             // 46-50
];

export function getLevelInfo(xp: number): LevelInfo {
  let currentLevel = LEVELS[0];
  let nextLevel = LEVELS[1];

  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      currentLevel = LEVELS[i];
      nextLevel = LEVELS[i + 1] || LEVELS[i];
      break;
    }
  }

  const titleIdx = Math.min(Math.floor((currentLevel.level - 1) / 5), LEVEL_TITLES.length - 1);
  const progress = nextLevel.level === currentLevel.level ? 1 :
    (xp - currentLevel.xpRequired) / (nextLevel.xpRequired - currentLevel.xpRequired);

  return {
    level: currentLevel.level,
    title: LEVEL_TITLES[titleIdx].title,
    titleRu: LEVEL_TITLES[titleIdx].titleRu,
    xpRequired: currentLevel.xpRequired,
    xpForNext: nextLevel.xpRequired,
    progress: Math.min(progress, 1),
  };
}
