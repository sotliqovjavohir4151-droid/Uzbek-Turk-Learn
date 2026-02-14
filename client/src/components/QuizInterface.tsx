import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RefreshCw, Home, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface QuizInterfaceProps {
  questions: Question[];
  onComplete: (score: number) => void;
  title: string;
}

export function QuizInterface({ questions, onComplete, title }: QuizInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex) / questions.length) * 100;

  const handleOptionClick = (index: number) => {
    if (isAnswered) return;
    
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === currentQuestion.correctAnswer) {
      setScore(s => s + 1);
    }

    // Auto advance after short delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswered(false);
      } else {
        setShowResult(true);
        onComplete(score + (index === currentQuestion.correctAnswer ? 1 : 0));
      }
    }, 1500);
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 p-6 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
          <div className="relative w-32 h-32 rounded-full border-4 border-primary flex items-center justify-center bg-slate-900">
            <span className="text-4xl font-bold text-primary">{percentage}%</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Natija</h2>
          <p className="text-slate-400">Siz {questions.length} ta savoldan {score} tasiga to'g'ri javob berdingiz.</p>
        </div>

        <div className="flex flex-col w-full gap-3 max-w-xs">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="w-5 h-5" />
            Qayta ishlash
          </button>
          <Link href="/">
            <div className="flex items-center justify-center gap-2 w-full py-3.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors cursor-pointer border border-white/5">
              <Home className="w-5 h-5" />
              Bosh sahifaga
            </div>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen pb-24">
      {/* Header */}
      <div className="sticky top-0 bg-slate-900/95 backdrop-blur-md z-10 p-4 border-b border-white/5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold text-lg text-white truncate pr-4">{title}</h2>
          <span className="text-sm font-medium text-slate-400 font-mono">
            {currentIndex + 1}/{questions.length}
          </span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="min-h-[100px] flex items-center justify-center"
          >
            <h3 className="text-xl md:text-2xl font-bold text-center text-white leading-relaxed">
              {currentQuestion.question}
            </h3>
          </motion.div>
        </AnimatePresence>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map((option, idx) => {
            const isSelected = selectedOption === idx;
            const isCorrect = idx === currentQuestion.correctAnswer;
            const showCorrect = isAnswered && isCorrect;
            const showWrong = isAnswered && isSelected && !isCorrect;

            let buttonClass = "bg-slate-800/50 border-white/10 text-slate-200 hover:bg-slate-700/50";
            if (showCorrect) buttonClass = "bg-green-500/20 border-green-500 text-green-400";
            else if (showWrong) buttonClass = "bg-red-500/20 border-red-500 text-red-400";
            else if (isSelected) buttonClass = "bg-primary/20 border-primary text-primary";

            return (
              <motion.button
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleOptionClick(idx)}
                disabled={isAnswered}
                className={cn(
                  "w-full p-4 rounded-xl border-2 text-left font-semibold transition-all duration-200 flex items-center justify-between group",
                  buttonClass
                )}
              >
                <span>{option}</span>
                {showCorrect && <Check className="w-5 h-5 text-green-500" />}
                {showWrong && <X className="w-5 h-5 text-red-500" />}
                {!isAnswered && <ChevronRight className="w-5 h-5 opacity-0 group-hover:opacity-50 transition-opacity" />}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
