import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Award, Globe, TrendingUp } from 'lucide-react';

const Stats = () => {
  const statsRef = useRef([]);

  useEffect(() => {
    statsRef.current.forEach((el) => {
      const endValue = parseInt(el.dataset.value);
      
      gsap.fromTo(
        el,
        { innerText: 0 },
        {
          innerText: endValue,
          duration: 2.5,
          ease: 'power2.out',
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          onUpdate: function() {
            el.innerText = Math.ceil(this.targets()[0].innerText);
          }
        }
      );
    });
  }, []);

  const stats = [
    { icon: Users, value: 10000, suffix: '+', label: 'Students Trained', color: 'from-blue-500 to-cyan-500' },
    { icon: Award, value: 95, suffix: '%', label: 'Success Rate', color: 'from-teal-500 to-emerald-500' },
    { icon: Globe, value: 180, suffix: '+', label: 'Cities Covered', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, value: 98, suffix: '%', label: 'Job Placement', color: 'from-orange-500 to-red-500' }
  ];

  return (
    <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Transforming careers and setting industry standards
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="relative group"
              >
                <div className="bg-transparent/50 backdrop-blur-xl p-8 rounded-3xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 h-full">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} mb-6 group-hover:scale-110 transition transform`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>

                  {/* Number */}
                  <div className="mb-4">
                    <span
                      ref={el => statsRef.current[i] = el}
                      data-value={stat.value}
                      className="text-5xl font-extrabold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"
                    >
                      0
                    </span>
                    <span className="text-3xl font-bold text-teal-400">{stat.suffix}</span>
                  </div>

                  {/* Label */}
                  <p className="text-slate-400 font-medium">{stat.label}</p>

                  {/* Glow effect */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r ${stat.color} rounded-3xl blur opacity-0 group-hover:opacity-30 transition duration-500 -z-10`} />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;