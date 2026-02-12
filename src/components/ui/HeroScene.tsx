import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PerspectiveCamera, Environment, Stars, Sparkles, MeshTransmissionMaterial } from '@react-three/drei';
import * as THREE from 'three';

function AbstractCore({ isMobile }: { isMobile: boolean }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();
    // Cinematic slow rotation
    group.current.rotation.y = t * 0.15;
    group.current.rotation.z = Math.sin(t * 0.1) * 0.05;
  });

  // Reduce geometry complexity for mobile
  const segments = isMobile ? 32 : 64;
  const transmissionRes = isMobile ? 256 : 512;

  return (
    <group ref={group} rotation={[0, 0, Math.PI / 6]}>
      {/* Central Lens Element */}
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[2, 2, 0.6, segments]} />
          {/* Optimized Material */}
          <MeshTransmissionMaterial
            backside
            backsideThickness={0.5}
            thickness={2}
            chromaticAberration={0.1}
            anisotropy={0.5}
            ior={1.5}
            color="#d4af37"
            resolution={transmissionRes}
            samples={isMobile ? 4 : 8} // Reduce samples on mobile
          />
        </mesh>
        {/* Inner Lens Housing */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
           <cylinderGeometry args={[1.65, 1.65, 0.65, segments]} />
           <meshStandardMaterial color="#050505" roughness={0.3} metalness={0.9} />
        </mesh>
      </Float>

      {/* Orbiting Focus Rings - Reduced count on mobile */}
      {(isMobile ? [3.2] : [3, 3.4, 4]).map((radius, i) => (
        <group key={i} rotation={[Math.PI / 3, i * 0.5, 0]}>
            <mesh>
            <torusGeometry args={[radius, 0.02 + (i * 0.01), 16, 64]} />
            <meshStandardMaterial
                color={i === 1 ? "#d4af37" : "#ffffff"}
                emissive={i === 1 ? "#d4af37" : "#ffffff"}
                emissiveIntensity={i === 1 ? 0.8 : 0.2}
                transparent
                opacity={0.6}
            />
            </mesh>
        </group>
      ))}

      {/* Cinematic Shards - Reduced count
      {Array.from({ length: isMobile ? 6 : 12 }).map((_, i) => (
        <Float key={i} speed={1.5} rotationIntensity={2} floatIntensity={2} position={[
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 5
        ]}>
          <mesh>
            <boxGeometry args={[0.05, 0.8, 0.01]} />
            <meshBasicMaterial color="#d4af37" transparent opacity={0.3} />
          </mesh>
        </Float>
      ))}*/}
    </group>
  );
}

export default function HeroScene() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-full h-full absolute inset-0 z-10 pointer-events-none md:pointer-events-auto">
      <Canvas
        dpr={[1, 1.5]} // Cap pixel ratio to 1.5 for performance
        gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: false
        }}
        camera={{ position: [0, 0, 10], fov: 40 }}
      >
        <ambientLight intensity={0.2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#d4af37" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#fff" />

        <AbstractCore isMobile={isMobile} />

        {/* Drastically reduced star count for performance */}
        <Stars radius={100} depth={50} count={isMobile ? 500 : 2000} factor={4} saturation={0} fade speed={1} />
        <Sparkles count={isMobile ? 30 : 80} scale={12} size={2} speed={0.4} opacity={0.5} color="#d4af37" />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
