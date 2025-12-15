import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Shield, Settings, FileText, ChevronDown, CheckCircle2, Box, Cpu } from 'lucide-react';
import { gsap } from 'gsap';

const Manual = () => {
  const containerRef = useRef(null);
  const scanBeamRef = useRef(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // GSAP Scanner Effect
  const handleHoverStart = () => {
    gsap.to(scanBeamRef.current, {
      top: '100%',
      opacity: 0.5,
      duration: 2,
      ease: 'linear',
      repeat: -1,
      yoyo: false // Loop from top to bottom like a copier scan
    });
  };

  const handleHoverEnd = () => {
    gsap.killTweensOf(scanBeamRef.current);
    gsap.to(scanBeamRef.current, { top: '0%', opacity: 0, duration: 0.3 });
  };

  const handleDownloadManual = () => {
     alert("Initializing Schematic Export...");
     window.open('/manuals/sample.pdf', '_blank');
  };

  return (
    <section id="manual" ref={containerRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-black overflow-hidden">
      
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#334155_1px,transparent_1px),linear-gradient(to_bottom,#334155_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-4 py-1 border border-teal-500/30 rounded-full bg-teal-950/30 mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span className="text-teal-400 text-xs font-mono uppercase tracking-widest">System Documentation v2.4</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
            Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400">Schematics</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          
          {/* --- LEFT: MASTER SCHEMATIC CARD (The New "Blueprint" Look) --- */}
          <div className="lg:col-span-3">
             <div 
               className="relative bg-[#0B1120] border border-slate-700 w-full h-full rounded-sm overflow-hidden group"
               onMouseEnter={handleHoverStart}
               onMouseLeave={handleHoverEnd}
             >
                {/* 1. BLUEPRINT GRID BACKGROUND */}
                <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#2dd4bf_1px,transparent_1px),linear-gradient(to_bottom,#2dd4bf_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
                
                {/* 2. THE SCANNER BEAM */}
                <div 
                  ref={scanBeamRef}
                  className="absolute left-0 w-full h-[2px] bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)] opacity-0 z-20 pointer-events-none"
                />

                <div className="p-8 relative z-10 h-full flex flex-col">
                   
                   {/* Top Technical Labels */}
                   <div className="flex justify-between items-start border-b border-dashed border-slate-700 pb-6 mb-6">
                      <div>
                        <div className="text-xs text-slate-500 font-mono mb-1">PROJECT ID</div>
                        <div className="text-teal-400 font-mono text-lg tracking-widest">HM-PRO-X1</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-slate-500 font-mono mb-1">STATUS</div>
                        <div className="text-emerald-400 font-mono text-xs border border-emerald-500/30 px-2 py-1 rounded bg-emerald-950/30">APPROVED FOR MFG</div>
                      </div>
                   </div>

                   {/* Main Content Area */}
                   <div className="flex-1 flex flex-col md:flex-row gap-8">
                      
                      {/* Left: Wireframe Visual */}
                      <div className="w-full md:w-1/3 aspect-square border border-slate-700 bg-slate-900/50 relative flex items-center justify-center">
                         {/* Corner Markers */}
                         <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-500" />
                         <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-500" />
                         <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-500" />
                         <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-500" />
                         
                         {/* Animated Wireframe Box */}
                         <motion.div 
                           animate={{ rotateY: 360, rotateX: 360 }}
                           transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                           className="relative"
                         >
                            <Box className="w-16 h-16 text-teal-500/80 stroke-1" />
                         </motion.div>
                         <div className="absolute bottom-2 text-[10px] text-slate-500 font-mono">FIG 1.1 - ISO VIEW</div>
                      </div>

                      {/* Right: Data List */}
                      <div className="flex-1">
                         <h3 className="text-xl font-bold text-white mb-2 font-mono">Master Operator Manual</h3>
                         <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                            Full vector schematics for assembly, wiring, and thermal regulation systems. Includes 3D exploded views.
                         </p>

                         <div className="space-y-3 font-mono text-xs text-slate-300">
                            {[
                               { label: 'FORMAT', val: 'PDF / CAD' },
                               { label: 'SIZE', val: '245 MB' },
                               { label: 'LAYERS', val: 'Electrical, Mech, Safety' }
                            ].map((row, i) => (
                               <div key={i} className="flex justify-between border-b border-slate-800 pb-2">
                                  <span className="text-slate-500">{row.label}</span>
                                  <span>{row.val}</span>
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>

                   {/* Bottom Action Area */}
                   <div className="mt-8 pt-6 border-t border-dashed border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
                      <div className="text-[10px] text-slate-500 font-mono">
                         <div className="flex items-center gap-2">
                            <Shield className="w-3 h-3" />
                            <span>ENCRYPTED CONNECTION</span>
                         </div>
                      </div>
                      
                      <motion.button
                        onClick={handleDownloadManual}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(20, 184, 166, 0.2)' }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full md:w-auto px-6 py-3 bg-teal-500/10 border border-teal-500 text-teal-400 font-mono text-sm font-bold tracking-wider hover:bg-teal-500 hover:text-black transition-all flex items-center justify-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        EXPORT DATA
                      </motion.button>
                   </div>

                </div>
             </div>
          </div>

          {/* --- RIGHT: SPECS & PREVIEW (Kept similar but aligned to new style) --- */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* Spec Cards */}
            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: Shield, title: "COMPLIANCE", value: "ISO 13485" },
                { icon: Cpu, title: "SYSTEM ID", value: "SYS-9000" },
              ].map((stat, i) => (
                <div key={i} className="bg-[#0B1120] border border-slate-700 p-4 flex items-center gap-4 hover:border-teal-500/50 transition-colors group">
                  <div className="p-2 bg-slate-800 text-slate-400 group-hover:text-teal-400 transition-colors">
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-slate-500 text-[10px] font-mono uppercase tracking-wider">{stat.title}</div>
                    <div className="text-white font-mono text-sm">{stat.value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Expandable Blueprint Preview */}
            <div className="flex-1 bg-[#0B1120] border border-slate-700 flex flex-col">
               <button 
                 onClick={() => setIsPreviewOpen(!isPreviewOpen)}
                 className="w-full p-5 flex items-center justify-between hover:bg-slate-900 transition-colors border-b border-slate-700"
               >
                 <span className="font-mono text-sm text-teal-400 flex items-center gap-2">
                   <Settings className="w-4 h-4 animate-spin-slow" />
                   VIEW_LAYER_01
                 </span>
                 <motion.div animate={{ rotate: isPreviewOpen ? 180 : 0 }}>
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                 </motion.div>
               </button>
               
               <AnimatePresence>
                 {isPreviewOpen && (
                   <motion.div
                     initial={{ height: 0 }}
                     animate={{ height: 'auto' }}
                     exit={{ height: 0 }}
                     className="overflow-hidden bg-slate-950/50"
                   >
                     <div className="p-5">
                       {/* Blueprint Visual */}
                       <div className="border border-dashed border-slate-600 p-4 h-32 flex flex-col items-center justify-center bg-[url('https://www.transparenttextures.com/patterns/graphy.png')] relative overflow-hidden">
                          <div className="absolute top-2 left-2 text-[8px] font-mono text-slate-500">SCALE: 1:50</div>
                          <div className="text-center z-10">
                             <div className="text-teal-500 text-[10px] font-mono mb-1">LOADING GEOMETRY...</div>
                             <div className="w-20 h-0.5 bg-slate-700 mx-auto overflow-hidden">
                                <motion.div 
                                  initial={{ x: '-100%' }} 
                                  animate={{ x: '100%' }} 
                                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                                  className="h-full bg-teal-500 w-full" 
                                />
                             </div>
                          </div>
                       </div>
                       <div className="mt-3 flex justify-between text-[10px] font-mono text-slate-500">
                          <span>SECT: A-14</span>
                          <span>REV: 0.4</span>
                       </div>
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Manual;