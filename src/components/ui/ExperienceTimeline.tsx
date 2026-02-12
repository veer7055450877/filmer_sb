import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { milestones } from '../../data';

export default function ExperienceTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 50%"]
  });

  const height = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={containerRef} className="relative py-20 pl-4 md:pl-0">
      {/* Central Timeline Track (Background) */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2 rounded-full" />
      
      {/* Active Timeline Track (Filling up) */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 overflow-hidden">
        <motion.div 
          style={{ height }} 
          className="w-full bg-gradient-to-b from-transparent via-gold-500 to-gold-300 shadow-[0_0_20px_rgba(212,175,55,0.8)]"
        />
      </div>

      <div className="space-y-32">
        {milestones.map((item, index) => (
          <TimelineItem key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ item, index }: { item: typeof milestones[0], index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`relative flex items-center gap-8 md:gap-0 ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Central Node */}
      <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10 flex items-center justify-center">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-4 h-4 bg-black border-2 border-gold-500 rotate-45 shadow-[0_0_15px_rgba(212,175,55,0.6)] relative group"
        >
            <div className="absolute inset-0 bg-gold-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
        </motion.div>
      </div>

      {/* Horizontal Connector (Desktop) */}
      <div className={`hidden md:block absolute top-1/2 w-[calc(50%-2rem)] h-[1px] bg-gradient-to-r from-gold-500/0 via-gold-500/30 to-gold-500/0 ${
          isEven ? "left-1/2" : "right-1/2"
      }`} />

      {/* Content Card Side */}
      <div className={`w-full md:w-1/2 pl-20 md:pl-0 ${
         isEven ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"
      }`}>
        <div className="group relative">
            {/* Card Background with Glassmorphism */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl blur-xl" />
            
            <div className={`relative p-8 rounded-xl border border-white/5 bg-zinc-900/40 backdrop-blur-sm transition-all duration-500 group-hover:border-gold-500/30 group-hover:translate-y-[-4px] shadow-lg ${
                isEven ? "md:items-end" : "md:items-start"
            }`}>
                {/* Year Badge */}
                <div className={`absolute -top-4 px-4 py-1 bg-black border border-gold-500/30 rounded-full text-gold-500 text-xs font-bold tracking-widest uppercase shadow-[0_0_10px_rgba(0,0,0,0.5)] ${
                    isEven ? "right-8" : "left-8"
                }`}>
                    {item.year}
                </div>

                <div className={`flex items-center gap-4 mb-4 ${
                    isEven ? "md:flex-row-reverse" : "md:flex-row"
                }`}>
                    <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0 border border-gold-500/20 group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-white font-serif">{item.title}</h3>
                        <p className="text-xs text-gray-500 uppercase tracking-widest">{item.role}</p>
                    </div>
                </div>
                
                <p className="text-gray-400 leading-relaxed text-sm">
                  {item.desc}
                </p>
            </div>
        </div>
      </div>
      
      {/* Empty spacer for the other side */}
      <div className="hidden md:block md:w-1/2" />
    </motion.div>
  );
}
