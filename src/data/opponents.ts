export interface Opponent {
  id: string;
  name: string;
  avatar: string;
  avatarColor: string;
  xp: number;
  league: string;
  skill: number;
}

export const OPPONENTS: Opponent[] = [
  { id: "opp1", name: "Alex M.", avatar: "AM", avatarColor: "#7C3AED", xp: 1200, league: "venus", skill: 45 },
  { id: "opp2", name: "Катя С.", avatar: "КС", avatarColor: "#0EA5E9", xp: 890, league: "mercury", skill: 30 },
  { id: "opp3", name: "Jordan L.", avatar: "JL", avatarColor: "#22C55E", xp: 2100, league: "earth", skill: 65 },
  { id: "opp4", name: "Дима К.", avatar: "ДК", avatarColor: "#F59E0B", xp: 1560, league: "venus", skill: 55 },
  { id: "opp5", name: "Sarah W.", avatar: "SW", avatarColor: "#EF4444", xp: 3200, league: "mars", skill: 80 },
  { id: "opp6", name: "Олег Р.", avatar: "ОР", avatarColor: "#A855F7", xp: 750, league: "mercury", skill: 25 },
  { id: "opp7", name: "Mika T.", avatar: "MT", avatarColor: "#14B8A6", xp: 1800, league: "venus", skill: 50 },
  { id: "opp8", name: "Анна Б.", avatar: "АБ", avatarColor: "#F97316", xp: 2800, league: "earth", skill: 70 },
  { id: "opp9", name: "Chris P.", avatar: "CP", avatarColor: "#6366F1", xp: 420, league: "mercury", skill: 20 },
  { id: "opp10", name: "Лена В.", avatar: "ЛВ", avatarColor: "#EC4899", xp: 1950, league: "venus", skill: 58 },
  { id: "opp11", name: "Noah K.", avatar: "NK", avatarColor: "#8B5CF6", xp: 3500, league: "mars", skill: 85 },
  { id: "opp12", name: "Маша Д.", avatar: "МД", avatarColor: "#10B981", xp: 1100, league: "mercury", skill: 40 },
  { id: "opp13", name: "Tyler R.", avatar: "TR", avatarColor: "#3B82F6", xp: 2400, league: "earth", skill: 62 },
  { id: "opp14", name: "Игорь Н.", avatar: "ИН", avatarColor: "#D946EF", xp: 680, league: "mercury", skill: 22 },
  { id: "opp15", name: "Emma S.", avatar: "ES", avatarColor: "#F43F5E", xp: 4100, league: "mars", skill: 90 },
  { id: "opp16", name: "Руслан Т.", avatar: "РТ", avatarColor: "#06B6D4", xp: 1350, league: "venus", skill: 48 },
];
