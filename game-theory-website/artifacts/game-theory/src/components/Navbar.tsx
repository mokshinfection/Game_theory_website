import React from 'react';
import { Link, useLocation } from 'wouter';
import { SCENARIOS } from '@/data/scenarios';
import { Home } from 'lucide-react';

export function Navbar() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      {/* Top Gradient Border Line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-amber-500 to-rose-500" />
      
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-start gap-6">
        {/* Home Link */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-serif font-bold text-lg hover:text-primary transition-colors shrink-0"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Game Theory</span>
        </Link>

        {/* Separator Line */}
        <div className="h-4 w-[1px] bg-border/60 shrink-0" />

        {/* Left-Aligned Numbered Navigation (1, 2, 3, 4, 5) */}
        <nav className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none">
          {SCENARIOS.map((scenario, index) => {
            const isActive = location === `/scenario/${scenario.id}`;
            const scenarioNumber = index + 1;

            return (
              <Link
                key={scenario.id}
                href={`/scenario/${scenario.id}`}
                title={scenario.name} // Shows scenario title on hover
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all flex items-center justify-center shrink-0 border ${
                  isActive 
                    ? 'bg-primary text-primary-foreground border-primary shadow-sm scale-105' 
                    : 'text-muted-foreground border-border/60 hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {scenarioNumber}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
