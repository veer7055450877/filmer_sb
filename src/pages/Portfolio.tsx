import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';
import SectionHeading from '../components/ui/SectionHeading';
import SEO from '../components/seo/SEO';
import CustomVideoPlayer from '../components/ui/CustomVideoPlayer';
import { portfolioCategories, portfolioItems } from '../data';

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<typeof portfolioItems[0] | null>(null);

  const filteredItems = activeCategory === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="pt-32 pb-20 min-h-screen bg-cinematic-black">
      <SEO 
        title="Wedding & Event Video Portfolio" 
        description="Browse our curated collection of wedding films, pre-wedding shoots, and high-energy event highlights. Experience the Filmer SB difference."
      />
      
      <div className="container mx-auto px-6">
        <SectionHeading title="Selected Works" subtitle="Portfolio" />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition-all duration-300 border ${
                activeCategory === cat 
                  ? "bg-gold-500 text-black border-gold-500" 
                  : "bg-transparent text-gray-400 border-white/10 hover:border-gold-500 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={item.id}
                className="group relative aspect-[16/9] overflow-hidden rounded-sm cursor-pointer bg-zinc-900 border border-white/5"
                onClick={() => setSelectedItem(item)}
              >
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-60"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="w-16 h-16 bg-gold-500 rounded-full flex items-center justify-center pl-1 mb-4 shadow-lg text-black hover:scale-110 transition-transform">
                    <Play fill="currentColor" size={24} />
                  </div>
                  <h3 className="text-white font-bold font-serif text-lg text-center px-4">{item.title}</h3>
                  <p className="text-gold-500 text-xs uppercase tracking-widest mt-2">{item.category}</p>
                </div>
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-gold-500 transition-colors z-50"
              onClick={() => setSelectedItem(null)}
            >
              <X size={40} />
            </button>
            
            <div 
              className="w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden relative shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <CustomVideoPlayer 
                url={selectedItem.videoUrl} 
                thumbnail={selectedItem.image}
                autoPlay={true}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
