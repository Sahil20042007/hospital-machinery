// src/components/Hero.jsx
import React from 'react';
import { Camera, Check, Play } from 'lucide-react';

const Hero = ({ heroRef, setShow3DModal }) => {
  return (
    <section ref={heroRef} className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-semibold backdrop-blur-sm">
                <span className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></span>
                Industry-Leading Certification Program
              </span>
            </div>

            <h1 className="hero-headline text-5xl md:text-6xl lg:text-7xl font-bold leading-tight opacity-0">
              Master Hospital
              <span className="block mt-2 bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent">
                Machinery Manufacturing
              </span>
            </h1>

            <p className="hero-subhead text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl opacity-0">
              Comprehensive training in medical device production, sterilization equipment, and regulatory compliance. Gain hands-on expertise with interactive 3D simulations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="hero-cta-1 opacity-0 group bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50 transition transform flex items-center justify-center">
                Enroll Now
                <span className="ml-2 group-hover:translate-x-1 transition transform">→</span>
              </button>
              <button 
                onClick={() => setShow3DModal(true)}
                className="hero-cta-2 opacity-0 group border-2 border-slate-600 hover:border-teal-500 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-slate-800/50 transition flex items-center justify-center backdrop-blur-sm"
              >
                <Play className="w-5 h-5 mr-2 group-hover:text-teal-400 transition" />
                View 3D Demo
              </button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap gap-6 pt-6 border-t border-slate-800">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-teal-400" />
                <span className="text-slate-400">ISO 13485 Aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-teal-400" />
                <span className="text-slate-400">FDA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-teal-400" />
                <span className="text-slate-400">24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Right Column - 3D Preview */}
          <div className="hero-model opacity-0 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              <div className="aspect-square bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl shadow-blue-900/30 border border-slate-700/50 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 backdrop-blur-3xl"></div>
                
                <div className="relative z-10 text-center p-8">
                  <Camera className="w-24 h-24 mx-auto mb-4 text-teal-400 animate-float" />
                  <p className="text-lg font-semibold text-slate-300 mb-2">Interactive 3D Model</p>
                  <p className="text-sm text-slate-500">Click View Demo to explore</p>
                </div>

                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500">
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500 opacity-20 blur-xl"></div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-slate-800/90 backdrop-blur-md px-4 py-2 rounded-lg border border-slate-700 shadow-xl">
                <p className="text-xs text-slate-400">Drag to rotate</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;