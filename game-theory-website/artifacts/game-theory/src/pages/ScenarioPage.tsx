import React, { useRef, useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowDown } from 'lucide-react';
import { SCENARIOS } from '@/data/scenarios';
import { WordmarkBadge } from '@/components/WordmarkBadge';
import { PayoffMatrix } from '@/components/PayoffMatrix';
import { ProgressRail } from '@/components/ProgressRail';
import { WidgetDispatcher } from '@/components/WidgetDispatcher';
import { cn } from '@/lib/utils';

export default function ScenarioPage({ params }: { params: { id: string } }) {
  const scenario = SCENARIOS.find((s) => s.id === params.id);
  const [, setLocation] = useLocation();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentSection, setCurrentSection] = useState(0);

  useEffect(() => {
    if (!scenario) {
      setLocation('/');
    }
  }, [scenario, setLocation]);

  // Reset scroll to top whenever the scenario changes
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0 });
      setCurrentSection(0);
    }
  }, [params.id]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { scrollTop, clientHeight } = containerRef.current;
      const sectionIndex = Math.round(scrollTop / clientHeight);
      setCurrentSection(sectionIndex);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
    }
    
    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  const scrollToSection = (index: number) => {
    if (!containerRef.current) return;
    containerRef.current.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  if (!scenario) return null;

  return (
    <div className="relative bg-background text-foreground h-[100dvh] overflow-hidden">
      <ProgressRail 
        currentSection={currentSection} 
        totalSections={5} 
        accentColor={scenario.accentColor} 
        onDotClick={scrollToSection} 
      />

      <div ref={containerRef} className="snap-container">
        
        {/* Section 1: HOOK */}
        <section className="snap-section relative flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 text-center">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mb-12">
            <WordmarkBadge name={scenario.players[0]} color={scenario.badgeColors[scenario.players[0]].bg} textColor={scenario.badgeColors[scenario.players[0]].text} size="lg" />
            <span className="font-serif italic text-3xl md:text-5xl text-muted-foreground">vs</span>
            <WordmarkBadge name={scenario.players[1]} color={scenario.badgeColors[scenario.players[1]].bg} textColor={scenario.badgeColors[scenario.players[1]].text} size="lg" />
          </div>
          
          <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl font-bold max-w-5xl leading-tight mb-8">
            {scenario.hook}
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mb-12">
            {scenario.stakes}
          </p>

          <div className="flex flex-col items-center gap-4 absolute bottom-12 opacity-50 animate-bounce cursor-pointer" onClick={() => scrollToSection(1)}>
            <span className="text-xs font-bold tracking-widest uppercase" style={{ color: scenario.accentColor }}>{scenario.gameType}</span>
            <ArrowDown />
          </div>
        </section>

        {/* Section 2: THE SETUP */}
        <section className="snap-section flex flex-col items-center justify-center px-6 sm:px-12 md:px-24">
          <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="lg:col-span-1 space-y-6">
              <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: scenario.accentColor }}>The Setup</h2>
              <h3 className="font-serif text-4xl font-bold mb-6">{scenario.gameType}</h3>
              {scenario.setupExplanation.map((p, i) => (
                <p key={i} className="text-lg text-muted-foreground leading-relaxed">{p}</p>
              ))}
            </div>
            <div className="lg:col-span-2">
              <PayoffMatrix scenario={scenario} isVisible={currentSection === 1} />
            </div>
          </div>
        </section>

        {/* Section 3: PLAY IT */}
        <section className="snap-section flex flex-col items-center justify-center px-6 sm:px-12 md:px-24">
          <div className="w-full max-w-5xl">
             <div className="text-center mb-8">
               <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: scenario.accentColor }}>Play It</h2>
               <h3 className="font-serif text-4xl font-bold">Make Your Move</h3>
             </div>
             <WidgetDispatcher scenario={scenario} />
          </div>
        </section>

        {/* Section 4: WHAT ACTUALLY HAPPENED */}
        <section className="snap-section flex flex-col items-center justify-center px-6 sm:px-12 md:px-24">
          <div className="w-full max-w-3xl">
             <div className="text-center mb-16">
               <h2 className="text-xs font-bold tracking-widest uppercase mb-4" style={{ color: scenario.accentColor }}>History</h2>
               <h3 className="font-serif text-4xl font-bold">What Actually Happened</h3>
             </div>
             
             <div className="relative border-l-2 border-muted ml-4 md:ml-0 md:pl-8 space-y-12 py-4">
               {scenario.timeline.map((event, i) => (
                 <div key={i} className="relative pl-8 md:pl-0">
                   <div 
                     className="absolute -left-[41px] md:-left-[41px] top-1 w-5 h-5 rounded-full border-4 border-background"
                     style={{ 
                       backgroundColor: event.color === 'green' ? '#10b981' : event.color === 'red' ? '#f43f5e' : '#f59e0b'
                     }} 
                   />
                   <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6">
                     <span className="font-mono text-sm font-bold shrink-0 text-muted-foreground w-28">{event.date}</span>
                     <span className="text-xl font-serif">{event.title}</span>
                   </div>
                 </div>
               ))}
             </div>
          </div>
        </section>

        {/* Section 5: THE TAKEAWAY */}
        <section className="snap-section relative flex flex-col items-center justify-center px-6 sm:px-12 md:px-24 text-center">
          <div className="max-w-5xl">
            <h2 className="text-xs font-bold tracking-widest uppercase mb-8" style={{ color: scenario.accentColor }}>The Takeaway</h2>
            <h3 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 text-balance">
              {scenario.takeaway.title}
            </h3>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {scenario.takeaway.desc}
            </p>
          </div>

          {/* Button pinned to bottom so it's always visible */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
            {scenario.nextId ? (
              <Link href={`/scenario/${scenario.nextId}`} className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-transform hover:scale-105" style={{ backgroundColor: scenario.accentColor, color: '#fff' }}>
                Next Scenario <ArrowDown className="-rotate-90" />
              </Link>
            ) : (
              <Link href="/" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-bold text-lg transition-transform hover:scale-105">
                Back to Library
              </Link>
            )}
          </div>
        </section>

      </div>
    </div>
  );
}
