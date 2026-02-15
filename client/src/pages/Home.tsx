import { Link } from "wouter";
import { Book, Play, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/use-data";

export default function Home() {
  const { data: progress } = useProgress();

  // FOIZ hisoblash
  const totalPercent =
    progress?.reduce((acc, curr) => acc + (curr.percent || 0), 0) || 0;

  // 100% dan oshmasligi uchun
  const overallPercent = Math.min(totalPercent, 100);

  // Daraja hisoblash
  const getLevel = (percent: number) => {
    if (percent >= 100) return "B2";
    if (percent >= 75) return "B1";
    if (percent >= 50) return "A2";
    return "A1";
  };

  const level = getLevel(overallPercent);

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 max-w-md mx-auto">
      
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 space-y-4"
      >
        <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/10 border border-primary/20 mb-2">
          <img
            src="https://flagcdn.com/w80/tr.png"
            alt="Turkish Flag"
            className="w-12 h-auto rounded shadow-sm"
          />
        </div>

        <h1 className="text-3xl font-bold text-white">
          Turk tilini zamonaviy usulda o‘rganing
        </h1>

        <p className="text-slate-400 text-sm">
          Interaktiv darslar va testlar orqali til o‘rganing.
        </p>
      </motion.div>

      {/* STAT CARD */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="glass-panel rounded-2xl p-5 mb-8"
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-500">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase font-bold">
                Umumiy Foiz
              </p>
              <p className="text-2xl font-bold text-white">
                {overallPercent.toFixed(1)}%
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-xs text-slate-400 uppercase font-bold">
              Daraja
            </p>
            <p className="text-2xl font-bold text-primary">
              {level}
            </p>
          </div>
        </div>

        {/* PROGRESS BAR */}
        <div className="w-full bg-slate-800 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${overallPercent}%` }}
          />
        </div>
      </motion.div>

      {/* QUICK ACTIONS */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link href="/darslar">
          <div className="premium-card p-5 flex flex-col items-center text-center space-y-3 cursor-pointer">
            <div className="p-4 rounded-full bg-blue-500/10 text-blue-400">
              <Play className="w-6 h-6 fill-current" />
            </div>
            <span className="font-semibold text-white">
              Darslarni boshlash
            </span>
          </div>
        </Link>

        <Link href="/atamalar">
          <div className="premium-card p-5 flex flex-col items-center text-center space-y-3 cursor-pointer">
            <div className="p-4 rounded-full bg-purple-500/10 text-purple-400">
              <Book className="w-6 h-6" />
            </div>
            <span className="font-semibold text-white">
              So‘zlarni ko‘rish
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}