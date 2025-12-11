// src/components/Navbar.jsx
import React from 'react';
import { Download, Menu, X } from 'lucide-react';

const Navbar = ({ scrollY, mobileMenuOpen, setMobileMenuOpen, handleDownloadManual }) => {
  return (
    <nav 
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrollY > 50 
          ? 'bg-slate-900/95 backdrop-blur-lg py-3 shadow-2xl shadow-blue-900/20 border-b border-slate-800/50' 
          : 'bg-transparent py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/50 transform hover:scale-105 transition">
              <span className="text-white font-bold text-xl">HM</span>
            </div>
            <div>
              <span className="text-xl font-bold block">Hospital Manufacturing</span>
              <span className="text-xs text-slate-400">Medical Device Excellence</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-8 items-center">
            <a href="#about" className="text-slate-300 hover:text-teal-400 transition font-medium">About</a>
            <a href="#modules" className="text-slate-300 hover:text-teal-400 transition font-medium">Course Modules</a>
            <a href="#manual" className="text-slate-300 hover:text-teal-400 transition font-medium">User Manual</a>
            <a href="#demo" className="text-slate-300 hover:text-teal-400 transition font-medium">3D Demo</a>
            <a href="#testimonials" className="text-slate-300 hover:text-teal-400 transition font-medium">Testimonials</a>
            <button 
              onClick={handleDownloadManual}
              className="border-2 border-teal-500 text-teal-400 px-5 py-2 rounded-lg hover:bg-teal-500/10 transition font-semibold flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Manual
            </button>
            <button className="bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-2 rounded-lg hover:scale-105 hover:shadow-lg hover:shadow-teal-500/50 transition transform font-semibold">
              Enroll Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t border-slate-800 pt-4">
            <a onClick={() => setMobileMenuOpen(false)} href="#about" className="block text-slate-300 hover:text-teal-400 py-2">About</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#modules" className="block text-slate-300 hover:text-teal-400 py-2">Course Modules</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#manual" className="block text-slate-300 hover:text-teal-400 py-2">User Manual</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#demo" className="block text-slate-300 hover:text-teal-400 py-2">3D Demo</a>
            <a onClick={() => setMobileMenuOpen(false)} href="#testimonials" className="block text-slate-300 hover:text-teal-400 py-2">Testimonials</a>
            <button 
              onClick={() => { handleDownloadManual(); setMobileMenuOpen(false); }}
              className="w-full border-2 border-teal-500 text-teal-400 px-5 py-2 rounded-lg hover:bg-teal-500/10 transition font-semibold flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Manual
            </button>
            <button className="w-full bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 rounded-lg font-semibold">
              Enroll Now
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;