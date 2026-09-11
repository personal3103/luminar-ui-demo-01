
  (function() {
    const canvas = document.getElementById('tact-kinetic-canvas');
    const container = document.getElementById('tact-kinetic-container');
    if (!canvas || !container || typeof THREE === 'undefined') return;

    // 1. Scene, Camera, WebGLRenderer with alpha & antialias
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 7.2);

    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // 2. Lighting Rig
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

    // 3. MainGroup scaled 1.4
    const mainGroup = new THREE.Group();
    mainGroup.scale.set(1.4, 1.4, 1.4);
    scene.add(mainGroup);

    // Core: IcosahedronGeometry(1.45, 1) with MeshPhongMaterial
    const coreGeo = new THREE.IcosahedronGeometry(1.45, 1);
    const coreMat = new THREE.MeshPhongMaterial({
      color: 0xa855f7,
      emissive: 0x581c87,
      specular: 0xf3e8ff,
      shininess: 90,
      transparent: true,
      opacity: 0.95,
      flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // Wireframe cage: IcosahedronGeometry(1.85, 2) with MeshBasicMaterial
    const wireGeo = new THREE.IcosahedronGeometry(1.85, 2);
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xd8b4fe,
      wireframe: true,
      transparent: true,
      opacity: 0.8
    });
    const wireMesh = new THREE.Mesh(wireGeo, wireMat);
    mainGroup.add(wireMesh);

    // Inner core: OctahedronGeometry(0.78, 0) with MeshPhongMaterial
    const innerGeo = new THREE.OctahedronGeometry(0.78, 0);
    const innerMat = new THREE.MeshPhongMaterial({
      color: 0xc084fc,
      emissive: 0x7e22ce,
      specular: 0xffffff,
      shininess: 100,
      flatShading: true
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerCore);

    // 3 Gyroscope Torus rings (radii 2.35, 2.85, 3.35) rotated on different axes
    const ringMat1 = new THREE.MeshBasicMaterial({ color: 0x4cd7f6, transparent: true, opacity: 0.85, wireframe: true });
    const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.025, 16, 100), ringMat1);
    ring1.rotation.x = Math.PI / 3.5;
    ring1.rotation.y = Math.PI / 6;
    mainGroup.add(ring1);

    const ringMat2 = new THREE.MeshBasicMaterial({ color: 0xa855f7, transparent: true, opacity: 0.75, wireframe: true });
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.85, 0.028, 16, 120), ringMat2);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 4;
    mainGroup.add(ring2);

    const ringMat3 = new THREE.MeshBasicMaterial({ color: 0x4edea3, transparent: true, opacity: 0.65, wireframe: true });
    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(3.35, 0.032, 16, 140), ringMat3);
    ring3.rotation.y = Math.PI / 3;
    ring3.rotation.z = -Math.PI / 5;
    mainGroup.add(ring3);

    // 18 orbiting satellite data node spheres (accent cyan 0x38bdf8 and purple 0xa855f7)
    const satellites = [];
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
      const tiltZ = (i * 0.55) % Math.PI;

      satellites.push({ mesh: satMesh, radius: orbitRadius, speed, angle, tiltX, tiltZ });
      mainGroup.add(satMesh);
    }

    // 300 glowing star particle constellation field (color: 0xc084fc)
    const particleCount = 300;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 16;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 12;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc084fc,
      size: 0.05,
      transparent: true,
      opacity: 0.75
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // Mouse parallax interactive tracking with smooth interpolation
    let mouseX = 0, mouseY = 0;
    let targetRotX = 0, targetRotY = 0;

    window.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX = (e.clientX - cx) / cx;
      mouseY = (e.clientY - cy) / cy;
      targetRotY = mouseX * 0.6;
      targetRotX = mouseY * 0.45;
    }, { passive: true });

    // Handle container resize cleanly
    window.addEventListener('resize', () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });

    // Continuous requestAnimationFrame render loop with pulsing inner mesh scale and rotating rings
    let clock = new THREE.Clock();

    function renderLoop() {
      requestAnimationFrame(renderLoop);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse parallax lerp
      mainGroup.rotation.y += (targetRotY - mainGroup.rotation.y) * 0.05;
      mainGroup.rotation.x += (targetRotX - mainGroup.rotation.x) * 0.05;

      // Base rotations
      coreMesh.rotation.y += 0.007;
      coreMesh.rotation.x += 0.004;

      wireMesh.rotation.y -= 0.004;
      wireMesh.rotation.z += 0.005;

      innerCore.rotation.y += 0.02;
      innerCore.rotation.x -= 0.015;

      // Pulsing inner mesh scale
      const pulse = 1.0 + Math.sin(elapsedTime * 3.5) * 0.12;
      innerCore.scale.set(pulse, pulse, pulse);

      // Rotating Gyroscope rings
      ring1.rotation.z += 0.014;
      ring2.rotation.x += 0.011;
      ring3.rotation.y += 0.009;

      // Orbiting satellites update
      for (let i = 0; i < satellites.length; i++) {
        const sat = satellites[i];
        sat.angle += sat.speed;
        const x = Math.cos(sat.angle) * sat.radius;
        const z = Math.sin(sat.angle) * sat.radius;
        const y = Math.sin(sat.angle * 2 + sat.tiltX) * 0.45;
        sat.mesh.position.set(x, y, z);
      }

      // Constellation subtle drift
      particles.rotation.y = elapsedTime * 0.02;
      particles.rotation.x = elapsedTime * 0.01;

      renderer.render(scene, camera);
    }
    renderLoop();
  })();


  (function() {
    // Holographic Card mouse tracking
    const holoCard = document.getElementById('holo-card');
    if (holoCard) {
      holoCard.addEventListener('mousemove', (e) => {
        const rect = holoCard.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateY = (x / (rect.width / 2)) * 12;
        const rotateX = -(y / (rect.height / 2)) * 12;
        holoCard.style.transform = `rotateY(${rotateY}deg) rotateX(${rotateX}deg) scale(1.02)`;
      });
      holoCard.addEventListener('mouseleave', () => {
        holoCard.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
      });
    }

    // Incident Countdown interactive micro-timer
    const countdown = document.getElementById('countdown-val');
    let secondsLeft = 90;
    if (countdown) {
      setInterval(() => {
        if (secondsLeft > 0) {
          secondsLeft--;
          const m = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
          const s = String(secondsLeft % 60).padStart(2, '0');
          countdown.innerText = `${m}:${s}`;
        } else {
          secondsLeft = 90;
        }
      }, 1000);
    }

    // Interactive live demo refactor simulator
    const tactInput = document.getElementById('tact-input');
    const refactorBtn = document.getElementById('simulate-refactor-btn');
    const tactOutput = document.getElementById('tact-output-text');
    const presetBtn = document.getElementById('preset-btn');
    const copyBtn = document.getElementById('copy-refactor-btn');

    const presets = [
      {
        in: "I don't have time to fix your broken integration before release. Read the documentation.",
        out: "To protect our scheduled release date while resolving the integration gap, let's designate 20 minutes to review the contract specs together so we can unblock your team."
      },
      {
        in: "Who wrote this messy query? It is bringing down all production databases.",
        out: "We're noticing heavy query contention on the cluster. I'm adding an index right now and would love to review the data access pattern with whoever staged the commit."
      }
    ];

    let currentPreset = 0;

    if (presetBtn && tactInput) {
      presetBtn.addEventListener('click', () => {
        tactInput.value = presets[currentPreset].in;
        tactOutput.innerText = presets[currentPreset].out;
        currentPreset = (currentPreset + 1) % presets.length;
      });
    }

    if (refactorBtn && tactInput && tactOutput) {
      refactorBtn.addEventListener('click', () => {
        const val = tactInput.value.trim();
        if (!val) {
          tactInput.value = "Why was this deployed without QA testing?";
        }
        tactOutput.innerText = "Analyzing AST tone tokens...";
        setTimeout(() => {
          tactOutput.innerText = "Let's review our automated smoke testing coverage for this deployment path so we can prevent similar anomalies in future sprints.";
        }, 350);
      });
    }

    if (copyBtn && tactOutput) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard?.writeText(tactOutput.innerText);
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = '<span class="material-symbols-outlined text-xs text-tertiary">done</span> Copied!';
        setTimeout(() => {
          copyBtn.innerHTML = originalText;
        }, 1800);
      });
    }

    // Push to talk listeners
    const setupMicButton = (btnId, defaultText) => {
      const btn = document.getElementById(btnId);
      if (!btn) return;
      btn.addEventListener('mousedown', () => {
        btn.innerHTML = '<span class="material-symbols-outlined text-base animate-pulse">mic</span> LISTENING (EVALUATING CADENCE)...';
        btn.classList.add('bg-red-600');
      });
      window.addEventListener('mouseup', () => {
        btn.innerHTML = defaultText;
        btn.classList.remove('bg-red-600');
      });
    };

    setupMicButton('interactive-mic-btn', '<span class="material-symbols-outlined text-base">mic_none</span> HOLD SPACEBAR OR CLICK TO SIMULATE VOICE');
    setupMicButton('showcase-mic-btn', '<span class="material-symbols-outlined text-base">mic</span> <span>HOLD-TO-TALK 96kHz TEST</span>');
  })();


(function() {
  const cadenceCard = document.getElementById('acoustic-cadence-card');
  const visualizer = document.getElementById('tremor-visualizer-container');
  if (!visualizer || !('IntersectionObserver' in window)) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bars = visualizer.querySelectorAll('.eq-bar');
        bars.forEach((bar, idx) => {
          bar.style.animation = 'none';
          bar.offsetHeight;
          bar.style.animation = '';
        });
      }
    });
  }, { threshold: 0.3 });
  
  observer.observe(cadenceCard || visualizer);
})();
