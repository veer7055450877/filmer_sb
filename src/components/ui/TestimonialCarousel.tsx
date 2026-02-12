import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials } from '../../data';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4">
      <div className="relative min-h-[400px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, rotateX: -10 }}
            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, rotateX: 10 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="relative z-10 bg-black/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] max-w-2xl text-center"
          >
            {/* Decorative Quote Icon */}
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gold-500 rounded-full flex items-center justify-center text-black shadow-lg">
                <Quote fill="currentColor" size={20} />
            </div>

            <div className="flex justify-center gap-1 mb-6 mt-4">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star key={i} size={18} className="text-gold-500 fill-gold-500" />
                ))}
            </div>

            <p className="text-xl md:text-2xl text-gray-200 font-serif leading-relaxed mb-8 italic">
              "{testimonials[currentIndex].text}"
            </p>

            <div className="border-t border-white/10 pt-6">
                <h4 className="text-white font-bold text-lg uppercase tracking-wider">{testimonials[currentIndex].name}</h4>
                <p className="text-gold-500 text-xs font-bold mt-1">{testimonials[currentIndex].role}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Background Cards for Stack Effect */}
        <div className="absolute top-4 scale-95 opacity-30 z-0 bg-zinc-800 w-full max-w-xl h-full rounded-2xl border border-white/5" />
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4 mt-8">
        <button 
            onClick={prev}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all"
        >
            <ChevronLeft size={24} />
        </button>
        <button 
            onClick={next}
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-gold-500 hover:text-black hover:border-gold-500 transition-all"
        >
            <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
}
