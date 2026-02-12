import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'framer-motion';
import { ArrowUp, MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { playNotificationSound } from '../../utils/notificationUtils';

export default function FloatingControls() {
  const [isVisible, setIsVisible] = useState(false);
  const [showMsg, setShowMsg] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const strokeDashoffset = useTransform(scaleX, [0, 1], [113, 0]);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Show message after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowMsg(true);
        playNotificationSound();
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-center gap-4">

      {/* Back to Top Button */}
      <AnimatePresence>
        {isVisible && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: 20 }}
            onClick={scrollToTop}
            className="relative w-12 h-12 flex items-center justify-center bg-black/80 backdrop-blur-md rounded-full text-gold-500 hover:bg-white/10 transition-colors group"
          >
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 40 40">
              <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
              <motion.circle
                cx="20"
                cy="20"
                r="18"
                fill="none"
                stroke="#d4af37"
                strokeWidth="2"
                strokeDasharray="113"
                style={{ strokeDashoffset }}
                strokeLinecap="round"
              />
            </svg>
            <ArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Main CTA with Side Message */}
      <div className="relative">
        <AnimatePresence>
            {showMsg && (
                <motion.div
                    initial={{ opacity: 0, x: 20, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.8 }}
                    className="absolute right-full mr-4 top-1/4 -translate-y-1/2 bg-white text-black px-4 py-2 rounded-xl shadow-xl whitespace-nowrap flex items-center gap-2"
                >
                    <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 bg-white rotate-45" />
                    <span className="text-sm font-bold relative z-10">Hi, how can we film you?</span>
                    <button
                        onClick={(e) => { e.preventDefault(); setShowMsg(false); }}
                        className="p-1 hover:bg-gray-200 rounded-full relative z-10"
                    >
                        <X size={12} />
                    </button>
                </motion.div>
            )}
        </AnimatePresence>

        <Link to="/contact">
            <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-gold-500 rounded-full flex items-center justify-center text-black shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] transition-shadow relative z-20"
            >
            <MessageCircle size={30} fill="currentColor" className="text-black" />
            {/* Notification Dot */}
            {showMsg && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-black rounded-full animate-bounce" />
            )}
            </motion.button>
        </Link>
      </div>
    </div>
  );
}
