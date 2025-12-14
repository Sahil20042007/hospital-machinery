import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef(null);

    // --- 1. SCROLL TRIGGER LOGIC ---
    useEffect(() => {
        let ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: document.body,
                start: 'top -50',
                end: 99999,
                onUpdate: (self) => {
                    setScrolled(self.progress > 0);
                }
            });
        }, navRef);
        return () => ctx.revert();
    }, []);

    // --- 2. LINKS DATA ---
    const links = ['About', 'Modules', 'Manual', 'Demo', 'Curriculum'];

    return (
        <motion.nav
            ref={navRef}
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }} // "Apple-style" ease
            className={`fixed top-0 w-full z-50 transition-all duration-500 ${
                scrolled 
                ? 'bg-black/80 backdrop-blur-md py-4 border-b border-white/10' 
                : 'bg-transparent py-8'
            }`}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div className="flex justify-between items-center">

                    {/* --- LEFT: NAVIGATION LINKS (The "Avant-Garde" Switch) --- */}
                    <div className="hidden lg:flex items-center gap-8">
                        {links.map((item, i) => (
                            <MagneticLink key={item} href={`#${item.toLowerCase()}`}>
                                {item}
                            </MagneticLink>
                        ))}
                        
                        {/* "Enroll" is now a text link with an arrow, editorial style */}
                        <a href="#enroll" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[#A100FF] hover:text-white transition-colors">
                            Enroll Now
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </a>
                    </div>

                    {/* --- MOBILE TOGGLE (Left side on mobile) --- */}
                    <div className="lg:hidden">
                        <button 
                            onClick={() => setMobileMenuOpen(true)}
                            className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    {/* --- RIGHT: BRAND NAME (The "Name at the Last") --- */}
                    {/* This mimics the Rejouice style of big, corner-anchored branding */}
                    <motion.div 
                        className="text-right"
                        whileHover={{ scale: 0.98 }}
                    >
                        <a href="#" className="block group">
                            <h1 className="text-xl md:text-2xl font-bold tracking-tighter text-white uppercase leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-teal-400 transition-all duration-300">
                                Hospital Mfg.
                            </h1>
                            <span className="text-[10px] md:text-xs font-mono text-gray-400 tracking-[0.2em] uppercase group-hover:text-white transition-colors">
                                Est. 2025 • Medical Excellence
                            </span>
                        </a>
                    </motion.div>

                </div>
            </div>

            {/* --- 3. FULL SCREEN MOBILE MENU (Rejouice Style) --- */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: '-100%' }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: '-100%' }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }} // Bezier curve for premium feel
                        className="fixed inset-0 bg-black z-[60] flex flex-col p-8 md:p-12"
                    >
                        {/* Mobile Header */}
                        <div className="flex justify-between items-start mb-20">
                            <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Navigation</span>
                            <button 
                                onClick={() => setMobileMenuOpen(false)}
                                className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors text-white"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Mobile Links (Massive Text like Rejouice) */}
                        <div className="flex flex-col gap-6">
                            {[...links, 'Enroll Now'].map((item, i) => (
                                <motion.a
                                    key={item}
                                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setMobileMenuOpen(false)}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + (i * 0.05) }}
                                    className="text-5xl md:text-7xl font-bold text-white hover:text-[#A100FF] transition-colors tracking-tight"
                                >
                                    {item}
                                </motion.a>
                            ))}
                        </div>

                        {/* Mobile Footer Brand */}
                        <div className="mt-auto pt-12 border-t border-white/10">
                            <h2 className="text-2xl font-bold text-white tracking-tighter uppercase">Hospital Mfg.</h2>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

// --- SUB-COMPONENT: MAGNETIC LINK ---
// Adds a subtle "pull" effect to links on hover
const MagneticLink = ({ href, children }) => {
    return (
        <motion.a
            href={href}
            className="relative text-sm font-medium text-gray-300 hover:text-white uppercase tracking-widest transition-colors py-2"
            whileHover="hover"
        >
            {children}
            {/* The "Underline" that slides in */}
            <motion.span 
                className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-left"
                variants={{
                    hover: { scaleX: 1 },
                    initial: { scaleX: 0 }
                }}
                initial="initial"
                transition={{ duration: 0.3 }}
            />
        </motion.a>
    );
};

export default Navbar;