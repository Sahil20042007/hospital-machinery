import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
// NOTE: We keep motion but primarily use GSAP for the timeline

const IntroScreen = ({ onFinish }) => {
  const containerRef = useRef(null); 
  const logoRef = useRef(null);
  const circleRefs = useRef([]);
  const textRef = useRef(null); // ✨ NEW: Ref for the text

  useEffect(() => {
    // ⚠️ CRITICAL CHECK: Ensure elements are present before starting animation
    if (!logoRef.current || !containerRef.current || !textRef.current) {
        return; 
    }

    // Set the initial state using GSAP before the timeline starts 
    // to ensure the logo is ready to be animated from (0, 0)
    gsap.set(logoRef.current, { opacity: 0, scale: 0.5 });
    gsap.set(textRef.current, { opacity: 0, y: 20 });
    
    const tl = gsap.timeline({});

    // 1. Logo entrance (The animation that reveals the logo)
    tl.to(logoRef.current, { // Use .to() here because we set the initial state with gsap.set
      scale: 1,
      opacity: 1,
      duration: 1,
      ease: 'back.out(1.7)'
    })
    // 1b. Text entrance (Animated by GSAP for timeline consistency)
    .to(textRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'power2.out'
    }, '-=0.5') // Start text animation 0.5s before logo finishes entry
    // 2. Circles pulse out
    .to(circleRefs.current, {
      scale: 1.5,
      opacity: 0,
      stagger: 0.1,
      duration: 0.8
    }, '-=0.3')
    // 3. Logo final pulse (before exit)
    .to(logoRef.current, {
      scale: 1.2,
      duration: 0.3
    })
    // 4. Logo and Text exit
    .to([logoRef.current, textRef.current], { // Animate both out together
      scale: 0,
      opacity: 0,
      duration: 0.6
    }, '+=0.3') 
    // 5. Fade out the entire screen and call onFinish
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.5,
      onComplete: onFinish
    });

    return () => {
      tl.kill();
    };
  }, [onFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center"
    >
      {/* Animated circles */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={el => circleRefs.current[i] = el}
          className="absolute border-4 border-teal-400/30 rounded-full"
          style={{
            width: `${(i + 1) * 200}px`,
            height: `${(i + 1) * 200}px`
          }}
        />
      ))}

      {/* Logo Container (Now fully controlled by GSAP) */}
      <div ref={logoRef} className="relative z-10">
        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-teal-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-teal-500/50">
          <span className="text-white font-bold text-5xl">HM</span>
        </div>
        {/* Changed from motion.p to a regular p and added textRef */}
        <p
          ref={textRef} 
          className="text-white text-center mt-6 text-xl font-semibold tracking-wider"
        >
          Hospital Manufacturing
        </p>
      </div>
    </div>
  );
};

export default IntroScreen;