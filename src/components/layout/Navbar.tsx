import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Film } from 'lucide-react';
import { cn } from '../../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'Services', path: '/services' },
  { name: 'Packages', path: '/packages' },
  { name: 'About', path: '/about' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex justify-center pointer-events-none",
          scrolled ? "pt-4" : "pt-6"
        )}
      >
        <div 
          className={cn(
            "relative flex items-center justify-between transition-all duration-500 pointer-events-auto",
            scrolled 
              ? "w-[95%] md:w-[80%] max-w-5xl bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 shadow-[0_0_30px_rgba(0,0,0,0.5)]" 
              : "w-full container px-6 py-2 bg-transparent border-transparent"
          )}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group z-50">
            <div className="relative">
              <Film className="w-6 h-6 md:w-8 md:h-8 text-gold-500 group-hover:text-white transition-colors" />
              <motion.div 
                className="absolute -inset-2 bg-gold-500/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold font-serif tracking-wider text-white">
              FILMER <span className="text-gold-500">SB</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "relative px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors rounded-full overflow-hidden group",
                  location.pathname === link.path ? "text-black" : "text-gray-300 hover:text-white"
                )}
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-gold-500"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            ))}
          </div>

          {/* CTA Button - CLEAN, NO SIDE MESSAGE */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/contact"
              className={cn(
                "group relative px-6 py-2 overflow-hidden rounded-full transition-all duration-300",
                scrolled ? "bg-white/10 hover:bg-gold-500" : "bg-gold-500 hover:bg-white"
              )}
            >
              <span className={cn(
                "relative z-10 text-xs font-bold uppercase tracking-wider transition-colors",
                scrolled ? "text-white group-hover:text-black" : "text-black group-hover:text-black"
              )}>
                Book Now
              </span>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-white hover:text-gold-500 transition-colors z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "text-3xl font-serif font-bold tracking-widest uppercase hover:text-gold-500 transition-colors",
                      location.pathname === link.path ? "text-gold-500" : "text-white"
                    )}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="mt-8 px-8 py-4 bg-gold-500 text-black font-bold uppercase tracking-wider rounded-full hover:bg-white transition-colors"
                >
                  Start Project
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
