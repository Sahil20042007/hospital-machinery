import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// NOTE: ScrollTrigger plugin registration is handled in App.jsx

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    
    const navRef = useRef(null); 

    useEffect(() => {
        // Wrap ScrollTrigger setup in gsap.context() for scoping and cleanup
        let ctx = gsap.context(() => {
            
            // ScrollTrigger.create will now work because the plugin is registered in App.jsx
            ScrollTrigger.create({
                trigger: document.body, // Use the body for global scroll listener
                start: 'top -50',      // Trigger after 50px of scroll
                end: 99999,
                onUpdate: (self) => {
                    // Update the state based on scroll position
                    setScrolled(self.progress > 0);
                }
            });
            
        }, navRef); // Scope the context to this component

        // Clean up the context and destroy the ScrollTrigger instance
        return () => ctx.revert(); 
    }, []); // Runs once on mount.
    
    const handleDownloadManual = () => {
        window.open('/manuals/sample.pdf', '_blank');
    };

    return (
        <motion.nav
            ref={navRef} // Attach the ref here
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            // Apply transition classes and conditional styling based on 'scrolled' state
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled 
                    ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl shadow-blue-900/20 border-b border-slate-800/50 py-3' 
                    : 'bg-transparent py-5'
            }`}
            role="navigation"
            aria-label="Main navigation"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center">
                    <motion.div 
                        className="flex items-center space-x-3"
                        whileHover={{ scale: 1.02 }}
                    >
                         <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50">
                            <span className="text-white font-bold text-xl">HM</span>
                        </div>
                        <div>
                            <span className="text-xl font-bold block">Hospital Manufacturing</span>
                            <span className="text-xs text-slate-400">Medical Device Excellence</span>
                        </div>
                    </motion.div>

                    <div className="hidden lg:flex space-x-8 items-center">
                        {['About', 'Modules', 'Manual', 'Demo', 'Curriculum', 'Testimonials'].map((item) => (
                             <motion.a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-slate-300 hover:text-teal-400 transition font-medium"
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {item}
                            </motion.a>
                        ))}
                        <motion.button
                            onClick={handleDownloadManual}
                            className="border-2 border-teal-500 text-teal-400 px-5 py-2 rounded-lg hover:bg-teal-500/10 transition font-semibold flex items-center gap-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Download className="w-4 h-4" />
                            Manual
                        </motion.button>
                        <motion.button
                            className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-2 rounded-lg font-semibold"
                            whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(20, 184, 166, 0.5)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Enroll Now
                        </motion.button>
                    </div>

                    <button 
                        className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>

                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden pb-4 space-y-3 border-t border-slate-800 pt-4"
                    >
                        {/* Ensure mobile menu links match desktop and data section names */}
                        {['About', 'Modules', 'Steps', 'Manual', 'Demo', 'Curriculum', 'Testimonials'].map((item) => (
                            <a 
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="block text-slate-300 hover:text-teal-400 py-2"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.nav>
    );
};

export default Navbar;