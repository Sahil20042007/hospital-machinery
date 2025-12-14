import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const MriSection = () => {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. Image Zoom-Out Effect
      // As the section enters the screen, the image scales down from 1.5 to 1.0
      gsap.fromTo(imageRef.current,
        { scale: 1.5 }, // Start Zoomed In
        {
          scale: 1.0,   // End Normal
          ease: "none", // Linear movement for smooth scrubbing
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Start when top of section hits bottom of screen
            end: "center center", // End when section is in the middle
            scrub: 1.5, // Smooth lag
          }
        }
      );

      // 2. Text Slide-Up Effect
      gsap.fromTo(textRef.current,
        { opacity: 0, x: 50 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top center+=100", // Start slightly later
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-[80vh] flex flex-col md:flex-row bg-black overflow-hidden">
      
      {/* --- LEFT SIDE: IMAGE (Masked) --- */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-auto relative overflow-hidden">
        {/* The Image itself - We animate this ref */}
        <img 
          ref={imageRef}
          src="https://plus.unsplash.com/premium_photo-1682130157004-057c137d96d5?q=80&w=2600&auto=format&fit=crop" 
          alt="Advanced MRI Scanner"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Dark Gradient to blend with the black background */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-black/60 md:to-transparent" />
      </div>

      {/* --- RIGHT SIDE: TEXT --- */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-20 bg-black z-10">
        <div ref={textRef} className="max-w-xl">
          
          {/* Accent Line */}
          <div className="w-16 h-1 bg-[#A100FF] mb-6" />

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Next-Gen <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A100FF] to-blue-500">
              Imaging Precision
            </span>
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-8">
            Our latest MRI technology reduces scan times by 40% while delivering crystal-clear neurological imaging. Designed for patient comfort and engineered for diagnostic accuracy.
          </p>

          {/* Accenture Style Button */}
          <button className="group flex items-center gap-3 text-white font-bold text-lg hover:text-[#A100FF] transition-colors">
            View Specifications
            <div className="bg-[#A100FF] p-2 rounded-full group-hover:bg-white transition-colors">
               <ArrowRight className="w-4 h-4 text-white group-hover:text-black" />
            </div>
          </button>

        </div>
      </div>
    </section>
  );
};

export default MriSection;