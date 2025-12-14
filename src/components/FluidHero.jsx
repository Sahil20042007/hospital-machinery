import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FluidHero = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // We only animate the text now, because the background is handled globally
    const ctx = gsap.context(() => {
      gsap.fromTo(textRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out", delay: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Notice: No <video> tag here anymore! It's just content.
  return (
    <section ref={containerRef} className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
      
      {/* Foreground Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div ref={textRef} className="max-w-3xl">
          <div className="w-20 h-1 bg-[#A100FF] mb-8" />
          <h1 className="text-6xl md:text-8xl font-bold text-white tracking-tight leading-tight mb-8">
            SHAPING <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A100FF] to-blue-500">
              TOMORROW
            </span>
            , TODAY
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed max-w-2xl">
            In a world of constant change, reinvention is a continuous strategy. We rewrite the rules of innovation and resilience.
          </p>
          <button className="group flex items-center gap-3 text-white font-bold text-lg border-b-2 border-white pb-1 hover:text-[#A100FF] hover:border-[#A100FF] transition-all duration-300">
            See what we do
            <span className="group-hover:translate-x-2 transition-transform duration-300">
              <ArrowRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FluidHero;