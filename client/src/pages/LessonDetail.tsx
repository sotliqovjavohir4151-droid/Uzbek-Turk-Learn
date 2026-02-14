import { useRoute, Link } from "wouter";
import { useLesson } from "@/hooks/use-data";
import { ArrowLeft, PlayCircle, ClipboardList } from "lucide-react";
import { motion } from "framer-motion";

export default function LessonDetail() {
  const [, params] = useRoute("/darslar/:id");
  const id = parseInt(params?.id || "1");
  const { data: lesson, isLoading } = useLesson(id);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div></div>;
  }

  if (!lesson) return <div>Lesson not found</div>;

  return (
    <div className="min-h-screen pb-24 bg-slate-900 max-w-md mx-auto">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-slate-900/95 backdrop-blur-md border-b border-white/5 p-4 flex items-center gap-3">
        <Link href="/darslar">
          <button className="p-2 -ml-2 hover:bg-white/5 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-300" />
          </button>
        </Link>
        <h1 className="font-bold text-white truncate text-lg">Dars {id}</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Video Player */}
        <div className="aspect-video w-full bg-black rounded-2xl overflow-hidden shadow-2xl shadow-black/50 relative group">
          <iframe 
            src={lesson.videoUrl} 
            title={lesson.title}
            className="w-full h-full" 
            allowFullScreen
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">{lesson.title}</h2>
          <div className="prose prose-invert prose-sm max-w-none text-slate-300">
            <p>{lesson.content}</p>
            <p className="opacity-80 mt-4 p-4 bg-slate-800/50 rounded-xl border border-white/5">
              <strong>Grammatika:</strong><br/>
              Turk tilida "Ben" (Men), "Sen" (Sen), "O" (U) olmoshlari asosiy hisoblanadi.
            </p>
          </div>
        </div>
      </div>

      {/* Floating Quiz Button */}
      <div className="fixed bottom-20 left-0 right-0 p-4 flex justify-center pointer-events-none">
        <Link href={`/quiz/lesson/${id}`}>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto bg-primary text-primary-foreground font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/25 flex items-center gap-2"
          >
            <ClipboardList className="w-5 h-5" />
            Quizni boshlash
          </motion.button>
        </Link>
      </div>
    </div>
  );
}
