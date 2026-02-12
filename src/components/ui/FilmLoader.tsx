import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FilmLoader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 800);

    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearInterval(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#111] flex items-center justify-center overflow-hidden pointer-events-auto"
      exit={{ 
        opacity: 0, 
        transition: { duration: 0.5 },
        pointerEvents: "none" // Ensure clicks pass through during exit
      }}
    >
      {/* Old Film Grain & Scratches */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] animate-pulse" />
      <div className="absolute inset-0 opacity-10 pointer-events-none mix-blend-overlay">
         <svg className="w-full h-full">
            <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noise)" />
         </svg>
      </div>
      
      {/* Rotating Radar / Countdown Circle */}
      <div className="relative flex items-center justify-center">
        <motion.div 
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="w-64 h-64 border-[1px] border-white/20 rounded-full absolute"
        >
            <div className="w-full h-[1px] bg-white/20 absolute top-1/2 left-0" />
            <div className="h-full w-[1px] bg-white/20 absolute left-1/2 top-0" />
        </motion.div>

        <motion.div 
            key={count}
            initial={{ scale: 1.5, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{ scale: 0.5, opacity: 0 }}
            className="text-9xl font-mono font-bold text-white relative z-10 mix-blend-difference"
        >
            {count > 0 ? count : "FILMER SB"}
        </motion.div>

        {/* Jittery Lines */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
            <motion.div 
                animate={{ x: [-2, 2, -1, 1, 0], opacity: [0.5, 0.8, 0.5] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
                className="w-[1px] h-full bg-white/30 absolute left-1/3"
            />
        </div>
      </div>
    </motion.div>
  );
}
