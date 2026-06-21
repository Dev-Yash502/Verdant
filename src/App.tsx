import React, { useState, useEffect } from "react";
import { AppScreen, ActivityLog } from "./types";
import { 
  INITIAL_STUDENT_RANKS, 
  INITIAL_CAMPUS_RANKS, 
  DEFAULT_ACTIVITY_LOGS 
} from "./data";

// Sub-component imports
import Sidebar from "./components/Sidebar";
import BottomNav from "./components/BottomNav";
import HeroSection from "./components/HeroSection";
import BaselineQuiz from "./components/BaselineQuiz";
import InsightsView from "./components/InsightsView";
import LeaderboardView from "./components/LeaderboardView";
import MapExplorer from "./components/MapExplorer";
import QuizView from "./components/QuizView";
import QuickLogModal from "./components/QuickLogModal";
import ProfileEditModal, { UserProfile } from "./components/ProfileEditModal";

// Lucide Icons
import { 
  Leaf, 
  Calendar, 
  Sparkles, 
  TrendingDown, 
  ArrowRight, 
  HelpCircle, 
  Plus, 
  Trophy, 
  Award, 
  Route, 
  Utensils, 
  Zap, 
  Trash2, 
  CheckCircle, 
  Activity,
  UserCheck
} from "lucide-react";

export default function App() {
  // Screen and basic registration state
  const [currentScreen, setScreen] = useState<AppScreen>(AppScreen.Landing);
  const [isBaselineComplete, setIsBaselineComplete] = useState<boolean>(() => {
    return localStorage.getItem("verdant_baseline_complete") === "true";
  });

  // User Profile Stewardship Points & Level State
  const [userPoints, setUserPoints] = useState<number>(() => {
    const saved = localStorage.getItem("verdant_user_points");
    return saved ? parseInt(saved, 10) : 420;
  });
  const [userLevel, setUserLevel] = useState<number>(() => {
    const saved = localStorage.getItem("verdant_user_level");
    return saved ? parseInt(saved, 10) : 12;
  });

  // Daily Score tracker (gauged / 100)
  const [dailyScore, setDailyScore] = useState<number>(75);

  // Carbon Accumulators state
  const [cumulativeSaving, setCumulativeSaving] = useState<number>(12.4);
  const [userFootprint, setUserFootprint] = useState({
    travel: 120,
    food: 80,
    energy: 40,
    waste: 26
  });

  // Logged actions history list
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(DEFAULT_ACTIVITY_LOGS);

  // Engagement recommendations toggles
  const [appliedRecomments, setAppliedRecomments] = useState<string[]>([]);

  // Modals
  const [quickLogOpen, setQuickLogOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // User profile (name, avatar, bio)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("verdant_user_profile");
      if (saved) return JSON.parse(saved) as UserProfile;
    } catch {}
    return {
      name: "Green Steward",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop",
      bio: "Eco warrior, campus sustainability champion."
    };
  });

  const handleSaveProfile = (updated: UserProfile) => {
    setUserProfile(updated);
    localStorage.setItem("verdant_user_profile", JSON.stringify(updated));
  };

  // Persistent points writing
  useEffect(() => {
    localStorage.setItem("verdant_user_points", userPoints.toString());
    localStorage.setItem("verdant_user_level", userLevel.toString());
  }, [userPoints, userLevel]);

  // Points level progression engine (+150 pts per level upgrade)
  const awardPoints = (amount: number) => {
    setUserPoints(prev => {
      const nextPoints = prev + amount;
      // recalculate level based on score thresholds (e.g. baseline 12 + extra levels standard)
      const extraPoints = nextPoints - 420;
      if (extraPoints > 0) {
        const potentialLevel = 12 + Math.floor(extraPoints / 100);
        if (potentialLevel > userLevel) {
          setUserLevel(potentialLevel);
        }
      }
      return nextPoints;
    });
  };

  // Activity logger action handler
  const handleLogActivity = (
    title: string, 
    pts: number, 
    co2: number, 
    category: "travel" | "food" | "energy" | "waste"
  ) => {
    const now = new Date();
    const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newLog: ActivityLog = {
      id: "usr-" + Math.random().toString(36).substr(2, 9),
      timestamp: timeFormatted,
      title,
      points: pts,
      co2SavedKg: co2,
      category
    };

    setActivityLogs(prev => [newLog, ...prev]);
    awardPoints(pts);
    setDailyScore(prev => Math.min(100, prev + pts));
    setCumulativeSaving(prev => +(prev + co2).toFixed(1));
    
    // adjust category levels
    setUserFootprint(prev => ({
      ...prev,
      [category]: Math.max(10, prev[category] - Math.round(co2))
    }));
  };

  // Engage/Apply Target recommendation
  const handleApplyReduction = (pointsReward: number, kgSaving: number, key: string, tile: string) => {
    if (appliedRecomments.includes(key)) return;
    setAppliedRecomments(prev => [...prev, key]);
    
    // Log as a special historic action
    handleLogActivity(`AI Target: ${tile}`, pointsReward, kgSaving, "energy");
  };

  const handleBaselineQuizComplete = (answers: { commute: string; diet: string; energy: string }) => {
    setIsBaselineComplete(true);
    localStorage.setItem("verdant_baseline_complete", "true");
    
    // Customize user state according to choices made
    let startingTravel = 120;
    let startingFood = 80;
    let startingEnergy = 40;

    if (answers.commute === "walk_bike") startingTravel = 60;
    if (answers.commute === "drive_solo") startingTravel = 210;
    if (answers.diet === "vegan") startingFood = 40;
    if (answers.diet === "heavy_meat") startingFood = 150;
    if (answers.energy === "optimal") startingEnergy = 20;
    if (answers.energy === "heavy") startingEnergy = 90;

    setUserFootprint({
      travel: startingTravel,
      food: startingFood,
      energy: startingEnergy,
      waste: 26
    });

    awardPoints(50); // reward baseline profiling setup
    setScreen(AppScreen.Dashboard);
  };

  // Left Sidebar and top-bar open modal triggers
  const openQuickLog = () => setQuickLogOpen(true);
  const closeQuickLog = () => setQuickLogOpen(false);

  // Render Screens switchboard router helper
  const renderPrimaryContent = () => {
    switch (currentScreen) {
      case AppScreen.Landing:
        return (
          <HeroSection 
            setScreen={setScreen} 
            isBaselineComplete={isBaselineComplete} 
          />
        );

      case AppScreen.BaselineQuiz:
        return (
          <BaselineQuiz 
            onComplete={handleBaselineQuizComplete} 
            setScreen={setScreen} 
          />
        );

      case AppScreen.Insights:
        return (
          <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto w-full">
            <InsightsView 
              userFootprint={userFootprint}
              appliedRecomments={appliedRecomments}
              onApplyReduction={handleApplyReduction}
            />
          </div>
        );

      case AppScreen.Leaderboard:
        return (
          <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto w-full">
            <LeaderboardView 
              students={INITIAL_STUDENT_RANKS}
              campuses={INITIAL_CAMPUS_RANKS}
              userPoints={userPoints}
            />
          </div>
        );

      case AppScreen.MapExplorer:
        return (
          <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto w-full">
            <MapExplorer 
              onEarnPoints={(pts, co2) => {
                awardPoints(pts);
                setCumulativeSaving(prev => +(prev + co2 / 10).toFixed(1));
              }}
            />
          </div>
        );

      case AppScreen.Quiz:
        return (
          <div className="py-10 px-4 md:px-10 max-w-7xl mx-auto w-full">
            <QuizView 
              onEarnPoints={(pts, co2) => {
                awardPoints(pts);
                setCumulativeSaving(prev => +(prev + co2).toFixed(1));
              }}
            />
          </div>
        );

      case AppScreen.Dashboard:
      default:
        // Core Dashboard HTML Frame
        return (
          <div className="py-8 px-4 md:px-10 max-w-7xl mx-auto w-full space-y-8 text-slate-800">
            {/* Top row: Greeting & Date */}
            <section className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="space-y-1">
                <h2 className="font-headline text-2xl md:text-3xl font-black text-slate-800 leading-tight">
                  Welcome back, {userProfile.name}
                </h2>
                <p className="text-slate-500 text-xs md:text-sm font-medium">
                  Refine your environmental footprint metrics and track active campus progress.
                </p>
              </div>

              {/* Dynamic Date Tag */}
              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl border border-slate-200/60 bg-white text-slate-700 text-xs font-semibold shadow-[0_2px_8px_rgba(148,163,184,0.05)]">
                <Calendar className="w-4 h-4 text-emerald-500" />
                <span>Today, {new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
              </div>
            </section>

            {/* Dashboard grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column (Span 4) - Daily carbon goal circle gauge */}
              <div className="lg:col-span-4 flex flex-col gap-6">
                
                {/* Score Gauge Card */}
                <div className="clay-card rounded-2xl p-6 flex flex-col items-center text-center relative overflow-hidden bg-white">
                  <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
                    DAILY SECTOR GOAL PROGRESS
                  </h3>

                  {/* SVG Circle Gauge representation */}
                  <div className="relative w-44 h-44 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      {/* Trail circle */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        className="stroke-slate-100 fill-none" 
                        strokeWidth="7" 
                      />
                      {/* Active green circle track */}
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        className="stroke-emerald-500 fill-none transition-all duration-700 hover:stroke-emerald-400" 
                        strokeWidth="7.5" 
                        strokeDasharray={`${dailyScore * 2.51} 251`}
                        strokeLinecap="round"
                      />
                    </svg>
                    {/* Centered Numbers */}
                    <div className="absolute text-center">
                      <span className="text-4xl font-extrabold text-slate-800 font-mono">{dailyScore}</span>
                      <span className="text-slate-405 block text-[10px] uppercase font-bold tracking-widest mt-0.5">/ 100 pts Goal</span>
                    </div>
                  </div>

                  {/* Status recap sentence */}
                  <div className="mt-6 space-y-1">
                    <p className="text-xs font-semibold text-emerald-700">
                      {dailyScore >= 100 
                        ? "🎉 Daily Target Met! Stellar stewardship!" 
                        : "You're on track! Keep active to reach goal."}
                    </p>
                    {dailyScore < 100 && (
                      <p className="text-[10px] text-slate-500 font-medium">
                        {100 - dailyScore} points left to unlock today's active stewardship badge.
                      </p>
                    )}
                  </div>
                </div>

                {/* Dashboard Quick Logs widget */}
                <div className="clay-card rounded-2xl p-6 space-y-4 bg-white">
                  <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-slate-400">
                    QUICK SECURE LOGS
                  </h3>
                  <div className="flex flex-col gap-2.5">
                    
                    {/* Refill bottle quick logging button */}
                    <button 
                      onClick={() => handleLogActivity("Reusable Bottle Refill", 5, 0.3, "waste")}
                      className="w-full p-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 rounded-xl flex justify-between items-center transition-all group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-blue-100 text-blue-600 shadow-[inset_1px_1.5px_3px_white]">
                          <Trash2 className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800 leading-tight">Reusable Bottle</p>
                          <p className="text-[10px] text-slate-500 font-medium">-0.3 kg CO2 saving</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white text-[10px] font-bold font-mono text-emerald-600 transition-colors">
                        +5 pts
                      </span>
                    </button>

                    {/* Local bus quick logging button */}
                    <button 
                      onClick={() => handleLogActivity("Campus Ride Bus Share", 15, 1.8, "travel")}
                      className="w-full p-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 rounded-xl flex justify-between items-center transition-all group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-emerald-100 text-emerald-600 shadow-[inset_1px_1.5px_3px_white]">
                          <Route className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800 leading-tight">Public Transit</p>
                          <p className="text-[10px] text-slate-500 font-medium">-1.8 kg CO2 saving</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white text-[10px] font-bold font-mono text-emerald-600 transition-colors">
                        +15 pts
                      </span>
                    </button>

                    {/* Vegan meal quick logging button */}
                    <button 
                      onClick={() => handleLogActivity("Dine Vegan Lunch", 10, 0.9, "food")}
                      className="w-full p-3 bg-slate-50 hover:bg-slate-100/50 border border-slate-100 rounded-xl flex justify-between items-center transition-all group text-left cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="p-2 rounded-lg bg-purple-100 text-purple-600 shadow-[inset_1px_1.5px_3px_white]">
                          <Utensils className="w-4 h-4" />
                        </span>
                        <div>
                          <p className="text-xs font-extrabold text-slate-800 leading-tight">Plant-based Meal</p>
                          <p className="text-[10px] text-slate-500 font-medium">-0.9 kg CO2 saving</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-slate-100 group-hover:bg-emerald-500 group-hover:text-white text-[10px] font-bold font-mono text-emerald-600 transition-colors">
                        +10 pts
                      </span>
                    </button>

                  </div>
                </div>

              </div>

              {/* Center Column (Span 5) - Visual Impact Trend Graphic */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                
                {/* Trend bar representation */}
                <div className="clay-card rounded-2xl p-6 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="font-headline text-xs font-bold uppercase tracking-widest text-slate-400">
                          STEWARDSHIP PROFILE IMPACT TREND
                        </h3>
                        <p className="text-slate-500 text-[11px] mt-0.5 font-medium">Footprint offset level this week.</p>
                      </div>
                      <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 border border-emerald-100 px-2.5 py-0.5 rounded-full">
                        +12.4% off
                      </span>
                    </div>

                    {/* The Mon-Sun bars, making Friday tallest */}
                    <div className="w-full mt-4 flex justify-between items-end h-44 px-3 border-b border-slate-100 pb-2">
                      <div className="flex flex-col items-center gap-1 w-6 group">
                        <div className="relative w-full bg-slate-100 rounded-t-md h-12 flex flex-col justify-end p-0.5">
                          <div className="bg-emerald-400/80 w-full h-[60%] rounded-t-sm group-hover:bg-emerald-500 transition-all cursor-pointer" />
                        </div>
                        <span className="text-[9px] text-slate-450 font-bold uppercase">M</span>
                      </div>

                      <div className="flex flex-col items-center gap-1 w-6 group">
                        <div className="relative w-full bg-slate-100 rounded-t-md h-20 flex flex-col justify-end p-0.5">
                          <div className="bg-emerald-400/80 w-full h-[75%] rounded-t-sm group-hover:bg-emerald-500 transition-all cursor-pointer" />
                        </div>
                        <span className="text-[9px] text-slate-450 font-bold uppercase">T</span>
                      </div>

                      <div className="flex flex-col items-center gap-1 w-6 group">
                        <div className="relative w-full bg-slate-100 rounded-t-md h-16 flex flex-col justify-end p-0.5">
                          <div className="bg-emerald-400/80 w-full h-[65%] rounded-t-sm group-hover:bg-emerald-400 transition-all cursor-pointer" />
                        </div>
                        <span className="text-[9px] text-slate-455 font-bold uppercase">W</span>
                      </div>

                      <div className="flex flex-col items-center gap-1 w-6 group">
                        <div className="relative w-full bg-slate-100 rounded-t-md h-28 flex flex-col justify-end p-0.5">
                          <div className="bg-emerald-400/80 w-full h-[80%] rounded-t-sm group-hover:bg-emerald-400 transition-all cursor-pointer" />
                        </div>
                        <span className="text-[9px] text-slate-455 font-bold uppercase">T</span>
                      </div>

                      {/* Tallest glowing Friday bar */}
                      <div className="flex flex-col items-center gap-1 w-6 group">
                        <div className="relative w-full bg-emerald-50 border border-emerald-100 rounded-t-md h-36 flex flex-col justify-end p-0.5">
                          <div className="bg-emerald-550 w-full h-full rounded-t-sm bg-emerald-500 group-hover:brightness-115 transition-all cursor-pointer shadow-[0_2px_8px_rgba(16,185,129,0.15)]" />
                        </div>
                        <span className="text-[9px] text-emerald-600 font-extrabold uppercase">F</span>
                      </div>

                      <div className="flex flex-col items-center gap-1 w-6 group">
                        <div className="relative w-full bg-slate-100 rounded-t-md h-14 flex flex-col justify-end p-0.5">
                          <div className="bg-emerald-400/80 w-full h-[55%] rounded-t-sm group-hover:bg-emerald-500 transition-all cursor-pointer" />
                        </div>
                        <span className="text-[9px] text-slate-455 font-bold uppercase">S</span>
                      </div>

                      <div className="flex flex-col items-center gap-1 w-6 group">
                        <div className="relative w-full bg-slate-100 rounded-t-md h-10 flex flex-col justify-end p-0.5">
                          <div className="bg-emerald-400/80 w-full h-[40%] rounded-t-sm group-hover:bg-emerald-400 transition-all cursor-pointer" />
                        </div>
                        <span className="text-[9px] text-slate-455 font-bold uppercase">S</span>
                      </div>
                    </div>
                  </div>

                  {/* Offset summary card */}
                  <div className="mt-8 pt-4 border-t border-slate-105 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] text-slate-450 font-bold uppercase tracking-wider">CUMULATIVE METRIC SAVINGS</p>
                      <p className="text-xl font-headline font-black text-slate-800 mt-1">
                        {cumulativeSaving} <span className="text-xs font-normal text-slate-500">kg CO2e saved</span>
                      </p>
                    </div>
                    <div className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-xl">
                      <TrendingDown className="w-5 h-5 text-emerald-600" />
                    </div>
                  </div>
                </div>

                {/* Direct Action Suggestion Panel */}
                <div className="p-5 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-550 flex justify-between items-center gap-4 relative overflow-hidden group text-white">
                  <div className="absolute top-0 right-0 p-3 opacity-15 pointer-events-none">
                    <Leaf className="w-24 h-24 text-white" />
                  </div>
                  <div className="space-y-1 relative z-10 text-left">
                    <p className="text-emerald-100 font-bold text-xs uppercase tracking-wider">Ready for a challenge?</p>
                    <p className="text-sm font-bold text-white">Weekly Environmental Trivia Quiz</p>
                    <p className="text-xs text-white/80">Prove carbon intelligence and secure +50 bonus reward points.</p>
                  </div>
                  <button 
                    onClick={() => setScreen(AppScreen.Quiz)}
                    className="p-3 bg-white/95 hover:bg-white text-emerald-600 rounded-xl transition-all font-bold shrink-0 shadow cursor-pointer active:scale-95 relative z-10 shadow-[0_5px_15px_rgba(0,0,0,0.08)]"
                  >
                    <ArrowRight className="w-4.5 h-4.5 text-emerald-600" />
                  </button>
                </div>

              </div>

              {/* Right Column (Span 3) - Student Leaderboard Highlights */}
              <div className="lg:col-span-3">
                <div className="clay-card rounded-2xl p-6 space-y-6 bg-white">
                  
                  <div className="flex justify-between items-center text-xs">
                    <h3 className="font-headline text-[10px] font-black uppercase tracking-widest text-slate-400">
                      LEADERBOARD CHAMPIONS
                    </h3>
                    <button 
                      onClick={() => setScreen(AppScreen.Leaderboard)}
                      className="text-emerald-600 hover:underline font-bold"
                    >
                      View All
                    </button>
                  </div>

                  {/* Leader lists */}
                  <div className="space-y-4">
                    {INITIAL_STUDENT_RANKS.slice(0, 3).map((item, index) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs font-black ${
                            index === 0 
                              ? "text-amber-500" 
                              : index === 1 
                                ? "text-slate-400" 
                                : "text-amber-700"
                          }`}>
                            #{index + 1}
                          </span>
                          {item.avatarUrl ? (
                            <img 
                              className="w-7 h-7 rounded-full object-cover border border-slate-100 shadow-sm" 
                              src={item.avatarUrl} 
                              alt={item.name} 
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-full bg-slate-50 text-slate-600 text-[10px] font-black flex items-center justify-center border border-slate-100">
                              {item.initials}
                            </div>
                          )}
                          <div className="text-left">
                            <p className="text-xs font-bold text-slate-800 leading-tight">{item.name}</p>
                            <p className="text-[10px] text-slate-400">Level {item.level}</p>
                          </div>
                        </div>
                        <span className="font-mono text-xs text-slate-600 font-bold">{item.points} pts</span>
                      </div>
                    ))}

                    {/* Divider line */}
                    <div className="border-t border-slate-100 py-1" />

                    {/* Highlighted current user ranking position card summary */}
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex justify-between items-center shadow-[inset_1px_1.5px_3px_white]">
                      <div className="flex items-center gap-2.5">
                        <span className="font-mono text-xs font-black text-emerald-700">#12</span>
                        <img 
                          className="w-7 h-7 rounded-full object-cover border border-slate-100 shadow-sm" 
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop" 
                          alt="You" 
                        />
                        <div className="text-left">
                          <p className="text-xs font-bold text-emerald-800">You (Steward)</p>
                          <p className="text-[10px] text-emerald-600 font-extrabold uppercase tracking-wide">Level {userLevel}</p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-black text-emerald-700">{userPoints} pts</span>
                    </div>

                  </div>
                </div>
              </div>

            </div>

            {/* Dashboard Recent Activity Logs Section (Span 12) */}
            <section className="clay-card rounded-2xl p-6 md:p-8 space-y-6 bg-white">
              <div className="flex justify-between items-center">
                <div className="text-left">
                  <h3 className="font-headline text-lg font-bold text-slate-800 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-emerald-500" />
                    <span>RECENT STEWARDSHIP LOGS</span>
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">Live feed trace for your carbon reduction policies.</p>
                </div>
                <div className="px-3.5 py-1.5 rounded-xl border border-slate-100 bg-slate-50 text-xs text-slate-500 font-bold shadow-[inset_1px_1.5px_3px_white]">
                  {activityLogs.length} logs recorded
                </div>
              </div>

              {/* Feed timeline container */}
              <div className="divide-y divide-slate-100">
                {activityLogs.map((log) => {
                  return (
                    <div key={log.id} className="py-4.5 flex justify-between items-center first:pt-0 last:pb-0 hover:bg-slate-50/50 px-2 rounded-xl transition-colors">
                      <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl border ${
                          log.category === "travel" 
                            ? "bg-emerald-50 text-emerald-600 border-emerald-100 shadow-[inset_1px_1.5px_3px_white]" 
                            : log.category === "food"
                              ? "bg-purple-50 text-purple-600 border-purple-100 shadow-[inset_1px_1.5px_3px_white]"
                              : log.category === "energy"
                                ? "bg-amber-50 text-amber-600 border-amber-100 shadow-[inset_1px_1.5px_3px_white]"
                                : "bg-blue-50 text-blue-600 border-blue-100 shadow-[inset_1px_1.5px_3px_white]"
                        }`}>
                          {log.category === "travel" && <Route className="w-5 h-5" />}
                          {log.category === "food" && <Utensils className="w-5 h-5" />}
                          {log.category === "energy" && <Zap className="w-5 h-5" />}
                          {log.category === "waste" && <Trash2 className="w-5 h-5" />}
                        </div>
                        <div className="text-left">
                          <p className="text-xs font-black text-slate-800">{log.title}</p>
                          <p className="text-[10px] text-slate-450 font-medium">{log.timestamp} • Offset Trace Action</p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-xs font-black text-emerald-600 font-mono">+{log.points} pts</p>
                        <p className="text-[10px] text-slate-500 font-medium font-mono">-{log.co2SavedKg} kg CO2</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 font-sans flex flex-col lg:flex-row">
      
      {/* Conditionally show sidebar unless on Landing screen or quiz setups */}
      {currentScreen !== AppScreen.Landing && currentScreen !== AppScreen.BaselineQuiz && (
        <>
          {/* Desktop Left Sidebar */}
          <Sidebar 
            currentScreen={currentScreen} 
            setScreen={setScreen} 
            userPoints={userPoints} 
            userLevel={userLevel} 
            onOpenQuickLog={openQuickLog}
            userProfile={userProfile}
            onOpenProfile={() => setProfileOpen(true)}
          />
          {/* Mobile Bottom Navigation */}
          <BottomNav 
            currentScreen={currentScreen} 
            setScreen={setScreen} 
            onOpenQuickLog={openQuickLog}
          />
        </>
      )}

      {/* Main Container Wrapper */}
      <main className={`flex-1 transition-all duration-300 min-h-screen pb-24 lg:pb-0 ${
        currentScreen !== AppScreen.Landing && currentScreen !== AppScreen.BaselineQuiz 
          ? "lg:ml-64 bg-[#f0f4f8]" 
          : ""
      }`}>
        
        {/* Top-bar on screens inside App structure */}
        {currentScreen !== AppScreen.Landing && currentScreen !== AppScreen.BaselineQuiz && (
          <header className="sticky top-0 bg-[#f0f4f8]/85 backdrop-blur-md border-b border-slate-200/50 py-4.5 px-6 md:px-10 flex justify-between items-center z-40">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-[inset_1px_1.5px_3px_white]">
                <Leaf className="w-5 h-5 text-emerald-600 fill-emerald-500/10" />
              </div>
              <span 
                className="font-headline font-black text-lg text-slate-800 cursor-pointer"
                onClick={() => setScreen(AppScreen.Landing)}
              >
                Verdant
              </span>
            </div>

            {/* Account pill widget on top-right */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-white rounded-2xl border border-slate-100 shadow-[inset_1px_1.5px_3px_white,1px_3px_8px_rgba(148,163,184,0.06)]">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-slate-700 font-extrabold uppercase tracking-wider">Level {userLevel} Steward</span>
              </div>
              {/* Avatar button — opens profile edit */}
              <button
                onClick={() => setProfileOpen(true)}
                className="relative group cursor-pointer"
                title="Edit Profile"
              >
                <img
                  src={userProfile.avatarUrl}
                  alt={userProfile.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-white shadow ring-2 ring-emerald-200 group-hover:ring-emerald-400 transition-all"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop";
                  }}
                />
              </button>
              <button 
                onClick={openQuickLog}
                className="hidden sm:inline-block clay-btn-primary px-5 py-2.5 text-xs text-white"
              >
                + Log footprint
              </button>
            </div>
          </header>
        )}

        {/* Selected screen content */}
        {renderPrimaryContent()}

      </main>

      {/* Quick Log Form Modal Overlays */}
      {quickLogOpen && (
        <QuickLogModal 
          onClose={closeQuickLog} 
          onLogActivity={(title, pts, co2, cat) => {
            handleLogActivity(title, pts, co2, cat);
            closeQuickLog();
          }}
        />
      )}

      {/* Profile Edit Modal */}
      {profileOpen && (
        <ProfileEditModal
          profile={userProfile}
          userLevel={userLevel}
          userPoints={userPoints}
          onSave={handleSaveProfile}
          onClose={() => setProfileOpen(false)}
        />
      )}

    </div>
  );
}
