import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1581093458791-9f302e6d8359?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800",
  "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
];

const Modules = ({ data = [] }) => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(headerRef.current, 
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
          }
        }
      );

      // Cards Stagger Entrance
      gsap.fromTo(cardRefs.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="modules" ref={sectionRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div ref={headerRef} className="mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Research & <br/>
            <span className="text-[#A100FF]">Development</span>
          </h2>
          <div className="w-20 h-1 bg-[#A100FF] mb-6"></div>
        </div>

        {/* CARD GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((module, i) => (
            <AccentureHoverCard 
              key={i} 
              index={i} 
              module={module}
              image={placeholderImages[i % placeholderImages.length]}
              addToRefs={(el) => (cardRefs.current[i] = el)} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// --- ✨ COMPONENT: ACCENTURE HOVER CARD ---
const AccentureHoverCard = ({ module, image, addToRefs }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      ref={addToRefs}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[450px] w-full overflow-hidden cursor-pointer bg-black group"
    >
      {/* 1. BACKGROUND IMAGE LAYER (Visible by default) */}
      <div 
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      >
        <img 
          src={image} 
          alt={module.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      {/* 2. SOLID COLOR LAYER (Hidden by default, visible on hover) */}
      <div 
        className={`absolute inset-0 bg-[#460073] transition-opacity duration-500 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* 3. CONTENT CONTAINER */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
        
        {/* Top Label (Always visible) */}
        <div className={`absolute top-8 left-8 text-xs font-bold tracking-widest uppercase transition-colors duration-300 ${isHovered ? 'text-white/80' : 'text-gray-300'}`}>
          Research Report
        </div>

        {/* Text Container (Moves up slightly on hover) */}
        <div className={`transform transition-transform duration-500 ease-out ${isHovered ? '-translate-y-2' : 'translate-y-0'}`}>
          <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
            {module.title}
          </h3>
          
          {/* Paragraph Text (Reveal Animation) */}
          <div 
            className={`overflow-hidden transition-all duration-500 ease-in-out ${isHovered ? 'max-h-40 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}
          >
            <p className="text-gray-200 text-sm leading-relaxed">
              {module.description}
            </p>
          </div>

          {/* Expand Button */}
          <div className="flex items-center text-sm font-bold text-white tracking-wide">
            <span className="mr-2 group-hover:underline decoration-2 underline-offset-4">Expand</span>
            <ArrowRight className={`w-5 h-5 transition-transform duration-300 ${isHovered ? 'translate-x-2' : ''}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modules;