import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Clock, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

const Curriculum = ({ data = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="modules" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Detailed Course Curriculum
          </h2>
          <p className="text-xl text-slate-400">
            A structured program covering every essential topic
          </p>
        </motion.div>

        <div className="space-y-4">
          {data.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/50 transition text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl font-bold text-teal-400">
                      Phase {index + 1}:
                    </span>
                    <h3 className="text-2xl font-bold">{phase.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span>{phase.duration}</span>
                  </div>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-6 h-6 text-teal-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="border-t border-slate-700"
                  >
                    <div className="p-6 space-y-3">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-teal-400" />
                        <h4 className="font-semibold text-lg">Key Topics:</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        {phase.topics.map((topic, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="flex items-center gap-2 text-slate-300"
                          >
                            <span className="w-2 h-2 bg-teal-400 rounded-full" />
                            {topic}
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Curriculum;