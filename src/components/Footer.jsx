// src/components/Footer.jsx
import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  const partners = [
    'Mayo Clinic', 
    'Cleveland Clinic', 
    'Johns Hopkins Medicine', 
    'Massachusetts General Hospital',
    'Stanford Health Care',
    'UCSF Medical Center'
  ];

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`Newsletter signup: ${email}`);
  };

  return (
    <footer className="bg-transparent border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Column 1: Logo & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-10 h-10 bg-gradient-to-br from-blue-600 via-teal-500 to-cyan-400 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">HM</span>
              </div>
              <span className="text-xl font-bold">Hospital Manufacturing</span>
            </div>
            <p className="text-sm text-slate-400">
              Pioneering excellence in medical device production training and certification. ISO 13485 aligned curriculum.
            </p>
          </div>
          
          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-teal-400">Quick Links</h4>
            <ul className="space-y-2 text-slate-400">
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
              <li><a href="#modules" className="hover:text-white transition">Full Curriculum</a></li>
              <li><a href="#demo" className="hover:text-white transition">3D Demo</a></li>
              <li><a href="#manual" className="hover:text-white transition">Download Manual</a></li>
              <li><a href="#testimonials" className="hover:text-white transition">Testimonials</a></li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-teal-400">Contact Us</h4>
            <ul className="space-y-3 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-500 shrink-0" />
                <span>123 Medical Tech Park, Suite 400, Innovation City, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-500 shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-500 shrink-0" />
                <a href="mailto:info@hospitalmanufacturing.com" className="hover:text-white transition">info@hm.com</a>
              </li>
            </ul>
          </div>
          
          {/* Column 4: Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-4 text-teal-400">Stay Updated</h4>
            <p className="text-sm text-slate-400 mb-4">
              Subscribe to our newsletter for the latest regulatory updates and course launches.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col space-y-3">
              <input
                type="email"
                name="email"
                placeholder="Your email address"
                required
                className="p-3 rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
              <button
                type="submit"
                className="bg-teal-600 px-4 py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Partners & Copyright */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
          <h5 className="text-sm font-semibold mb-4 text-slate-400">Trusted by Professionals at:</h5>
          <p className="text-xs text-slate-500 italic max-w-4xl mx-auto">
            {partners.join(' | ')}
          </p>
          <p className="text-sm text-slate-500 mt-6">
            &copy; {new Date().getFullYear()} Hospital Manufacturing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;