import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CentralHologramProps {
  dimmed?: boolean;
}

export function CentralHologram({ dimmed = false }: CentralHologramProps) {
  const groupRef = useRef<THREE.Group>(null);
  const outerIcosaRef = useRef<THREE.Mesh>(null);
  const innerSphereRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  // Generate 400 abstract orbiting quantum particles
  const [particlePositions, particleColors] = useMemo(() => {
    const count = 400;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorPurple = new THREE.Color(0xa855f7);

    for (let i = 0; i < count; i++) {
      const radius = 1.4 + Math.random() * 1.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixed = colorCyan.clone().lerp(colorPurple, Math.random());
      colors[i * 3] = mixed.r;
      colors[i * 3 + 1] = mixed.g;
      colors[i * 3 + 2] = mixed.b;
    }
    return [positions, colors];
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Subtle pointer parallax tilt
    if (groupRef.current) {
      const targetX = state.pointer.y * 0.25;
      const targetY = state.pointer.x * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.05);
    }

    // Outer geometric rotation
    if (outerIcosaRef.current) {
      outerIcosaRef.current.rotation.x = t * 0.25;
      outerIcosaRef.current.rotation.y = t * 0.35;
      const s = dimmed ? 0.85 : 1 + Math.sin(t * 1.5) * 0.04;
      outerIcosaRef.current.scale.set(s, s, s);
    }

    // Inner core counter rotation & breathing
    if (innerSphereRef.current) {
      innerSphereRef.current.rotation.y = -t * 0.45;
      innerSphereRef.current.rotation.z = t * 0.2;
      const coreScale = dimmed ? 0.75 : 0.9 + Math.sin(t * 2.8) * 0.06;
      innerSphereRef.current.scale.set(coreScale, coreScale, coreScale);
    }

    // Orbiting particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = t * 0.15;
      particlesRef.current.rotation.z = -t * 0.08;
    }

    // Orbital ring
    if (ringRef.current) {
      ringRef.current.rotation.x = 1.1 + Math.sin(t * 0.5) * 0.1;
      ringRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Outer Hologram Wireframe Icosahedron */}
      <mesh ref={outerIcosaRef}>
        <icosahedronGeometry args={[1.65, 1]} />
        <meshStandardMaterial
          wireframe
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={dimmed ? 0.2 : 0.8}
          transparent
          opacity={dimmed ? 0.25 : 0.75}
        />
      </mesh>

      {/* 2. Inner Quantum Wireframe Sphere */}
      <mesh ref={innerSphereRef}>
        <sphereGeometry args={[1.05, 18, 18]} />
        <meshStandardMaterial
          wireframe
          color="#c084fc"
          emissive="#9333ea"
          emissiveIntensity={dimmed ? 0.3 : 1.1}
          transparent
          opacity={dimmed ? 0.3 : 0.85}
        />
      </mesh>

      {/* 3. Central Solid Energy Core */}
      <mesh>
        <sphereGeometry args={[0.35, 24, 24]} />
        <meshBasicMaterial
          color="#e0f2fe"
          transparent
          opacity={dimmed ? 0.3 : 0.9}
        />
      </mesh>

      {/* 4. Concentric Energy Orbital Ring */}
      <mesh ref={ringRef}>
        <torusGeometry args={[2.35, 0.015, 16, 100]} />
        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={dimmed ? 0.15 : 0.45}
        />
      </mesh>

      {/* 5. Ambient Quantum Particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[particleColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          vertexColors
          transparent
          opacity={dimmed ? 0.25 : 0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

export default CentralHologram;
