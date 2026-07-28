import React, { useState } from 'react';
import { Scenario } from '@/data/scenarios';
import { User, Coins } from 'lucide-react';
import { WordmarkBadge } from '../WordmarkBadge';

export function SwiggyZomatoWidget({ scenario }: { scenario: Scenario }) {
  const [swiggySpend, setSwiggySpend] = useState<boolean>(true);
  const [zomatoSpend, setZomatoSpend] = useState<boolean>(true);
  
  const [round, setRound] = useState(0);
  const [cashBurned, setCashBurned] = useState(0);

  const handleSimulate = () => {
    if (round >= 3) return;
    setRound(r => r + 1);
    
    let burn = 0;
    if (swiggySpend) burn += 500;
    if (zomatoSpend) burn += 500;
    setCashBurned(c => c + burn);
  };

  const reset = () => {
    setRound(0);
    setCashBurned(0);
  };

  // customer position: -1 (swiggy) to 1 (zomato)
  let customerPos = 0;
  if (swiggySpend && !zomatoSpend) customerPos = -20;
  else if (!swiggySpend && zomatoSpend) customerPos = 20;

  return (
    <div className="w-full max-w-4xl mx-auto py-12 flex flex-col items-center">
      
      <div className="flex justify-between items-center w-full relative h-48 mb-12">
        {/* Swiggy Side */}
        <div className="flex flex-col items-center z-10">
          <div 
            className="w-24 h-24 rounded-full bg-card border-4 flex items-center justify-center mb-6 transition-all duration-500 ease-in-out"
            style={{ 
              borderColor: scenario.badgeColors['Swiggy'].bg,
              transform: `scale(${1 - (swiggySpend && round > 0 ? 0.1 * round : 0)})`,
              opacity: swiggySpend && round > 0 ? 0.8 : 1
            }}
          >
            <Coins size={36} className="text-muted-foreground" />
          </div>
          <div className="flex gap-2 bg-background p-1 rounded-lg border">
            <button 
              onClick={() => setSwiggySpend(true)}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${swiggySpend ? 'bg-orange-500 text-white' : 'hover:bg-muted'}`}
            >Spend</button>
            <button 
              onClick={() => setSwiggySpend(false)}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${!swiggySpend ? 'bg-orange-500 text-white' : 'hover:bg-muted'}`}
            >Hold</button>
          </div>
        </div>

        {/* Customer (Center) */}
        <div 
          className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-0 flex flex-col items-center"
          style={{ transform: `translate(calc(-50% + ${customerPos}px), -50%)` }}
        >
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-2 border-2 border-border">
            <User size={32} className="text-muted-foreground" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Market Share</span>
        </div>

        {/* Zomato Side */}
        <div className="flex flex-col items-center z-10">
          <div 
            className="w-24 h-24 rounded-full bg-card border-4 flex items-center justify-center mb-6 transition-all duration-500 ease-in-out"
            style={{ 
              borderColor: scenario.badgeColors['Zomato'].bg,
              transform: `scale(${1 - (zomatoSpend && round > 0 ? 0.1 * round : 0)})`,
              opacity: zomatoSpend && round > 0 ? 0.8 : 1
            }}
          >
            <Coins size={36} className="text-muted-foreground" />
          </div>
          <div className="flex gap-2 bg-background p-1 rounded-lg border">
            <button 
              onClick={() => setZomatoSpend(true)}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${zomatoSpend ? 'bg-red-500 text-white' : 'hover:bg-muted'}`}
            >Spend</button>
            <button 
              onClick={() => setZomatoSpend(false)}
              className={`px-3 py-1.5 text-sm font-bold rounded-md transition-all ${!zomatoSpend ? 'bg-red-500 text-white' : 'hover:bg-muted'}`}
            >Hold</button>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6 flex flex-col items-center w-full max-w-md">
        <div className="flex justify-between w-full mb-6">
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Round</div>
            <div className="font-mono text-2xl font-bold">{round} / 3</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Cash Burned</div>
            <div className={`font-mono text-2xl font-bold ${cashBurned > 0 ? 'text-rose-500' : 'text-emerald-500'}`}>
              ₹{cashBurned} Cr
            </div>
          </div>
        </div>
        
        {round < 3 ? (
          <button 
            onClick={handleSimulate}
            className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors"
          >
            Simulate Quarter
          </button>
        ) : (
          <div className="w-full text-center space-y-4">
            <div className="text-amber-500 font-serif font-bold text-xl">
              {swiggySpend && zomatoSpend 
                ? "Both burned cash. Market share barely moved."
                : (!swiggySpend && !zomatoSpend ? "Peace! Both saved money." : "One side won, but at what cost?")}
            </div>
            <button onClick={reset} className="text-sm underline text-muted-foreground">Reset Simulation</button>
          </div>
        )}
      </div>

    </div>
  );
}
