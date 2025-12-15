import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star, Briefcase, CornerDownRight } from 'lucide-react';

const Testimonials = ({ data = [] }) => {
  const sectionRef = useRef(null);
  const leftColumnRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = data.length > 0 ? data : [
    {
      name: "Sarah Chen",
      role: "Lead Biomed Engineer",
      company: "Mayo Clinic",
      quote: "The HM-9000 series completely redefined our diagnostic workflow. The precision in the motor assembly module is unlike anything we've tested in the last decade.",
      rating: 5
    },
    {
      name: "Marcus Thorne",
      role: "Production Director",
      company: "Siemens Healthineers",
      quote: "We implemented the safety protocols from the curriculum immediately. The reduction in downtime was measurable within 48 hours. This training program teaches you 'why', not just 'how'.",
      rating: 5
    },
    {
      name: "Dr. Aris Thorne",
      role: "Head of R&D",
      company: "Boston Scientific",
      quote: "Finally, a technical manual that speaks the language of modern manufacturing. The 3D schematic breakdown is brilliant. It bridged the gap between our design team and the floor operators.",
      rating: 5
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. PINNING LOGIC (The Fix)
      // This forces the Left Column to stay 'stuck' to the screen
      // while the Right Column scrolls.
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top", 
        end: "bottom bottom", 
        pin: leftColumnRef.current, // <--- We pin the Left Column specifically
        pinSpacing: false, // Prevents extra whitespace issues
      });

      // 2. ACTIVE STATE LOGIC
      // This detects which quote is visible and updates the name
      const quotes = gsap.utils.toArray('.testimonial-quote');
      quotes.forEach((quote, i) => {
        ScrollTrigger.create({
          trigger: quote,
          start: "top center+=10%", // Updates slightly before center
          end: "bottom center+=10%",
          onEnter: () => setActiveIndex(i),
          onEnterBack: () => setActiveIndex(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [testimonials]);

  return (
    <section 
      ref={sectionRef} 
      id="testimonials" 
      className="relative bg-black text-white border-t border-slate-800"
    >
      {/* 'items-start' is critical for split-scroll layouts */}
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-start">
        
        {/* --- LEFT COLUMN: PINNED IDENTITY --- */}
        <div 
           ref={leftColumnRef} 
           className="lg:w-1/2 h-screen p-8 md:p-16 flex flex-col justify-center bg-black border-r border-slate-800 z-20"
        >
          <div className="mb-12">
             <div className="flex items-center gap-3 text-teal-500 mb-4">
                <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                <span className="text-xs font-mono uppercase tracking-widest">Operator Feedback</span>
             </div>
             <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                Success <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">
                  Stories
                </span>
             </h2>
          </div>

          {/* DYNAMIC CONTENT SWITCHER */}
          <div className="relative h-[250px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "circOut" }}
                className="absolute inset-0"
              >
                {/* Huge Index Number */}
                <div className="text-[140px] leading-none font-bold text-slate-800/20 absolute -top-16 -left-10 select-none -z-10 font-mono pointer-events-none">
                  0{activeIndex + 1}
                </div>

                {/* User Info */}
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center gap-1">
                      {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-teal-400 fill-teal-400" />
                      ))}
                   </div>
                   
                   <div>
                     <h3 className="text-3xl font-bold text-white mb-2">
                       {testimonials[activeIndex].name}
                     </h3>
                     <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 text-slate-400">
                           <Briefcase className="w-4 h-4 text-teal-500" />
                           <span className="font-mono text-sm uppercase tracking-wider">
                              {testimonials[activeIndex].role}
                           </span>
                        </div>
                        <div className="text-slate-500 text-sm pl-6">
                           @ {testimonials[activeIndex].company}
                        </div>
                     </div>
                   </div>

                   <div className="flex items-center gap-2 text-xs font-mono text-slate-600 mt-8">
                      <CornerDownRight className="w-4 h-4" />
                      <span>ID_VERIFIED_{Math.floor(Math.random() * 9000) + 1000}</span>
                   </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* --- RIGHT COLUMN: SCROLLING CONTENT --- */}
        {/* We add ample bottom padding to ensure the last item scrolls fully */}
        <div className="lg:w-1/2 bg-black relative z-10 pb-[20vh]">
           {/* Decorative Grid */}
           <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:100%_80px] opacity-10 pointer-events-none" />

           <div className="pt-[20vh]">
             {testimonials.map((item, index) => (
               <div 
                 key={index} 
                 className="testimonial-quote min-h-[80vh] flex items-center p-8 md:p-20 border-b border-slate-800/50 last:border-0"
               >
                 <div 
                    className={`transition-all duration-700 ease-out ${
                       activeIndex === index 
                         ? 'opacity-100 translate-y-0 blur-0' 
                         : 'opacity-20 translate-y-8 blur-sm'
                    }`}
                 >
                    <Quote className="w-12 h-12 text-teal-500 mb-8 opacity-50" />
                    <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-200">
                      "{item.quote}"
                    </p>
                 </div>
               </div>
             ))}
           </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;