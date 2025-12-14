import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const Testimonials = ({ data = [] }) => {
  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-slate-800">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our Graduates Say
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Hear from engineers who transformed their careers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {data.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="bg-transparent/70 p-8 rounded-3xl border border-slate-700 hover:border-teal-500 transition shadow-2xl"
              whileHover={{ y: -10, boxShadow: '0 20px 60px rgba(20, 184, 166, 0.2)' }}
            >
              <Quote className="w-10 h-10 text-teal-500 mb-6 opacity-50" />
              <p className="text-xl italic text-white mb-8">
                "{testimonial.quote}"
              </p>
              <div>
                <p className="text-lg font-bold text-teal-300">{testimonial.name}</p>
                <p className="text-sm text-slate-400">{testimonial.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;