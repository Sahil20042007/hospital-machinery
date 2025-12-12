import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';

// This is the actual 3D object that rotates
const RotatingDevice = () => {
    const meshRef = useRef();

    // Rotate the mesh every frame
    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <mesh ref={meshRef} scale={1.5} position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 1.5, 1.5]} />
            <meshStandardMaterial color="#34D399" roughness={0.5} metalness={0.8} />
        </mesh>
    );
};

// The main component that renders the 3D scene
const ModelDisplay = () => {
    return (
        <Canvas className="w-full h-full">
            {/* Camera settings */}
            <PerspectiveCamera makeDefault position={[5, 5, 5]} />
            
            {/* Lighting */}
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            {/* The 3D model */}
            <RotatingDevice />
            
            {/* Allows user interaction (drag to rotate) */}
            <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
    );
};

export default ModelDisplay;