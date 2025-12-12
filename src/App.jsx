import React from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Modules from './components/Modules';
import Steps from './components/Steps';
import Manual from './components/Manual';
import Demo from './components/Demo';
import Curriculum from './components/Curriculum';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

// IMPORTANT: Import the custom hook for scroll animations
import useScrollReveal from './hooks/useScrollReveal'; 

// Import global styles (including the scroll-reveal CSS)
import './styles/globals.css'; 

// --- GSAP FIX: REGISTER PLUGIN GLOBALLY ---
// This must run once at the application's entry point before any component uses it.
gsap.registerPlugin(ScrollTrigger); 

// --- Component Imports ---


// --- 🧩 APPLICATION DATA ---
const data = {
    // Data for the <Modules /> component
    modules: [
        { 
            icon: 'Rocket', 
            title: 'Foundational Theory', 
            description: 'Master the core concepts of mechanical design and engineering simulation.', 
            color: 'text-teal-400' 
        },
        { 
            icon: 'Layers', 
            title: 'Advanced CAD Practice', 
            description: 'Hands-on training with professional-grade CAD software and complex modeling techniques.', 
            color: 'text-sky-400' 
        },
        { 
            icon: 'Zap', 
            title: 'Simulation & Analysis', 
            description: 'Learn FEA (Finite Element Analysis) and CFD (Computational Fluid Dynamics) for real-world testing.', 
            color: 'text-violet-400' 
        },
        { 
            icon: 'TrendingUp', 
            title: 'Project Capstone', 
            description: 'Apply all learned skills to a final, industry-relevant design and analysis project.', 
            color: 'text-amber-400' 
        },
    ],
    
    // Data for the <Steps /> component
    steps: [
        { id: 1, title: 'Learn the Fundamentals', description: 'Start with materials science and structural mechanics.' },
        { id: 2, title: 'Master 3D Modeling', description: 'Practice parametric modeling of complex assemblies.' },
        { id: 3, title: 'Simulate Performance', description: 'Run stress, thermal, and flow analyses on your designs.' },
        { id: 4, title: 'Optimize and Deploy', description: 'Refine designs based on analysis and prepare for manufacturing.' },
    ],

    // Data for the <Curriculum /> component (Example structure)
    curriculum: [
        {
            title: 'Phase I: CAD Mastery',
            duration: '4 Weeks',
            topics: ['Sketching', 'Part Modeling', 'Assembly', 'Drawing'],
        },
        {
            title: 'Phase II: FEA Fundamentals',
            duration: '3 Weeks',
            topics: ['Meshing', 'Boundary Conditions', 'Linear Statics', 'Modal Analysis'],
        },
        {
            title: 'Phase III: Advanced CFD',
            duration: '3 Weeks',
            topics: ['Turbulence Models', 'Heat Transfer', 'Mesh Refinement', 'Post-processing'],
        },
    ],

    // Data for the <Testimonials /> component (Example structure)
    testimonials: [
        {
            quote: 'This course was the turning point in my career. The project-based learning is unbeatable.',
            name: 'Alex Rivera',
            title: 'Junior Mechanical Engineer',
        },
        {
            quote: 'The depth of the FEA module is incredible. I now feel confident running complex simulations.',
            name: 'Sarah Chen',
            title: 'Design Specialist',
        },
        {
            quote: 'The instructors are experts. Their feedback on my final capstone project was invaluable.',
            name: 'Marcus Jones',
            title: 'Aerospace Analyst',
        },
    ],
    
    // Data for the <Demo /> component (Hotspot data)
    hotspots: [
        { id: 1, label: 'Structural Joint', description: 'Analyze stress concentration and fatigue life at the main connection points.', details: 'FEA setup: Non-linear contact, fine mesh required.' },
        { id: 2, label: 'Cooling Vent', description: 'Optimize airflow for thermal management and drag reduction using CFD.', details: 'CFD setup: K-epsilon turbulence model, transient analysis.' },
        { id: 3, label: 'Actuator Mount', description: 'Verify stiffness and deflection under maximum operational load.', details: 'FEA setup: Static load case, fixed constraint at base.' },
    ],
};
// --- END APPLICATION DATA ---


export default function App() {
    // 3. Initialize the scroll reveal animation hook
    useScrollReveal();

    return (
        <div className="min-h-screen bg-slate-900 text-white overflow-x-hidden">
            <Navbar />
            
            <main id="main-content">
                <Hero />
                <Modules data={data.modules} />
                <Steps data={data.steps} />
                <Manual />
                
                {/* Pass the hotspot data to the Demo component */}
                <Demo data={data.hotspots} /> 
                
                <Curriculum data={data.curriculum} />
                <Testimonials data={data.testimonials} />
                <Footer />
            </main>
        </div>
    );
}