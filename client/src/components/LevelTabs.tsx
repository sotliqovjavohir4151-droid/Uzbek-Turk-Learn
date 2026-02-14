import { cn } from "@/lib/utils";

interface LevelTabsProps {
  currentLevel: string;
  onLevelChange: (level: string) => void;
}

export function LevelTabs({ currentLevel, onLevelChange }: LevelTabsProps) {
  const levels = ["A1", "A2", "B1", "B2"];

  return (
    <div className="flex space-x-2 p-1 bg-slate-900/50 rounded-xl border border-white/5 mb-6 overflow-x-auto">
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onLevelChange(level)}
          className={cn(
            "flex-1 px-4 py-2.5 rounded-lg text-sm font-bold transition-all duration-300",
            currentLevel === level
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20 scale-105"
              : "text-slate-400 hover:text-white hover:bg-white/5"
          )}
        >
          {level}
        </button>
      ))}
    </div>
  );
}
