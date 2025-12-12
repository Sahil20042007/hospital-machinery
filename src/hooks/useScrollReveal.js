import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * GSAP-based scroll reveal hook
 * Replaces IntersectionObserver with GSAP ScrollTrigger for hardware-accelerated animations
 * 
 * Performance note: This hook applies transform/opacity animations only (GPU-accelerated)
 * Call refresh() when dynamic content is added to recalculate ScrollTrigger positions
 */
const useScrollReveal = (selector = '.scroll-reveal') => {
  useEffect(() => {
    // Ensure ScrollTrigger is registered
    gsap.registerPlugin(ScrollTrigger);

    // Find all elements with the selector
    const elements = gsap.utils.toArray(selector);

    if (elements.length === 0) return;

    // Apply GSAP animation to each element
    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: 50,
          rotationX: -5
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
            // Use matchMedia to disable on mobile for performance
            ...gsap.matchMedia().add('(max-width: 768px)', {
              start: 'top 90%'
            })
          }
        }
      );
    });

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector]);

  // Expose refresh utility
  const refresh = () => ScrollTrigger.refresh();
  const kill = () => ScrollTrigger.getAll().forEach((t) => t.kill());

  return { refresh, kill };
};

export default useScrollReveal;