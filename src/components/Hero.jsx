import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { gsap } from 'gsap';

// 3D Imports
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, Float, Sparkles } from '@react-three/drei';

// --- 3D Component ---
const MachineModel = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshStandardMaterial 
          color="#2dd4bf" 
          roughness={0.2} 
          metalness={0.8}
          emissive="#0f766e"
          emissiveIntensity={0.2}
        />
      </mesh>
      <Sparkles count={50} scale={6} size={4} speed={0.4} opacity={0.5} color="#2dd4bf" />
    </Float>
  );
};

// --- Hero Component ---
const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const glowRefs = useRef([]);
  // ✨ FIX 1: Use State for particles instead of useRef/appendChild
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    // Floating glows GSAP
    glowRefs.current.forEach((glow, i) => {
      if(!glow) return;
      gsap.to(glow, {
        y: i % 2 === 0 ? -40 : 40,
        x: i % 2 === 0 ? 30 : -30,
        duration: 8 + i,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

    // ✨ FIX 2: Generate particle data once (React Safe)
    const newParticles = Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: 3 + Math.random() * 2,
      delay: Math.random() * 2
    }));
    setParticles(newParticles);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] } }
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
      
      {/* --- Animated Background --- */}
      <motion.div style={{ y, opacity }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <div ref={el => glowRefs.current[0] = el} className="absolute top-20 -left-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div ref={el => glowRefs.current[1] = el} className="absolute bottom-20 -right-20 w-[500px] h-[500px] bg-teal-500/20 rounded-full blur-3xl" />
        <div ref={el => glowRefs.current[2] = el} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
        
        {/* ✨ FIX 3: Render particles via Map */}
        <div className="absolute inset-0">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="absolute rounded-full bg-teal-400/80"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: p.size,
                        height: p.size,
                    }}
                    animate={{
                        y: [0, -100],
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "easeOut"
                    }}
                />
            ))}
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* --- Left Column (Text) --- */}
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
            <motion.div variants={itemVariants} className="inline-block">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-teal-500/10 border border-teal-500/30 rounded-full text-teal-400 text-sm font-semibold backdrop-blur-sm">
                <motion.span 
                  className="w-2 h-2 bg-teal-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                />
                Industry-Leading Certification
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Master Hospital
              <motion.span 
                className="block mt-2 bg-gradient-to-r from-blue-400 via-teal-400 to-cyan-300 bg-clip-text text-transparent"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 5, repeat: Infinity }}
                style={{ backgroundSize: '200% 200%' }}
              >
                Machinery Manufacturing
              </motion.span>
            </motion.h1>

            <motion.p variants={itemVariants} className="text-xl md:text-2xl text-slate-300 leading-relaxed max-w-2xl">
              Comprehensive training in medical device production with interactive 3D simulations and real-world certification.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button 
                className="group bg-gradient-to-r from-blue-600 to-teal-600 px-8 py-4 rounded-xl text-lg font-semibold flex items-center justify-center relative overflow-hidden"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center">Enroll Now →</span>
              </motion.button>
              <motion.button 
                className="group border-2 border-slate-600 hover:border-teal-500 px-8 py-4 rounded-xl text-lg font-semibold backdrop-blur-sm flex items-center justify-center"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(15, 23, 42, 0.8)', borderColor: 'rgba(20, 184, 166, 1)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Play className="w-5 h-5 mr-2 group-hover:text-teal-400 transition" /> View 3D Demo
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800 mt-8">
              {[
                { value: '10K+', label: 'Students' },
                { value: '95%', label: 'Success Rate' },
                { value: '24', label: 'Weeks Course' }
              ].map((stat, i) => (
                <motion.div key={i} className="text-center" whileHover={{ scale: 1.1 }}>
                  <p className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-1">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* --- Right Column: 3D Canvas --- */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="h-[500px] w-full relative perspective-1000"
          >
            <div className="absolute inset-0 z-10">
                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.5} />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                    <pointLight position={[-10, -10, -10]} intensity={1} color="#2dd4bf" />
                    <Environment preset="city" />
                    <MachineModel />
                    <OrbitControls enableZoom={false} autoRotate={false} />
                </Canvas>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;