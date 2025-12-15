import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle2, Terminal, Cpu, ArrowDown, Database } from 'lucide-react';

const Steps = ({ data = [] }) => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const progressRef = useRef(null);
  const timelinesRef = useRef([]);

  useEffect(() => {
    // 1. Context for Safe Cleanup (Prevents "removeChild" errors)
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const section = sectionRef.current;
      const steps = stepsRef.current.filter(Boolean);

      if (!section || steps.length === 0) return;

      // --- DESKTOP ANIMATION (Pinned "Stack") ---
      mm.add('(min-width: 768px)', () => {
        // Reset styles
        gsap.set(steps, { 
           opacity: 0, 
           y: 100, // Start lower for a "slide up" effect
           scale: 0.95, 
           position: 'absolute', 
           top: 0, 
           left: 0, 
           width: '100%',
           zIndex: (i) => i 
        });

        // Calculate scroll distance (Slower scroll for better readability)
        const scrollDistance = steps.length * 150; 

        // Pinning
        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}%`,
          pin: true,
          pinSpacing: true,
          scrub: 1,
          anticipatePin: 1
        });

        // Timeline
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: `+=${scrollDistance}%`,
            scrub: 1
          }
        });
        timelinesRef.current.push(tl);

        steps.forEach((step, i) => {
          const startTime = i * 2; // Spaced out timing

          // Entrance (Mechanical Slide Up)
          tl.to(step, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: "power2.out", // Snappy mechanical ease
            zIndex: 10 + i
          }, startTime);

          // Exit (Slide Up and Fade Out - like a stack processing)
          if (i < steps.length - 1) {
            tl.to(step, {
              opacity: 0,
              y: -50, // Moves UP as it fades
              scale: 0.9,
              duration: 1,
              ease: "power2.in"
            }, startTime + 2); // Overlap next entrance
          }
        });

        // Technical Progress Bar
        if (progressRef.current) {
          gsap.fromTo(progressRef.current,
            { height: "0%" },
            {
              height: "100%",
              ease: 'none',
              scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: `+=${scrollDistance}%`,
                scrub: 1
              }
            }
          );
        }
      });

      // --- MOBILE ANIMATION (Simple Scroll List) ---
      mm.add('(max-width: 767px)', () => {
        gsap.set(steps, { clearProps: 'all', opacity: 0, y: 50 });
        
        ScrollTrigger.batch(steps, {
          onEnter: batch => gsap.to(batch, {
            opacity: 1, 
            y: 0, 
            stagger: 0.15, 
            duration: 0.6,
            ease: "back.out(1.7)" 
          }),
          start: "top 80%"
        });
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [data]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col justify-center bg-black overflow-hidden"
    >
      {/* --- BACKGROUND: TECHNICAL GRID --- */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:40px_40px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10 h-full flex flex-col md:flex-row gap-12 lg:gap-24">
        
        {/* --- LEFT COLUMN: FIXED HEADER (Desktop) --- */}
        <div className="md:w-1/3 flex flex-col justify-center relative z-20">
           <div className="md:sticky md:top-32">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 bg-teal-900/30 border border-teal-500/30 rounded text-teal-400 text-xs font-mono uppercase tracking-widest">
                 <Terminal className="w-3 h-3" />
                 <span>Sequence_Init</span>
              </div>
              
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-none">
                 System <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">
                    Integration
                 </span>
              </h2>
              
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                 A 24-week execution protocol designed to bridge the gap between theory and industrial application.
              </p>

              {/* Progress Track (Desktop Only) */}
              <div className="hidden md:block w-1 h-64 bg-slate-800 rounded-full relative overflow-hidden">
                 <div ref={progressRef} className="w-full bg-teal-500 absolute top-0 left-0" />
              </div>
              
              <div className="mt-8 flex items-center gap-2 text-slate-500 text-xs font-mono uppercase">
                 <ArrowDown className="w-4 h-4 animate-bounce" />
                 <span>Scroll to Execute</span>
              </div>
           </div>
        </div>

        {/* --- RIGHT COLUMN: STEP CARDS --- */}
        <div className="md:w-2/3 relative h-[600px] md:h-auto"> 
           {/* Mobile: Standard vertical stack. Desktop: Pinned absolute stack (handled by GSAP) */}
           <div className="relative w-full h-full">
              {data.map((step, i) => (
                <div
                  key={step.id}
                  ref={(el) => (stepsRef.current[i] = el)}
                  className="w-full relative mb-8 md:mb-0 md:opacity-0" // md:opacity-0 hides them until GSAP takes over
                  style={{ zIndex: i }}
                >
                  <div className="bg-[#0B1120] border border-slate-700 p-8 md:p-12 rounded-lg relative overflow-hidden group hover:border-teal-500/50 transition-colors duration-500 shadow-2xl">
                     
                     {/* Decorative Tech Corners */}
                     <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-teal-500/50" />
                     <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-teal-500/50" />

                     <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
                        
                        {/* Number Block */}
                        <div className="flex-shrink-0">
                           <div className="text-6xl md:text-8xl font-bold font-mono text-slate-800/50 select-none group-hover:text-teal-500/10 transition-colors">
                              0{i + 1}
                           </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                           <div className="flex items-center gap-3 mb-4">
                              <span className="text-xs font-bold font-mono text-teal-400 bg-teal-500/10 px-2 py-1 rounded border border-teal-500/20">
                                 WEEKS {i * 6 + 1}-{(i + 1) * 6}
                              </span>
                              <div className="h-px flex-1 bg-slate-800" />
                           </div>
                           
                           <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                              {step.title}
                           </h3>
                           
                           <p className="text-slate-400 text-lg leading-relaxed mb-6">
                              {step.description}
                           </p>

                           {/* Tags */}
                           <div className="flex flex-wrap gap-2">
                              {['Lab_Access', 'Cert_Ready', 'Deployment'].map((tag, idx) => (
                                 <div key={idx} className="flex items-center gap-1 text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-2 py-1 rounded">
                                    <Database className="w-3 h-3" />
                                    {tag}
                                 </div>
                              ))}
                           </div>
                        </div>

                     </div>
                     
                     {/* Background Glow */}
                     <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl group-hover:bg-teal-500/10 transition-colors pointer-events-none" />
                  </div>
                </div>
              ))}
              
              {/* Empty spacer for the last element on mobile/desktop flow */}
              <div className="h-20 md:hidden" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;