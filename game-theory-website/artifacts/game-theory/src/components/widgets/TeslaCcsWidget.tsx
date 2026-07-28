import React, { useState } from 'react';
import { Scenario } from '@/data/scenarios';
import { Zap, X, Check, Info } from 'lucide-react';

export function TeslaCcsWidget({ scenario }: { scenario: Scenario }) {
  const [status, setStatus] = useState<'competing' | 'converged'>('competing');
  
  return (
    <div className="w-full max-w-4xl mx-auto py-8 flex flex-col items-start space-y-8">
      
      {/* How to Play Instruction Box */}
      <div className="w-full max-w-md p-4 rounded-xl bg-card border border-border flex items-start gap-3 text-sm text-muted-foreground text-left">
        <Info size={20} className="text-primary shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-foreground block mb-1">How to Play:</span>
          1. Toggle between <strong>Keep Competing</strong> (fragmented charging standards) and <strong>Converge on NACS</strong> (unified standard).<br />
          2. Observe how standardizing plugs directly impacts overall EV adoption and consumer confidence!
        </div>
      </div>

      {/* Action Toggle Buttons */}
      <div className="flex gap-4">
        <button 
          onClick={() => setStatus('competing')}
          className={`px-6 py-3 font-bold rounded-lg border-2 transition-all ${status === 'competing' ? 'border-amber-500 bg-amber-500/10 text-amber-500' : 'border-border text-muted-foreground'}`}
        >
          Keep Competing
        </button>
        <button 
          onClick={() => setStatus('converged')}
          className={`px-6 py-3 font-bold rounded-lg border-2 transition-all ${status === 'converged' ? 'border-emerald-500 bg-emerald-500/10 text-emerald-500' : 'border-border text-muted-foreground'}`}
        >
          Converge on NACS
        </button>
      </div>

      {/* Plug Visualization Area */}
      <div className="relative w-full h-64 flex justify-center items-center mb-4">
        
        {/* The Car Socket (Center) */}
        <div className="relative z-10 w-32 h-32 rounded-full border-4 border-dashed border-muted-foreground flex items-center justify-center bg-card shadow-md">
          {status === 'competing' ? (
            <X size={48} className="text-rose-500" />
          ) : (
            <Check size={48} className="text-emerald-500" />
          )}
        </div>

        {/* Tesla Plug */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 flex items-center gap-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${status === 'competing' ? 'left-[10%] hover:animate-shake' : 'left-1/2 -translate-x-1/2 scale-90 opacity-0'}
          `}
        >
          <div className="font-bold tracking-widest text-sm bg-[#cc0000] text-white px-3 py-1 rounded">TESLA (NACS)</div>
          <div className="w-16 h-12 bg-zinc-800 border-2 border-zinc-600 rounded-r-xl flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
        </div>

        {/* CCS Plug (Ford/GM) */}
        <div 
          className={`absolute top-1/2 -translate-y-1/2 flex flex-row-reverse items-center gap-4 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
            ${status === 'competing' ? 'right-[10%] hover:animate-shake' : 'right-1/2 translate-x-1/2 scale-110'}
          `}
        >
          <div className="font-bold tracking-widest text-sm bg-zinc-700 text-white px-3 py-1 rounded">FORD & GM (CCS)</div>
          <div className="w-20 h-20 bg-zinc-800 border-2 border-zinc-600 rounded-full flex flex-col items-center justify-center gap-1">
             <div className="flex gap-1"><div className="w-4 h-4 rounded-full bg-zinc-600"/><div className="w-4 h-4 rounded-full bg-zinc-600"/></div>
             <div className="w-10 h-4 rounded-full bg-zinc-600"/>
          </div>
        </div>
      </div>

      {/* Outcome Stat Card */}
      <div className="bg-card border p-8 rounded-2xl w-full max-w-md text-left">
        <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Total EV Adoption Rate</h4>
        <div className="text-5xl font-mono font-bold tracking-tighter mb-4 transition-colors duration-1000">
          {status === 'competing' ? (
            <span className="text-amber-500">28.4%</span>
          ) : (
            <span className="text-emerald-500">75.2%</span>
          )}
        </div>
        <p className="text-sm text-muted-foreground font-serif">
          {status === 'competing' 
            ? "Incompatible standards confuse buyers. Growth stalls as consumers wait for a winner." 
            : "A unified standard unlocks the network effect. The total pie grows massively."}
        </p>
      </div>

    </div>
  );
}
