import React from 'react';
import { ArrowRight, CheckCircle } from 'lucide-react';

// NOTE: We destructure the incoming prop 'data' and assign it a default value of an empty array ([]).
// This prevents the "Cannot read properties of undefined (reading 'map')" error.
const StepsSection = ({ data: steps = [] }) => {
    return (
        <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-4">
                        Your 4-Step Journey to Mastery
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Follow our proven pathway from foundational knowledge to professional deployment.
                    </p>
                </div>

                {/* Steps Timeline */}
                <div className="relative space-y-12">
                    
                    {/* Fallback for safety */}
                    {steps.length === 0 && (
                        <p className="text-center text-slate-500">
                            No steps data available. Please check the 'steps' array in App.jsx.
                        </p>
                    )}

                    {steps.map((step, index) => (
                        <div
                            key={step.id}
                            className={`
                                flex flex-col md:flex-row items-start 
                                ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} 
                                scroll-reveal
                            `}
                            // Custom delay for a staggered reveal effect
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            {/* Step Content */}
                            <div className="w-full md:w-5/12 p-4">
                                <div className={`
                                    bg-slate-800 p-6 rounded-xl shadow-2xl border 
                                    ${index % 2 === 0 ? 'border-teal-600/50' : 'border-blue-600/50'}
                                    hover:border-teal-400 transition-all duration-300
                                `}>
                                    <h3 className="text-3xl font-bold mb-2 flex items-center gap-3">
                                        <span className="text-4xl font-mono text-teal-400">{step.id}.</span>
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-400 text-lg">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Center Timeline Divider */}
                            <div className="flex flex-col items-center w-full md:w-2/12 relative">
                                {/* Vertical Line */}
                                <div className="absolute h-full w-1 bg-slate-700 hidden md:block z-0"></div>
                                
                                {/* Step Marker */}
                                <div className="z-10 bg-slate-900 rounded-full p-3 ring-4 ring-teal-500/30">
                                    <CheckCircle className="w-6 h-6 text-teal-400" />
                                </div>
                                
                                {/* Connector Arrow for Mobile */}
                                {index < steps.length - 1 && (
                                    <div className="md:hidden p-2">
                                        <ArrowRight className="w-6 h-6 text-slate-500 rotate-90" />
                                    </div>
                                )}
                            </div>

                            {/* Empty Spacer (Only used for reverse layout positioning) */}
                            <div className="w-full md:w-5/12 p-4 hidden md:block">
                                {/* This div acts as a spacer for the staggered layout */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StepsSection;