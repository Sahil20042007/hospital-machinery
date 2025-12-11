import React from 'react';
import { Quote } from 'lucide-react';

// NOTE: The prop is safely destructured here to prevent the map error:
// 'data' is the incoming prop name from App.jsx, and we rename it to 'testimonials' 
// while setting a default of [] (empty array).
const TestimonialsSection = ({ data: testimonials = [] }) => {
    return (
        <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-teal-400 mb-4">
                        What Our Graduates Say
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        Hear from engineers who transformed their careers with our specialized training.
                    </p>
                </div>

                {/* Testimonials Grid */}
                <div className="grid md:grid-cols-3 gap-8">

                    {/* Fallback for safety */}
                    {testimonials.length === 0 && (
                        <p className="text-center text-slate-500 col-span-full">
                            No testimonials available. Please check the 'testimonials' array in App.jsx.
                        </p>
                    )}

                    {testimonials.map((testimonial, index) => (
                        <div 
                            key={index} 
                            className="
                                scroll-reveal bg-slate-900/70 backdrop-blur-sm p-8 rounded-3xl 
                                border border-slate-700 hover:border-blue-500 transition-all 
                                duration-500 shadow-2xl relative flex flex-col justify-between
                            "
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <Quote className="w-10 h-10 text-teal-500 mb-6 opacity-50" />
                            
                            {/* Quote */}
                            <p className="text-xl italic text-white mb-8 flex-grow">
                                "{testimonial.quote}"
                            </p>
                            
                            {/* Author Info */}
                            <div>
                                <p className="text-lg font-bold text-teal-300">{testimonial.name}</p>
                                <p className="text-sm text-slate-400">{testimonial.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;