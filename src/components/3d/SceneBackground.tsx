import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { cn } from "../../lib/utils";

export interface SceneBackgroundProps {
  dimmed?: boolean;
  className?: string;
  interactive?: boolean;
}

export const SceneBackground: React.FC<SceneBackgroundProps> = ({
  dimmed = false,
  className,
  interactive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimmedRef = useRef(dimmed);

  useEffect(() => {
    dimmedRef.current = dimmed;
  }, [dimmed]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // ==========================================
    // SCENE & FOG
    // ==========================================
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080e, 0.035);

    // ==========================================
    // CAMERA
    // ==========================================
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    // ==========================================
    // RENDERER
    // ==========================================
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ==========================================
    // LIGHTING
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x1a1230, 2.0);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xa855f7, 3.5, 30);
    coreLight.position.set(0, 0, 2);
    scene.add(coreLight);

    const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 25);
    cyanLight.position.set(0, 0, -2);
    scene.add(cyanLight);

    // ==========================================
    // PARTICLE TEXTURE
    // ==========================================
    function createParticleTexture() {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, "rgba(255,255,255,1)");
        gradient.addColorStop(0.2, "rgba(220,240,255,0.9)");
        gradient.addColorStop(0.45, "rgba(168,85,247,0.45)");
        gradient.addColorStop(0.7, "rgba(56,189,248,0.15)");
        gradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    }
    const particleTexture = createParticleTexture();

    // ==========================================
    // PARTICLE SYSTEM (8,000 Particles)
    // ==========================================
    const PARTICLE_COUNT = 8000;
    const geometry = new THREE.BufferGeometry();

    const originalPositions = new Float32Array(PARTICLE_COUNT * 3);
    const currentPositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const orbitalParams = new Float32Array(PARTICLE_COUNT * 4);

    const colorPurple = new THREE.Color(0xa855f7);
    const colorCyan = new THREE.Color(0x38bdf8);
    const colorWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      const blade = i % 5;
      const t = Math.random();

      const angleOffset = (blade * 2 * Math.PI) / 5;
      const spiralAngle = angleOffset + t * 2.8 + Math.sin(t * Math.PI * 2) * 0.2;
      const radius = 0.5 + Math.pow(t, 0.85) * 5.2;

      let x: number;
      let y: number;
      let z: number;

      // Hexagonal Core (1200 particles)
      if (i < 1200) {
        const hexAngle = Math.floor(Math.random() * 6) * (Math.PI / 3) + (Math.random() - 0.5) * 0.4;
        const hexRadius = Math.pow(Math.random(), 0.5) * 1.3;
        x = Math.cos(hexAngle) * hexRadius;
        y = Math.sin(hexAngle) * hexRadius;
        z = (Math.random() - 0.5) * 0.8;
      } else {
        // Spiral Blades
        const spread = Math.pow(t, 1.2) * 0.65;
        const perpX = -Math.sin(spiralAngle);
        const perpY = Math.cos(spiralAngle);
        const offsetAmount = (Math.random() - 0.5) * spread;

        x = Math.cos(spiralAngle) * radius + perpX * offsetAmount;
        y = Math.sin(spiralAngle) * radius + perpY * offsetAmount;
        z = (Math.random() - 0.5) * (0.8 + (1 - t) * 1.2);
      }

      originalPositions[i3] = x;
      originalPositions[i3 + 1] = y;
      originalPositions[i3 + 2] = z;

      currentPositions[i3] = x;
      currentPositions[i3 + 1] = y;
      currentPositions[i3 + 2] = z;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      const mixedColor = new THREE.Color();
      const colorMixFactor = (t + Math.random() * 0.3) % 1.0;

      if (Math.random() > 0.88) {
        mixedColor.copy(colorWhite);
      } else {
        mixedColor.copy(colorPurple).lerp(colorCyan, colorMixFactor);
      }

      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;

      sizes[i] = 0.08 + Math.random() * 0.22;

      orbitalParams[i * 4] = blade;
      orbitalParams[i * 4 + 1] = radius;
      orbitalParams[i * 4 + 2] = 0.4 + Math.random() * 0.8;
      orbitalParams[i * 4 + 3] = Math.random() * Math.PI * 2;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(currentPositions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.22,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.95,
    });

    const particleSystem = new THREE.Points(geometry, particleMaterial);
    scene.add(particleSystem);

    // ==========================================
    // HEXAGONAL SINGULARITY
    // ==========================================
    const hexShape = new THREE.Shape();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = Math.cos(angle) * 0.92;
      const y = Math.sin(angle) * 0.92;
      if (i === 0) hexShape.moveTo(x, y);
      else hexShape.lineTo(x, y);
    }
    hexShape.closePath();

    const hexGeometry = new THREE.ShapeGeometry(hexShape);
    const hexMaterial = new THREE.MeshBasicMaterial({
      color: 0x020308,
      side: THREE.DoubleSide,
    });
    const blackHoleCore = new THREE.Mesh(hexGeometry, hexMaterial);
    blackHoleCore.position.z = -0.05;
    scene.add(blackHoleCore);

    const hexEdges = new THREE.EdgesGeometry(hexGeometry);
    const hexEdgeMaterial = new THREE.LineBasicMaterial({
      color: 0x38bdf8,
      linewidth: 2,
      transparent: true,
      opacity: 0.9,
    });
    const hexEdgeLine = new THREE.LineSegments(hexEdges, hexEdgeMaterial);
    blackHoleCore.add(hexEdgeLine);

    // ==========================================
    // INNER GLOW RING
    // ==========================================
    const innerRingGeometry = new THREE.RingGeometry(0.95, 1.25, 48);
    const innerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });
    const innerRing = new THREE.Mesh(innerRingGeometry, innerRingMaterial);
    scene.add(innerRing);

    // ==========================================
    // OUTER RING
    // ==========================================
    const outerRingGeometry = new THREE.RingGeometry(5.4, 5.5, 96);
    const outerRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      blending: THREE.AdditiveBlending,
    });
    const outerRing = new THREE.Mesh(outerRingGeometry, outerRingMaterial);
    scene.add(outerRing);

    // ==========================================
    // MIDDLE RING
    // ==========================================
    const midRingGeometry = new THREE.RingGeometry(3.1, 3.16, 64);
    const midRingMaterial = new THREE.MeshBasicMaterial({
      color: 0x9333ea,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const midRing = new THREE.Mesh(midRingGeometry, midRingMaterial);
    scene.add(midRing);

    // ==========================================
    // ELECTRIC LINES
    // ==========================================
    const lineCount = 5;
    const electronLines: { line: THREE.Line; blade: number; timer: number }[] = [];

    for (let i = 0; i < lineCount; i++) {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(18 * 3);
      lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.7,
        blending: THREE.AdditiveBlending,
      });

      const line = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(line);

      electronLines.push({
        line: line,
        blade: i,
        timer: Math.random() * 2,
      });
    }

    function updateLightning(delta: number, time: number) {
      electronLines.forEach((item) => {
        item.timer -= delta;
        if (item.timer <= 0) {
          item.timer = 0.12 + Math.random() * 0.35;
          const positions = item.line.geometry.attributes.position.array as Float32Array;
          const baseAngle = (item.blade * 2 * Math.PI) / 5 + time * 0.3;

          for (let j = 0; j < 18; j++) {
            const t = j / 17;
            const radius = 0.9 + t * 4.4;
            const theta = baseAngle + t * 2.2 + (Math.random() - 0.5) * 0.35;
            const z = (Math.random() - 0.5) * 0.4;

            positions[j * 3] = Math.cos(theta) * radius;
            positions[j * 3 + 1] = Math.sin(theta) * radius;
            positions[j * 3 + 2] = z;
          }

          item.line.geometry.attributes.position.needsUpdate = true;
          (item.line.material as THREE.LineBasicMaterial).opacity = 0.2 + Math.random() * 0.8;
        }
      });
    }

    // ==========================================
    // MOUSE INTERACTION & MAGNETIC REPULSION
    // ==========================================
    const mouse = new THREE.Vector2(-999, -999);
    const targetWorldPos = new THREE.Vector3(0, 0, 0);
    let isPointerHovered = false;
    const raycaster = new THREE.Raycaster();
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const targetCameraPos = new THREE.Vector3(0, 0, 16);

    const onPointerMove = (e: PointerEvent | MouseEvent) => {
      if (!interactive) return;
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      isPointerHovered = true;

      raycaster.setFromCamera(mouse, camera);
      raycaster.ray.intersectPlane(planeZ, targetWorldPos);

      targetCameraPos.x = mouse.x * 2.2;
      targetCameraPos.y = mouse.y * 1.8;
    };

    const onPointerLeave = () => {
      isPointerHovered = false;
      mouse.x = -999;
      mouse.y = -999;
      targetWorldPos.set(999, 999, 0);
      targetCameraPos.x = 0;
      targetCameraPos.y = 0;
    };

    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerleave", onPointerLeave);

    // ==========================================
    // CLICK BURST
    // ==========================================
    let burstPower = 0;
    const onWindowClick = () => {
      if (dimmedRef.current) return;
      burstPower = 6.5;
      coreLight.intensity = 12.0;
      setTimeout(() => {
        coreLight.intensity = 3.5;
      }, 600);
    };

    window.addEventListener("click", onWindowClick);

    // ==========================================
    // ANIMATION LOOP
    // ==========================================
    const clock = new THREE.Clock();
    let animationFrameId: number;

    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Burst decay
      if (burstPower > 0) {
        burstPower -= delta * 3.8;
        if (burstPower < 0) burstPower = 0;
      }

      // Smooth Dimming Transition when content panel is active
      const targetParticleOpacity = dimmedRef.current ? 0.35 : 0.95;
      particleMaterial.opacity = THREE.MathUtils.lerp(particleMaterial.opacity, targetParticleOpacity, 0.08);

      const targetLightIntensity = dimmedRef.current ? 1.2 : 3.5;
      if (burstPower <= 0.05) {
        coreLight.intensity = THREE.MathUtils.lerp(coreLight.intensity, targetLightIntensity, 0.08);
      }

      // Rotations
      particleSystem.rotation.z = elapsedTime * 0.12;
      blackHoleCore.rotation.z = -elapsedTime * 0.25;
      innerRing.rotation.z = elapsedTime * 0.35;
      outerRing.rotation.z = -elapsedTime * 0.08;
      midRing.rotation.z = elapsedTime * 0.18;

      // Core Breathing
      const breathe = 1.0 + Math.sin(elapsedTime * 4.0) * 0.06;
      blackHoleCore.scale.set(breathe, breathe, 1);
      innerRing.scale.set(breathe * 1.05, breathe * 1.05, 1);

      // Lightning
      updateLightning(delta, elapsedTime);

      // Particle Physics
      const positions = geometry.attributes.position.array as Float32Array;
      const localTarget = targetWorldPos.clone();
      particleSystem.worldToLocal(localTarget);

      const repulsionRadius = 2.4;
      const repulsionStrength = 18.0;
      const returnSpeed = 3.6;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        let px = positions[i3];
        let py = positions[i3 + 1];
        let pz = positions[i3 + 2];

        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];
        const oz = originalPositions[i3 + 2];

        const paramIndex = i * 4;
        const subtleWobble = Math.sin(elapsedTime * 2.5 + orbitalParams[paramIndex + 3]) * 0.035;

        // Magnetic Repulsion from Cursor
        const dx = px - localTarget.x;
        const dy = py - localTarget.y;
        const dz = pz - localTarget.z;
        const distSq = dx * dx + dy * dy + dz * dz;
        const dist = Math.sqrt(distSq);

        if (isPointerHovered && dist < repulsionRadius && dist > 0.001) {
          const force = (1 - dist / repulsionRadius) * repulsionStrength * delta;
          velocities[i3] += (dx / dist) * force;
          velocities[i3 + 1] += (dy / dist) * force;
          velocities[i3 + 2] += (dz / dist + (Math.random() - 0.5) * 0.5) * force;
        }

        // Quantum Burst Impulse
        if (burstPower > 0.05) {
          const centerDistance = Math.sqrt(px * px + py * py + pz * pz) + 0.1;
          velocities[i3] += (px / centerDistance) * burstPower * delta * 2.2;
          velocities[i3 + 1] += (py / centerDistance) * burstPower * delta * 2.2;
          velocities[i3 + 2] += ((Math.random() - 0.5) * burstPower) * delta * 2.5;
        }

        // Drag
        velocities[i3] *= 0.88;
        velocities[i3 + 1] *= 0.88;
        velocities[i3 + 2] *= 0.88;

        // Velocity Integration
        px += velocities[i3];
        py += velocities[i3 + 1];
        pz += velocities[i3 + 2];

        // Return to Original Position (Elastic Pull)
        const returnFactor = returnSpeed * delta;
        px += (ox + subtleWobble - px) * returnFactor;
        py += (oy + subtleWobble - py) * returnFactor;
        pz += (oz - pz) * returnFactor;

        positions[i3] = px;
        positions[i3 + 1] = py;
        positions[i3 + 2] = pz;
      }

      geometry.attributes.position.needsUpdate = true;

      // Camera Lerp
      camera.position.x += (targetCameraPos.x - camera.position.x) * 0.05;
      camera.position.y += (targetCameraPos.y - camera.position.y) * 0.05;
      camera.position.z += (targetCameraPos.z - camera.position.z) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    }

    animate();

    // ==========================================
    // RESPONSIVE RESIZING
    // ==========================================
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    // ==========================================
    // CLEANUP
    // ==========================================
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("click", onWindowClick);
      window.removeEventListener("resize", handleResize);

      geometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      hexGeometry.dispose();
      hexMaterial.dispose();
      hexEdges.dispose();
      hexEdgeMaterial.dispose();
      innerRingGeometry.dispose();
      innerRingMaterial.dispose();
      outerRingGeometry.dispose();
      outerRingMaterial.dispose();
      midRingGeometry.dispose();
      midRingMaterial.dispose();

      electronLines.forEach((item) => {
        item.line.geometry.dispose();
        (item.line.material as THREE.Material).dispose();
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      className={cn(
        "fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden bg-[#06080e]",
        className
      )}
    >
      {/* Three.js Quantum Vortex WebGL Canvas */}
      <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-auto" />

      {/* Cosmic Vignette Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(6,8,14,0.75)_80%,#06080e_100%)]" />
    </div>
  );
};

export default SceneBackground;
