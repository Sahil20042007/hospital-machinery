import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CheckCircle } from 'lucide-react';

const Steps = ({ data = [] }) => {
  const sectionRef = useRef(null);
  const stepsRef = useRef([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: Pinned stepper experience
    mm.add('(min-width: 768px)', () => {
      const section = sectionRef.current;
      const steps = stepsRef.current;

      // Pin the section while animating steps
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${section.offsetHeight * 1.5}`,
        pin: true,
        pinSpacing: true,
        scrub: 1
      });

      // Animate each step into view
      steps.forEach((step, i) => {
        gsap.fromTo(
          step,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: section,
              start: () => `top+=${i * 200} top`,
              end: () => `top+=${(i + 1) * 200} top`,
              scrub: 1,
              toggleActions: 'play none none reverse'
            }
          }
        );
      });
    });

    // Mobile: Simple stacked layout
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        stepsRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Your Learning Journey
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            A structured 24-week program with hands-on certification
          </p>
        </div>

        <div className="space-y-8">
          {data.map((step, i) => (
            <div
              key={step.id}
              ref={(el) => (stepsRef.current[i] = el)}
              className="flex items-start gap-6 bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-teal-500 transition"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-teal-500/20 rounded-full flex items-center justify-center border-2 border-teal-500">
                  <CheckCircle className="w-8 h-8 text-teal-400" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2 text-teal-400">
                  {step.title}
                </h3>
                <p className="text-slate-300 text-lg">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Steps;