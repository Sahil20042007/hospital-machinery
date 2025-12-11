import React from 'react';
import { BookOpen, Clock, ListChecks } from 'lucide-react';

// NOTE: The prop is safely destructured here to prevent the map error:
// 'data' is the incoming prop name from App.jsx, and we rename it to 'curriculum' 
// while setting a default of [] (empty array).
const CurriculumSection = ({ data: curriculum = [] }) => {
    return (
        <section id="curriculum" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-900">
            <div className="max-w-7xl mx-auto">
                {/* Heading */}
                <div className="text-center mb-16 scroll-reveal">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                        Detailed Course Curriculum
                    </h2>
                    <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                        A structured program covering every essential topic in precision medical device engineering.
                    </p>
                </div>

                {/* Curriculum Grid */}
                <div className="space-y-12">

                    {/* Fallback for safety */}
                    {curriculum.length === 0 && (
                        <p className="text-center text-slate-500">
                            No curriculum data available. Please check the 'curriculum' array in App.jsx.
                        </p>
                    )}

                    {curriculum.map((phase, index) => (
                        <div
                            key={index}
                            className="scroll-reveal bg-slate-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-slate-700/50 hover:border-teal-500/50 transition-all duration-500 shadow-xl"
                            style={{ transitionDelay: `${index * 200}ms` }}
                        >
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-700 pb-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-3xl font-extrabold text-teal-400">
                                        Phase {index + 1}:
                                    </span>
                                    <h3 className="text-3xl font-bold text-white">
                                        {phase.title}
                                    </h3>
                                </div>
                                <div className="flex items-center gap-2 mt-3 md:mt-0 text-slate-400">
                                    <Clock className="w-5 h-5 text-blue-400" />
                                    <span className="text-lg font-medium">{phase.duration}</span>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-4">
                                <ListChecks className="w-6 h-6 text-teal-400 shrink-0" />
                                <h4 className="text-xl font-semibold text-slate-300">
                                    Key Topics Covered:
                                </h4>
                            </div>
                            
                            {/* Topics List */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-slate-400">
                                {phase.topics.map((topic, i) => (
                                    <div key={i} className="flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-cyan-500" />
                                        <span>{topic}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CurriculumSection;