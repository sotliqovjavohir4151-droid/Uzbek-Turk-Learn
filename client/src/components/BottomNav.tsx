import { Link, useLocation } from "wouter";
import { Home, Book, GraduationCap, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "Bosh sahifa" },
    { href: "/atamalar", icon: Book, label: "Atamalar" },
    { href: "/darslar", icon: GraduationCap, label: "Darslar" },
    { href: "/test", icon: ClipboardList, label: "Test" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f172a]/95 backdrop-blur-lg border-t border-white/5 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== '/' && location.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex flex-col items-center justify-center w-full h-full space-y-1 cursor-pointer transition-colors duration-200",
                  isActive ? "text-primary nav-item-active" : "text-slate-400 hover:text-slate-200"
                )}
              >
                <item.icon className={cn("w-6 h-6", isActive && "animate-pulse-subtle")} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
