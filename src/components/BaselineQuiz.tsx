import React, { useState } from "react";
import { AppScreen } from "../types";
import { Bike, Bus, Car, Zap, ArrowRight, Salad, Egg, Flame } from "lucide-react";

interface BaselineQuizProps {
  onComplete: (answers: { commute: string; diet: string; energy: string }) => void;
  setScreen: (screen: AppScreen) => void;
}

export default function BaselineQuiz({ onComplete, setScreen }: BaselineQuizProps) {
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    commute: "",
    diet: "",
    energy: ""
  });

  const commuteOptions = [
    {
      id: "walk_bike",
      title: "Walk / Bike",
      description: "Zero emissions, maximum fitness.",
      icon: Bike
    },
    {
      id: "public_transit",
      title: "Public Transit",
      description: "Bus, train, metro, or campus shuttle.",
      icon: Bus
    },
    {
      id: "carpool",
      title: "Carpool / Rideshare",
      description: "Sharing the ride with friends.",
      icon: Car
    },
    {
      id: "drive_solo",
      title: "Drive Solo",
      description: "Personal gas vehicle or motorcycle.",
      icon: Car
    }
  ];

  const dietOptions = [
    {
      id: "vegan",
      title: "Plant-Based / Vegan Thali",
      description: "Zero dairy/meat. Lowest carbon impact.",
      icon: Salad
    },
    {
      id: "vegetarian",
      title: "Vegetarian Meals Only",
      description: "Standard Indian veg thali, dairy included.",
      icon: Salad
    },
    {
      id: "chicken_egg",
      title: "Eggetarian / Occasional Poultry",
      description: "Mostly veg with minor proteins.",
      icon: Egg
    },
    {
      id: "heavy_meat",
      title: "Regular Meat / Mutton Meal",
      description: "Frequent animal proteins. Higher footprints.",
      icon: Flame
    }
  ];

  const energyOptions = [
    {
      id: "optimal",
      title: "Standby Unplugged & LEDs",
      description: "We switch off everything instantly.",
      icon: Zap
    },
    {
      id: "moderate",
      title: "Smart Dorm Saver",
      description: "Turn off lights when leaving, normal laptops.",
      icon: Zap
    },
    {
      id: "average",
      title: "Average Energy User",
      description: "Keep device chargers plugged in standby.",
      icon: Zap
    },
    {
      id: "heavy",
      title: "High Electrical Load",
      description: "Desktop setups, gaming consoles always on.",
      icon: Zap
    }
  ];

  const selectOption = (value: string) => {
    if (step === 1) {
      setAnswers({ ...answers, commute: value });
    } else if (step === 2) {
      setAnswers({ ...answers, diet: value });
    } else {
      setAnswers({ ...answers, energy: value });
    }
  };

  const handleNext = () => {
    let curAnswer = "";
    if (step === 1) {
      curAnswer = answers.commute || "walk_bike";
      if (!answers.commute) setAnswers({ ...answers, commute: "walk_bike" });
      setStep(2);
    } else if (step === 2) {
      curAnswer = answers.diet || "vegetarian";
      if (!answers.diet) setAnswers({ ...answers, diet: "vegetarian" });
      setStep(3);
    } else {
      curAnswer = answers.energy || "moderate";
      const finalAnswers = {
        ...answers,
        energy: curAnswer
      };
      setAnswers(finalAnswers);
      onComplete(finalAnswers);
    }
  };

  const handleSkip = () => {
    const defaultAnswers = {
      commute: answers.commute || "public_transit",
      diet: answers.diet || "vegetarian",
      energy: answers.energy || "moderate"
    };
    onComplete(defaultAnswers);
  };

  const getProgress = () => {
    if (step === 1) return { text: "Step 1 of 3", width: "w-1/3", pct: "33%" };
    if (step === 2) return { text: "Step 2 of 3", width: "w-2/3", pct: "66%" };
    return { text: "Step 3 of 3", width: "w-full", pct: "100%" };
  };

  const activeAnswers = step === 1 ? answers.commute : step === 2 ? answers.diet : answers.energy;
  const currentOptions = step === 1 ? commuteOptions : step === 2 ? dietOptions : energyOptions;
  const currentQuestion = 
    step === 1 
      ? "How do you commute to campus?" 
      : step === 2 
        ? "How are your typical student dining choices?" 
        : "What are your dorm energy consumption habits?";

  const progressInfo = getProgress();

  return (
    <div className="min-h-screen bg-[#f0f4f8] text-slate-800 flex flex-col justify-center items-center px-6 md:px-12 py-12 relative overflow-hidden">
      {/* Background soft blurs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100 rounded-full blur-[110px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-100 rounded-full blur-[130px] pointer-events-none"></div>

      <div className="w-full max-w-[800px] flex flex-col gap-8 relative z-10">
        {/* Header segment */}
        <header className="text-center space-y-3">
          <h1 className="font-headline text-3xl md:text-4xl font-black text-slate-800 tracking-tight">
            Calculate Your Baseline
          </h1>
          <p className="text-slate-500 text-sm md:text-base max-w-xl mx-auto">
            Let's set up your Verdant profile. This helps us tailor your carbon footprint insights and track active daily progress.
          </p>

          {/* Stepper capsule */}
          <div className="w-full max-w-md mx-auto pt-4">
            <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5 px-1">
              <span>{progressInfo.text}</span>
              <span className="text-emerald-600 font-extrabold">{progressInfo.pct}</span>
            </div>
            <div className="w-full bg-slate-200 h-2.5 rounded-full overflow-hidden shadow-[inset_1px_1.5px_3px_rgba(148,163,184,0.15)]">
              <div className={`bg-emerald-500 h-full rounded-full transition-all duration-500 ${progressInfo.width}`}></div>
            </div>
          </div>
        </header>

        {/* Options container with claymorphic cards */}
        <section className="clay-card rounded-3xl p-6 md:p-10 w-full shadow-xl bg-white border border-slate-100">
          <h2 className="font-headline text-lg md:text-xl font-black text-slate-800 mb-8 text-center tracking-tight">
            {currentQuestion}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {currentOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = activeAnswers === opt.id;
              return (
                <div 
                  key={opt.id}
                  onClick={() => selectOption(opt.id)}
                  className={`group cursor-pointer rounded-2xl p-6 border transition-all duration-300 flex flex-col items-center text-center gap-4 ${
                    isSelected 
                      ? "bg-emerald-50/50 border-emerald-300 shadow-[inset_1.5px_1.5px_4px_white,inset_-2px_-2px_6px_rgba(16,185,129,0.08),3px_8px_18px_rgba(16,185,129,0.12)] text-emerald-800" 
                      : "bg-white border-slate-150/60 hover:border-slate-200 hover:bg-slate-50/50 shadow-[inset_1.5px_1.5px_4px_white,3px_5px_12px_rgba(148,163,184,0.05)]"
                  }`}
                >
                  <div className={`p-3.5 rounded-2xl ${isSelected ? "bg-emerald-500 text-white shadow-md animate-scale-up" : "bg-slate-50 border border-slate-100 text-slate-400 group-hover:text-emerald-500"} transition-all duration-200`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className={`text-sm font-extrabold ${isSelected ? "text-emerald-800" : "text-slate-800"}`}>{opt.title}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-normal font-medium">{opt.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stepper buttons footer */}
          <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-100">
            <button 
              onClick={handleSkip}
              className="px-5 py-3 rounded-xl font-bold text-xs text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-all cursor-pointer"
            >
              Skip baseline
            </button>
            <button 
              onClick={handleNext}
              className="clay-btn-primary px-8 py-3.5 flex items-center gap-2"
            >
              <span>{step === 3 ? "Complete Profiling" : "Next Question"}</span>
              <ArrowRight className="w-4.5 h-4.5 text-white" />
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
