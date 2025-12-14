import React, { useState, useEffect, useRef, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LocateFixed } from 'lucide-react';
import * as THREE from 'three';
import Modal from './Modal';

// Lazy-loaded Three.js setup for performance
const ThreeDViewer = ({ onHotspotPositionUpdate }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f172a);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
    camera.position.set(0, 1, 5);
    cameraRef.current = camera;

    // Renderer setup with capped pixel ratio for mobile performance
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true
    });
    renderer.setSize(600, 500);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Create procedural model (fallback - replace with GLTFLoader for actual model)
    // To use a real model: import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
    // const loader = new GLTFLoader();
    // loader.load('/models/demo.glb', (gltf) => { scene.add(gltf.scene); });
    
    const group = new THREE.Group();
    const bodyGeometry = new THREE.BoxGeometry(1.5, 1, 1.5);
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x2563eb, metalness: 0.7, roughness: 0.3 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);

    const cylinderGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.8, 32);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x14b8a6, metalness: 0.8, roughness: 0.2 });
    [-0.5, 0.5].forEach((x) => {
      const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
      cylinder.position.set(x, 0.9, 0);
      group.add(cylinder);
    });

    scene.add(group);
    modelRef.current = group;

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      
      // Update hotspot positions (map 3D to 2D)
      if (onHotspotPositionUpdate) {
        const positions = [
          new THREE.Vector3(-0.5, 0.8, 0),
          new THREE.Vector3(0.6, 0, 0.3),
          new THREE.Vector3(0, -0.5, 0.8)
        ].map(pos => {
          const vector = pos.clone().project(camera);
          return {
            x: (vector.x * 0.5 + 0.5) * 600,
            y: (-(vector.y) * 0.5 + 0.5) * 500,
            visible: vector.z < 1
          };
        });
        onHotspotPositionUpdate(positions);
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      renderer.dispose();
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(mat => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    };
  }, [onHotspotPositionUpdate]);

  return <canvas ref={canvasRef} className="w-full h-full rounded-xl" />;
};

const Demo = ({ data: hotspots = [] }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);
  const [hotspotPositions, setHotspotPositions] = useState([]);

  return (
    <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Interactive 3D Demo
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Click hotspots to view detailed analysis and maintenance reports
          </p>
        </motion.div>

        <div className="relative w-full h-[500px] bg-transparent rounded-3xl shadow-2xl overflow-hidden border border-teal-500/30">
          <Suspense fallback={<div className="flex items-center justify-center h-full">Loading 3D Model...</div>}>
            <ThreeDViewer onHotspotPositionUpdate={setHotspotPositions} />
          </Suspense>

          {/* Hotspots with ripple animation */}
         {hotspots.map((hotspot, i) => {
    const pos = hotspotPositions[i] || { x: 0, y: 0, visible: false };
    
    return pos.visible && (
        <motion.button
            key={hotspot.id}
            onClick={() => setSelectedHotspot(hotspot)}
            className="motion-element absolute w-8 h-8 rounded-full bg-cyan-400 cursor-pointer z-20 flex items-center justify-center"
            style={{ left: `${pos.x}px`, top: `${pos.y}px`, transform: 'translate(-50%, -50%)' }}
            
            // Interaction animations (Scale, Rotate, Hover Shadow)
            whileHover={{ 
                scale: 1.4, 
                rotate: 180,
                // Add an external shadow on hover for extra pop
                boxShadow: '0 0 30px rgba(6, 182, 212, 0.8)',
            }}
            whileTap={{ scale: 0.9 }}
            
            // Looping/Pulse animation for the Box Shadow
            animate={{
                boxShadow: [
                    '0 0 0 0 rgba(6, 182, 212, 0.7)',
                    '0 0 0 15px rgba(6, 182, 212, 0)',
                ]
            }}
            
            // --- CONSOLIDATED TRANSITION PROP (BUG FIX) ---
            transition={{ 
                // General spring transition for scale/rotate/tap interactions
                type: 'spring', 
                stiffness: 400, 
                damping: 17,
                
                // Specific transition settings for the 'boxShadow' pulse animation
                // This ensures the pulse repeats infinitely while the button is rendered.
                boxShadow: { 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut"
                }
            }}
            // --- END OF CONSOLIDATED TRANSITION ---
            
            aria-label={`Hotspot ${hotspot.id}: ${hotspot.label}`}
        >
            <LocateFixed className="w-4 h-4 text-slate-900" />
        </motion.button>
    );
})}
        </div>

        {/* Hotspot Legend */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {hotspots.map((spot, i) => (
            <motion.div
              key={spot.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-transparent/70 p-6 rounded-xl border border-slate-700 hover:border-teal-500 transition cursor-pointer"
              onClick={() => setSelectedHotspot(spot)}
              whileHover={{ y: -5 }}
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
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal with AnimatePresence */}
      <AnimatePresence>
        {selectedHotspot && (
          <Modal hotspot={selectedHotspot} onClose={() => setSelectedHotspot(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default Demo;