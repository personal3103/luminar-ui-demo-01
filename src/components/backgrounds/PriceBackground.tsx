import { useEffect, useRef, useImperativeHandle, forwardRef } from "react";
import * as THREE from "three";
import { cn } from "../../lib/utils";

export type PricePalette = "emerald" | "cyan" | "lime";

export interface PriceBackgroundProps {
  className?: string;
  interactive?: boolean;
  palette?: PricePalette;
  crystalRoughness?: number;
  enableBioPulse?: boolean;
  enableCaustics?: boolean;
  enableVortexDrift?: boolean;
}

export interface PriceBackgroundRef {
  setPalette: (palette: PricePalette) => void;
  resetView: () => void;
  toggleSpin: (active?: boolean) => void;
}

export const PriceBackground = forwardRef<PriceBackgroundRef, PriceBackgroundProps>(
  (
    {
      className,
      interactive = true,
      palette = "emerald",
      crystalRoughness = 0.12,
      enableBioPulse = true,
      enableCaustics = true,
      enableVortexDrift = true,
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoGroupRef = useRef<THREE.Group | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const vortexSpinActiveRef = useRef(enableVortexDrift);
    const paletteSetterRef = useRef<((p: PricePalette) => void) | null>(null);

    useImperativeHandle(ref, () => ({
      setPalette: (p: PricePalette) => {
        if (paletteSetterRef.current) paletteSetterRef.current(p);
      },
      resetView: () => {
        if (logoGroupRef.current) logoGroupRef.current.rotation.set(0, 0, 0);
        if (cameraRef.current) cameraRef.current.position.set(0, 2.2, 7.2);
      },
      toggleSpin: (active?: boolean) => {
        vortexSpinActiveRef.current = active !== undefined ? active : !vortexSpinActiveRef.current;
      },
    }));

    useEffect(() => {
      vortexSpinActiveRef.current = enableVortexDrift;
    }, [enableVortexDrift]);

    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight;

      // 1. Scene, Camera, Renderer
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x040806);
      scene.fog = new THREE.FogExp2(0x040806, 0.038);

      const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 2.2, 7.2);
      cameraRef.current = camera;

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.5;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      container.appendChild(renderer.domElement);

      // 2. Liquid Obsidian Floor
      const floorGeom = new THREE.PlaneGeometry(35, 35, 32, 32);
      const floorMat = new THREE.MeshPhysicalMaterial({
        color: 0x030705,
        metalness: 0.95,
        roughness: 0.1,
        reflectivity: 0.85,
        clearcoat: 1.0,
        clearcoatRoughness: 0.06,
      });
      const floor = new THREE.Mesh(floorGeom, floorMat);
      floor.rotation.x = -Math.PI / 2;
      floor.position.y = -2.1;
      floor.receiveShadow = true;
      scene.add(floor);

      // Coordinate Grid
      const gridHelper = new THREE.GridHelper(26, 26, 0x10b981, 0x064e3b);
      gridHelper.position.y = -2.08;
      (gridHelper.material as THREE.Material).opacity = 0.35;
      (gridHelper.material as THREE.Material).transparent = true;
      scene.add(gridHelper);

      // Caustics Projected Light Map
      const causticCanvas = document.createElement("canvas");
      causticCanvas.width = 512;
      causticCanvas.height = 512;
      const causticCtx = causticCanvas.getContext("2d");

      const causticTexture = new THREE.CanvasTexture(causticCanvas);
      causticTexture.wrapS = THREE.RepeatWrapping;
      causticTexture.wrapT = THREE.RepeatWrapping;

      const causticPlaneGeom = new THREE.PlaneGeometry(9, 9);
      const causticPlaneMat = new THREE.MeshBasicMaterial({
        map: causticTexture,
        transparent: true,
        blending: THREE.AdditiveBlending,
        opacity: 0.9,
        depthWrite: false,
      });
      const causticPlane = new THREE.Mesh(causticPlaneGeom, causticPlaneMat);
      causticPlane.rotation.x = -Math.PI / 2;
      causticPlane.position.y = -2.07;
      scene.add(causticPlane);

      let causticThemeColor1 = "rgba(16, 185, 129, 0.55)";
      let causticThemeColor2 = "rgba(6, 182, 212, 0.40)";
      let causticThemeColor3 = "rgba(52, 211, 153, 0.20)";

      function updateCausticCanvas(time: number) {
        if (!causticCtx) return;
        causticCtx.fillStyle = "#000000";
        causticCtx.fillRect(0, 0, 512, 512);

        const cx = 256,
          cy = 256;
        for (let p = 0; p < 5; p++) {
          const angle = (p / 5) * Math.PI * 2 + time * 0.4;
          const rx = cx + Math.cos(angle) * 115;
          const ry = cy + Math.sin(angle) * 115;

          const grad = causticCtx.createRadialGradient(rx, ry, 12, rx, ry, 130);
          grad.addColorStop(0, causticThemeColor1);
          grad.addColorStop(0.38, causticThemeColor2);
          grad.addColorStop(0.72, causticThemeColor3);
          grad.addColorStop(1, "rgba(0, 0, 0, 0)");

          causticCtx.fillStyle = grad;
          causticCtx.beginPath();
          causticCtx.arc(rx, ry, 130, 0, Math.PI * 2);
          causticCtx.fill();

          causticCtx.strokeStyle = "rgba(110, 231, 183, 0.45)";
          causticCtx.lineWidth = 3.2;
          causticCtx.beginPath();
          causticCtx.ellipse(rx, ry, 85 + Math.sin(time * 2.2 + p) * 16, 38, angle, 0, Math.PI * 2);
          causticCtx.stroke();
        }
        causticTexture.needsUpdate = true;
      }

      // 3. Lighting Setup
      const ambientLight = new THREE.AmbientLight(0x061810, 2.0);
      scene.add(ambientLight);

      const emeraldLight = new THREE.PointLight(0x10b981, 5.2, 22);
      emeraldLight.position.set(3.8, 2.5, 3.2);
      scene.add(emeraldLight);

      const eGlowGeom = new THREE.SphereGeometry(0.12, 16, 16);
      const eGlowMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
      const eGlow = new THREE.Mesh(eGlowGeom, eGlowMat);
      emeraldLight.add(eGlow);

      const cyanLight = new THREE.PointLight(0x06b6d4, 4.8, 22);
      cyanLight.position.set(-3.8, -1.2, 3.0);
      scene.add(cyanLight);

      const cGlowGeom = new THREE.SphereGeometry(0.12, 16, 16);
      const cGlowMat = new THREE.MeshBasicMaterial({ color: 0x67e8f9 });
      const cGlow = new THREE.Mesh(cGlowGeom, cGlowMat);
      cyanLight.add(cGlow);

      const mintLight = new THREE.DirectionalLight(0x6ee7b7, 1.6);
      mintLight.position.set(0, 6, -3);
      scene.add(mintLight);

      // 4. Materials
      const frostedCrystalMaterial = new THREE.MeshPhysicalMaterial({
        color: 0xebfff5,
        transmission: 0.97,
        opacity: 1.0,
        transparent: true,
        roughness: crystalRoughness,
        ior: 1.62,
        reflectivity: 0.95,
        thickness: 2.4,
        clearcoat: 1.0,
        clearcoatRoughness: 0.04,
        attenuationColor: new THREE.Color(0x059669),
        attenuationDistance: 1.5,
        specularIntensity: 1.3,
        specularColor: new THREE.Color(0xa7f3d0),
      });

      const emeraldFringeMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        transmission: 0.9,
        transparent: true,
        opacity: 0.45,
        roughness: 0.16,
        ior: 1.66,
      });

      const cyanFringeMat = new THREE.MeshPhysicalMaterial({
        color: 0x06b6d4,
        transmission: 0.9,
        transparent: true,
        opacity: 0.45,
        roughness: 0.16,
        ior: 1.58,
      });

      const obsidianBioMat = new THREE.MeshPhysicalMaterial({
        color: 0x020a06,
        metalness: 0.94,
        roughness: 0.08,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        reflectivity: 1.0,
        specularColor: new THREE.Color(0x10b981),
      });

      const filamentMat = new THREE.MeshBasicMaterial({
        color: 0x34d399,
        transparent: true,
        opacity: 0.95,
        blending: THREE.AdditiveBlending,
      });

      // Palette switcher function
      const applyPalette = (p: PricePalette) => {
        if (p === "emerald") {
          emeraldLight.color.setHex(0x10b981);
          cyanLight.color.setHex(0x06b6d4);
          frostedCrystalMaterial.attenuationColor.setHex(0x059669);
          filamentMat.color.setHex(0x34d399);
          causticThemeColor1 = "rgba(16, 185, 129, 0.55)";
          causticThemeColor2 = "rgba(6, 182, 212, 0.40)";
          causticThemeColor3 = "rgba(52, 211, 153, 0.20)";
        } else if (p === "cyan") {
          emeraldLight.color.setHex(0x06b6d4);
          cyanLight.color.setHex(0x3b82f6);
          frostedCrystalMaterial.attenuationColor.setHex(0x0284c7);
          filamentMat.color.setHex(0x38bdf8);
          causticThemeColor1 = "rgba(6, 182, 212, 0.65)";
          causticThemeColor2 = "rgba(56, 189, 248, 0.45)";
          causticThemeColor3 = "rgba(16, 185, 129, 0.25)";
        } else if (p === "lime") {
          emeraldLight.color.setHex(0x84cc16);
          cyanLight.color.setHex(0x10b981);
          frostedCrystalMaterial.attenuationColor.setHex(0x65a30d);
          filamentMat.color.setHex(0xa3e635);
          causticThemeColor1 = "rgba(132, 204, 22, 0.6)";
          causticThemeColor2 = "rgba(16, 185, 129, 0.4)";
          causticThemeColor3 = "rgba(217, 249, 157, 0.2)";
        }
      };
      paletteSetterRef.current = applyPalette;
      applyPalette(palette);

      // 5. Build 5-Petal Swept Loop Vortex Geometry + Star Hub
      const logoGroup = new THREE.Group();
      scene.add(logoGroup);
      logoGroupRef.current = logoGroup;

      // 5.1 Center Hub: 5-Point Star with Central Hexagonal Aperture
      const starShape = new THREE.Shape();
      const outerR = 0.95;
      const innerR = 0.48;
      const points = 5;

      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerR : innerR;
        const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * r;
        const py = Math.sin(a) * r;
        if (i === 0) starShape.moveTo(px, py);
        else starShape.lineTo(px, py);
      }
      starShape.closePath();

      const hexHole = new THREE.Path();
      const hexR = 0.28;
      for (let h = 0; h < 6; h++) {
        const ha = (h / 6) * Math.PI * 2;
        const hx = Math.cos(ha) * hexR;
        const hy = Math.sin(ha) * hexR;
        if (h === 0) hexHole.moveTo(hx, hy);
        else hexHole.lineTo(hx, hy);
      }
      hexHole.closePath();
      starShape.holes.push(hexHole);

      const starExtrudeSettings = {
        steps: 2,
        depth: 0.35,
        bevelEnabled: true,
        bevelThickness: 0.08,
        bevelSize: 0.06,
        bevelSegments: 5,
      };

      const starGeom = new THREE.ExtrudeGeometry(starShape, starExtrudeSettings);
      starGeom.center();
      const starMesh = new THREE.Mesh(starGeom, obsidianBioMat);
      logoGroup.add(starMesh);

      const coreGemGeom = new THREE.CylinderGeometry(0.19, 0.19, 0.5, 6);
      const coreGemMat = new THREE.MeshPhysicalMaterial({
        color: 0x10b981,
        transmission: 0.95,
        roughness: 0.08,
        ior: 1.62,
        thickness: 1.8,
        emissive: new THREE.Color(0x064e3b),
        emissiveIntensity: 0.8,
      });
      const coreGem = new THREE.Mesh(coreGemGeom, coreGemMat);
      coreGem.rotation.x = Math.PI / 2;
      logoGroup.add(coreGem);

      // 5.2 Five Swept Vortex Ribbon Loop Blades
      const bladeCount = 5;
      const bladeRibbons: { pivot: THREE.Group; mesh: THREE.Mesh; angle: number }[] = [];
      const geometriesToDispose: THREE.BufferGeometry[] = [
        floorGeom,
        causticPlaneGeom,
        eGlowGeom,
        cGlowGeom,
        starGeom,
        coreGemGeom,
      ];

      for (let i = 0; i < bladeCount; i++) {
        const angle = (i / bladeCount) * Math.PI * 2;

        const shape = new THREE.Shape();
        shape.moveTo(0.1, -0.22);
        shape.quadraticCurveTo(1.2, -0.35, 2.4, 0.08);
        shape.bezierCurveTo(2.85, 0.38, 2.7, 0.85, 2.05, 0.72);
        shape.quadraticCurveTo(1.15, 0.52, 0.1, 0.18);
        shape.closePath();

        const extrudeSettings = {
          steps: 30,
          depth: 0.2,
          bevelEnabled: true,
          bevelThickness: 0.07,
          bevelSize: 0.06,
          bevelSegments: 5,
        };

        const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        geom.center();

        const pos = geom.attributes.position;
        for (let k = 0; k < pos.count; k++) {
          const x = pos.getX(k);
          const y = pos.getY(k);
          const z = pos.getZ(k);

          const twist = x * 0.55;
          const cosT = Math.cos(twist);
          const sinT = Math.sin(twist);

          pos.setY(k, y * cosT - z * sinT);
          pos.setZ(k, y * sinT + z * cosT + Math.sin(x * 1.8) * 0.14);
        }
        geom.computeVertexNormals();
        geometriesToDispose.push(geom);

        const bladePivot = new THREE.Group();
        bladePivot.rotation.z = angle;

        const bladeMesh = new THREE.Mesh(geom, frostedCrystalMaterial);
        bladeMesh.position.set(1.48, 0, 0);
        bladeMesh.rotation.x = 0.36;
        bladeMesh.rotation.y = 0.18;
        bladePivot.add(bladeMesh);

        // Prismatic aberration offsets
        const emeraldBlade = new THREE.Mesh(geom, emeraldFringeMat);
        emeraldBlade.position.set(1.485, 0.015, -0.015);
        emeraldBlade.rotation.x = 0.36;
        emeraldBlade.rotation.y = 0.18;
        bladePivot.add(emeraldBlade);

        const cyanBlade = new THREE.Mesh(geom, cyanFringeMat);
        cyanBlade.position.set(1.475, -0.015, 0.015);
        cyanBlade.rotation.x = 0.36;
        cyanBlade.rotation.y = 0.18;
        bladePivot.add(cyanBlade);

        // Glowing internal spine filament
        const curvePoints: THREE.Vector3[] = [];
        for (let s = 0; s <= 20; s++) {
          const t = s / 20;
          const fx = 0.2 + t * 2.1;
          const fy = Math.sin(t * Math.PI) * 0.35 - 0.05;
          const fz = Math.sin(fx * 1.8) * 0.12;
          curvePoints.push(new THREE.Vector3(fx, fy, fz));
        }
        const filamentCurve = new THREE.CatmullRomCurve3(curvePoints);
        const filamentGeom = new THREE.TubeGeometry(filamentCurve, 24, 0.018, 8, false);
        geometriesToDispose.push(filamentGeom);

        const filamentMesh = new THREE.Mesh(filamentGeom, filamentMat);
        filamentMesh.position.set(0.18, 0, 0);
        bladePivot.add(filamentMesh);

        logoGroup.add(bladePivot);
        bladeRibbons.push({ pivot: bladePivot, mesh: bladeMesh, angle });
      }

      // 5.3 Bioluminescent Floating Spores
      const sporeCount = 180;
      const sporeGeom = new THREE.BufferGeometry();
      const sporePositions = new Float32Array(sporeCount * 3);
      const sporeColors = new Float32Array(sporeCount * 3);

      const colEmerald = new THREE.Color(0x10b981);
      const colCyan = new THREE.Color(0x06b6d4);
      const colMint = new THREE.Color(0x6ee7b7);

      for (let i = 0; i < sporeCount; i++) {
        const r = 1.1 + Math.random() * 3.2;
        const th = Math.random() * Math.PI * 2;
        const ph = (Math.random() - 0.5) * 1.5;

        sporePositions[i * 3] = r * Math.cos(th) * Math.cos(ph);
        sporePositions[i * 3 + 1] = r * Math.sin(ph);
        sporePositions[i * 3 + 2] = r * Math.sin(th) * Math.cos(ph);

        const pick = Math.random();
        const c = pick < 0.5 ? colEmerald : pick < 0.85 ? colCyan : colMint;
        sporeColors[i * 3] = c.r;
        sporeColors[i * 3 + 1] = c.g;
        sporeColors[i * 3 + 2] = c.b;
      }

      sporeGeom.setAttribute("position", new THREE.BufferAttribute(sporePositions, 3));
      sporeGeom.setAttribute("color", new THREE.BufferAttribute(sporeColors, 3));
      geometriesToDispose.push(sporeGeom);

      const sporeMat = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
      });

      const bioSpores = new THREE.Points(sporeGeom, sporeMat);
      logoGroup.add(bioSpores);

      // Torus Rings
      const ring1Geom = new THREE.TorusGeometry(3.15, 0.012, 16, 120);
      const ring1Mat = new THREE.MeshBasicMaterial({ color: 0x10b981, transparent: true, opacity: 0.4 });
      const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
      ring1.rotation.x = 1.25;
      logoGroup.add(ring1);

      const ring2Geom = new THREE.TorusGeometry(3.55, 0.009, 16, 120);
      const ring2Mat = new THREE.MeshBasicMaterial({ color: 0x06b6d4, transparent: true, opacity: 0.35 });
      const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
      ring2.rotation.x = 0.72;
      ring2.rotation.y = 0.38;
      logoGroup.add(ring2);

      geometriesToDispose.push(ring1Geom, ring2Geom);

      // 6. Interactive Controls
      let mouseX = 0,
        mouseY = 0;
      let targetRotX = 0,
        targetRotY = 0;
      let isDragging = false;
      let prevX = 0,
        prevY = 0;

      const onMouseDown = (e: MouseEvent) => {
        if (!interactive) return;
        isDragging = true;
        prevX = e.clientX;
        prevY = e.clientY;
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!interactive) return;
        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -((e.clientY - rect.top) / rect.height) * 2 + 1;

        if (isDragging) {
          const dx = e.clientX - prevX;
          const dy = e.clientY - prevY;
          logoGroup.rotation.y += dx * 0.008;
          logoGroup.rotation.x += dy * 0.008;
        }
        prevX = e.clientX;
        prevY = e.clientY;
      };

      const onMouseUp = () => {
        isDragging = false;
      };

      container.addEventListener("mousedown", onMouseDown);
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);

      // 7. Animation Loop
      const clock = new THREE.Clock();
      let animationFrameId: number;

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        const t = clock.getElapsedTime();

        // Vortex spin & mouse damping
        if (vortexSpinActiveRef.current && !isDragging) {
          logoGroup.rotation.z = t * 0.22;
          targetRotX = mouseY * 0.35;
          targetRotY = mouseX * 0.5;
          logoGroup.rotation.x += (targetRotX - logoGroup.rotation.x) * 0.04;
          logoGroup.rotation.y += (targetRotY - logoGroup.rotation.y) * 0.04;
        }

        // Star core pulse
        starMesh.rotation.z = -t * 0.28;
        coreGem.rotation.y = t * 0.65;

        // Bio-pulse
        if (enableBioPulse) {
          const pulse = 1 + Math.sin(t * 2.8) * 0.05;
          starMesh.scale.set(pulse, pulse, pulse);
          filamentMat.opacity = 0.7 + Math.sin(t * 3.5) * 0.28;
        }

        // Blade breathing
        bladeRibbons.forEach((blade, index) => {
          const offset = Math.sin(t * 1.8 + index * 1.25) * 0.05;
          blade.mesh.rotation.x = 0.36 + offset;
        });

        // Bio spores orbit
        bioSpores.rotation.y = -t * 0.16;
        bioSpores.rotation.z = t * 0.09;

        // Orbiting lights
        emeraldLight.position.x = Math.sin(t * 0.8) * 4.2;
        emeraldLight.position.y = Math.cos(t * 0.6) * 3.5;
        emeraldLight.position.z = 2.4 + Math.cos(t * 1.1) * 1.5;

        cyanLight.position.x = Math.cos(t * 0.75) * -4.2;
        cyanLight.position.y = Math.sin(t * 0.7) * -3.2;
        cyanLight.position.z = 2.2 + Math.sin(t * 0.9) * 1.5;

        // Projected caustics
        if (enableCaustics) {
          updateCausticCanvas(t);
          causticPlane.scale.setScalar(1 + Math.sin(t * 1.4) * 0.08);
        }

        ring1.rotation.z = t * 0.11;
        ring2.rotation.z = -t * 0.15;

        renderer.render(scene, camera);
      };

      animate();

      // 8. Resize Handler
      const handleResize = () => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize);

      // 9. Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId);
        container.removeEventListener("mousedown", onMouseDown);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
        window.removeEventListener("resize", handleResize);

        geometriesToDispose.forEach((g) => g.dispose());
        floorMat.dispose();
        (gridHelper.material as THREE.Material).dispose();
        gridHelper.dispose();
        causticPlaneMat.dispose();
        causticTexture.dispose();
        eGlowMat.dispose();
        cGlowMat.dispose();
        frostedCrystalMaterial.dispose();
        emeraldFringeMat.dispose();
        cyanFringeMat.dispose();
        obsidianBioMat.dispose();
        filamentMat.dispose();
        coreGemMat.dispose();
        sporeMat.dispose();
        ring1Mat.dispose();
        ring2Mat.dispose();

        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, [interactive, crystalRoughness, enableBioPulse, enableCaustics, palette]);

    return (
      <div className={cn("relative w-full h-full overflow-hidden bg-[#040806]", className)}>
        {/* Three.js Canvas Container */}
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-auto" />
      </div>
    );
  }
);

PriceBackground.displayName = "PriceBackground";
export default PriceBackground;
