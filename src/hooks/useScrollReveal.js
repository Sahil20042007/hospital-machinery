// src/hooks/useScrollReveal.js
import { useEffect } from 'react';

/**
 * Custom hook to apply a 'reveal' class to elements with the 'scroll-reveal' class
 * when they enter the viewport.
 * * @param {number} threshold - The percentage of the target element visible before the callback is invoked (0.0 to 1.0).
 * @param {string} selector - The CSS selector for elements to observe.
 */
const useScrollReveal = (threshold = 0.1, selector = '.scroll-reveal') => {
  useEffect(() => {
    // Check if the Intersection Observer API is available
    if (!('IntersectionObserver' in window)) {
      // Fallback for older browsers (optional: just display elements immediately)
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('reveal');
      });
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Add the reveal class when element enters viewport
          entry.target.classList.add('reveal');
          // Stop observing once it's revealed
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold });

    // Find all elements to observe
    const elementsToObserve = document.querySelectorAll(selector);
    
    // Start observing each element
    elementsToObserve.forEach(el => {
      observer.observe(el);
    });

    // Cleanup function: disconnect the observer when the component unmounts
    return () => observer.disconnect();
  }, [threshold, selector]);
};

export default useScrollReveal;

// NOTE: To use this, you need to import it into src/App.jsx and replace the old useEffect:
// import useScrollReveal from './hooks/useScrollReveal';
// ...
// const App = () => {
//   // ... state and refs
//   useScrollReveal(); // Call the hook here
//   // ... rest of the component
// }