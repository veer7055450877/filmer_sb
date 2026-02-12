import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { X, Cookie } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('filmer_sb_cookie_consent');
    if (!consent) {
      // Show after a small delay
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('filmer_sb_cookie_consent', 'accepted');
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem('filmer_sb_cookie_consent', 'declined');
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto bg-zinc-900/95 backdrop-blur-xl border border-gold-500/20 rounded-xl shadow-2xl p-6 flex flex-col md:flex-row items-center gap-6">
            <div className="p-3 bg-gold-500/10 rounded-full text-gold-500 shrink-0">
              <Cookie size={32} />
            </div>
            
            <div className="flex-grow text-center md:text-left">
              <h4 className="text-white font-bold mb-1">We use cookies</h4>
              <p className="text-gray-400 text-sm">
                To ensure you get the best cinematic experience on our website. 
                We don't track personal data without permission.
              </p>
            </div>

            <div className="flex gap-3 shrink-0">
              <Button variant="outline" size="sm" onClick={handleDecline} className="border-white/20 hover:bg-white/10">
                Decline
              </Button>
              <Button size="sm" onClick={handleAccept}>
                Accept
              </Button>
            </div>
            
            <button onClick={handleDecline} className="absolute top-2 right-2 text-gray-500 hover:text-white md:hidden">
                <X size={16} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
