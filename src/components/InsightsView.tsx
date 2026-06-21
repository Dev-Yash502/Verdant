import React, { useState } from "react";
import { Sparkles, Route, Utensils, Zap, Trash2, ArrowDownCircle, CheckSquare, TrendingDown } from "lucide-react";

interface InsightsProps {
  userFootprint: {
    travel: number;
    food: number;
    energy: number;
    waste: number;
  };
  onApplyReduction: (pointsReward: number, kgSaving: number, key: string, title: string) => void;
  appliedRecomments: string[];
}

export default function InsightsView({
  userFootprint,
  onApplyReduction,
  appliedRecomments
}: InsightsProps) {
  const [timelineFilter, setTimelineFilter] = useState("1M");

  const totalKg = Math.round(
    userFootprint.travel +
    userFootprint.food +
    userFootprint.energy +
    userFootprint.waste
  );

  const getPercent = (val: number) => {
    if (totalKg === 0) return 0;
    return Math.round((val / totalKg) * 100);
  };

  const recommendations = [
    {
      key: "cycling",
      title: "Switch to Cycling",
      impact: "High Impact",
      impactColor: "bg-red-50 text-red-600 border-red-100",
      icon: Route,
      points: 25,
      kgSaved: 40,
      description: "You logged multiple rideshare transits. Cycling to departments instead saves 40 kg CO2 monthly."
    },
    {
      key: "plant",
      title: "Plant-Based Days",
      impact: "Medium Impact",
      impactColor: "bg-amber-50 text-amber-600 border-amber-100",
      icon: Utensils,
      points: 15,
      kgSaved: 15,
      description: "Implementing 2 plant-based vegan thali days a week reduces your dining footprint by 15%."
    },
    {
      key: "phantom",
      title: "Stop Phantom Load",
      impact: "Quick Win",
      impactColor: "bg-teal-50 text-teal-600 border-teal-100",
      icon: Zap,
      points: 10,
      kgSaved: 5,
      description: "Unplugging chargers, monitors and appliance standby power saves approx 5 kg CO2 monthly."
    }
  ];

  return (
    <div className="flex flex-col gap-8 text-slate-800">
      {/* View Header */}
      <section className="flex flex-col gap-2 text-left">
        <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-800">
          Deep Dive Analytics
        </h2>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium">
          Understand your carbon footprint across all active categories. AI-driven recommendations help you pinpoint key reduction areas compared to the campus standard.
        </p>
      </section>

      {/* Main Grid: Breakdown & Comparison */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Breakdown Card (Span 8) */}
        <div className="clay-card rounded-2xl p-6 lg:col-span-8 flex flex-col gap-6 bg-white border border-slate-200/50">
          <div className="flex justify-between items-center">
            <h3 className="font-headline text-lg font-bold text-slate-800 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-emerald-500" />
              <span>Category Footprint Breakdown</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono font-medium">Current Month: {totalKg} kg CO2e</span>
          </div>

          <div className="flex flex-col gap-5">
            {/* Travel category */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 px-1">
                <span className="text-slate-600 hover:text-slate-800 flex items-center gap-1.5 transition-colors">
                  <Route className="w-4 h-4 text-emerald-500" />
                  <span>Travel commutes</span>
                </span>
                <span className="text-emerald-600 font-bold font-mono">
                  {getPercent(userFootprint.travel)}% ({userFootprint.travel} kg)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-700"
                  style={{ width: `${getPercent(userFootprint.travel)}%` }}
                ></div>
              </div>
            </div>

            {/* Food thalis */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 px-1">
                <span className="text-slate-600 hover:text-slate-800 flex items-center gap-1.5 transition-colors">
                  <Utensils className="w-4 h-4 text-purple-500" />
                  <span>Diet & Dining</span>
                </span>
                <span className="text-purple-600 font-bold font-mono">
                  {getPercent(userFootprint.food)}% ({userFootprint.food} kg)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-700"
                  style={{ width: `${getPercent(userFootprint.food)}%` }}
                ></div>
              </div>
            </div>

            {/* Dorm electricity */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 px-1">
                <span className="text-slate-600 hover:text-slate-800 flex items-center gap-1.5 transition-colors">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Energy & Systems</span>
                </span>
                <span className="text-amber-600 font-bold font-mono">
                  {getPercent(userFootprint.energy)}% ({userFootprint.energy} kg)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-700"
                  style={{ width: `${getPercent(userFootprint.energy)}%` }}
                ></div>
              </div>
            </div>

            {/* Waste packaging */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1 px-1">
                <span className="text-slate-600 hover:text-slate-800 flex items-center gap-1.5 transition-colors">
                  <Trash2 className="w-4 h-4 text-blue-500" />
                  <span>Waste & Recycle</span>
                </span>
                <span className="text-blue-600 font-bold font-mono">
                  {getPercent(userFootprint.waste)}% ({userFootprint.waste} kg)
                </span>
              </div>
              <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden border border-slate-200/40">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-700"
                  style={{ width: `${getPercent(userFootprint.waste)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* You vs Campus (Span 4) */}
        <div className="clay-card rounded-2xl p-6 lg:col-span-4 flex flex-col justify-between relative overflow-hidden min-h-[300px] bg-white border border-slate-200/50">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <Sparkles className="w-36 h-36 text-emerald-500" />
          </div>

          <div className="relative z-10 text-left">
            <h3 className="font-headline text-lg font-bold text-slate-800 mb-2">You vs. Campus Standard</h3>
            <p className="text-xs text-slate-550 leading-relaxed font-bold">
              Your calculated footprint compared to the standard Indian hostelite standard.
            </p>
          </div>

          {/* Vertical Comparison Bar representation */}
          <div className="relative z-10 flex justify-center items-end gap-10 mt-6 mb-4">
            {/* User Footprint */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="relative w-12 bg-slate-50 rounded-t-xl h-44 flex flex-col justify-end border border-slate-200/50 p-1">
                <div 
                  className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-lg transition-all duration-500 cursor-pointer shadow-[0_2px_6px_rgba(16,185,129,0.2)] hover:brightness-110"
                  style={{ height: `${Math.min(100, Math.max(15, (totalKg / 400) * 100))}%` }}
                ></div>
              </div>
              <span className="text-xs font-bold text-emerald-600">You</span>
            </div>

            {/* Campus average */}
            <div className="flex flex-col items-center gap-2 group">
              <div className="relative w-12 bg-slate-50 rounded-t-xl h-44 flex flex-col justify-end border border-slate-200/50 p-1">
                <div 
                  className="w-full bg-slate-300 rounded-t-lg hover:bg-slate-400 transition-all cursor-pointer"
                  style={{ height: "85%" }} // fixed 340kg equivalent
                ></div>
              </div>
              <span className="text-xs font-bold text-slate-505">Campus Avg</span>
            </div>
          </div>

          {/* Savings recap box */}
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 text-center flex items-center justify-center gap-2 shadow-[inset_1px_1.5px_3px_white] pr-4">
            <ArrowDownCircle className="w-5 h-5 text-emerald-600 shrink-0" />
            <p className="text-xs text-emerald-700 font-bold">
              You are currently <span className="font-extrabold underline">{Math.round((1 - totalKg / 340) * 100)}%</span> below campus standard rate!
            </p>
          </div>
        </div>
      </section>

      {/* AI Reduction Recommendations */}
      <section className="clay-card rounded-2xl p-6 flex flex-col gap-6 bg-white border border-slate-200/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-emerald-600 fill-emerald-500" />
          </div>
          <div className="text-left">
            <h3 className="font-headline text-lg font-bold text-slate-800">AI Green Stewardship Targets</h3>
            <p className="text-xs text-slate-500 font-medium">Personalized target suggestions to lock weekly carbon reductions.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendations.map((rec) => {
            const RecIcon = rec.icon;
            const isApplied = appliedRecomments.includes(rec.key);
            return (
              <div 
                key={rec.key}
                className={`rounded-2xl p-5 border flex flex-col justify-between gap-4 transition-all duration-300 ${
                  isApplied 
                    ? "bg-slate-50 border-slate-200 opacity-70" 
                    : "bg-slate-50/50 border-slate-200/60 hover:border-emerald-500/20 hover:bg-slate-50"
                }`}
              >
                <div className="space-y-3 text-left">
                  <div className="flex justify-between items-start">
                    <span className="p-2 rounded-lg bg-white border border-slate-200/60 text-emerald-600 shadow-[inset_1px_1.5px_3px_white]">
                      <RecIcon className="w-5 h-5" />
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${rec.impactColor}`}>
                      {rec.impact}
                    </span>
                  </div>

                  <h4 className="text-sm font-black text-slate-800 leading-tight">{rec.title}</h4>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{rec.description}</p>
                </div>

                <div className="pt-2">
                  {isApplied ? (
                    <div className="w-full py-2 bg-emerald-100/50 border border-emerald-200 text-emerald-700 rounded-xl text-center text-xs font-bold flex items-center justify-center gap-1">
                      <CheckSquare className="w-4 h-4 text-emerald-600" />
                      <span>Target Engaged (+{rec.points} pts)</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => onApplyReduction(rec.points, rec.kgSaved, rec.key, rec.title)}
                      className="w-full py-2.5 bg-white hover:bg-emerald-500 hover:text-white border border-slate-200 hover:border-emerald-500 text-slate-700 rounded-xl text-center text-xs font-black transition-all duration-300 cursor-pointer shadow-sm"
                    >
                      Commit Target & Save {rec.kgSaved}kg
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="clay-card rounded-2xl p-6 flex flex-col gap-6 bg-white border border-slate-200/50">
        <div className="flex justify-between items-center">
          <div className="text-left">
            <h3 className="font-headline text-lg font-bold text-slate-800">Ecological Stewardship Timeline</h3>
            <p className="text-xs text-slate-500 font-medium">Footprint trace over consecutive academic weeks.</p>
          </div>
          <div className="flex gap-1.5 bg-slate-100 p-1 rounded-lg border border-slate-200/40">
            {["1W", "1M", "1Y"].map((item) => (
              <button
                key={item}
                onClick={() => setTimelineFilter(item)}
                className={`px-3 py-1 text-xs rounded-md font-semibold transition-all cursor-pointer ${
                  timelineFilter === item 
                    ? "bg-white text-emerald-750 shadow-sm" 
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Graphical plotting box */}
        <div className="h-64 w-full relative border-l border-b border-slate-200/80 mt-6 pb-2 pl-2">
          {/* Y axis */}
          <div className="absolute -left-9 top-0 text-[10px] font-bold text-slate-400 font-mono">300 kg</div>
          <div className="absolute -left-9 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 font-mono">150 kg</div>
          <div className="absolute -left-9 bottom-2 text-[10px] font-bold text-slate-400 font-mono">0 kg</div>

          {/* Grid lines */}
          <div className="absolute top-0 w-full border-t border-slate-100 border-dashed pointer-events-none"></div>
          <div className="absolute top-1/2 w-full border-t border-slate-100 border-dashed pointer-events-none"></div>

          {/* Sparkline curve */}
          <svg className="absolute inset-0 w-full h-full pr-1.5 pt-2" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path 
              d="M 5,80 Q 25,65 45,55 T 85,30 T 95,20" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="2.5" 
              vectorEffect="non-scaling-stroke" 
            />
            <path 
              d="M 5,80 Q 25,65 45,55 T 85,30 T 95,20 L 95,100 L 5,100 Z" 
              fill="url(#curve-gradient)" 
            />
          </svg>

          {/* Data hot dots */}
          <div className="absolute w-3 h-3 bg-emerald-500 rounded-full top-[80%] left-[5%] -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
          <div className="absolute w-3 h-3 bg-emerald-500 rounded-full top-[65%] left-[25%] -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
          <div className="absolute w-3 h-3 bg-emerald-400 rounded-full top-[55%] left-[45%] -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
          <div className="absolute w-3 h-3 bg-emerald-400 rounded-full top-[30%] left-[65%] -translate-x-1/2 -translate-y-1/2 shadow-md"></div>
          <div className="absolute w-6.5 h-6.5 bg-white border border-emerald-400 rounded-full top-[20%] left-[92%] -translate-x-1/2 -translate-y-1/2 shadow-sm flex items-center justify-center font-black text-[8px] text-emerald-700">
            Now
          </div>

          {/* X axis */}
          <div className="absolute -bottom-6 w-full flex justify-between text-[11px] font-bold text-slate-450 px-3">
            <span>Week 1</span>
            <span>Week 2</span>
            <span>Week 3</span>
            <span>Week 4 (Current)</span>
          </div>
        </div>
      </section>
    </div>
  );
}
