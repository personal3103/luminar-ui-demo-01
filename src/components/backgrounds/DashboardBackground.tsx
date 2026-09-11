import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import { cn } from "../../lib/utils";

export interface DashboardBackgroundProps {
  className?: string;
  interactive?: boolean;
  enableParallax?: boolean;
  showVignette?: boolean;
  particleCount?: number;
}

export interface DashboardBackgroundRef {
  triggerBurst: () => void;
  resetCamera: () => void;
}

export const DashboardBackground = forwardRef<DashboardBackgroundRef, DashboardBackgroundProps>(
  (
    {
      className,
      interactive = true,
      enableParallax = true,
      showVignette = true,
      particleCount = 8000,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const burstPowerRef = useRef(0);
    const coreLightRef = useRef<THREE.PointLight | null>(null);
    const targetCameraPosRef = useRef(new THREE.Vector3(0, 0, 16));

    useImperativeHandle(ref, () => ({
      triggerBurst: () => {
        burstPowerRef.current = 6.5;
        if (coreLightRef.current) {
          coreLightRef.current.intensity = 12.0;
          setTimeout(() => {
            if (coreLightRef.current) coreLightRef.current.intensity = 3.5;
          }, 600);
        }
      },
      resetCamera: () => {
        targetCameraPosRef.current.set(0, 0, 16);
        burstPowerRef.current = 0;
      },
    }));

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene & Fog
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x06080e, 0.035);

      // 2. Camera
      const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
      camera.position.set(0, 0, 16);

      // 3. Renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      container.appendChild(renderer.domElement);

      // 4. Lights
      const ambientLight = new THREE.AmbientLight(0x1a1230, 2.0);
      scene.add(ambientLight);

      const coreLight = new THREE.PointLight(0xa855f7, 3.5, 30);
      coreLight.position.set(0, 0, 2);
      scene.add(coreLight);
      coreLightRef.current = coreLight;

      const cyanLight = new THREE.PointLight(0x38bdf8, 2.5, 25);
      cyanLight.position.set(0, 0, -2);
      scene.add(cyanLight);

      // 5. Glow Texture Generator
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, "rgba(255, 255, 255, 1)");
        grad.addColorStop(0.2, "rgba(220, 240, 255, 0.9)");
        grad.addColorStop(0.45, "rgba(168, 85, 247, 0.45)");
        grad.addColorStop(0.7, "rgba(56, 189, 248, 0.15)");
        grad.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 64, 64);
      }
      const particleTexture = new THREE.CanvasTexture(canvas);

      // 6. Particle Swarm (5 vortex blades & singularity core)
      const count = particleCount;
      const geometry = new THREE.BufferGeometry();

      const originalPositions = new Float32Array(count * 3);
      const currentPositions = new Float32Array(count * 3);
      const velocities = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const sizes = new Float32Array(count);
      const orbitalParams = new Float32Array(count * 4);

      const colorPurple = new THREE.Color(0xa855f7);
      const colorCyan = new THREE.Color(0x38bdf8);
      const colorWhite = new THREE.Color(0xffffff);

      const coreCount = Math.floor(count * 0.15);

      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        const blade = i % 5;
        const t = Math.random();

        const angleOffset = (blade * 2 * Math.PI) / 5;
        const spiralAngle = angleOffset + t * 2.8 + Math.sin(t * Math.PI * 2) * 0.2;
        const radius = 0.5 + Math.pow(t, 0.85) * 5.2;

        let x: number, y: number, z: number;
        if (i < coreCount) {
          // Hexagonal Core Cluster
          const hexAngle = Math.floor(Math.random() * 6) * (Math.PI / 3) + (Math.random() - 0.5) * 0.4;
          const hexR = Math.pow(Math.random(), 0.5) * 1.3;
          x = Math.cos(hexAngle) * hexR;
          y = Math.sin(hexAngle) * hexR;
          z = (Math.random() - 0.5) * 0.8;
        } else {
          // 5 Spiral Blades
          const spread = Math.pow(t, 1.2) * 0.65;
          const perpX = -Math.sin(spiralAngle);
          const perpY = Math.cos(spiralAngle);
          const offsetAmt = (Math.random() - 0.5) * spread;

          x = Math.cos(spiralAngle) * radius + perpX * offsetAmt;
          y = Math.sin(spiralAngle) * radius + perpY * offsetAmt;
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

        orbitalParams[i * 4 + 0] = blade;
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

      // 7. Central Hexagonal Singularity Mesh
      const hexShape = new THREE.Shape();
      for (let i = 0; i < 6; i++) {
        const a = (i * Math.PI) / 3;
        const hx = Math.cos(a) * 0.92;
        const hy = Math.sin(a) * 0.92;
        if (i === 0) hexShape.moveTo(hx, hy);
        else hexShape.lineTo(hx, hy);
      }
      hexShape.closePath();

      const hexGeom = new THREE.ShapeGeometry(hexShape);
      const hexMat = new THREE.MeshBasicMaterial({
        color: 0x020308,
        side: THREE.DoubleSide,
      });
      const blackHoleCore = new THREE.Mesh(hexGeom, hexMat);
      blackHoleCore.position.z = -0.05;
      scene.add(blackHoleCore);

      const hexEdges = new THREE.EdgesGeometry(hexGeom);
      const hexEdgeMat = new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.9,
      });
      const hexEdgeLine = new THREE.LineSegments(hexEdges, hexEdgeMat);
      blackHoleCore.add(hexEdgeLine);

      // 8. Aura Rings
      const innerRingGeom = new THREE.RingGeometry(0.95, 1.25, 48);
      const innerRingMat = new THREE.MeshBasicMaterial({
        color: 0xa855f7,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
      });
      const innerRing = new THREE.Mesh(innerRingGeom, innerRingMat);
      scene.add(innerRing);

      const outerRingGeom = new THREE.RingGeometry(5.4, 5.5, 96);
      const outerRingMat = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.25,
        blending: THREE.AdditiveBlending,
      });
      const outerRing = new THREE.Mesh(outerRingGeom, outerRingMat);
      scene.add(outerRing);

      const midRingGeom = new THREE.RingGeometry(3.1, 3.16, 64);
      const midRingMat = new THREE.MeshBasicMaterial({
        color: 0x9333ea,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35,
        blending: THREE.AdditiveBlending,
      });
      const midRing = new THREE.Mesh(midRingGeom, midRingMat);
      scene.add(midRing);

      // 9. Electric Lightning Lines
      const lineCount = 5;
      const electronLines: { line: THREE.Line; blade: number; timer: number }[] = [];
      for (let i = 0; i < lineCount; i++) {
        const lineGeom = new THREE.BufferGeometry();
        const linePts = new Float32Array(18 * 3);
        lineGeom.setAttribute("position", new THREE.BufferAttribute(linePts, 3));
        const lineMat = new THREE.LineBasicMaterial({
          color: 0x7dd3fc,
          transparent: true,
          opacity: 0.7,
          blending: THREE.AdditiveBlending,
        });
        const line = new THREE.Line(lineGeom, lineMat);
        scene.add(line);
        electronLines.push({ line, blade: i, timer: Math.random() * 2 });
      }

      function updateLightning(delta: number, time: number) {
        electronLines.forEach((item) => {
          item.timer -= delta;
          if (item.timer <= 0) {
            item.timer = 0.12 + Math.random() * 0.35;
            const positions = item.line.geometry.attributes.position.array as Float32Array;
            const baseAngle = (item.blade * 2 * Math.PI) / 5 + time * 0.3;

            let currR = 0.9;
            for (let j = 0; j < 18; j++) {
              const t = j / 17;
              currR = 0.9 + t * 4.4;
              const theta = baseAngle + t * 2.2 + (Math.random() - 0.5) * 0.35;
              const zDev = (Math.random() - 0.5) * 0.4;
              positions[j * 3] = Math.cos(theta) * currR;
              positions[j * 3 + 1] = Math.sin(theta) * currR;
              positions[j * 3 + 2] = zDev;
            }
            item.line.geometry.attributes.position.needsUpdate = true;
            (item.line.material as THREE.LineBasicMaterial).opacity = 0.2 + Math.random() * 0.8;
          }
        });
      }

      // 10. Pointer Interactivity
      const mouse = new THREE.Vector2(-999, -999);
      const targetWorldPos = new THREE.Vector3(0, 0, 0);
      let isPointerHovered = false;
      const raycaster = new THREE.Raycaster();
      const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);

      const onPointerMove = (e: PointerEvent) => {
        if (!interactive) return;
        const rect = container.getBoundingClientRect();
        mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        isPointerHovered = true;

        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(planeZ, targetWorldPos);

        if (enableParallax) {
          targetCameraPosRef.current.x = mouse.x * 2.2;
          targetCameraPosRef.current.y = mouse.y * 1.8;
        }
      };

      const onPointerLeave = () => {
        isPointerHovered = false;
        mouse.x = -999;
        mouse.y = -999;
        targetWorldPos.set(999, 999, 0);
        if (enableParallax) {
          targetCameraPosRef.current.x = 0;
          targetCameraPosRef.current.y = 0;
        }
      };

      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerleave", onPointerLeave);

      // 11. Animation Loop
      const clock = new THREE.Clock();
      let animationFrameId: number;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const delta = clock.getDelta();
        const elapsedTime = clock.getElapsedTime();

        // Burst decay
        if (burstPowerRef.current > 0) {
          burstPowerRef.current -= delta * 3.8;
          if (burstPowerRef.current < 0) burstPowerRef.current = 0;
        }

        // Rotations
        particleSystem.rotation.z = elapsedTime * 0.12;
        blackHoleCore.rotation.z = -elapsedTime * 0.25;
        innerRing.rotation.z = elapsedTime * 0.35;
        outerRing.rotation.z = -elapsedTime * 0.08;
        midRing.rotation.z = elapsedTime * 0.18;

        // Breathing scale
        const breathe = 1.0 + Math.sin(elapsedTime * 4.0) * 0.06;
        blackHoleCore.scale.set(breathe, breathe, 1);
        innerRing.scale.set(breathe * 1.05, breathe * 1.05, 1);

        // Lightning
        updateLightning(delta, elapsedTime);

        // Dynamic particle physics
        const posArr = geometry.attributes.position.array as Float32Array;
        const localTarget = targetWorldPos.clone();
        particleSystem.worldToLocal(localTarget);

        const repulsionRadius = 2.4;
        const repulsionStrength = 18.0;
        const returnSpeed = 3.6;

        for (let i = 0; i < count; i++) {
          const i3 = i * 3;
          let px = posArr[i3];
          let py = posArr[i3 + 1];
          let pz = posArr[i3 + 2];

          const ox = originalPositions[i3];
          const oy = originalPositions[i3 + 1];
          const oz = originalPositions[i3 + 2];

          const paramIndex = i * 4;
          const subtleWobble = Math.sin(elapsedTime * 2.5 + orbitalParams[paramIndex + 3]) * 0.035;

          const dx = px - localTarget.x;
          const dy = py - localTarget.y;
          const dz = pz - localTarget.z;
          const distSq = dx * dx + dy * dy + dz * dz;
          const dist = Math.sqrt(distSq);

          if (isPointerHovered && dist < repulsionRadius && dist > 0.001) {
            const force = (1.0 - dist / repulsionRadius) * repulsionStrength * delta;
            velocities[i3] += (dx / dist) * force;
            velocities[i3 + 1] += (dy / dist) * force;
            velocities[i3 + 2] += (dz / dist + (Math.random() - 0.5) * 0.5) * force;
          }

          if (burstPowerRef.current > 0.05) {
            const cDist = Math.sqrt(px * px + py * py + pz * pz) + 0.1;
            velocities[i3] += (px / cDist) * burstPowerRef.current * delta * 2.2;
            velocities[i3 + 1] += (py / cDist) * burstPowerRef.current * delta * 2.2;
            velocities[i3 + 2] += ((Math.random() - 0.5) * burstPowerRef.current) * delta * 2.5;
          }

          velocities[i3] *= 0.88;
          velocities[i3 + 1] *= 0.88;
          velocities[i3 + 2] *= 0.88;

          px += velocities[i3];
          py += velocities[i3 + 1];
          pz += velocities[i3 + 2];

          const returnFactor = returnSpeed * delta;
          px += (ox + subtleWobble - px) * returnFactor;
          py += (oy + subtleWobble - py) * returnFactor;
          pz += (oz - pz) * returnFactor;

          posArr[i3] = px;
          posArr[i3 + 1] = py;
          posArr[i3 + 2] = pz;
        }

        geometry.attributes.position.needsUpdate = true;

        // Smooth camera lerping
        camera.position.x += (targetCameraPosRef.current.x - camera.position.x) * 0.05;
        camera.position.y += (targetCameraPosRef.current.y - camera.position.y) * 0.05;
        camera.position.z += (targetCameraPosRef.current.z - camera.position.z) * 0.05;
        camera.lookAt(0, 0, 0);

        renderer.render(scene, camera);
      };

      animate();

      // 12. Resize Handler
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      // 13. Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("pointerleave", onPointerLeave);
        window.removeEventListener("resize", handleResize);

        geometry.dispose();
        particleMaterial.dispose();
        particleTexture.dispose();
        hexGeom.dispose();
        hexMat.dispose();
        hexEdges.dispose();
        hexEdgeMat.dispose();
        innerRingGeom.dispose();
        innerRingMat.dispose();
        outerRingGeom.dispose();
        outerRingMat.dispose();
        midRingGeom.dispose();
        midRingMat.dispose();

        electronLines.forEach((item) => {
          item.line.geometry.dispose();
          (item.line.material as THREE.Material).dispose();
        });

        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, [interactive, enableParallax, particleCount]);

    return (
      <div className={cn("relative w-full h-full overflow-hidden bg-[#06080e]", className)}>
        {/* Three.js Canvas Container */}
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto" />

        {/* Cosmic Radial Vignette Overlay */}
        {showVignette && (
          <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(6,8,14,0.75)_80%,#06080e_100%)]" />
        )}
      </div>
    );
  }
);

DashboardBackground.displayName = "DashboardBackground";
export default DashboardBackground;
