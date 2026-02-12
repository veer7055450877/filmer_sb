import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Instagram, Heart, MessageCircle, Send, X, Play, MoreHorizontal } from 'lucide-react';
import { instagramReels } from '../../data';

const CheckmarkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-2 h-2">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

export default function InstagramFeed() {
  const [selectedReel, setSelectedReel] = useState<typeof instagramReels[0] | null>(null);
  const [hasStory, setHasStory] = useState(true); // Simulated Story State

  return (
    <div className="w-full">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-8 bg-zinc-900/50 p-6 rounded-xl border border-white/5 backdrop-blur-sm">
        <div className="flex items-center gap-4">
            {/* Profile Pic with Story Ring */}
            <a 
                href="https://www.instagram.com/filmer_sb/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative cursor-pointer group"
            >
                <div className={`p-[3px] rounded-full ${hasStory ? 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500' : 'bg-gray-700'}`}>
                    <div className="p-[2px] bg-black rounded-full">
                        <img 
                            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" 
                            alt="Filmer SB" 
                            className="w-14 h-14 rounded-full object-cover"
                        />
                    </div>
                </div>
                {hasStory && (
                     <div className="absolute bottom-0 right-0 bg-blue-500 text-white text-[8px] px-1 rounded-full border border-black font-bold">
                        NEW
                     </div>
                )}
            </a>
            
            <div>
                <div className="flex items-center gap-2">
                    <h3 className="text-white font-bold text-lg leading-none">filmer_sb</h3>
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white">
                        <CheckmarkIcon />
                    </div>
                </div>
                <p className="text-gray-400 text-xs mt-1">Cinematic Video Editor 🎥 | Storyteller</p>
                <div className="flex gap-4 mt-2 text-xs text-gray-300">
                    <span><b>1.5k</b> posts</span>
                    <span><b>12.4k</b> followers</span>
                    <span><b>500</b> following</span>
                </div>
            </div>
        </div>
        
        <a 
            href="https://www.instagram.com/filmer_sb/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hidden md:flex px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-bold text-white transition-colors items-center gap-2"
        >
            <Instagram size={16} />
            Follow
        </a>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1 md:gap-4">
        {instagramReels.map((reel) => (
          <motion.div
            key={reel.id}
            whileHover={{ y: -5 }}
            className="relative aspect-[9/16] bg-zinc-900 rounded-sm md:rounded-lg overflow-hidden cursor-pointer group border border-white/5"
            onClick={() => setSelectedReel(reel)}
          >
            <img 
              src={reel.thumbnail} 
              alt="Reel Thumbnail" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105"
            />
            
            {/* Reel Icon Top Right */}
            <div className="absolute top-2 right-2">
                <Play fill="white" size={16} className="text-white drop-shadow-md" />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            
            <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <div className="flex items-center gap-3 text-xs font-bold">
                    <span className="flex items-center gap-1"><Heart size={14} fill="white" /> {reel.likes}</span>
                    <span className="flex items-center gap-1"><MessageCircle size={14} fill="white" /> {reel.comments}</span>
                </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Phone View Modal */}
      <AnimatePresence>
        {selectedReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedReel(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-[380px] aspect-[9/19] bg-black rounded-[2rem] border-[6px] border-zinc-800 overflow-hidden shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-20 p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
                    <div className="flex items-center gap-2">
                         <X className="text-white cursor-pointer" onClick={() => setSelectedReel(null)} />
                         <span className="text-white font-bold text-lg">Reels</span>
                    </div>
                    <div className="w-6 h-6 border-2 border-white rounded-md" /> {/* Camera Icon Placeholder */}
                </div>

                {/* Video Content */}
                <div className="flex-grow relative bg-zinc-900">
                    <iframe 
                       src={`https://www.instagram.com/reel/${selectedReel.instagramId}/embed/`}
                       className="w-full h-full object-cover"
                       frameBorder="0"
                       scrolling="no"
                       allowtransparency="true"
                       allow="encrypted-media"
                       title="Instagram Reel"
                   />
                </div>

                {/* Right Side Actions */}
                <div className="absolute right-4 bottom-24 flex flex-col items-center gap-6 z-20">
                    <div className="flex flex-col items-center gap-1">
                        <Heart size={28} className="text-white hover:text-red-500 transition-colors cursor-pointer" />
                        <span className="text-white text-xs font-bold">{selectedReel.likes}</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                        <MessageCircle size={28} className="text-white cursor-pointer" />
                        <span className="text-white text-xs font-bold">{selectedReel.comments}</span>
                    </div>
                    <Send size={28} className="text-white cursor-pointer -rotate-12" />
                    <MoreHorizontal size={28} className="text-white cursor-pointer" />
                    <div className="w-8 h-8 border-2 border-white rounded-md overflow-hidden">
                        <img src={selectedReel.thumbnail} className="w-full h-full object-cover" />
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-0 left-0 right-0 p-4 pb-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10">
                    <div className="flex items-center gap-2 mb-3">
                         <div className="w-8 h-8 rounded-full bg-gray-800 overflow-hidden">
                            <img 
                                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" 
                                alt="Profile" 
                                className="w-full h-full object-cover"
                            />
                         </div>
                         <span className="text-white font-bold text-sm">filmer_sb</span>
                         <button className="px-3 py-1 bg-transparent border border-white/50 rounded-lg text-white text-xs font-bold ml-2">Follow</button>
                    </div>
                    <p className="text-white text-sm mb-4 line-clamp-2">{selectedReel.caption}</p>
                    
                    <div className="flex items-center gap-2 text-white text-xs">
                        <div className="flex gap-0.5 items-end">
                             <div className="w-0.5 h-2 bg-white animate-pulse" />
                             <div className="w-0.5 h-4 bg-white animate-pulse delay-75" />
                             <div className="w-0.5 h-3 bg-white animate-pulse delay-150" />
                        </div>
                        <span>Original Audio • Filmer SB</span>
                    </div>
                </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
