import React from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

const Footer = () => {
  const partners = [
    'Mayo Clinic', 
    'Cleveland Clinic', 
    'Johns Hopkins', 
    'Mass General',
    'Stanford Health',
    'UCSF Medical'
  ];

  return (
    <footer className="bg-black text-white pt-20 pb-6 px-6 overflow-hidden border-t border-white/10">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- TOP SECTION: Content Grid --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 mb-24">
          
          {/* LEFT: Slogan & Newsletter */}
          <div className="space-y-12">
            <div>
              <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-2">
                Precision. Safety. Excellence.
              </h3>
              <p className="text-gray-400 text-lg">
                Redefining medical manufacturing standards.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-500 uppercase tracking-widest">Sign up for updates</p>
              <form className="relative max-w-md group">
                <input 
                  type="email" 
                  placeholder="Email Address" 
                  className="w-full bg-transparent border-b border-white/20 py-4 text-xl placeholder-gray-600 focus:outline-none focus:border-white transition-colors"
                />
                <button type="submit" className="absolute right-0 top-1/2 -translate-y-1/2 opacity-50 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className="w-6 h-6" />
                </button>
              </form>
            </div>

            <div className="pt-8">
              <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Contact</p>
              <a href="mailto:info@hm.com" className="text-2xl hover:text-gray-300 transition-colors">
                info@hm.com
              </a>
            </div>
          </div>

          {/* RIGHT: Navigation Links */}
          <div className="flex flex-col md:flex-row gap-12 lg:gap-24 lg:justify-end text-lg">
            
            {/* Column 1 */}
            <ul className="space-y-2">
              <li><span className="text-gray-500 text-sm uppercase tracking-widest block mb-4">Explore</span></li>
              {['About', 'Modules', 'Manual', 'Demo'].map((item) => (
                <li key={item}>
                  <a href={`#${item.toLowerCase()}`} className="block hover:text-gray-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Column 2 */}
            <ul className="space-y-2">
              <li><span className="text-gray-500 text-sm uppercase tracking-widest block mb-4">Resources</span></li>
              {['Curriculum', 'Testimonials', 'Student Login'].map((item) => (
                <li key={item}>
                  <a href="#" className="block hover:text-gray-400 transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            {/* Column 3: Socials */}
            <ul className="space-y-2">
              <li><span className="text-gray-500 text-sm uppercase tracking-widest block mb-4">Social</span></li>
              {['LinkedIn', 'Instagram', 'Twitter'].map((item) => (
                <li key={item}>
                  <a href="#" className="group flex items-center gap-1 hover:text-gray-400 transition-colors">
                    {item} <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* --- MIDDLE: Partners Text (Subtle) --- */}
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-gray-600 mb-12 uppercase tracking-wide">
          <span>Trusted By:</span>
          {partners.map((partner, i) => (
            <span key={i} className="hover:text-gray-400 transition-colors cursor-default">
              {partner}
            </span>
          ))}
        </div>

        {/* --- BOTTOM: MASSIVE BRANDING --- */}
        <div className="border-t border-white/10 pt-4 flex flex-col md:flex-row justify-between items-end">
           {/* Copyright / Location */}
           <div className="flex gap-8 text-xs text-gray-500 uppercase tracking-widest mb-4 md:mb-2">
              <span>San Francisco — USA</span>
              <span>&copy; 2024 — 2025</span>
           </div>

           {/* The "Rejouice" Style Big Text */}
           <h1 className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-white select-none">
             HOSPITAL<span className="text-gray-800">MFG</span>
           </h1>
        </div>

      </div>
    </footer>
  );
};

export default Footer;