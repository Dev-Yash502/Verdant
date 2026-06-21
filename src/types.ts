export enum AppScreen {
  Landing = "LANDING",
  BaselineQuiz = "BASELINE_QUIZ",
  Dashboard = "DASHBOARD",
  Insights = "INSIGHTS",
  Leaderboard = "LEADERBOARD",
  Quiz = "QUIZ",
  MapExplorer = "MAP_EXPLORER"
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  title: string;
  points: number;
  co2SavedKg: number;
  category: "travel" | "food" | "energy" | "waste";
}

export interface StudentRank {
  id: string;
  rank: number;
  name: string;
  campus: string;
  points: number;
  level: number;
  avatarUrl?: string;
  initials?: string;
  isCurrentUser?: boolean;
}

export interface CampusRank {
  name: string;
  rank: number;
  co2ReducedKg: number;
  percentageChange: number;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  points: number;
  explanation: string;
}
