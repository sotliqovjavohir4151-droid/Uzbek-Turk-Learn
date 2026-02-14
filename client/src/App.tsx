import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { BottomNav } from "@/components/BottomNav";
import Home from "@/pages/Home";
import Words from "@/pages/Words";
import Lessons from "@/pages/Lessons";
import LessonDetail from "@/pages/LessonDetail";
import Quiz from "@/pages/Quiz";
import NotFound from "@/pages/not-found";

function Router() {
  const [location] = useLocation();
  
  // Hide bottom nav on quiz pages
  const showNav = !location.startsWith("/quiz");

  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100 font-sans selection:bg-primary/30 selection:text-primary-foreground">
      <Switch>
        <Route path="/" component={Home} />
        
        {/* Vocabulary Routes */}
        <Route path="/atamalar" component={Words} />
        <Route path="/atamalar/:category" component={Words} />
        
        {/* Lesson Routes */}
        <Route path="/darslar" component={Lessons} />
        <Route path="/darslar/:id" component={LessonDetail} />
        
        {/* Quiz Routes */}
        <Route path="/test" component={Quiz} />
        <Route path="/quiz/lesson/:id" component={Quiz} />
        <Route path="/quiz/category/:id" component={Quiz} />
        
        <Route component={NotFound} />
      </Switch>
      
      {showNav && <BottomNav />}
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
