import React, { useState } from "react";
import { X, Flame, GlassWater, Route, Utensils, Sun, Trash2, Check, Sparkles } from "lucide-react";

interface QuickLogItem {
  id: string;
  title: string;
  points: number;
  co2Saved: number; // kg
  category: "travel" | "food" | "energy" | "waste";
  icon: any;
  colorClass: string;
}

interface QuickLogModalProps {
  onClose: () => void;
  onLogActivity: (title: string, points: number, co2Saved: number, category: "travel" | "food" | "energy" | "waste") => void;
}

export default function QuickLogModal({ onClose, onLogActivity }: QuickLogModalProps) {
  const [successItem, setSuccessItem] = useState<string | null>(null);

  const logActions: QuickLogItem[] = [
    {
      id: "bottle",
      title: "Refilled Reusable Bottle",
      points: 5,
      co2Saved: 0.3,
      category: "waste",
      icon: GlassWater,
      colorClass: "bg-blue-50 text-blue-600 border-blue-105 shadow-[inset_1px_1.5px_3px_white]"
    },
    {
      id: "transit",
      title: "Took Local Bus / Subway",
      points: 15,
      co2Saved: 1.8,
      category: "travel",
      icon: Route,
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-105 shadow-[inset_1px_1.5px_3px_white]"
    },
    {
      id: "meal",
      title: "Had plant-based Vegan Meal",
      points: 10,
      co2Saved: 0.9,
      category: "food",
      icon: Utensils,
      colorClass: "bg-purple-50 text-purple-600 border-purple-105 shadow-[inset_1px_1.5px_3px_white]"
    },
    {
      id: "solar",
      title: "Solar station phone charge",
      points: 8,
      co2Saved: 0.2,
      category: "energy",
      icon: Sun,
      colorClass: "bg-amber-50 text-amber-600 border-amber-105 shadow-[inset_1px_1.5px_3px_white]"
    },
    {
      id: "unplug",
      title: "Standby desktop adapter unplug",
      points: 5,
      co2Saved: 0.1,
      category: "energy",
      icon: Flame, // standard micro action
      colorClass: "bg-rose-50 text-rose-600 border-rose-105 shadow-[inset_1px_1.5px_3px_white]"
    },
    {
      id: "plastic",
      title: "Segregated student dorm packaging",
      points: 5,
      co2Saved: 0.2,
      category: "waste",
      icon: Trash2,
      colorClass: "bg-teal-50 text-teal-600 border-teal-105 shadow-[inset_1px_1.5px_3px_white]"
    }
  ];

  const handleSelectItem = (item: QuickLogItem) => {
    setSuccessItem(item.id);
    setTimeout(() => {
      onLogActivity(item.title, item.points, item.co2Saved, item.category);
      setSuccessItem(null);
    }, 905);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-500/30 backdrop-blur-md animate-fadeIn">
      
      {/* Background closer */}
      <div className="absolute inset-0 cursor-default" onClick={onClose} />

      {/* Sheet panel */}
      <div className="relative clay-card rounded-3xl w-full max-w-lg p-6 md:p-8 border border-slate-200/50 shadow-xl bg-white overflow-hidden text-slate-800">
        
        {/* Floating background trace decoration */}
        <div className="absolute -right-16 -top-16 w-36 h-36 bg-emerald-100/50 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 relative z-10">
          <div className="space-y-1 text-left">
            <h3 className="font-headline text-lg font-black text-slate-800 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-500 animate-pulse" />
              <span>Log Sustainability Action</span>
            </h3>
            <p className="text-[11px] text-slate-500 font-bold">Instantly record resource savings and boost your level trace.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Dynamic Log Selection list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 relative z-10">
          {logActions.map((action) => {
            const Icon = action.icon;
            const isLogging = successItem === action.id;

            return (
              <button
                key={action.id}
                onClick={() => handleSelectItem(action)}
                disabled={successItem !== null}
                className={`text-left rounded-xl p-4 border flex items-center gap-3 transition-all duration-300 relative overflow-hidden group cursor-pointer ${
                  isLogging 
                    ? "bg-emerald-500 border-white text-white" 
                    : "bg-slate-50 hover:bg-slate-100/50 border-slate-150 hover:border-emerald-500/20"
                }`}
              >
                {/* Visual success animation backdrop */}
                {isLogging && (
                  <div className="absolute inset-0 bg-emerald-500 px-4 py-4 flex items-center justify-center gap-2 text-white font-black self-center text-center animate-scaleUp">
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span className="text-xs uppercase">Activity Saved!</span>
                  </div>
                )}

                {/* Left icon wrapper */}
                <span className={`p-3 rounded-lg ${action.colorClass} group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </span>

                {/* Body info */}
                <div className="min-w-0 flex-1 text-left">
                  <h4 className="text-xs md:text-sm font-extrabold text-slate-800 truncate max-w-full leading-tight pr-4">
                    {action.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[11px]">
                    <span className="text-emerald-600 font-black font-mono">+{action.points} pts</span>
                    <span className="text-slate-300 font-bold">•</span>
                    <span className="text-slate-500 font-extrabold lowercase font-mono">-{action.co2Saved}kg CO2</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Modal Info footer */}
        <div className="mt-8 pt-4 border-t border-slate-100 text-center relative z-10">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest font-black">
            IIT Bombay Green Stewardship Tracker • Level 12 Eco-Warrior
          </p>
        </div>

      </div>
    </div>
  );
}
