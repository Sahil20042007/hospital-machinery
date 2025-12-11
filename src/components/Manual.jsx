// src/components/Manual.jsx
import React from 'react';
import { Download, Shield, Camera, BookOpen } from 'lucide-react';

const ManualSection = ({ manualRef, handleDownloadManual }) => {
  const manualFeatures = [
    { icon: Shield, title: 'Safety Protocols', desc: 'OSHA & ISO compliant' },
    { icon: Camera, title: 'Maintenance Schedules', desc: 'Preventive plans' },
    { icon: BookOpen, title: 'Technical Specifications', desc: 'Detailed equipment data' }
  ];

  return (
    <section id="manual" ref={manualRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive Technical Documentation
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Access our complete 200+ page technical manual with detailed procedures and safety guidelines
          </p>
          
          <button 
            onClick={handleDownloadManual}
            className="group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50 transition transform"
          >
            <Download className="w-6 h-6" />
            Download Complete Manual
            <span className="group-hover:translate-x-1 transition transform">→</span>
          </button>
        </div>

        {/* Manual Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {manualFeatures.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={i}
                className="scroll-reveal bg-slate-900/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-teal-500 transition group"
              >
                <div className="p-3 bg-teal-500/10 rounded-lg inline-flex mb-4 group-hover:bg-teal-500/20 transition">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-teal-400 transition">
                  {feature.title}
                </h3>
                <p className="text-slate-400 text-sm">{feature.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ManualSection;