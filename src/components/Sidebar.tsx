import React from "react";
import { AppScreen } from "../types";
import { Leaf, Home, BarChart3, Trophy, HelpCircle, Map, Sparkles, Pencil } from "lucide-react";
import { UserProfile } from "./ProfileEditModal";

interface SidebarProps {
  currentScreen: AppScreen;
  setScreen: (screen: AppScreen) => void;
  userPoints: number;
  userLevel: number;
  onOpenQuickLog: () => void;
  userProfile: UserProfile;
  onOpenProfile: () => void;
}

export default function Sidebar({
  currentScreen,
  setScreen,
  userPoints,
  userLevel,
  onOpenQuickLog,
  userProfile,
  onOpenProfile,
}: SidebarProps) {
  const menuItems = [
    { id: AppScreen.Dashboard, label: "Home", icon: Home },
    { id: AppScreen.Insights, label: "Insights", icon: BarChart3 },
    { id: AppScreen.Leaderboard, label: "Leaderboard", icon: Trophy },
    { id: AppScreen.Quiz, label: "Eco-Quiz", icon: HelpCircle },
    { id: AppScreen.MapExplorer, label: "Campus Map", icon: Map }
  ];

  return (
    <aside className="hidden lg:flex flex-col fixed left-0 top-0 h-full py-8 w-64 bg-slate-50 border-r border-slate-200/60 shadow-[4px_0_24px_rgba(148,163,184,0.08)] z-50">
      {/* Brand logo */}
      <div 
        className="px-6 mb-8 flex items-center gap-3 cursor-pointer group"
        onClick={() => setScreen(AppScreen.Landing)}
      >
        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-250/20 group-hover:scale-105 transition-transform duration-300 shadow-[inset_1px_1px_3px_white,2px_4px_8px_rgba(16,185,129,0.15)]">
          <Leaf className="w-5 h-5 text-emerald-600 fill-emerald-500/20" />
        </div>
        <div>
          <h1 className="font-headline text-lg font-black text-slate-800 tracking-tight">Verdant</h1>
          <p className="text-[10px] text-emerald-600 tracking-wider uppercase font-extrabold">Campus Stewardship</p>
        </div>
      </div>

      {/* User profile capsule — clickable to open edit modal */}
      <div className="px-4 mb-8">
        <button
          type="button"
          onClick={onOpenProfile}
          className="clay-card p-4 flex items-center gap-3 bg-white w-full text-left group relative cursor-pointer hover:shadow-md transition-shadow rounded-2xl"
        >
          {/* Edit pencil overlay */}
          <span className="absolute top-2.5 right-2.5 p-1 rounded-lg bg-slate-100 opacity-0 group-hover:opacity-100 transition-opacity">
            <Pencil className="w-3 h-3 text-slate-500" />
          </span>

          <div className="relative shrink-0">
            <img
              alt={userProfile.name}
              className="w-11 h-11 rounded-full object-cover border-2 border-emerald-400/30"
              src={userProfile.avatarUrl}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop";
              }}
            />
            <span className="absolute -bottom-1 -right-0.5 bg-emerald-500 text-white text-[10px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white shadow-md">
              {userLevel}
            </span>
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-slate-800 truncate">{userProfile.name}</p>
            {userProfile.bio ? (
              <p className="text-[10px] text-slate-400 font-medium truncate">{userProfile.bio}</p>
            ) : (
              <p className="text-[10px] text-emerald-600 font-extrabold tracking-wide uppercase truncate">Steward Rank</p>
            )}
            <div className="flex items-center gap-1 mt-0.5 text-[11px] text-slate-500 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
              <span className="font-semibold text-slate-700">{userPoints} pts</span>
            </div>
          </div>
        </button>
      </div>

      {/* Menu list */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setScreen(item.id)}
              className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-bold text-sm transition-all text-left cursor-pointer ${
                isActive
                  ? "text-emerald-700 bg-emerald-50 border border-emerald-200/50 shadow-[inset_2px_2px_4px_white,2px_4px_10px_rgba(16,185,129,0.06)]"
                  : "text-slate-600 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Quick action button */}
      <div className="px-4 mt-auto">
        <button 
          onClick={onOpenQuickLog}
          className="clay-btn-primary w-full py-4.5 flex items-center justify-center gap-2"
        >
          <Leaf className="w-4 h-4 text-white" />
          <span>Quick Log Action</span>
        </button>
      </div>
    </aside>
  );
}
