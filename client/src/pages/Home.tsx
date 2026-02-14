import { Link } from "wouter";
import { GraduationCap, Book, Play, Trophy } from "lucide-react";
import { motion } from "framer-motion";
import { useProgress } from "@/hooks/use-data";

export default function Home() {
  const { data: progress } = useProgress();

  const totalScore = progress?.reduce((acc, curr) => acc + (curr.score || 0), 0) || 0;
  const completedLessons = progress?.filter(p => p.completed).length || 0;

  return (
    <div className="min-h-screen pb-24 px-4 pt-8 max-w-md mx-auto">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 space-y-4"
      >
        <div className="inline-block p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/10 border border-primary/20 mb-2">
          <img src="https://flagcdn.com/w80/tr.png" alt="Turkish Flag" className="w-12 h-auto rounded shadow-sm" />
        </div>
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          Turk tilini<br />zamonaviy usulda o‘rganing
        </h1>
        <p className="text-slate-400 text-sm max-w-xs mx-auto">
          Interaktiv darslar, audio lug‘atlar va qiziqarli testlar orqali til o‘rganing.
        </p>
      </motion.div>

      {/* Stats Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-2xl p-5 mb-8 flex justify-between items-center"
      >
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-yellow-500/20 rounded-xl text-yellow-500">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Umumiy Ball</p>
            <p className="text-2xl font-bold text-white">{totalScore}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider">Tugatilgan</p>
          <p className="text-2xl font-bold text-primary">{completedLessons} <span className="text-sm text-slate-500 font-normal">dars</span></p>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Link href="/darslar">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="premium-card p-5 flex flex-col items-center text-center space-y-3 cursor-pointer group"
          >
            <div className="p-4 rounded-full bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-colors duration-300">
              <Play className="w-6 h-6 fill-current" />
            </div>
            <span className="font-semibold text-white">Darslarni boshlash</span>
          </motion.div>
        </Link>
        
        <Link href="/atamalar">
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="premium-card p-5 flex flex-col items-center text-center space-y-3 cursor-pointer group"
          >
            <div className="p-4 rounded-full bg-purple-500/10 text-purple-400 group-hover:bg-purple-500 group-hover:text-white transition-colors duration-300">
              <Book className="w-6 h-6" />
            </div>
            <span className="font-semibold text-white">So‘zlarni ko‘rish</span>
          </motion.div>
        </Link>
      </div>

      {/* Recent Lesson (Placeholder) */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white px-1">So‘nggi dars</h3>
        <Link href="/darslar/1">
          <div className="glass-panel p-4 rounded-xl flex items-center space-x-4 cursor-pointer hover:bg-slate-800/80 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-lg">
              A1
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-white text-sm">1-dars. Tanishuv</h4>
              <p className="text-xs text-slate-400 mt-1">Davom ettirish uchun bosing</p>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
              <Play className="w-4 h-4 text-white ml-0.5" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
