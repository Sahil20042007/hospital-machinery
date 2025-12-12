import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, Check, Play } from 'lucide-react';

const Hero = () => {
  // Parallax effect using Framer Motion's useScroll
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -100]);

  // Stagger animation variants for hero content
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
      {/* Animated Background with Parallax */}
      <motion.div 
        style={{ y }}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl motion-element" />
        <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl motion-element" />
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Animated Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-semibold backdrop-blur-sm">
                <motion.span 
                  className="w-2 h-2 bg-teal-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                Industry-Leading Certification Program
              </span>
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="motion-element text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              Master Hospital
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Machinery Manufacturing
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl"
            >
              Comprehensive training in medical device production, sterilization equipment, and regulatory compliance.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <motion.button
                className="motion-element group bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center"
                whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(20, 184, 166, 0.5)' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                Enroll Now
                <motion.span 
                  className="ml-2"
                  initial={{ x: 0 }}
                  whileHover={{ x: 5 }}
                >
                  →
                </motion.span>
              </motion.button>
              <motion.button
                className="motion-element group border-2 border-slate-600 hover:border-teal-500 px-8 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm flex items-center justify-center"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5 mr-2" />
                View 3D Demo
              </motion.button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex flex-wrap gap-6 pt-6 border-t border-slate-800"
            >
              {['ISO 13485 Aligned', 'FDA Compliant', '24/7 Support'].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-teal-400" />
                  <span className="text-slate-400">{item}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - 3D Card with Hover Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              className="motion-element relative w-full max-w-lg"
              whileHover={{ scale: 1.04, rotateY: 5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl shadow-blue-900/30 border border-slate-700/50 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 backdrop-blur-3xl" />
                
                <div className="relative z-10 text-center p-8">
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  >
                    <Camera className="w-24 h-24 mx-auto mb-4 text-teal-400" />
                  </motion.div>
                  <p className="text-lg font-semibold text-slate-300 mb-2">Interactive 3D Model</p>
                  <p className="text-sm text-slate-500">Click View Demo to explore</p>
                </div>

                <motion.div 
                  className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-20 blur-xl transition duration-500"
                />
              </div>

              <div className="absolute -top-4 -right-4 bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 shadow-xl">
                <p className="text-xs text-slate-400">Drag to rotate</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;