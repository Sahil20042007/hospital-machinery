import React, { useEffect, useRef, useState } from 'react';
import { Camera, Shield, BookOpen, Download, ChevronDown, Menu, X, RotateCw, ZoomIn, ZoomOut, Play, Check, Mail, MapPin, Phone } from 'lucide-react';

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(null);
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [show3DModal, setShow3DModal] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  
  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const stepsRef = useRef(null);
  const manualRef = useRef(null);
  const curriculumRef = useRef(null);

  // Scroll handler for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll reveal animations
  useEffect(() => {
    const revealOnScroll = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.scroll-reveal').forEach(el => {
        observer.observe(el);
      });

      return () => observer.disconnect();
    };

    const timeout = setTimeout(() => {
      revealOnScroll();
    }, 100);

    return () => clearTimeout(timeout);
  }, []);

  const modules = [
    { 
      title: 'Manufacturing Process', 
      icon: Camera, 
      description: 'Master end-to-end production workflows, quality control protocols, and lean manufacturing principles for medical devices.',
      color: 'from-blue-500 to-blue-600'
    },
    { 
      title: 'Safety & Standards', 
      icon: Shield, 
      description: 'Comprehensive training in ISO 13485, FDA 21 CFR Part 820, EU MDR compliance, and workplace safety regulations.',
      color: 'from-teal-500 to-teal-600'
    },
    { 
      title: 'User Manual & Documentation', 
      icon: BookOpen, 
      description: 'Technical documentation, SOPs, maintenance schedules, and troubleshooting guides with real-world case studies.',
      color: 'from-cyan-500 to-cyan-600'
    }
  ];

  const steps = [
    { 
      number: '01',
      title: 'Foundation & Theory', 
      description: 'Core principles of medical device manufacturing, regulatory landscape, and equipment specifications. Interactive modules with knowledge checks.',
      icon: BookOpen
    },
    { 
      number: '02',
      title: 'Hands-On Assembly', 
      description: 'Virtual and physical training on component integration, calibration procedures, and precision assembly techniques with 3D simulations.',
      icon: Camera
    },
    { 
      number: '03',
      title: 'Testing & Validation', 
      description: 'Quality assurance protocols, IQ/OQ/PQ validation, statistical process control, and non-conformance investigation procedures.',
      icon: Shield
    },
    { 
      number: '04',
      title: 'Industry Certification', 
      description: 'Final assessment and industry-recognized credential. Join our alumni network and access continuing education resources.',
      icon: Check
    }
  ];

  const curriculum = [
    { 
      module: 'Module 1: Introduction to Medical Device Manufacturing',
      duration: '4 weeks',
      topics: [
        'Regulatory landscape overview (FDA, ISO, EU MDR)',
        'Medical device classifications and risk management',
        'Equipment overview and facility requirements',
        'GMP and cleanroom protocols'
      ]
    },
    { 
      module: 'Module 2: Sterilization & Processing Equipment',
      duration: '6 weeks',
      topics: [
        'Autoclave systems: operation and validation',
        'Ethylene oxide (ETO) sterilizers and safety',
        'Low-temperature plasma sterilization',
        'Biological and chemical indicators'
      ]
    },
    { 
      module: 'Module 3: Production Line Machinery',
      duration: '8 weeks',
      topics: [
        'Assembly line automation and robotics',
        'Packaging and labeling systems',
        'Vision systems for quality inspection',
        'Serialization and traceability (UDI)'
      ]
    },
    { 
      module: 'Module 4: Maintenance, Troubleshooting & Compliance',
      duration: '6 weeks',
      topics: [
        'Preventive and predictive maintenance strategies',
        'Common failure modes and root cause analysis',
        'Spare parts management and documentation',
        'Continuous improvement and CAPA processes'
      ]
    }
  ];

  const testimonials = [
    { 
      name: 'Dr. Sarah Johnson', 
      role: 'Senior Manufacturing Engineer, MedTech Solutions',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      quote: 'This course transformed my understanding of medical device manufacturing. The 3D demonstrations and hands-on approach made complex machinery operations incredibly clear.',
      rating: 5
    },
    { 
      name: 'Michael Chen, PE', 
      role: 'Quality Systems Manager, BioMed Innovations',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      quote: 'Comprehensive curriculum that covers both theoretical foundations and practical applications. The certification significantly enhanced my career opportunities.',
      rating: 5
    },
    { 
      name: 'Emma Williams', 
      role: 'Validation Specialist, Global Health Devices',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      quote: 'The interactive 3D models and detailed user manuals are unmatched. This is the gold standard for technical training in our industry.',
      rating: 5
    }
  ];

  const partners = [
    'Mayo Clinic', 
    'Cleveland Clinic', 
    'Johns Hopkins Medicine', 
    'Massachusetts General Hospital',
    'Stanford Health Care',
    'UCSF Medical Center'
  ];

  const hotspots = [
    { 
      id: 1, 
      label: 'Control Panel', 
      description: 'Digital touchscreen interface with programmable logic controller (PLC) for precision parameter control, real-time monitoring, and data logging capabilities.',
      position: { x: -0.5, y: 0.8, z: 0 },
      details: 'Features include temperature regulation ±0.1°C, pressure monitoring 0-100 PSI, and integrated alarm systems.'
    },
    { 
      id: 2, 
      label: 'Drive System', 
      description: 'High-torque servo motor assembly with variable frequency drive (VFD) providing 0.1-100 RPM speed control and 500 Nm maximum torque output.',
      position: { x: 0.6, y: 0, z: 0.3 },
      details: 'Includes encoder feedback, thermal protection, and emergency brake system with <50ms response time.'
    },
    { 
      id: 3, 
      label: 'Safety Interlock System', 
      description: 'Multi-point detection network with redundant sensors, light curtains, and emergency stop circuits compliant with ISO 13849-1 Category 3.',
      position: { x: 0, y: -0.5, z: 0.8 },
      details: 'Auto-shutdown triggers on door opening, parameter deviation, or manual E-stop activation.'
    }
  ];

  const handleDownloadManual = () => {
    window.open('/manuals/sample.pdf', '_blank');
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    alert(`Newsletter signup: ${email}`);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
      {/* Skip Navigation Link */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-teal-600 px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      {/* Navbar */}
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
              <a href="#about" className="block text-slate-300 hover:text-teal-400 py-2">About</a>
              <a href="#modules" className="block text-slate-300 hover:text-teal-400 py-2">Course Modules</a>
              <a href="#manual" className="block text-slate-300 hover:text-teal-400 py-2">User Manual</a>
              <a href="#demo" className="block text-slate-300 hover:text-teal-400 py-2">3D Demo</a>
              <a href="#testimonials" className="block text-slate-300 hover:text-teal-400 py-2">Testimonials</a>
              <button 
                onClick={handleDownloadManual}
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

      {/* Hero Section */}
      <main id="main-content">
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

        {/* Course Quick Overview */}
        <section id="about" ref={overviewRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30 relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Comprehensive Training Program
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Three core pillars of medical device manufacturing excellence
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {modules.map((module, i) => {
                const IconComponent = module.icon;
                return (
                  <div 
                    key={i}
                    className="scroll-reveal group bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-teal-900/20"
                    style={{ transitionDelay: `${i * 100}ms` }}
                  >
                    <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${module.color} mb-6 group-hover:scale-110 transition transform`}>
                      <IconComponent className="w-12 h-12" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-400 transition">
                      {module.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {module.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section ref={stepsRef} className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Your Learning Journey
              </h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                A structured 24-week program with certification
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => {
                const IconComponent = step.icon;
                return (
                  <div 
                    key={i} 
                    className="scroll-reveal relative group"
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl border border-slate-700 hover:border-teal-500 transition-all duration-500 h-full relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition duration-500"></div>
                      
                      <div className="relative z-10">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="text-6xl font-bold text-teal-500/20 group-hover:text-teal-500/40 transition">
                            {step.number}
                          </div>
                          <div className="p-3 bg-teal-500/10 rounded-lg group-hover:bg-teal-500/20 transition">
                            <IconComponent className="w-8 h-8" />
                          </div>
                        </div>
                        
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-400 transition">
                          {step.title}
                        </h3>
                        <p className="text-slate-400 leading-relaxed">
                          {step.description}
                        </p>
                      </div>

                      {i < steps.length - 1 && (
                        <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gradient-to-r from-teal-500 to-transparent"></div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* User Manual Preview */}
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
              {[
                { icon: Shield, title: 'Safety Protocols', desc: 'OSHA & ISO compliant' },
                { icon: Camera, title: 'Maintenance Schedules', desc: 'Preventive plans' },
                { icon: BookOpen, title: 'Technical Specifications', desc: 'Detailed equipment data' }
              ].map((feature, i) => {
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

        {/* 3D Demo Section */}
        <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Interactive 3D Equipment Demo
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Explore machinery in 3D. Click hotspots to learn about each component
              </p>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm rounded-2xl border border-slate-700 p-8 relative">
              <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5"></div>
                
                <div className="relative z-10 text-center">
                  <Camera className="w-32 h-32 mx-auto mb-6 text-teal-400 animate-float" />
                  <p className="text-2xl font-bold mb-2">3D Model Viewer</p>
                  <p className="text-slate-400">Interactive demonstration</p>
                </div>

                {[
                  { x: 25, y: 30, id: 1 },
                  { x: 70, y: 50, id: 2 },
                  { x: 50, y: 75, id: 3 }
                ].map(spot => (
                  <button
                    key={spot.id}
                    onClick={() => setSelectedHotspot(hotspots[spot.id - 1])}
                    className="absolute w-10 h-10 bg-teal-500/80 hover:bg-teal-400 rounded-full animate-pulse-ring hover:scale-125 transition transform flex items-center justify-center font-bold shadow-lg shadow-teal-500/50"
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    aria-label={`Hotspot ${spot.id}`}
                  >
                    {spot.id}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-4 justify-center">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition">
                  <RotateCw className="w-4 h-4" />
                  Reset View
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition">
                  <ZoomIn className="w-4 h-4" />
                  Zoom In
                </button>
              </div>
            </div>

            {/* Hotspot Legend */}
            <div className="mt-8 grid md:grid-cols-3 gap-6">
              {hotspots.map(spot => (
                <div 
                  key={spot.id}
                  className="bg-slate-900/70 backdrop-blur-sm p-6 rounded-xl border border-slate-700 hover:border-teal-500 transition cursor-pointer"
                  onClick={() => setSelectedHotspot(spot)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-bold shrink-0">
                      {spot.id}
                    </div>
                    <div>
                      <h4 className="font-bold mb-2">{spot.label}</h4>
                      <p className="text-sm text-slate-400">{spot.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Curriculum Section */}
        <section id="modules" ref={curriculumRef} className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Course Curriculum
              </h2>
              <p className="text-xl text-slate-400">
                24-week comprehensive program with certification
              </p>
            </div>

            <div className="space-y-4">
              {curriculum.map((item, i) => (
                <div 
                  key={i}
                  className="scroll-reveal bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden hover:border-teal-500 transition"
                >
                  <button
                    onClick={() => setActiveModule(activeModule === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-slate-800/50 transition group"
                    aria-expanded={activeModule === i}
                  >
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 group-hover:text-teal-400 transition">
                        {item.module}
                      </h3>
                      <p className="text-sm text-slate-400">{item.duration}</p>
                    </div>
                    <ChevronDown 
                      className={`w-6 h-6 text-slate-400 group-hover:text-teal-400 transition transform ${
                        activeModule === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  {activeModule === i && (
                    <div className="px-6 pb-6 space-y-3 border-t border-slate-800 pt-4">
                      {item.topics.map((topic, j) => (
                        <div key={j} className="flex items-start gap-3 group">
                          <div className="w-6 h-6 rounded-full bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-teal-500/20 transition">
                            <Check className="w-4 h-4 text-teal-400" />
                          </div>
                          <span className="text-slate-300 group-hover:text-white transition">
                            {topic}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <button className="bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 hover:shadow-2xl hover:shadow-teal-500/50 transition transform">
                Download Full Syllabus
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-slate-400">
                Hear from professionals who transformed their careers
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, i) => (
                <div 
                  key={i}
                  className="scroll-reveal bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700 hover:border-teal-500 transition-all duration-500 hover:transform hover:scale-105"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, j) => (
                      <span key={j} className="text-yellow-400 text-xl">★</span>
                    ))}
                  </div>

                  <p className="text-slate-300 mb-6 italic leading-relaxed">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-slate-800">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-teal-500"
                    />
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-slate-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Partner Logos */}
            <div className="mt-20">
              <p className="text-center text-slate-400 mb-8 font-semibold">
                Trusted by Leading Medical Institutions
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                {partners.map((partner, i) => (
                  <div 
                    key={i}
                    className="text-center p-4 rounded-lg bg-slate-900/30 border border-slate-800 hover:border-slate-700 transition"
                  >
                    <p className="text-slate-500 font-semibold text-sm hover:text-slate-400 transition">
                      {partner}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-slate-950 border-t border-slate-800 py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
              {/* Company Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold">HM</span>
                  </div>
                  <span className="font-bold text-lg">Hospital Manufacturing</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                  Leading the industry in medical device manufacturing education and professional development.
                </p>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition">
                    <span className="text-sm">Li</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition">
                    <span className="text-sm">Tw</span>
                  </a>
                  <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-teal-600 transition">
                    <span className="text-sm">Fb</span>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-bold text-lg mb-4">Quick Links</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#about" className="text-slate-400 hover:text-teal-400 transition">About Program</a></li>
                  <li><a href="#modules" className="text-slate-400 hover:text-teal-400 transition">Curriculum</a></li>
                  <li><a href="#demo" className="text-slate-400 hover:text-teal-400 transition">3D Demo</a></li>
                  <li><a href="#testimonials" className="text-slate-400 hover:text-teal-400 transition">Testimonials</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition">Pricing</a></li>
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h4 className="font-bold text-lg mb-4">Resources</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition">User Manual</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition">FAQs</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition">Support Center</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition">Blog</a></li>
                  <li><a href="#" className="text-slate-400 hover:text-teal-400 transition">Contact Us</a></li>
                </ul>
              </div>

              {/* Contact & Newsletter */}
              <div>
                <h4 className="font-bold text-lg mb-4">Stay Updated</h4>
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-teal-400 mt-0.5" />
                    <span className="text-slate-400">info@hospitalmanufacturing.edu</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="w-4 h-4 text-teal-400 mt-0.5" />
                    <span className="text-slate-400">+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-teal-400 mt-0.5" />
                    <span className="text-slate-400">Boston, MA 02108</span>
                  </div>
                </div>

                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email"
                    required
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-sm focus:outline-none focus:border-teal-500 transition"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-teal-600 px-4 py-2 rounded-lg text-sm font-semibold hover:scale-105 transition transform"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
              <p>&copy; 2024 Hospital Manufacturing Machineries. All rights reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-teal-400 transition">Privacy Policy</a>
                <a href="#" className="hover:text-teal-400 transition">Terms of Service</a>
                <a href="#" className="hover:text-teal-400 transition">Accessibility</a>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Hotspot Modal */}
      {selectedHotspot && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedHotspot(null)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="hotspot-title"
        >
          <div 
            className="bg-slate-900 rounded-2xl p-8 max-w-2xl w-full border border-slate-700 shadow-2xl animate-modal-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center font-bold text-xl">
                  {selectedHotspot.id}
                </div>
                <h3 id="hotspot-title" className="text-2xl font-bold">
                  {selectedHotspot.label}
                </h3>
              </div>
              <button
                onClick={() => setSelectedHotspot(null)}
                className="p-2 hover:bg-slate-800 rounded-lg transition"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <p className="text-slate-300 mb-6 leading-relaxed text-lg">
              {selectedHotspot.description}
            </p>

            <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 mb-6">
              <h4 className="font-semibold mb-3 text-teal-400">Technical Details</h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                {selectedHotspot.details}
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setSelectedHotspot(null)}
                className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition transform"
              >
                Got It
              </button>
              <button
                onClick={() => {
                  setSelectedHotspot(null);
                  handleDownloadManual();
                }}
                className="flex-1 border-2 border-slate-600 px-6 py-3 rounded-lg font-semibold hover:border-teal-500 hover:bg-slate-800 transition"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(20, 184, 166, 0); }
          100% { box-shadow: 0 0 0 0 rgba(20, 184, 166, 0); }
        }

        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        .hero-headline,
        .hero-subhead,
        .hero-cta-1,
        .hero-cta-2,
        .hero-model {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .hero-headline { animation-delay: 0.1s; }
        .hero-subhead { animation-delay: 0.3s; }
        .hero-cta-1 { animation-delay: 0.5s; }
        .hero-cta-2 { animation-delay: 0.6s; }
        .hero-model { animation-delay: 0.7s; }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }

        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-modal-in {
          animation: modal-in 0.3s ease-out;
        }

        .scroll-reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease-out;
        }

        .scroll-reveal.reveal {
          opacity: 1;
          transform: translateY(0);
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        .focus\\:not-sr-only:focus {
          position: static;
          width: auto;
          height: auto;
          padding: inherit;
          margin: inherit;
          overflow: visible;
          clip: auto;
          white-space: normal;
        }

        html {
          scroll-behavior: smooth;
        }

        *:focus-visible {
          outline: 2px solid #14b8a6;
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default App;