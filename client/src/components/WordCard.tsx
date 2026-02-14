import { Volume2 } from "lucide-react";

interface WordCardProps {
  turkish: string;
  uzbek: string;
}

export function WordCard({ turkish, uzbek }: WordCardProps) {
  const playAudio = () => {
    const utterance = new SpeechSynthesisUtterance(turkish);
    utterance.lang = "tr-TR";
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div 
      onClick={playAudio}
      className="group flex items-center justify-between p-4 rounded-xl bg-slate-800/40 border border-white/5 hover:border-primary/30 hover:bg-slate-800/60 transition-all duration-200 cursor-pointer active:scale-[0.98]"
    >
      <div>
        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary transition-colors">{turkish}</h3>
        <p className="text-sm text-slate-400">{uzbek}</p>
      </div>
      <button 
        className="p-3 rounded-full bg-slate-700/50 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
        aria-label="Play pronunciation"
      >
        <Volume2 className="w-5 h-5" />
      </button>
    </div>
  );
}
