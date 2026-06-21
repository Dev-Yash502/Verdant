import React, { useState } from "react";
import { Building, Settings, Sun, Utensils, AlertTriangle, CheckCircle2, Leaf, Sparkles } from "lucide-react";

interface MapExplorerProps {
  onEarnPoints: (points: number, co2ReductionKg: number) => void;
}

interface MapZone {
  id: string;
  name: string;
  intensity: "High" | "Medium" | "Low";
  currentEmissions: number; // tons per day
  description: string;
  icon: any;
  actionTitle: string;
  actionReward: number;
  actionCo2Saved: number;
  cx: string; // SVG positioning
  cy: string;
  colorClass: string;
}

export default function MapExplorer({ onEarnPoints }: MapExplorerProps) {
  const [zones, setZones] = useState<MapZone[]>([
    {
      id: "hostels",
      name: "Ramanujan Dorms",
      intensity: "High",
      currentEmissions: 4.8,
      description: "Heavy standby power draws from laptops, fans, and personal equipment.",
      icon: Building,
      actionTitle: "Initiate Quiet Hour Standby Swarm",
      actionReward: 20,
      actionCo2Saved: 85,
      cx: "25%",
      cy: "35%",
      colorClass: "bg-red-50 text-red-600 border-red-200"
    },
    {
      id: "dining",
      name: "Kailash Dining Hall",
      intensity: "Medium",
      currentEmissions: 3.2,
      description: "Plate waste composting levels are under-optimized. High dairy consumption rates.",
      icon: Utensils,
      actionTitle: "Deploy Zero food-waste bin composting pilots",
      actionReward: 15,
      actionCo2Saved: 110,
      cx: "70%",
      cy: "25%",
      colorClass: "bg-amber-50 text-amber-600 border-amber-200"
    },
    {
      id: "academic",
      name: "Raman Science Block",
      intensity: "Low",
      currentEmissions: 1.4,
      description: "HVAC cooling settings operate at standard rates. High lighting density.",
      icon: Settings,
      actionTitle: "Calibrate motion dimmer schedule",
      actionReward: 25,
      actionCo2Saved: 150,
      cx: "45%",
      cy: "65%",
      colorClass: "bg-emerald-50 text-emerald-600 border-emerald-200"
    },
    {
      id: "solar",
      name: "Pragati Solar Hub",
      intensity: "Low",
      currentEmissions: 0.2,
      description: "Generates high renewable yield but silicon sheets accumulate dust layers.",
      icon: Sun,
      actionTitle: "Clean dust and verify silicon micro-reflectivity",
      actionReward: 15,
      actionCo2Saved: 65,
      cx: "80%",
      cy: "75%",
      colorClass: "bg-teal-50 text-teal-600 border-teal-200"
    }
  ]);

  const [selectedZone, setSelectedZone] = useState<MapZone | null>(zones[0]);
  const [appliedActions, setAppliedActions] = useState<string[]>([]);
  const [successAnimation, setSuccessAnimation] = useState(false);

  const handleAction = (zone: MapZone) => {
    if (appliedActions.includes(zone.id)) return;
    
    // update state
    setAppliedActions([...appliedActions, zone.id]);
    onEarnPoints(zone.actionReward, zone.actionCo2Saved);
    
    // adjust zone values
    setZones(prev => prev.map(z => {
      if (z.id === zone.id) {
        return {
          ...z,
          intensity: "Low",
          currentEmissions: Math.max(0.1, +(z.currentEmissions - z.actionCo2Saved/1000).toFixed(2)),
          colorClass: "bg-emerald-50 text-emerald-600 border-emerald-200"
        };
      }
      return z;
    }));

    // update current selected representation
    setSelectedZone(prev => prev && prev.id === zone.id ? {
      ...prev,
      intensity: "Low",
      currentEmissions: Math.max(0.1, +(prev.currentEmissions - prev.actionCo2Saved/1000).toFixed(2))
    } : prev);

    setSuccessAnimation(true);
    setTimeout(() => {
      setSuccessAnimation(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-8 text-slate-800">
      {/* Header */}
      <section className="flex flex-col gap-2 text-left">
        <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-800">
          Active Campus Micro-Grid
        </h2>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium">
          Visual trace map of IIT Bombay smart eco-grid. Select target facilities to deploy real stewardship policies and lower emissions rates immediately.
        </p>
      </section>

      {/* Main layout */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Interactive SVG map (Span 7) */}
        <div className="lg:col-span-7 clay-card rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden bg-white min-h-[420px] border border-slate-200/50">
          <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-black text-emerald-600 border border-slate-200 rounded-full tracking-wider uppercase z-20 shadow-sm">
            IIT BOMBAY DIGITAL GRID CONTOUR
          </div>

          {/* SVG Map Container representing futuristic organic lines */}
          <div className="flex-1 w-full bg-slate-50/80 rounded-xl relative py-8 border border-slate-200/50 flex items-center justify-center shadow-[inset_1px_1.5px_4px_rgba(0,0,0,0.03)]">
            
            {/* Background structural lines decoration */}
            <svg className="absolute inset-0 w-full h-full stroke-slate-200/80 stroke-[0.9] fill-none pointer-events-none">
              <circle cx="50%" cy="50%" r="30%" />
              <circle cx="50%" cy="50%" r="45%" opacity="0.4" />
              <line x1="0" y1="50%" x2="100%" y2="50%" />
              <line x1="50%" y1="0" x2="50%" y2="100%" />
              <line x1="10%" y1="10%" x2="90%" y2="90%" />
              <line x1="90%" y1="10%" x2="10%" y2="90%" />
            </svg>

            {/* Glowing zone hot-points plotted on map */}
            <div className="absolute inset-0 w-full h-full"> 
              {zones.map((zone) => {
                const isSelected = selectedZone?.id === zone.id;
                const isTriaged = appliedActions.includes(zone.id);
                return (
                  <button
                    key={zone.id}
                    onClick={() => setSelectedZone(zone)}
                    className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 group transition-all"
                    style={{ left: zone.cx, top: zone.cy }}
                  >
                    {/* Ring glow */}
                    <span className="absolute inset-0 rounded-full w-8 h-8 -left-2 -top-2 animate-ping opacity-25 bg-emerald-400"></span>
                    
                    {/* Circle marker */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all shadow-sm ${
                      isSelected 
                        ? "bg-emerald-500 border-white text-white scale-110 shadow-[0_4px_12px_rgba(16,185,129,0.3)]" 
                        : isTriaged 
                          ? "bg-white border-emerald-500 text-emerald-600"
                          : zone.intensity === "High"
                            ? "bg-red-50 border-red-300 text-red-600"
                            : zone.intensity === "Medium"
                              ? "bg-amber-50 border-amber-300 text-amber-600"
                              : "bg-emerald-550 bg-emerald-50 border-emerald-300 text-emerald-600"
                    }`}>
                      <zone.icon className="w-5 h-5" />
                    </div>

                    {/* Facility Pill label */}
                    <span className="absolute left-10 top-1.5 opacity-0 group-hover:opacity-100 bg-white border border-slate-200 px-2 py-0.5 rounded text-[10px] text-slate-700 font-extrabold shadow-md z-30 transition-opacity">
                      {zone.name} ({zone.currentEmissions}t/day)
                    </span>
                  </button>
                );
              })}
            </div>
            
            {/* Center target indicator */}
            <div className="pointer-events-none text-center bg-white/95 p-4 border border-slate-200 rounded-2xl max-w-sm shadow-[0_8px_20px_rgba(148,163,184,0.08)]">
              <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">Interactive Micro Grid</p>
              <p className="text-xs text-slate-600 font-medium mt-1">Select any highlighted coordinates pin on the viewport to assess facility emission loads.</p>
            </div>
          </div>
        </div>

        {/* Selected Area Details and deployable actions panel (Span 5) */}
        <div className="lg:col-span-5 flex flex-col justify-between clay-card rounded-2xl p-6 border border-slate-200/50 bg-white shadow-sm">
          
          {selectedZone ? (
            <div className="flex flex-col h-full justify-between gap-6">
              
              {/* Facility metrics summary */}
              <div className="space-y-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600 shadow-[inset_1px_1.5px_3.5px_white]">
                    <selectedZone.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-headline text-lg font-bold text-slate-800">{selectedZone.name}</h3>
                    <p className="text-[10px] uppercase font-bold tracking-widest text-slate-400 font-sans">Facility Station</p>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/50 space-y-3">
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">
                    {selectedZone.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200/60">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Carbon Rate</span>
                      <span className="text-sm font-black font-mono text-slate-800">{selectedZone.currentEmissions} tons / day</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-bold">Trace Urgency</span>
                      <span className={`text-xs font-black uppercase inline-block px-2.5 py-0.5 rounded-full mt-0.5 ${
                        selectedZone.intensity === "High" 
                          ? "bg-red-550 bg-red-50 text-red-700 border border-red-105" 
                          : selectedZone.intensity === "Medium"
                            ? "bg-amber-50 text-amber-700 border border-amber-105"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-105"
                      }`}>
                        {selectedZone.intensity} Load
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action area */}
              <div className="pt-6 border-t border-slate-100 space-y-4">
                
                {/* Points recap notification badge */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-3.5 flex items-start gap-3 text-left shadow-[inset_1px_1.5px_3px_white]">
                  <Sparkles className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <p className="text-xs font-bold text-emerald-800">Steward Action Impact Reward</p>
                    <p className="text-[11px] text-emerald-700 font-medium mt-1">
                      Executing policies rewards you with <span className="underline font-bold">+{selectedZone.actionReward} points</span> directly, saving <span className="font-bold underline">{selectedZone.actionCo2Saved} kg</span> CO2 equivalent.
                    </p>
                  </div>
                </div>

                {appliedActions.includes(selectedZone.id) ? (
                  <div className="w-full py-4 bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm text-center rounded-xl flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Micro Grid Policy Deployed successfully!</span>
                  </div>
                ) : (
                  <button
                    onClick={() => handleAction(selectedZone)}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-white font-extrabold text-sm text-center rounded-xl transition-all shadow-[0_3px_10px_rgba(16,185,129,0.2)] hover:scale-[1.01] cursor-pointer"
                  >
                    {selectedZone.actionTitle}
                  </button>
                )}
              </div>

            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center h-full text-slate-400 p-8">
              <AlertTriangle className="w-12 h-12 mb-4 text-slate-300" />
              <p className="text-sm font-semibold">No grid station checked</p>
              <p className="text-xs text-slate-400 mt-2">Select any highlighted location pin on the map viewport to assess.</p>
            </div>
          )}

        </div>
      </section>

      {/* Success Animation floating pill toast center bottom */}
      {successAnimation && (
        <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 bg-white border-2 border-emerald-300 text-emerald-700 font-headline text-xs font-black px-6 py-4 rounded-full z-50 flex items-center gap-3 shadow-[0_10px_25px_rgba(16,185,129,0.15)] animate-bounce">
          <Leaf className="w-5 h-5 text-emerald-500 animate-spin" />
          <span>STATION GRID ENERGETICS BALANCED! +POINTS SAVED!</span>
        </div>
      )}
    </div>
  );
}
