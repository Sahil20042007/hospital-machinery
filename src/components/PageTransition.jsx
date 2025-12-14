import React from 'react';
import { motion } from 'framer-motion';

const transition = {
  duration: 0.8,
  ease: [0.6, 0.01, 0.05, 0.95]
};

const PageTransition = ({ children }) => {
  return (
    <>
      {/* Sliding reveal panels */}
      <motion.div
        className="fixed inset-0 bg-gradient-to-br from-blue-600 to-teal-600 z-[9998] origin-left"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 1 }}
        transition={transition}
      />
      
      <motion.div
        className="fixed inset-0 bg-transparent z-[9997] origin-right"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        exit={{ scaleX: 0 }}
        transition={{ ...transition, delay: 0.1 }}
      />

      {/* Page content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;