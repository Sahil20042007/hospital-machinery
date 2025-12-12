import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Rocket, Layers, Zap, TrendingUp } from 'lucide-react';

// Map icon strings to components
const iconMap = {
  Rocket,
  Layers,
  Zap,
  TrendingUp
};

const Modules = ({ data = [] }) => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP ScrollTrigger reveal with rotationX effect for depth
    const cards = cardsRef.current;
    
    gsap.fromTo(
      cards,
      {
        opacity: 0,
        y: 80,
        rotationX: -15
      },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === sectionRef.current) trigger.kill();
      });
    };
  }, []);

  // Magnetic hover effect (CPU-friendly, constrained movement)
  const handleMouseMove = (e, index) => {
    const card = cardsRef.current[index];
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Constrain to ±20px translation and ±5deg rotation
    const moveX = (x / rect.width) * 20;
    const moveY = (y / rect.height) * 20;
    const rotateX = (y / rect.height) * -5;
    const rotateY = (x / rect.width) * 5;

    gsap.to(card, {
      x: moveX,
      y: moveY,
      rotationX: rotateX,
      rotationY: rotateY,
      duration: 0.3,
      ease: 'power2.out'
    });
  };

  const handleMouseLeave = (index) => {
    const card = cardsRef.current[index];
    gsap.to(card, {
      x: 0,
      y: 0,
      rotationX: 0,
      rotationY: 0,
      duration: 0.5,
      ease: 'power2.out'
    });
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30 relative"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Training Program
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Four core pillars of medical device manufacturing excellence
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((module, i) => {
            const IconComponent = iconMap[module.icon] || Rocket;
            
            return (
              <motion.div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="motion-element group bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 cursor-pointer"
                style={{ perspective: 1000 }}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                whileHover={{ scale: 1.02 }}
                tabIndex={0}
                onFocus={() => cardsRef.current[i]?.classList.add('border-teal-500/50')}
                onBlur={() => cardsRef.current[i]?.classList.remove('border-teal-500/50')}
              >
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br from-blue-500 to-teal-500 mb-6 group-hover:scale-110 transition transform`}>
                  <IconComponent className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-400 transition">
                  {module.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {module.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Modules;