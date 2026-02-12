import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ArrowRight } from 'lucide-react';
import Button from './Button';
import { Link } from 'react-router-dom';

export default function PromoPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenPromo = localStorage.getItem('filmer_sb_promo_seen');
    if (!hasSeenPromo) {
      // Show after 5 seconds
      const timer = setTimeout(() => setIsVisible(true), 5000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('filmer_sb_promo_seen', 'true');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="relative w-full max-w-lg bg-zinc-900 border border-gold-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.2)]"
          >
            {/* Close Button */}
            <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-white z-20 bg-black/20 rounded-full p-1"
            >
                <X size={20} />
            </button>

            <div className="flex flex-col md:flex-row">
                {/* Image Side */}
                <div className="w-full md:w-2/5 h-48 md:h-auto relative">
                    <img 
                        src="https://images.unsplash.com/photo-1511285560982-1351cdeb9820?q=80&w=600&auto=format&fit=crop" 
                        alt="Promo" 
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent md:bg-gradient-to-r" />
                </div>

                {/* Content Side */}
                <div className="w-full md:w-3/5 p-8 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 text-gold-500 text-xs font-bold uppercase tracking-wider mb-4 border border-gold-500/20">
                        <Sparkles size={12} /> Limited Offer
                    </div>
                    <h3 className="text-2xl font-bold text-white font-serif mb-2">Get 10% Off</h3>
                    <p className="text-gray-400 text-sm mb-6">
                        Book your wedding film or event highlight this month and receive a special discount on the "Cinematic" package.
                    </p>
                    <div className="flex flex-col gap-3">
                        <Link to="/contact" onClick={handleClose}>
                            <Button className="w-full justify-between group">
                                Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <button onClick={handleClose} className="text-xs text-gray-500 hover:text-white transition-colors text-center">
                            No thanks, maybe later
                        </button>
                    </div>
                </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
