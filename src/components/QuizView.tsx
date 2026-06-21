import React, { useState } from "react";
import { QuizQuestion } from "../types";
import { SUSTAINABILITY_QUIZ } from "../data";
import { Check, X, ArrowRight, Award, RefreshCw, HelpCircle, GraduationCap } from "lucide-react";

interface QuizViewProps {
  onEarnPoints: (points: number, co2SavedKg: number) => void;
}

export default function QuizView({ onEarnPoints }: QuizViewProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [pointsRewardAccumulated, setPointsRewardAccumulated] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  const currentQuestion: QuizQuestion = SUSTAINABILITY_QUIZ[currentQuestionIndex];

  const handleAnswerSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIndex(index);
  };

  const handleAnswerSubmit = () => {
    if (selectedAnswerIndex === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);
    
    const isCorrect = selectedAnswerIndex === currentQuestion.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      setPointsRewardAccumulated(prev => prev + currentQuestion.points);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex + 1 < SUSTAINABILITY_QUIZ.length) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsQuizFinished(true);
      // Award accumulated points to user level
      onEarnPoints(pointsRewardAccumulated, 5.0); // 5kg bonus CO2 saved for completing quiz
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswerIndex(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setPointsRewardAccumulated(0);
    setIsQuizFinished(false);
  };

  return (
    <div className="flex flex-col gap-8 text-slate-800">
      {/* View Header */}
      <section className="flex flex-col gap-2 text-left">
        <h2 className="font-headline text-2xl md:text-3xl font-extrabold text-slate-800">
          Active Stewardship Eco-Quiz
        </h2>
        <p className="text-slate-500 text-sm md:text-base max-w-2xl font-medium">
          Complete weekly campus environmental trivia questionnaires to test your carbon intelligence and earn real-time points.
        </p>
      </section>

      {/* Main Container Card */}
      <section className="clay-card rounded-2xl p-6 md:p-10 max-w-[800px] w-full mx-auto border border-slate-200/50 bg-white shadow-sm">
        
        {!isQuizFinished ? (
          <div className="space-y-6">
            {/* Header info */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-1.5 font-sans">
                <HelpCircle className="w-4.5 h-4.5 text-emerald-500" />
                <span>Trivia Question {currentQuestionIndex + 1} of {SUSTAINABILITY_QUIZ.length}</span>
              </span>
              <span className="text-xs font-bold text-slate-500 font-mono">
                Power Reward: +{currentQuestion.points} pts
              </span>
            </div>

            {/* Question Text */}
            <h3 className="font-headline text-base md:text-lg font-black text-slate-800 leading-snug text-left">
              {currentQuestion.question}
            </h3>

            {/* Answers options cards */}
            <div className="grid grid-cols-1 gap-3 pt-2">
              {currentQuestion.options.map((option, index) => {
                const isSelected = selectedAnswerIndex === index;
                const isCorrect = index === currentQuestion.correctIndex;
                const isWrong = isSelected && !isCorrect;

                let optionStyle = "bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/50 text-slate-700";
                if (isSelected && !isAnswerSubmitted) {
                  optionStyle = "bg-emerald-50 border-emerald-400 text-emerald-800 shadow-[inset_1px_1.5px_3px_white]";
                } else if (isAnswerSubmitted) {
                  if (isCorrect) {
                    optionStyle = "bg-emerald-100 border-emerald-400 text-emerald-800 shadow-[inset_1px_1.5px_3px_white]";
                  } else if (isWrong) {
                    optionStyle = "bg-red-50 border-red-300 text-red-700";
                  } else {
                    optionStyle = "bg-slate-50 border-slate-100 text-slate-405 opacity-60";
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={isAnswerSubmitted}
                    className={`text-left w-full p-4.5 rounded-xl border font-bold text-xs md:text-sm transition-all duration-200 cursor-pointer flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{option}</span>
                    <div className="shrink-0 ml-3">
                      {isAnswerSubmitted && isCorrect && <Check className="w-5 h-5 text-emerald-700" />}
                      {isAnswerSubmitted && isWrong && <X className="w-5 h-5 text-red-600" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Submitted feedback explainer */}
            {isAnswerSubmitted && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/50 space-y-2 text-left">
                <p className="text-xs font-black text-emerald-700 uppercase tracking-widest flex items-center gap-1.5 leading-none">
                  <GraduationCap className="w-4.5 h-4.5 text-emerald-600" />
                  <span>Steward Wisdom Explanation</span>
                </p>
                <p className="text-xs text-slate-600 leading-relaxed font-bold">
                  {currentQuestion.explanation}
                </p>
              </div>
            )}

            {/* Navigation action footer */}
            <div className="pt-6 border-t border-slate-100 flex justify-end">
              {!isAnswerSubmitted ? (
                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswerIndex === null}
                  className="bg-emerald-500 disabled:bg-slate-100 disabled:text-slate-400 text-white px-8 py-3 rounded-xl font-extrabold text-xs transition-all flex items-center gap-2 cursor-pointer shadow-sm active:scale-95 disabled:pointer-events-none"
                >
                  <span>Submit Answer</span>
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-extrabold text-xs hover:bg-emerald-600 transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>
                    {currentQuestionIndex + 1 === SUSTAINABILITY_QUIZ.length ? "Finish Quiz" : "Next Question"}
                  </span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Finished State Screen */
          <div className="text-center py-8 space-y-6">
            <div className="w-20 h-20 bg-emerald-550 bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center rounded-full mx-auto shadow-sm">
              <Award className="w-10 h-10 text-emerald-600" />
            </div>

            <div className="space-y-2">
              <h3 className="font-headline text-xl md:text-2xl font-black text-slate-800">Quiz Mission Completed!</h3>
              <p className="text-slate-500 text-sm max-w-sm mx-auto font-medium">
                Excellent. Your responses proved key metrics trace and rewarded bonus parameters.
              </p>
            </div>

            <div className="max-w-xs mx-auto p-5 bg-slate-50 rounded-2xl border border-slate-200/60 space-y-3">
              <div className="flex justify-between items-center text-xs text-slate-650 font-bold">
                <span>Correct Answers:</span>
                <span className="text-emerald-700 font-mono font-black text-sm">{score} / {SUSTAINABILITY_QUIZ.length}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-650 font-bold border-t border-slate-200/50 pt-2.5">
                <span>Rewards Points:</span>
                <span className="text-emerald-700 font-mono font-black text-sm">+{pointsRewardAccumulated} pts</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-650 font-bold border-t border-slate-200/50 pt-2.5">
                <span>Carbon Savings Bonus:</span>
                <span className="text-emerald-700 font-mono font-black text-sm">+5 kg CO2</span>
              </div>
            </div>

            <button
              onClick={handleRestartQuiz}
              className="mt-4 px-6 py-3 border border-slate-200 rounded-xl font-black text-xs text-slate-600 hover:text-slate-800 hover:bg-slate-100/50 transition-all inline-flex items-center gap-2 cursor-pointer bg-white shadow-sm"
            >
              <RefreshCw className="w-4 h-4 text-slate-500" />
              <span>Retry Trivia</span>
            </button>
          </div>
        )}

      </section>
    </div>
  );
}
