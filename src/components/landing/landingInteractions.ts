import * as THREE from "three";

export function initLandingInteractions(containerEl: HTMLElement): () => void {
  // 1. Initialize Three.js 3D Tact Core
  const canvas = containerEl.querySelector("#tact-kinetic-canvas") as HTMLCanvasElement | null;
  const container = containerEl.querySelector("#tact-kinetic-container") as HTMLElement | null;

  let cleanupThree = () => {};

  if (canvas && container) {
    const width = container.clientWidth || 896;
    const height = container.clientHeight || 520;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xa855f7, 5.5);
    dirLight1.position.set(6, 8, 6);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x38bdf8, 4.5);
    dirLight2.position.set(-6, -5, 4);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xc084fc, 6.0, 35);
    pointLight.position.set(0, 0, 3);
    scene.add(pointLight);

    // Main group
    const mainGroup = new THREE.Group();
    mainGroup.scale.set(1.4, 1.4, 1.4);
    scene.add(mainGroup);

    // Core
    const coreGeo = new THREE.IcosahedronGeometry(1.45, 1);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0xa855f7,
      emissive: 0x581c87,
      specular: 0xf3e8ff,
      shininess: 90,
      transparent: true,
      opacity: 0.95,
      flatShading: true,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Wireframe cage
    const wireGeo = new THREE.IcosahedronGeometry(1.85, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd8b4fe,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Inner core
    const innerGeo = new THREE.OctahedronGeometry(0.78, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0xc084fc,
      emissive: 0x7e22ce,
      specular: 0xffffff,
      shininess: 100,
      flatShading: true,
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // 3 Gyroscope Torus rings
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x4cd7f6,
      transparent: true,
      opacity: 0.85,
      wireframe: true,
    });
    const ringGeo1 = new THREE.TorusGeometry(2.35, 0.025, 16, 100);
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3.5;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xa855f7,
      transparent: true,
      opacity: 0.75,
      wireframe: true,
    });
    const ringGeo2 = new THREE.TorusGeometry(2.85, 0.028, 16, 120);
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    mainGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({
      color: 0x4edea3,
      transparent: true,
      opacity: 0.65,
      wireframe: true,
    });
    const ringGeo3 = new THREE.TorusGeometry(3.35, 0.032, 16, 140);
    const ring3 = new THREE.Mesh(ringGeo3, ringMat3);
    ring3.rotation.y = Math.PI / 3;
    ring3.rotation.z = -Math.PI / 5;
    mainGroup.add(ring3);

    // 18 Orbiting satellites
    const satellites: {
      mesh: THREE.Mesh;
      radius: number;
      speed: number;
      angle: number;
      tiltX: number;
    }[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const cyanMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const purpleMat = new THREE.MeshBasicMaterial({ color: 0xa855f7 });

    for (let i = 0; i < 18; i++) {
      const isCyan = i % 2 === 0;
      const satMesh = new THREE.Mesh(sphereGeo, isCyan ? cyanMat : purpleMat);
      const orbitRadius = 2.2 + (i % 3) * 0.55 + Math.random() * 0.2;
      const speed = (0.012 + (i % 5) * 0.005) * (i % 2 === 0 ? 1 : -1);
      const angle = (i / 18) * Math.PI * 2;
      const tiltX = (i * 0.35) % Math.PI;

      satellites.push({ mesh: satMesh, radius: orbitRadius, speed, angle, tiltX });
      mainGroup.add(satMesh);
    }

    // 300 Particles constellation field
    const particleCount = 300;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.05,
      transparent: true,
      opacity: 0.75,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Parallax tracking
    let targetRotX = 0;
    let targetRotY = 0;

    const onMouseMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const mouseX = (e.clientX - cx) / cx;
      const mouseY = (e.clientY - cy) / cy;
      targetRotY = mouseX * 0.6;
      targetRotX = mouseY * 0.45;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const onResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let animationId = 0;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      animationId = requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

      coreMesh.rotation.y += 0.007;
      coreMesh.rotation.x += 0.004;

      wireMesh.rotation.y -= 0.004;
      wireMesh.rotation.z += 0.005;

      innerCore.rotation.y += 0.02;
      innerCore.rotation.x -= 0.015;

      const pulse = 1.0 + Math.sin(elapsedTime * 3.5) * 0.12;
      innerCore.scale.set(pulse, pulse, pulse);

      ring1.rotation.z += 0.014;
      ring2.rotation.x += 0.011;
      ring3.rotation.y += 0.009;

      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        sat.angle += sat.speed;
        const x = Math.cos(sat.angle) * sat.radius;
        const z = Math.sin(sat.angle) * sat.radius;
        const y = Math.sin(sat.angle * 2 + sat.tiltX) * 0.45;
        sat.mesh.position.set(x, y, z);
      }

      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    };

    renderLoop();

    cleanupThree = () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);

      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      ringGeo3.dispose();
      ringMat3.dispose();
      sphereGeo.dispose();
      cyanMat.dispose();
      purpleMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }

  // 2. Holographic Card 3D Tilt
  const holoCard = containerEl.querySelector("#holo-card") as HTMLElement | null;
  let onHoloMove: ((e: MouseEvent) => void) | null = null;
  let onHoloLeave: (() => void) | null = null;

  if (holoCard) {
    onHoloMove = (e: MouseEvent) => {
      const rect = holoCard.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotateY = (x / (rect.width / 2)) * 12;
      const rotateX = -(y / (rect.height / 2)) * 12;
      holoCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
    };
    onHoloLeave = () => {
      holoCard.style.transform = "rotateY(0deg) rotateX(0deg) scale(1)";
    };
    holoCard.addEventListener("mousemove", onHoloMove);
    holoCard.addEventListener("mouseleave", onHoloLeave);
  }

  // 3. Countdown timer
  const countdown = containerEl.querySelector("#countdown-val") as HTMLElement | null;
  let countdownTimer: number | null = null;
  let secondsLeft = 90;
  if (countdown) {
    countdownTimer = window.setInterval(() => {
      if (secondsLeft > 0) {
        secondsLeft--;
        const m = String(Math.floor(secondsLeft / 60)).padStart(2, "0");
        const s = String(secondsLeft % 60).padStart(2, "0");
        countdown.innerText = `${m}:${s}`;
      } else {
        secondsLeft = 90;
      }
    }, 1000);
  }

  // 4. Refactor simulator
  const tactInput = containerEl.querySelector("#tact-input") as HTMLInputElement | null;
  const refactorBtn = containerEl.querySelector("#simulate-refactor-btn") as HTMLElement | null;
  const tactOutput = containerEl.querySelector("#tact-output-text") as HTMLElement | null;
  const presetBtn = containerEl.querySelector("#preset-btn") as HTMLElement | null;
  const copyBtn = containerEl.querySelector("#copy-refactor-btn") as HTMLElement | null;

  const presets = [
    {
      in: "I don't have time to fix your broken integration before release. Read the documentation.",
      out: "To protect our scheduled release date while resolving the integration gap, let's designate 20 minutes to review the contract specs together so we can unblock your team.",
    },
    {
      in: "Who wrote this messy query? It is bringing down all production databases.",
      out: "We're noticing heavy query contention on the cluster. I'm adding an index right now and would love to review the data access pattern with whoever staged the commit.",
    },
  ];

  let currentPreset = 0;
  if (presetBtn && tactInput && tactOutput) {
    presetBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      tactInput.value = presets[currentPreset].in;
      tactOutput.innerText = presets[currentPreset].out;
      currentPreset = (currentPreset + 1) % presets.length;
    };
  }

  if (refactorBtn && tactInput && tactOutput) {
    refactorBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      const val = tactInput.value.trim();
      if (!val) {
        tactInput.value = "Why was this deployed without QA testing?";
      }
      tactOutput.innerText = "Analyzing AST tone tokens...";
      setTimeout(() => {
        tactOutput.innerText =
          "Let's review our automated smoke testing coverage for this deployment path so we can prevent similar anomalies in future sprints.";
      }, 350);
    };
  }

  if (copyBtn && tactOutput) {
    copyBtn.onclick = (e) => {
      e.preventDefault();
      e.stopPropagation();
      navigator.clipboard?.writeText(tactOutput.innerText);
      const originalText = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span class="material-symbols-outlined text-xs text-tertiary">done</span> Copied!';
      setTimeout(() => {
        copyBtn.innerHTML = originalText;
      }, 1800);
    };
  }

  return () => {
    cleanupThree();
    if (countdownTimer) clearInterval(countdownTimer);
    if (holoCard && onHoloMove && onHoloLeave) {
      holoCard.removeEventListener("mousemove", onHoloMove);
      holoCard.removeEventListener("mouseleave", onHoloLeave);
    }
  };
}
