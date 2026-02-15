import { createContext, useContext, useState, ReactNode } from "react";

type ProgressType = {
  levelPercent: number;
  addProgress: (score: number) => void;
};

const ProgressContext = createContext<ProgressType | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [levelPercent, setLevelPercent] = useState(0);

  const addProgress = (score: number) => {
    const rounded = Math.floor(score / 10) * 10; 
    const percentToAdd = rounded / 100;
    setLevelPercent(prev => Math.min(prev + percentToAdd, 100));
  };

  return (
    <ProgressContext.Provider value={{ levelPercent, addProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) throw new Error("useProgress must be used inside ProgressProvider");
  return context;
}