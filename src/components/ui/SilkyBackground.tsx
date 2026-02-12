import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

function SilkyMesh() {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    // subtle rotation
    mesh.current.rotation.x = state.clock.getElapsedTime() * 0.1;
    mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh ref={mesh} scale={[1.2, 1.2, 1.2]} position={[0, 0, -2]}>
        <sphereGeometry args={[4, 64, 64]} />
        <MeshDistortMaterial
          color="#0a0a0a" // Very dark base
          emissive="#d4af37" // Gold glow
          emissiveIntensity={0.02}
          roughness={0.1}
          metalness={1}
          distort={0.4} // The "Silk" effect
          speed={1.5} // Flow speed
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

export default function SilkyBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-cinematic-black">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov: 45 }} 
        gl={{ 
            antialias: true, 
            alpha: true,
            powerPreference: "high-performance"
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} color="#d4af37" />
        <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#ffffff" />
        
        <SilkyMesh />
        
        {/* Reduced star count for mobile performance */}
        <Stars radius={50} depth={50} count={800} factor={2} saturation={0} fade speed={0.5} />
      </Canvas>
      
      {/* Vignette & Gradient Overlays for "Professional" look */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)]" />
    </div>
  );
}
