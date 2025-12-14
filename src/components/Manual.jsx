import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, Shield, Camera, BookOpen } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Manual = () => {
  const accordionRef = useRef(null);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    // GSAP accordion animation
    const content = accordionRef.current;
    if (!content) return;

    const tl = gsap.timeline({ paused: true });
    tl.to(content, {
      height: 'auto',
      opacity: 1,
      duration: 0.4,
      ease: 'power2.inOut'
    });

    if (isOpen) {
      tl.play();
    } else {
      tl.reverse();
    }
  }, [isOpen]);

  const handleDownloadManual = () => {
    window.open('/manuals/sample.pdf', '_blank');
  };

  const manualFeatures = [
    { icon: Shield, title: 'Safety Protocols', desc: 'OSHA & ISO compliant' },
    { icon: Camera, title: 'Maintenance Schedules', desc: 'Preventive plans' },
    { icon: BookOpen, title: 'Technical Specifications', desc: 'Detailed equipment data' }
  ];

  return (
    <section id="manual" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Comprehensive Technical Documentation
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Access our complete 200+ page technical manual with detailed procedures and safety guidelines
          </p>
          
          <motion.button
            onClick={handleDownloadManual}
            className="motion-element group inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-4 rounded-xl text-lg font-semibold"
            whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(20, 184, 166, 0.5)' }}
            whileTap={{ scale: 0.98 }}
          >
            <Download className="w-6 h-6" />
            Download Complete Manual
            <motion.span
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          {manualFeatures.map((feature, i) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 , duration: 0.6 }}
className="bg-transparent/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-teal-500 transition group"
whileHover={{ y: -5 }}
>
<div className="p-3 bg-teal-500/10 rounded-lg inline-flex mb-4 group-hover:bg-teal-500/20 transition">
<IconComponent className="w-8 h-8" />
</div>
<h3 className="font-bold text-lg mb-2 group-hover:text-teal-400 transition">
{feature.title}
</h3>
<p className="text-slate-400 text-sm">{feature.desc}</p>
</motion.div>
);
})}
</div>
 {/* Flip/Accordion Preview */}
 <motion.div
   initial={{ opacity: 0 }}
   whileInView={{ opacity: 1 }}
   viewport={{ once: true }}
   className="mt-12 bg-transparent/50 rounded-xl p-6 border border-slate-700"
 >
   <button
     onClick={() => setIsOpen(!isOpen)}
     className="w-full flex items-center justify-between text-left"
   >
     <span className="text-xl font-bold">Preview: Safety Section</span>
     <motion.span
       animate={{ rotate: isOpen ? 180 : 0 }}
       transition={{ duration: 0.3 }}
     >
       ▼
     </motion.span>
   </button>
   <div
     ref={accordionRef}
     style={{ height: 0, opacity: 0, overflow: 'hidden' }}
     className="mt-4 text-slate-400"
   >
     <p>This section covers OSHA regulations, PPE requirements, emergency procedures, and equipment-specific safety protocols. Full details available in the complete manual.</p>
   </div>
 </motion.div>
   </div>
 </section>


);
};
export default Manual;