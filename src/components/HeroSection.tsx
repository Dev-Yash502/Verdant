import React, { useState } from "react";
import { AppScreen } from "../types";
import { Bolt, ArrowRight, Map, GraduationCap, Building2, Beaker, Trophy, Leaf } from "lucide-react";

interface HeroSectionProps {
  setScreen: (screen: AppScreen) => void;
  isBaselineComplete: boolean;
}

export default function HeroSection({ setScreen, isBaselineComplete }: HeroSectionProps) {
  return (
    <div className="w-full text-slate-800 bg-[#f0f4f8] font-sans min-h-screen">
      {/* TopAppBar wrapper inside landing */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/50 flex justify-between items-center px-6 md:px-12 py-4">
        <div className="flex items-center gap-8">
          <span 
            className="font-headline text-2xl font-black text-slate-800 tracking-tight cursor-pointer flex items-center gap-2"
            onClick={() => setScreen(AppScreen.Landing)}
          >
            <Leaf className="w-6 h-6 text-emerald-500 fill-emerald-100" />
            <span>Verdant</span>
          </span>
          <nav className="hidden lg:flex gap-6">
            <button 
              onClick={() => setScreen(isBaselineComplete ? AppScreen.Dashboard : AppScreen.BaselineQuiz)} 
              className="text-emerald-700 border-b-2 border-emerald-500 pb-1 font-bold text-sm cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => setScreen(AppScreen.Insights)} 
              className="text-slate-500 hover:text-emerald-600 transition-colors font-bold text-sm cursor-pointer"
            >
              Insights
            </button>
            <button 
              onClick={() => setScreen(AppScreen.Leaderboard)} 
              className="text-slate-500 hover:text-emerald-600 transition-colors font-bold text-sm cursor-pointer"
            >
              Leaderboard
            </button>
            <button 
              onClick={() => setScreen(AppScreen.Quiz)} 
              className="text-slate-500 hover:text-emerald-600 transition-colors font-bold text-sm cursor-pointer"
            >
              Quiz
            </button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (isBaselineComplete) {
                setScreen(AppScreen.Dashboard);
              } else {
                setScreen(AppScreen.BaselineQuiz);
              }
            }}
            className="clay-btn-primary text-xs px-5 py-2.5"
          >
            Quick Log
          </button>
          <img 
            alt="User profile photo" 
            className="w-10 h-10 rounded-full border border-slate-200 shadow-sm cursor-pointer hover:scale-105 transition-transform"
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=120&auto=format&fit=crop"
            onClick={() => setScreen(AppScreen.Dashboard)}
          />
        </div>
      </header>

      {/* Hero Section Container */}
      <section className="relative min-h-[800px] flex items-center justify-center pt-28 pb-16 px-6 md:px-12 bg-[#f0f4f8]">
        {/* Ambient Lights - Soft warm circles */}
        <div className="absolute top-[15%] left-[-5%] w-[450px] h-[450px] bg-emerald-250/20 rounded-full blur-[110px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-5%] w-[550px] h-[550px] bg-blue-250/25 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="max-w-[1200px] w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10 items-center">
          {/* Left Text Content */}
          <div className="col-span-1 lg:col-span-6 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full clay-badge-green self-center lg:self-start w-max">
              <Bolt className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold tracking-wide uppercase">Data-Driven Stewardship</span>
            </div>
            
            <h1 className="font-headline text-5xl md:text-6xl font-black text-slate-800 leading-[1.1] tracking-tight">
              Track, Compete,<br />
              <span className="text-emerald-600">Conserve.</span>
            </h1>

            <p className="text-base md:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Join India's leading campus network. Measure your daily carbon footprint, optimize your choices with high-fidelity analytics, and rise up the global university leaderboard.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-4">
              <button 
                onClick={() => setScreen(isBaselineComplete ? AppScreen.Dashboard : AppScreen.BaselineQuiz)}
                className="clay-btn-primary px-8 py-4 flex items-center justify-center gap-2 shrink-0 text-white"
              >
                <span>Start Tracking</span>
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
              
              <button 
                onClick={() => setScreen(AppScreen.MapExplorer)}
                className="clay-btn px-8 py-4 flex items-center justify-center gap-2"
              >
                <Map className="w-5 h-5 text-emerald-600" />
                <span className="text-slate-800">Explore Campus Map</span>
              </button>
            </div>

            {/* IIT Support Social Proof */}
            <div className="mt-6 flex items-center justify-center lg:justify-start gap-4 text-slate-500 text-sm">
              <div className="flex -space-x-2.5">
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow" 
                  alt="Student 1"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=80&auto=format&fit=crop"
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow" 
                  alt="Student 2"
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=80&auto=format&fit=crop"
                />
                <img 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover shadow" 
                  alt="Student 3" 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=80&auto=format&fit=crop"
                />
              </div>
              <span className="font-bold text-slate-700">Join 10,000+ students from top IITs / NITs</span>
            </div>
          </div>

          {/* Right isometric graphic element */}
          <div className="col-span-1 lg:col-span-6 relative h-[420px] lg:h-[500px] w-full rounded-3xl overflow-hidden clay-card bg-white flex items-center justify-center group p-2">
            
            {/* The mock image */}
            <img 
              alt="Sustainable Future Campus" 
              className="w-full h-full object-cover rounded-2xl z-0 opacity-90" 
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop"
            />
            
            {/* Claymorphic digital overlay elements */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 z-20 pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="bg-white/90 backdrop-blur-md border border-emerald-200 px-4 py-2 rounded-2xl text-xs font-bold text-emerald-700 flex items-center gap-1.5 shadow-lg">
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>ENERGY GRID COAL FREE</span>
                </div>
                <div className="bg-white/90 backdrop-blur-md border border-slate-100 px-4 py-2 rounded-2xl text-xs font-bold text-slate-700 shadow-md">
                  78% ACTIVE TRACE
                </div>
              </div>

              {/* Glowing schematic graphic centered inside isometric simulation image container */}
              <div className="self-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-white border border-emerald-300 flex items-center justify-center shadow-[0_5px_20px_rgba(16,185,129,0.22)]">
                  <Leaf className="w-8 h-8 text-emerald-600 fill-emerald-100" />
                </div>
                <span className="bg-white text-emerald-700 font-extrabold px-5 py-2.5 rounded-full border border-emerald-100 text-xs tracking-wider uppercase mt-4 shadow-md">
                  IIT Bombay Smart Hub
                </span>
              </div>

              {/* Floating carbon metric card */}
              <div className="bg-white p-4 rounded-2xl flex items-center gap-4 border border-slate-100 pointer-events-auto shadow-[0_8px_24px_rgba(148,163,184,0.18)]">
                <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center border border-emerald-100 shadow-[inset_1px_1px_3px_white]">
                  <Bolt className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-extrabold">Campus Average Today</p>
                  <p className="text-lg font-black text-slate-800">4.2 <span className="text-xs font-normal text-slate-500">kg CO2e per steward</span></p>
                </div>
                <div className="h-8 w-16 bg-slate-100 rounded-lg overflow-hidden relative border border-slate-200/50">
                  <div className="absolute top-0 bottom-0 left-0 w-3/4 bg-emerald-500 rounded-r-md"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="py-20 px-6 md:px-12 bg-white border-t border-slate-100">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-headline text-3xl md:text-4xl font-extrabold text-slate-800 mb-4 tracking-tight">
              Precision Tools for Active Stewardship
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-base">
              Leverage high-fidelity data visualization to understand and reduce your ecological footprint across campus.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[250px]">
            {/* Bento item 1: Carbon Calculator (Span 8) */}
            <div 
              onClick={() => setScreen(isBaselineComplete ? AppScreen.Dashboard : AppScreen.BaselineQuiz)}
              className="col-span-1 md:col-span-8 clay-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer"
            >
              <div className="relative z-10 max-w-md">
                <span className="inline-flex p-3 rounded-2xl bg-teal-50 border border-teal-100 text-teal-600 mb-4 group-hover:scale-105 transition-transform shadow-[inset_1px_1px_3px_white]">
                  <Bolt className="w-6 h-6 text-teal-600" />
                </span>
                <h3 className="font-headline text-xl font-bold text-slate-800 mb-2">Granular Carbon Calculator</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Log meals, transit, and energy usage with precise, localized Indian emission factors. Instantly visualize your real-world campus impact.
                </p>
              </div>

              <div className="relative z-10 mt-4 flex gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">Food & Dining</span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold clay-badge-green">Campus Transit</span>
              </div>
            </div>

            {/* Bento item 2: Campus Leaderboard / Rankings (Span 4) */}
            <div 
              onClick={() => setScreen(AppScreen.Leaderboard)}
              className="col-span-1 md:col-span-4 clay-card rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group cursor-pointer animate-fade-in"
            >
              <div className="relative z-10">
                <span className="inline-flex p-3 rounded-2xl bg-emerald-50 border border-emerald-100 text-emerald-600 mb-4 group-hover:scale-105 transition-transform shadow-[inset_1px_1px_3px_white]">
                  <Trophy className="w-6 h-6 text-emerald-600" />
                </span>
                <h3 className="font-headline text-lg font-bold text-slate-800 mb-1">Campus Rankings</h3>
                <p className="text-slate-500 text-xs leading-relaxed">
                  Compete with peers and dorms. Top conservers earn real-world campus perks and digital trophies.
                </p>
              </div>

              {/* Progress bar mock */}
              <div className="relative z-10 w-full mt-2 bg-slate-50 rounded-2xl p-3 border border-slate-100 shadow-[inset_1px_1.5px_3px_rgba(148,163,184,0.15)]">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold text-slate-700">1. Ramanujan Hostel</span>
                  <span className="text-[10px] font-bold text-emerald-600">-12% Saved</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 w-[85%] h-full rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - University logos */}
      <section className="py-16 px-6 md:px-12 border-y border-slate-100 bg-[#edf2f7] relative overflow-hidden text-center">
        <div className="max-w-[1200px] mx-auto relative z-10">
          <p className="text-[11px] font-black tracking-widest text-slate-400 uppercase mb-8">Trusted by stewards at</p>
          
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-[16%] opacity-85">
            <div className="font-headline text-lg lg:text-xl font-bold text-slate-600 tracking-tight flex items-center gap-2.5 hover:text-emerald-600 transition-colors cursor-pointer">
              <GraduationCap className="w-7 h-7 text-emerald-600" />
              <span>IIT Delhi</span>
            </div>
            <div className="font-headline text-lg lg:text-xl font-bold text-slate-600 tracking-tight flex items-center gap-2.5 hover:text-emerald-600 transition-colors cursor-pointer">
              <Building2 className="w-7 h-7 text-emerald-600" />
              <span>NIT Trichy</span>
            </div>
            <div className="font-headline text-lg lg:text-xl font-bold text-slate-600 tracking-tight flex items-center gap-2.5 hover:text-emerald-600 transition-colors cursor-pointer">
              <Beaker className="w-7 h-7 text-emerald-600" />
              <span>IIT Bombay</span>
            </div>
          </div>
        </div>
      </section>

      {/* Simple landing footer */}
      <footer className="w-full py-12 px-12 bg-white border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-slate-800 font-extrabold text-xl tracking-tight flex items-center gap-2">
          <Leaf className="w-5 h-5 text-emerald-500" />
          <span>Verdant</span>
        </div>
        <p className="text-xs text-slate-400">© {new Date().getFullYear()} Verdant. Smart sustainability for the modern student.</p>
        <div className="flex gap-6">
          <span className="text-xs text-slate-500 hover:text-emerald-600 cursor-pointer">Privacy Policy</span>
          <span className="text-xs text-slate-500 hover:text-emerald-600 cursor-pointer">Terms of Service</span>
          <span className="text-xs text-slate-500 hover:text-emerald-600 cursor-pointer" onClick={() => setScreen(AppScreen.MapExplorer)}>Campus Map</span>
        </div>
      </footer>
    </div>
  );
}

