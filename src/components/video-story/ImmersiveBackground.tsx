"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import CSSFallbackBackground from "./CSSFallbackBackground";

function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 850;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      data[i * 3] = (Math.random() - 0.5) * 12;
      data[i * 3 + 1] = (Math.random() - 0.5) * 8;
      data[i * 3 + 2] = (Math.random() - 0.5) * 7;
    }

    return data;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.018;
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.025;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.018}
        color="#7dd3fc"
        transparent
        opacity={0.62}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function Rings() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.z = state.clock.elapsedTime * 0.03;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.07;
  });

  return (
    <group ref={groupRef} position={[0, 0, -2.8]}>
      {[2.4, 3.4, 4.4].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, index * 0.45]}>
          <torusGeometry args={[radius, 0.004, 16, 180]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.08 - index * 0.015} />
        </mesh>
      ))}
    </group>
  );
}

export default function ImmersiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <CSSFallbackBackground />
      <div className="absolute inset-0 opacity-70">
        <Canvas camera={{ position: [0, 0, 5.4], fov: 58 }} dpr={[1, 1.5]} gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}>
          <ParticleField />
          <Rings />
        </Canvas>
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,transparent_0%,rgba(2,6,23,0.25)_42%,rgba(2,6,23,0.90)_100%)]" />
    </div>
  );
}
