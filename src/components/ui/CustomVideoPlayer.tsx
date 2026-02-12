import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, SkipBack, SkipForward } from 'lucide-react';
import { cn } from '../../lib/utils';

interface CustomVideoPlayerProps {
  url: string;
  thumbnail?: string;
  autoPlay?: boolean;
}

export default function CustomVideoPlayer({ url, thumbnail, autoPlay = false }: CustomVideoPlayerProps) {
  const [playing, setPlaying] = useState(autoPlay);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(true); // Start muted for autoplay policies
  const [played, setPlayed] = useState(0);
  const [loaded, setLoaded] = useState(0); // Track buffered amount
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  const playerRef = useRef<ReactPlayer>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handlePlayPause = () => setPlaying(!playing);
  
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(parseFloat(e.target.value));
    setMuted(parseFloat(e.target.value) === 0);
  };

  const handleToggleMute = () => setMuted(!muted);

  const handleProgress = (state: { played: number; loaded: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      setLoaded(state.loaded);
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayed(parseFloat(e.target.value));
  };

  const handleSeekMouseDown = () => setSeeking(true);

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    setSeeking(false);
    playerRef.current?.seekTo(parseFloat((e.target as HTMLInputElement).value));
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (playing) setShowControls(false);
    }, 2500);
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  useEffect(() => {
    // Auto-hide controls initially
    if (autoPlay) {
        controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 2000);
    }
    return () => {
        if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [autoPlay]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-black group overflow-hidden rounded-lg shadow-2xl border border-white/10"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => playing && setShowControls(false)}
    >
      <ReactPlayer
        ref={playerRef}
        url={url}
        width="100%"
        height="100%"
        playing={playing}
        volume={volume}
        muted={muted}
        onProgress={handleProgress}
        onDuration={setDuration}
        light={thumbnail}
        playIcon={
          <div className="w-20 h-20 bg-gold-500/90 rounded-full flex items-center justify-center pl-2 text-black shadow-[0_0_40px_rgba(212,175,55,0.5)] cursor-pointer backdrop-blur-md hover:scale-110 transition-transform">
            <Play fill="currentColor" size={32} />
          </div>
        }
      />

      {/* Custom Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30 flex flex-col justify-between p-6 pointer-events-none"
          >
            {/* Top Bar */}
            <div className="flex justify-between items-start pointer-events-auto">
                <div className="bg-gold-500/20 backdrop-blur-md px-3 py-1 rounded text-gold-500 text-xs font-bold uppercase tracking-widest border border-gold-500/30">
                    Cinematic 4K
                </div>
            </div>

            {/* Center Play Button (Large) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <button 
                    onClick={handlePlayPause}
                    className="pointer-events-auto text-white/80 hover:text-gold-500 transition-colors transform hover:scale-110 active:scale-95"
                >
                    {playing ? <Pause size={64} className="opacity-0" /> : <Play size={64} fill="currentColor" className="opacity-0" />}
                </button>
            </div>

            {/* Bottom Controls */}
            <div className="space-y-4 pointer-events-auto">
              
              {/* Advanced Timeline */}
              <div className="relative w-full h-1 group/seeker py-2 cursor-pointer">
                 {/* Container for visual bars */}
                 <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-white/20 rounded-lg overflow-hidden">
                    {/* Layer 1: Base (Total) - already set by bg-white/20 */}
                    
                    {/* Layer 2: Buffered (Loaded) */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-white/40 transition-all duration-300"
                        style={{ width: `${loaded * 100}%` }}
                    />

                    {/* Layer 3: Played (Progress) */}
                    <div 
                        className="absolute top-0 left-0 h-full bg-gold-500 transition-all duration-100"
                        style={{ width: `${played * 100}%` }}
                    />
                 </div>

                 {/* Thumb (Visual Only - moves with played) */}
                 <div 
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/seeker:opacity-100 transition-opacity pointer-events-none"
                    style={{ left: `${played * 100}%`, transform: 'translate(-50%, -50%)' }}
                 />

                 {/* Actual Input Range (Invisible but Interactive) */}
                 <input
                    type="range"
                    min={0}
                    max={0.999999}
                    step="any"
                    value={played}
                    onMouseDown={handleSeekMouseDown}
                    onChange={handleSeekChange}
                    onMouseUp={handleSeekMouseUp}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                 />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button onClick={handlePlayPause} className="text-white hover:text-gold-500 transition-colors">
                    {playing ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
                  </button>
                  
                  <div className="flex items-center gap-2 group/vol">
                    <button onClick={handleToggleMute} className="text-white hover:text-gold-500 transition-colors">
                      {muted || volume === 0 ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>
                    
                    {/* Perfect Volume Slider */}
                    <div className="w-0 overflow-hidden group-hover/vol:w-24 transition-all duration-300 flex items-center">
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step="any"
                            value={muted ? 0 : volume}
                            onChange={handleVolumeChange}
                            style={{
                                background: `linear-gradient(to right, #d4af37 0%, #d4af37 ${muted ? 0 : volume * 100}%, rgba(255,255,255,0.2) ${muted ? 0 : volume * 100}%, rgba(255,255,255,0.2) 100%)`
                            }}
                            className="w-20 h-1 rounded-lg appearance-none cursor-pointer ml-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
                        />
                    </div>
                  </div>

                  <span className="text-xs font-mono text-gray-300">
                    {formatTime(duration * played)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="text-white hover:text-gold-500 transition-colors">
                        <SkipBack size={20} />
                    </button>
                    <button className="text-white hover:text-gold-500 transition-colors">
                        <SkipForward size={20} />
                    </button>
                    <button onClick={handleFullscreen} className="text-white hover:text-gold-500 transition-colors">
                        {fullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                    </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
