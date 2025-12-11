// src/utils/animations.js (Renamed to data.js, containing constants)

// You can move all the constants/data objects here
/*
export const modules = [ 
  // ...
];

export const steps = [
  // ...
];

export const curriculum = [
  // ...
];

export const testimonials = [
  // ...
];

export const hotspots = [
  // ...
];
*/

// For the scroll animation logic (if you want it isolated)
/*
export const revealOnScroll = () => {
    // ... IntersectionObserver logic from App.jsx useEffect
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
      observer.observe(el);
    });

    return () => observer.disconnect();
};
*/