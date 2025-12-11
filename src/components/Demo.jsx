import React, { useState } from 'react';
import HotspotModal from './Modal'; // Assuming your Modal component is named Modal.jsx and imported as HotspotModal
import { LocateFixed } from 'lucide-react';

// NOTE: The prop is safely destructured here to prevent the map error:
// 'data' is the incoming prop name from App.jsx, and we rename it to 'hotspots' 
// while setting a default of [] (empty array).
const DemoSection = ({ data: hotspots = [] }) => {
    const [selectedHotspot, setSelectedHotspot] = useState(null);

    const handleHotspotClick = (hotspotId) => {
        const hotspot = hotspots.find(h => h.id === hotspotId);
        setSelectedHotspot(hotspot);
    };

    return (
        <section id="demo" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Interactive 3D Demo
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Click the hotspots to view detailed analysis and maintenance reports on the medical device.
                    </p>
                </div>

                {/* 3D Model Container (The core of the demo) */}
                <div className="relative w-full h-[500px] md:h-[650px] bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-teal-500/30 scroll-reveal">
                    
                    {/* Placeholder for the 3D Model/Image */}
                    <div className="flex items-center justify-center w-full h-full">
                        {/* Replace this div with your actual 3D model (e.g., using Three.js, Babylon.js, or an iframe) */}
                        <div className="text-slate-600 text-2xl p-10 text-center italic">
                            [Placeholder for Interactive Medical Device Model]
                            <p className="text-lg mt-2">Visualization powered by WebGL/Three.js</p>
                        </div>
                    </div>

                    {/* Hotspots Layout */}
                    {/* NOTE: Hotspots are absolutely positioned relative to the container */}
                    
                    {hotspots.length === 0 && (
                        <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-slate-500 z-10">
                            Hotspot data is not available.
                        </p>
                    )}

                    {hotspots.map((hotspot) => (
                        <button
                            key={hotspot.id}
                            onClick={() => handleHotspotClick(hotspot.id)}
                            className={`
                                absolute flex items-center justify-center w-6 h-6 rounded-full bg-cyan-400 
                                cursor-pointer z-20 transition-all duration-300 animate-pulse-ring
                                hover:scale-150 hover:bg-teal-300
                            `}
                            // NOTE: You need to set these 'top' and 'left' values based on 
                            // the actual coordinates in your 3D model viewer.
                            style={{ 
                                top: hotspot.id === 1 ? '30%' : hotspot.id === 2 ? '50%' : '75%', 
                                left: hotspot.id === 1 ? '65%' : hotspot.id === 2 ? '40%' : '25%',
                                animationDelay: `${hotspot.id * 0.5}s`
                            }}
                            aria-label={`View details for Hotspot ${hotspot.id}: ${hotspot.label}`}
                        >
                            <LocateFixed className="w-4 h-4 text-slate-900" />
                        </button>
                    ))}

                    {/* Hotspot Labels (optional) */}
                    {hotspots.map((hotspot) => (
                        <div
                            key={`label-${hotspot.id}`}
                            className="absolute bg-slate-900/80 backdrop-blur-sm px-3 py-1 text-sm rounded-lg text-teal-300 border border-slate-700 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                            style={{
                                top: hotspot.id === 1 ? '25%' : hotspot.id === 2 ? '45%' : '70%', 
                                left: hotspot.id === 1 ? '70%' : hotspot.id === 2 ? '45%' : '30%',
                            }}
                        >
                            {hotspot.label}
                        </div>
                    ))}
                </div>
            </div>
            
            {/* Modal for displaying hotspot details */}
            <HotspotModal 
                hotspot={selectedHotspot} 
                setSelectedHotspot={setSelectedHotspot} 
            />
        </section>
    );
};

export default DemoSection;