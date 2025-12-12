import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Global GSAP registration (call once in App.jsx)
export const registerGSAP = () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.config({
        force3D: true,
        nullTargetWarn: false
    });
};

// Scroll reveal utility (used by useScrollReveal hook)
export const scrollReveal = (elements, config = {}) => {
    const defaults = {
        opacity: 0,
        y: 50,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
            start: 'top 85%',
            toggleActions: 'play none none reverse'
        }
    };
    gsap.fromTo(elements, { opacity: 0, y: 50 }, { ...defaults, ...config });
};

// Pin stepper utility (used in Steps.jsx)
export const pinStepper = (section, steps) => {
    ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        // FIX 1: Change to a valid function returning a template literal string
        end: () => `+=${section.offsetHeight * 1.5}`, 
        pin: true,
        pinSpacing: true,
        scrub: 1
    });

    steps.forEach((step, i) => {
        gsap.fromTo(
            step,
            { opacity: 0, x: -50 },
            {
                opacity: 1,
                x: 0,
                scrollTrigger: {
                    trigger: section,
                    // FIX 2: Ensure the function returns a valid template literal string
                    start: () => `top+=${i * 200} top`, 
                    // FIX 3: Ensure the function returns a valid template literal string
                    end: () => `top+=${(i + 1) * 200} top`, 
                    scrub: 1
                }
            }
        );
    });
};

// Magnetic hover effect (CPU-friendly, constrained movement)
export const magneticEffect = (element, event, bounds = { x: 20, y: 20, rotation: 5 }) => {
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    const moveX = (x / rect.width) * bounds.x;
    const moveY = (y / rect.height) * bounds.y;
    const rotateX = (y / rect.height) * -bounds.rotation;
    const rotateY = (x / rect.width) * bounds.rotation;

    gsap.to(element, {
        x: moveX,
        y: moveY,
        rotationX: rotateX,
        rotationY: rotateY,
        duration: 0.3,
        ease: 'power2.out'
    });
};

// Camera tween for 3D hotspot focus
export const cameraTween = (camera, controls, target, duration = 1.5) => {
    gsap.to(camera.position, {
        x: target.x + 2,
        y: target.y + 1,
        z: target.z + 2,
        duration,
        ease: 'power2.inOut'
    });
    gsap.to(controls.target, {
        x: target.x,
        y: target.y,
        z: target.z,
        duration,
        ease: 'power2.inOut',
        onUpdate: () => controls.update()
    });
};

// Match media helper for responsive animations
export const responsiveAnimations = () => {
    const mm = gsap.matchMedia();
    mm.add({
        isDesktop: '(min-width: 1024px)',
        isTablet: '(min-width: 768px) and (max-width: 1023px)',
        isMobile: '(max-width: 767px)'
    });
    return mm;
};