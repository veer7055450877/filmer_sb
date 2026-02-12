import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  label: string;
}

export default function CustomSelect({ options, value, onChange, label }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <label className="block text-gray-400 text-xs uppercase tracking-wider mb-2">{label}</label>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-black/50 border rounded-sm px-4 py-3 text-white flex items-center justify-between transition-colors ${
          isOpen ? 'border-gold-500' : 'border-white/10 hover:border-white/30'
        }`}
      >
        <span className={value ? 'text-white' : 'text-gray-500'}>{value || 'Select an option'}</span>
        <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180 text-gold-500' : 'text-gray-400'}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-zinc-900 border border-white/10 rounded-sm shadow-xl max-h-60 overflow-y-auto custom-scrollbar"
          >
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setIsOpen(false);
                }}
                className="w-full text-left px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-gold-500 flex items-center justify-between group transition-colors"
              >
                {option}
                {value === option && <Check size={16} className="text-gold-500" />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
