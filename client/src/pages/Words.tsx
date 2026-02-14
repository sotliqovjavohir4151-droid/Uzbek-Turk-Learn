import { useState } from "react";
import { useWords } from "@/hooks/use-data";
import { WordCard } from "@/components/WordCard";
import { Search, ArrowLeft, GraduationCap } from "lucide-react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";

export default function Words() {
  const [match, params] = useRoute("/atamalar/:category");
  const categoryId = match ? parseInt(params.category!) : null;
  const [search, setSearch] = useState("");

  const { data: words, isLoading } = useWords(categoryId || 1);

  // If no category selected, show grid of categories
  if (!match) {
    return (
      <div className="min-h-screen pb-24 px-4 pt-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold text-white mb-6 pl-1">Mavzulashtirilgan lug‘at</h1>
        
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 90 }).map((_, i) => (
            <Link key={i} href={`/atamalar/${i + 1}`}>
              <motion.div 
                whileTap={{ scale: 0.96 }}
                className="bg-slate-800/50 hover:bg-slate-700/60 border border-white/5 rounded-xl p-4 cursor-pointer transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-mono text-slate-500">#{i + 1}</span>
                  <div className="w-2 h-2 rounded-full bg-primary/50"></div>
                </div>
                <h3 className="font-semibold text-white">Mavzu {i + 1}</h3>
                <p className="text-xs text-slate-400 mt-1">100 ta so‘z</p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  // Word List View
  return (
    <div className="min-h-screen pb-24 max-w-md mx-auto bg-slate-900">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-white/5 p-4 space-y-4">
        <div className="flex items-center gap-3">
          <Link href="/atamalar">
            <button className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </button>
          </Link>
          <h1 className="text-xl font-bold text-white">Mavzu {categoryId}</h1>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="So‘z qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        {isLoading ? (
          <div className="flex justify-center py-10"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>
        ) : (
          <>
            {words?.filter(w => 
              w.turkish.toLowerCase().includes(search.toLowerCase()) || 
              w.uzbek.toLowerCase().includes(search.toLowerCase())
            ).map((word) => (
              <WordCard key={word.id} turkish={word.turkish} uzbek={word.uzbek} />
            ))}
          </>
        )}
      </div>

      {/* Floating Quiz Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 flex justify-center pointer-events-none">
        <Link href={`/quiz/category/${categoryId}`}>
          <button className="pointer-events-auto bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/25 hover:scale-105 active:scale-95 transition-transform flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Quiz boshlash
          </button>
        </Link>
      </div>
    </div>
  );
}
