// src/components/Modal.jsx (FIXED CONTENT)
import React, { useEffect } from 'react';
import { X, Wrench, Info } from 'lucide-react';

const HotspotModal = ({ hotspot, setSelectedHotspot }) => {
    
    // NO HOOKS ARE CALLED AFTER THE RETURN
    // ...
    
    // 1. Call the Hook UNCONDITIONALLY at the top level
    useEffect(() => {
        // 2. Put the condition *inside* the effect
        if (!hotspot) {
            return; // Exit the effect if the modal is closed
        }
        
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setSelectedHotspot(null);
            }
        };
        
        // Only attach the listener if the modal is OPEN (hotspot is defined)
        document.addEventListener('keydown', handleEscape);
        
        // Cleanup function: remove the listener when the component unmounts or hotspot changes
        return () => document.removeEventListener('keydown', handleEscape);
        
    }, [hotspot, setSelectedHotspot]); // 3. Include 'hotspot' in the dependency array

    // The early return must happen *after* all hooks are called.
    if (!hotspot) return null; // <--- The early return is now SAFE!

    // The rest of your rendering logic goes here
    return (
        <div 
            className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
            aria-modal="true"
            role="dialog"
            aria-labelledby="modal-title"
        >
            {/* ... Modal content JSX ... */}
            <div className="bg-slate-900 rounded-lg p-8 max-w-md w-full relative shadow-2xl border border-teal-500/50 transform transition-all duration-300 scale-100">
                <button 
                    onClick={() => setSelectedHotspot(null)}
                    className="absolute top-4 right-4 text-slate-400 hover:text-teal-400 transition"
                    aria-label="Close modal"
                >
                    <X className="w-6 h-6" />
                </button>
                {/* ... rest of the modal JSX using hotspot.label, hotspot.description, etc. */}
                <div className="flex items-center gap-4 mb-4 border-b border-slate-800 pb-4">
                    <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center font-bold shrink-0 text-white">
                        {hotspot.id}
                    </div>
                    <h2 id="modal-title" className="text-2xl font-bold text-teal-400">
                        {hotspot.label}
                    </h2>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-slate-300 mb-1">
                        <Info className="w-5 h-5 text-blue-400" />
                        <span>Overview</span>
                    </div>
                    <p className="text-slate-400">{hotspot.description}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-slate-300 mb-1">
                        <Wrench className="w-5 h-5 text-cyan-400" />
                        <span>Technical Details</span>
                    </div>
                    <p className="text-slate-400 text-sm italic">{hotspot.details}</p>
                  </div>
                </div>
            </div>
        </div>
    );
};

export default HotspotModal;