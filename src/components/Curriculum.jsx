import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Clock, ArrowRight, Zap } from 'lucide-react';

const Curriculum = ({ data = [] }) => {
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    // 1. Context for Safe Cleanup
    const ctx = gsap.context(() => {
      // Safe check to ensure elements exist
      if (!sectionRef.current || !containerRef.current) return;

      const cards = gsap.utils.toArray('.curriculum-card', containerRef.current);
      const totalCards = cards.length;
      
      // Setup: Hide all cards deep in the background initially
      gsap.set(cards, { 
        z: -1000, 
        scale: 0.5, 
        opacity: 0,
        y: 100 
      });

      // --- THE MASTER TIMELINE ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${totalCards * 120}%`, // Increased scroll distance slightly
          scrub: 1, 
          pin: true, // Pins the section
          anticipatePin: 1,
          invalidateOnRefresh: true, // Fixes sizing on resize
        }
      });

      // Build the animation
      cards.forEach((card, i) => {
        // Entrance
        tl.to(card, {
          z: 0,
          scale: 1,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          zIndex: 10 
        }, i * 2); // Slower stagger

        // Exit (except last one)
        if (i < totalCards - 1) {
          tl.to(card, {
            z: -500, 
            scale: 0.8,
            opacity: 0,
            y: -100, 
            duration: 0.8,
            ease: "power2.in",
            zIndex: 0 
          }, (i * 2) + 1.2); 
        }
      });

    }, sectionRef); // Scope to section

    // ✨ CRITICAL CLEANUP: Reverts pinning before React unmounts
    return () => ctx.revert();
  }, [data]);

  return (
    <section 
      ref={sectionRef} 
      className="relative h-screen bg-black overflow-hidden flex flex-col items-center justify-center perspective-1000"
      style={{ perspective: '1200px' }} 
    >
      
      {/* --- BACKGROUND (Static) --- */}
      <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-800/40 via-black to-black" />
        <div className="w-full h-full bg-[linear-gradient(rgba(151,255,57,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(151,255,57,0.05)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* --- HEADER --- */}
      <div 
        ref={headerRef}
        className="absolute top-12 md:top-20 z-50 text-center w-full px-4"
      >
        <div className="inline-flex items-center gap-2 mb-4 px-4 py-1 rounded-full border border-[#97FF39]/30 bg-[#97FF39]/10 backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-[#97FF39] animate-pulse" />
          <span className="text-[#97FF39] text-xs font-mono uppercase tracking-widest">
            3D Learning Path
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
          Course <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600">Cycle</span>
        </h2>
      </div>

      {/* --- 3D CARD STAGE --- */}
      <div 
        ref={containerRef} 
        className="relative w-full max-w-4xl h-[400px] flex items-center justify-center z-10"
        style={{ transformStyle: 'preserve-3d' }}
      >
        
        {data.map((phase, index) => (
          <div
            key={index}
            className="curriculum-card absolute top-0 left-0 right-0 mx-auto w-[90%] md:w-[600px] h-[350px] md:h-[400px] bg-slate-900 border border-slate-700 rounded-3xl p-8 flex flex-col shadow-2xl will-change-transform"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'translateZ(-1000px)' // CSS Initial State
            }}
          >
            {/* --- CARD CONTENT --- */}
            
            {/* Top Bar */}
            <div className="flex justify-between items-start mb-6">
               <div className="p-3 bg-slate-800 rounded-xl border border-slate-600">
                  <Layers className="w-6 h-6 text-[#97FF39]" />
               </div>
               <span className="text-[80px] md:text-[100px] leading-none font-bold text-slate-800 select-none absolute top-4 right-6 opacity-50">
                 {index + 1}
               </span>
            </div>

            {/* Title Block */}
            <div className="relative z-10 mb-4">
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-2">
                {phase.title}
              </h3>
              <div className="flex items-center gap-2 text-[#97FF39] font-mono text-sm">
                <Clock className="w-4 h-4" />
                <span>{phase.duration || "4 Weeks"}</span>
              </div>
            </div>

            {/* Topics / Details */}
            <div className="mt-auto border-t border-slate-800 pt-6">
               <ul className="grid grid-cols-2 gap-y-2 mb-6">
                 {phase.topics?.slice(0, 4).map((topic, i) => (
                   <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                     <Zap className="w-3 h-3 text-[#97FF39]" />
                     {topic}
                   </li>
                 ))}
               </ul>
               
               <button className="w-full py-3 bg-white/5 hover:bg-[#97FF39] hover:text-black border border-white/10 rounded-lg text-sm font-bold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 group">
                 Explore Module
                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
            
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          </div>
        ))}

      </div>

    </section>
  );
};

export default Curriculum;