import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const MagicCursor = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const trailRefs = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Hide default cursor
    document.body.style.cursor = 'none';

    const onMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      gsap.set(dotRef.current, {
        x: e.clientX,
        y: e.clientY
      });
    };

    const tick = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      gsap.set(cursorRef.current, {
        x: pos.current.x,
        y: pos.current.y
      });

      // Trail effect
      trailRefs.current.forEach((trail, i) => {
        const lag = (i + 1) * 0.08;
        gsap.to(trail, {
          x: pos.current.x,
          y: pos.current.y,
          duration: 0.5 - lag,
          ease: 'power2.out'
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    gsap.ticker.add(tick);

    // Hover interactions
    const hoverTargets = document.querySelectorAll('a, button, [data-cursor="hover"]');
    
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => {
        gsap.to(cursorRef.current, {
          scale: 3,
          backgroundColor: 'rgba(20, 184, 166, 0.3)',
          duration: 0.3
        });
        gsap.to(dotRef.current, { scale: 0, duration: 0.2 });
      });

      el.addEventListener('mouseleave', () => {
        gsap.to(cursorRef.current, {
          scale: 1,
          backgroundColor: 'transparent',
          duration: 0.3
        });
        gsap.to(dotRef.current, { scale: 1, duration: 0.2 });
      });
    });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      gsap.ticker.remove(tick);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <>
      {/* Trail dots */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          ref={el => trailRefs.current[i] = el}
          className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[9999]"
          style={{
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, rgba(56, 189, 248, ${0.4 - i * 0.1}), transparent)`,
            opacity: 0.6 - i * 0.2
          }}
        />
      ))}

      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-12 h-12 rounded-full pointer-events-none z-[9999] border-2 border-teal-400 transition-colors"
        style={{
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 20px rgba(20, 184, 166, 0.5), inset 0 0 10px rgba(20, 184, 166, 0.3)',
          backdropFilter: 'blur(4px)'
        }}
      />

      {/* Center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none z-[9999]"
        style={{
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, #14b8a6, #0891b2)',
          boxShadow: '0 0 15px rgba(20, 184, 166, 0.8)'
        }}
      />
    </>
  );
};

export default MagicCursor;