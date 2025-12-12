import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Wrench, Info } from 'lucide-react';

const Modal = ({ hotspot, onClose }) => {
  // Focus trap and ESC key handler
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    // Focus trap
    const focusableElements = document.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    const handleTab = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.addEventListener('keydown', handleTab);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.9, y: 50, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="motion-element bg-slate-900 rounded-2xl p-8 max-w-md w-full relative shadow-2xl border border-teal-500/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-teal-400 transition"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex items-center gap-4 mb-4 border-b border-slate-800 pb-4">
          <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center font-bold text-white text-xl">
            {hotspot.id}
          </div>
          <h2 id="modal-title" className="text-2xl font-bold text-teal-400">
            {hotspot.label}
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 font-semibold text-slate-300 mb-1">
              <Info className="w-5 h-5 text-blue-400" />
              <span>Overview</span>
            </div>
            <p className="text-slate-400">{hotspot.description}</p>
          </div>

          <div>
            <div className="flex items-center gap-2 font-semibold text-slate-300 mb-1">
              <Wrench className="w-5 h-5 text-cyan-400" />
              <span>Technical Details</span>
            </div>
            <p className="text-slate-400 text-sm italic">{hotspot.details}</p>
          </div>
        </div>

        <motion.button
          onClick={onClose}
          className="mt-6 w-full bg-gradient-to-r from-blue-600 to-teal-600 py-3 rounded-lg font-semibold"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Close
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;