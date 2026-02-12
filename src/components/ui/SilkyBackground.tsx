import React from 'react';

export default function SilkyBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-cinematic-black overflow-hidden">
      {/* 
        High-Performance CSS "Silk" Effect 
        Uses transforms and opacity instead of WebGL for mobile stability 
      */}
      
      {/* Base Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-cinematic-black via-[#0f0f0f] to-[#1a1a1a]" />

      {/* Moving Orbs / Glows */}
      <div className="absolute top-[-20%] left-[-10%] w-[70vw] h-[70vw] bg-gold-500/5 rounded-full blur-[100px] animate-blob mix-blend-screen" />
      <div className="absolute top-[20%] right-[-20%] w-[60vw] h-[60vw] bg-purple-900/10 rounded-full blur-[120px] animate-blob animation-delay-2000 mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-gold-600/5 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />

      {/* Vignette & Texture Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80" />
      
      {/* Static Noise Overlay (Lightweight) */}
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150" />
    </div>
  );
}
