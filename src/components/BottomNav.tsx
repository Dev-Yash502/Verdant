import React from "react";
import { AppScreen } from "../types";
import { Home, BarChart3, Trophy, HelpCircle, Map } from "lucide-react";

interface BottomNavProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  onOpenQuickLog: () => void;
}

export default function BottomNav({
  currentScreen,
  setScreen,
  onOpenQuickLog
}: BottomNavProps) {
  const tabs = [
    { id: AppScreen.Dashboard, label: "Home", icon: Home },
    { id: AppScreen.Insights, label: "Insights", icon: BarChart3 },
    { id: AppScreen.Leaderboard, label: "Ranks", icon: Trophy },
    { id: AppScreen.Quiz, label: "Quiz", icon: HelpCircle },
    { id: AppScreen.MapExplorer, label: "Map", icon: Map }
  ];

  return (
    <nav className="lg:hidden fixed bottom-1 left-3 right-3 z-50 flex justify-around items-center px-2 py-2.5 bg-white/95 backdrop-blur-md border border-slate-100 shadow-[0_4px_24px_rgba(148,163,184,0.18)] rounded-3xl">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = currentScreen === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setScreen(tab.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 w-16 cursor-pointer ${
              isActive
                ? "bg-slate-50 text-emerald-700 font-bold shadow-[inset_1.5px_1.5px_4px_white,inset_-1.5px_-1.5px_4px_rgba(148,163,184,0.1),1px_3px_8px_rgba(16,185,129,0.06)] border border-emerald-100"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <Icon className={`w-5 h-5 mb-0.5 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
            <span className="text-[9px] font-bold tracking-tight">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
