import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Cpu, ChevronRight, X, AlertCircle } from 'lucide-react';
import * as THREE from 'three';
// ✨ NEW: Import the GLTFLoader
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

// --- 1. MODAL COMPONENT ---
const Modal = ({ hotspot, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-slate-900 border border-teal-500/50 rounded-2xl p-8 max-w-lg w-full relative overflow-hidden shadow-[0_0_50px_rgba(20,184,166,0.2)]"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-blue-500" />
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center border border-teal-500/50">
            <AlertCircle className="w-6 h-6 text-teal-400" />
          </div>
          <div>
             <h3 className="text-xl font-bold text-white">{hotspot.label}</h3>
             <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">System ID: {String(hotspot.id).padStart(3, '0')}</span>
          </div>
        </div>
        
        <p className="text-slate-300 leading-relaxed mb-6">
          {hotspot.description || "Diagnostics indicate nominal performance parameters. Efficiency operating at 98.4%. Recommended maintenance interval: 2400 hours."}
        </p>

        <div className="grid grid-cols-2 gap-4 text-xs font-mono text-slate-400 border-t border-slate-800 pt-4">
           <div>STATUS: <span className="text-white">OPTIMAL</span></div>
           <div>TEMP: <span className="text-white">42°C</span></div>
           <div>LOAD: <span className="text-white">12%</span></div>
           <div>UPTIME: <span className="text-white">14d 2h</span></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 2. THE 3D VIEWER (With Real GLB Model) ---
const ThreeDViewer = ({ onHotspotPositionUpdate }) => {
  const canvasRef = useRef(null);
  const loadedModelRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // --- SETUP SCENE ---
    const scene = new THREE.Scene();
    scene.background = null; 

    // CAMERA
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    // Position camera further back for the larger model
    camera.position.set(0, 0, 5); 
    camera.lookAt(0, 0, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(800, 600);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    // Enable shadows for realism
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // --- LIGHTING (Studio Setup for Realism) ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const tealRimLight = new THREE.SpotLight(0x2dd4bf, 5);
    tealRimLight.position.set(-5, 5, 2);
    tealRimLight.lookAt(0, 0, 0);
    scene.add(tealRimLight);

    const blueFillLight = new THREE.PointLight(0x3b82f6, 2);
    blueFillLight.position.set(0, -5, 5);
    scene.add(blueFillLight);

    // --- ✨ LOAD REAL MODEL ---
    const loader = new GLTFLoader();
    
    // 👇 REPLACE THIS URL WITH YOUR OWN MODEL PATH (e.g., "/models/machine.glb")
    // Using a public high-quality "Sci-Fi Helmet/Engine" model for instant demo
    const MODEL_URL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Models/master/2.0/SciFiHelmet/glTF-Binary/SciFiHelmet.glb';

    loader.load(MODEL_URL, (gltf) => {
        const model = gltf.scene;
        loadedModelRef.current = model;

        // Auto-Center and Scale the model
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());

        // Reset position to center
        model.position.x += (model.position.x - center.x);
        model.position.y += (model.position.y - center.y);
        model.position.z += (model.position.z - center.z);

        // Scale to fit nicely in view (Target size ~2 units)
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 2 / maxDim; 
        model.scale.set(scale, scale, scale);

        scene.add(model);
    }, undefined, (error) => {
        console.error('An error happened loading the model:', error);
    });

    // --- ANIMATION LOOP ---
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate Model if loaded
      if (loadedModelRef.current) {
         loadedModelRef.current.rotation.y += 0.003; // Slow spin
      }

      // --- HOTSPOT TRACKING LOGIC ---
      if (onHotspotPositionUpdate && loadedModelRef.current) {
        // We define attachment points relative to the model's rotation
        // These coords need to be adjusted based on your specific model geometry
        const points = [
          new THREE.Vector3(0.5, 0.5, 0.5),   // Top Right
          new THREE.Vector3(-0.5, -0.2, 0.6), // Bottom Left Front
          new THREE.Vector3(0, 0.8, -0.5)     // Top Back
        ];

        const positions = points.map(pos => {
          // Clone position, apply model's current matrix (rotation/scale)
          // Note: We apply the model's matrix so the dots spin WITH the model
          const worldPos = pos.clone().applyMatrix4(loadedModelRef.current.matrixWorld);
          const vector = worldPos.project(camera);
          
          return {
            x: (vector.x * 0.5 + 0.5) * 800,
            y: (-(vector.y) * 0.5 + 0.5) * 600,
            visible: vector.z < 1 // Simple occlusion check
          };
        });
        onHotspotPositionUpdate(positions);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full object-cover cursor-move" />;
};


// --- 3. MAIN COMPONENT ---
const Demo = ({ data: hotspots = [] }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [hotspotPositions, setHotspotPositions] = useState([]);
  const containerRef = useRef(null);

  const displayHotspots = hotspots.length > 0 ? hotspots : [
    { id: 1, label: 'Main Turbine', description: 'Primary propulsion intake unit.', status: 'Active' },
    { id: 2, label: 'Sensor Array', description: 'Forward-facing LIDAR cluster.', status: 'Standby' },
    { id: 3, label: 'Exhaust Port', description: 'Thermal regulation vent.', status: 'Optimal' },
  ];

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
      
      {/* Background Tech Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-800 pb-8">
          <div>
            <div className="flex items-center gap-2 text-teal-500 mb-2">
              <Activity className="w-4 h-4 animate-pulse" />
              <span className="font-mono text-xs tracking-widest uppercase">Live Simulation</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Analysis</span>
            </h2>
          </div>
          <div className="text-right hidden md:block">
            <div className="text-slate-500 font-mono text-xs">SYSTEM STATUS</div>
            <div className="text-emerald-400 font-mono text-lg tracking-widest">ONLINE</div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid lg:grid-cols-3 gap-8 h-[600px]">
          
          {/* LEFT: 3D MODEL SCANNER */}
          <div className="lg:col-span-2 relative bg-slate-900/50 rounded-2xl border border-slate-700 overflow-hidden group">
            
            {/* HUD Overlay */}
            <div className="absolute inset-0 pointer-events-none z-10">
               <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-teal-500/50" />
               <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-teal-500/50" />
               <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-teal-500/50" />
               <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-teal-500/50" />
               <motion.div 
                 initial={{ top: '0%' }}
                 animate={{ top: '100%' }}
                 transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                 className="absolute left-0 right-0 h-[1px] bg-teal-500/50 shadow-[0_0_20px_rgba(20,184,166,0.5)]"
               />
               <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-teal-500/70 bg-black/50 px-2 rounded">
                 MODEL_VIEWER [GLB]
               </div>
            </div>

            {/* 3D Viewer Container */}
            <div className="w-full h-full relative bg-slate-900" ref={containerRef}>
              <Suspense fallback={<div className="absolute inset-0 flex items-center justify-center text-teal-500 font-mono text-xs">LOADING MODEL...</div>}>
                <ThreeDViewer onHotspotPositionUpdate={setHotspotPositions} />
              </Suspense>
              
              {/* Interactive Hotspots */}
              {displayHotspots.map((hotspot, i) => {
                const pos = hotspotPositions[i] || { x: 0, y: 0, visible: false };
                if (!pos.visible) return null;

                return (
                  <motion.button
                    key={hotspot.id}
                    onClick={() => setSelectedHotspot(hotspot)}
                    className="absolute z-20 group"
                    style={{ left: pos.x, top: pos.y }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="relative -translate-x-1/2 -translate-y-1/2">
                      <div className="w-4 h-4 bg-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.8)] relative z-10 group-hover:scale-125 transition-transform duration-300" />
                      <div className="absolute inset-0 border border-teal-500 rounded-full animate-ping opacity-75" />
                      <div className="absolute -inset-4 border border-dashed border-teal-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                      <div className="absolute left-full top-1/2 w-8 h-[1px] bg-teal-500/50 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300">
                         <div className="absolute left-full top-1/2 -translate-y-1/2 bg-black/80 border border-teal-500/50 px-2 py-1 text-[10px] font-mono text-teal-400 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-100">
                            {hotspot.label}
                         </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* RIGHT: DATA PANEL */}
          <div className="bg-slate-900/30 border-l border-slate-800 p-6 flex flex-col h-full relative">
             <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full pointer-events-none" />
             <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 flex items-center gap-2">
               <Cpu className="w-4 h-4 text-teal-500" />
               Component Diagnostics
             </h3>

             <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
               {displayHotspots.map((spot, i) => (
                 <motion.div
                   key={spot.id}
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   transition={{ delay: i * 0.1 }}
                   onClick={() => setSelectedHotspot(spot)}
                   className={`p-4 rounded border cursor-pointer transition-all duration-300 group ${
                     selectedHotspot?.id === spot.id 
                       ? 'bg-teal-500/10 border-teal-500' 
                       : 'bg-slate-800/40 border-slate-700 hover:border-slate-500'
                   }`}
                 >
                   <div className="flex justify-between items-start mb-2">
                     <span className="font-mono text-xs text-slate-500">ID: {String(spot.id).padStart(3, '0')}</span>
                     <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        spot.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' :
                        spot.status === 'Standby' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-blue-500/20 text-blue-400'
                     }`}>
                       {spot.status || 'READY'}
                     </span>
                   </div>
                   <h4 className="text-white font-bold mb-1 group-hover:text-teal-400 transition-colors flex items-center gap-2">
                     {spot.label}
                     <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0" />
                   </h4>
                 </motion.div>
               ))}
             </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedHotspot && (
          <Modal hotspot={selectedHotspot} onClose={() => setSelectedHotspot(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Demo;