// src/components/ModulesSection.jsx
import React from "react";
import "animate.css";

const ModulesSection = ({ overviewRef, modules = [] }) => {
  return (
    <section
      id="about"
      ref={overviewRef}
      className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800/30 relative overflow-hidden"
    >
      {/* Decorative Gradient Blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] top-10 left-10 animate-pulse" />
        <div
          className="absolute w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[150px] bottom-10 right-10 animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Heading */}
        <div className="text-center mb-16 animate__animated animate__fadeInUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Comprehensive Training Program
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Three core pillars of medical device manufacturing excellence
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {modules.length === 0 && (
            <p className="text-center text-slate-400 col-span-3">
              Loading modules...
            </p>
          )}

          {modules.map((module, i) => {
            const IconComponent = module.icon;

            return (
              <div
                key={i}
                className="
                  group relative bg-slate-900/50 backdrop-blur-xl
                  p-8 rounded-3xl border border-slate-700/50
                  hover:border-teal-500/50
                  transition-all duration-500
                  hover:scale-[1.05] hover:shadow-2xl hover:shadow-teal-900/30
                  animate__animated animate__fadeInUp
                "
                style={{ animationDelay: `${i * 150}ms` }}
              >
                {/* Icon */}
                <div
                  className={`
                    inline-flex p-5 rounded-2xl shadow-xl mb-6
                    bg-gradient-to-br ${module.color}
                    transition-transform duration-500
                    group-hover:scale-110 group-hover:rotate-6
                  `}
                >
                  <IconComponent className="w-12 h-12 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold mb-4 group-hover:text-teal-400 transition">
                  {module.title}
                </h3>

                {/* Description */}
                <p className="text-slate-400 leading-relaxed text-lg">
                  {module.description}
                </p>

                {/* Decorative Line */}
                <div
                  className="
                    absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-teal-600
                    group-hover:w-full transition-all duration-500
                  "
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ModulesSection;
