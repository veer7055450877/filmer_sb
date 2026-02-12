import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
}

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const particles: Particle[] = [];
    const particleCount = 100; // Slightly reduced for cleaner look
    const depth = 1000;

    const colors = ['#d4af37', '#ffffff', '#fad643']; // Gold, White, Light Gold

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width - width / 2,
          y: Math.random() * height - height / 2,
          z: Math.random() * depth,
          size: Math.random() * 2,
          speed: Math.random() * 0.2 + 0.05, // Slower, more cinematic
          opacity: Math.random() * 0.5 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = () => {
      // Create a trail effect
      ctx.fillStyle = 'rgba(5, 5, 5, 0.2)'; 
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;

      particles.forEach((p) => {
        p.z -= p.speed;

        if (p.z <= 0) {
          p.z = depth;
          p.x = Math.random() * width - width / 2;
          p.y = Math.random() * height - height / 2;
        }

        const scale = depth / (p.z || 1);
        const x2d = cx + p.x * scale;
        const y2d = cy + p.y * scale;
        
        if (x2d >= 0 && x2d <= width && y2d >= 0 && y2d <= height) {
          const size = p.size * scale * 0.5;
          const opacity = Math.min(1, (1 - p.z / depth) * p.opacity);

          ctx.beginPath();
          ctx.arc(x2d, y2d, size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = opacity;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <>
      <canvas 
        ref={canvasRef} 
        className="fixed inset-0 z-0 pointer-events-none"
      />
      {/* Vignette Overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />
    </>
  );
}
