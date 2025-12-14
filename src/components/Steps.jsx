import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

const Steps = ({ data = [] }) => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);
  const progressRef = useRef(null);
  const timelinesRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: Pinned stepper with synchronized timing
    mm.add('(min-width: 768px)', () => {
      const section = sectionRef.current;
      const steps = stepsRef.current.filter(Boolean);

      if (!section || steps.length === 0) return;

      // Calculate scroll distance - MORE space per step
      const scrollDistance = steps.length * 150; // Increased from 100 to 150vh per step

      // Pin the section
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: `+=${scrollDistance}vh`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        anticipatePin: 1
      });

      // Create master timeline
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: `+=${scrollDistance}vh`,
          scrub: 1
        }
      });

      timelinesRef.current.push(masterTimeline);

      // NEW: Better timing logic - each step gets MORE time
      steps.forEach((step, i) => {
        if (!step) return;

        // Each step lifecycle takes MORE timeline space
        const stepDuration = 1.5; // Increased from 1 to 1.5
        const startTime = i * stepDuration;

        // Phase 1: Fade IN (30% of time)
        masterTimeline.fromTo(
          step,
          { 
            opacity: 0, 
            x: -80,
            scale: 0.95
          },
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: stepDuration * 0.3,
            ease: 'power2.out'
          },
          startTime
        );

        // Phase 2: STAY VISIBLE (50% of time) - INCREASED
        masterTimeline.to(
          step,
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: stepDuration * 0.5, // Increased from 0.4 to 0.5
            ease: 'none'
          },
          startTime + stepDuration * 0.3
        );

        // Phase 3: Fade OUT (20% of time) - only if not last step
        if (i < steps.length - 1) {
          masterTimeline.to(
            step,
            {
              opacity: 0.2, // More subtle fade
              x: 50,
              scale: 0.95,
              duration: stepDuration * 0.2,
              ease: 'power2.in'
            },
            startTime + stepDuration * 0.8
          );
        } else {
          // Last step stays at full opacity
          masterTimeline.to(
            step,
            {
              opacity: 1,
              x: 0,
              scale: 1,
              duration: stepDuration * 0.2,
              ease: 'none'
            },
            startTime + stepDuration * 0.8
          );
        }
      });

      // Progress bar
      if (progressRef.current) {
        gsap.fromTo(
          progressRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: `+=${scrollDistance}vh`,
              scrub: 1
            }
          }
        );
      }
    });

    // Mobile: Simple stacked layout
    mm.add('(max-width: 767px)', () => {
      const steps = stepsRef.current.filter(Boolean);
      
      if (steps.length === 0) return;

      gsap.fromTo(
        steps,
        { opacity: 0, y: 60, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: 0.25,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Cleanup
    return () => {
      timelinesRef.current.forEach(tl => {
        if (tl) tl.kill();
      });
      timelinesRef.current = [];

      ScrollTrigger.getAll().forEach(trigger => {
        trigger.kill();
      });

      stepsRef.current.forEach(step => {
        if (step) {
          gsap.set(step, { clearProps: 'all' });
        }
      });

      if (progressRef.current) {
        gsap.set(progressRef.current, { clearProps: 'all' });
      }

      mm.revert();
    };
  }, [data]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-48 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="text-sm font-semibold tracking-widest uppercase text-teal-400 bg-teal-400/10 px-4 py-2 rounded-full border border-teal-400/20">
              Learning Path
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
            Your Learning Journey
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            A structured 24-week program with hands-on certification
          </p>

          {/* Progress indicator */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="h-1 bg-slate-700 rounded-full overflow-hidden">
              <div 
                ref={progressRef}
                className="h-full bg-gradient-to-r from-teal-500 to-blue-500 origin-left"
              />
            </div>
            <p className="text-sm text-slate-500 mt-2">Scroll to explore each step</p>
          </div>
        </div>

        {/* Steps Container */}
        <div className="space-y-8 max-w-4xl mx-auto">
          {data.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => {
                if (el) stepsRef.current[i] = el;
              }}
              className="relative group"
            >
              {/* Connection line */}
              {i < data.length - 1 && (
                <div className="hidden md:block absolute left-8 top-20 w-0.5 h-20 bg-gradient-to-b from-teal-500 to-transparent" />
              )}

              <div className="flex items-start gap-6 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 shadow-xl">
                
                {/* Step Number Circle */}
                <div className="flex-shrink-0 relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-500/30 to-blue-500/30 rounded-full flex items-center justify-center border-2 border-teal-400 group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-8 h-8 text-teal-400" />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  
                  {/* Step number badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-gradient-to-br from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg">
                    {i + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-teal-400 transition-colors">
                      {step.title}
                    </h3>
                    
                    {/* Duration badge */}
                    <span className="text-xs font-semibold px-3 py-1 bg-teal-500/20 text-teal-400 rounded-full border border-teal-500/30">
                      Week {i * 6 + 1}-{(i + 1) * 6}
                    </span>
                  </div>

                  <p className="text-slate-300 text-lg leading-relaxed mb-4">
                    {step.description}
                  </p>

                  {/* Feature tags */}
                  <div className="flex flex-wrap gap-2">
                    {['Hands-on', 'Certified', 'Industry Ready'].map((tag, idx) => (
                      <span 
                        key={idx}
                        className="text-xs px-3 py-1 bg-slate-700/50 text-slate-400 rounded-full border border-slate-600/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Hover effect bar */}
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full transition-all duration-500" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Completion indicator */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-500/20 to-blue-500/20 rounded-full border border-teal-400/30">
            <CheckCircle className="w-5 h-5 text-teal-400" />
            <span className="text-sm font-semibold text-slate-300">
              Complete all steps to earn your certification
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Steps;