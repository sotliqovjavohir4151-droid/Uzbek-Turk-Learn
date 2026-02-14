import { useState } from "react";
import { useLessons } from "@/hooks/use-data";
import { Link } from "wouter";
import { LevelTabs } from "@/components/LevelTabs";
import { PlayCircle, CheckCircle2, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Lessons() {
  const [level, setLevel] = useState("A1");
  const { data: lessons, isLoading } = useLessons(level);

  return (
    <div className="min-h-screen pb-24 px-4 pt-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6 pl-1">Video Darslar</h1>
      
      <LevelTabs currentLevel={level} onLevelChange={setLevel} />

      <div className="space-y-4">
        {isLoading ? (
          [1,2,3].map(i => (
            <div key={i} className="h-24 bg-slate-800/50 rounded-2xl animate-pulse"></div>
          ))
        ) : (
          lessons?.map((lesson, idx) => (
            <Link key={lesson.id} href={`/darslar/${lesson.id}`}>
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={cn(
                  "group relative overflow-hidden bg-slate-800/40 border border-white/5 hover:border-primary/30 rounded-2xl p-4 cursor-pointer transition-all duration-300",
                  idx > 4 ? "opacity-75" : "" // Simulate locked state for demo
                )}
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-16 h-16 rounded-xl bg-slate-900 flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {idx > 4 ? (
                      <Lock className="w-6 h-6 text-slate-600" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary transition-colors">
                        <PlayCircle className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-white text-sm line-clamp-2 leading-tight mb-2">
                        {lesson.title}
                      </h3>
                      {idx < 2 && <CheckCircle2 className="w-4 h-4 text-primary shrink-0 ml-2" />}
                    </div>
                    <p className="text-xs text-slate-400 line-clamp-2">
                      {lesson.content}
                    </p>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
