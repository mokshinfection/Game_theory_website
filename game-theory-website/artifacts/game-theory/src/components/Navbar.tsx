import React from 'react';
import { Link, useLocation } from 'wouter';
import { SCENARIOS } from '@/data/scenarios';
import { Home, ChevronDown } from 'lucide-react';

export function Navbar() {
  const [location] = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      {/* Top Gradient Border Line */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-500 via-amber-500 to-rose-500" />
      
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between gap-4">
        {/* Home Link */}
        <Link 
          href="/" 
          className="flex items-center gap-2 font-serif font-bold text-lg hover:text-primary transition-colors shrink-0"
        >
          <Home size={18} />
          <span className="hidden sm:inline">Game Theory</span>
        </Link>

        {/* Page Switcher Links */}
        <nav className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
          {SCENARIOS.map((scenario) => {
            const isActive = location === `/scenario/${scenario.id}`;
            return (
              <Link
                key={scenario.id}
                href={`/scenario/${scenario.id}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isActive 
                    ? 'bg-primary text-primary-foreground shadow-sm' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <span 
                  className="w-2 h-2 rounded-full shrink-0" 
                  style={{ backgroundColor: scenario.accentColor }} 
                />
                {scenario.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
