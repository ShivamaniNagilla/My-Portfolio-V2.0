import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface BlackHoleCanvasProps {
  onLoaded?: () => void;
}

export const BlackHoleCanvas: React.FC<BlackHoleCanvasProps> = ({ onLoaded }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect Software GL (SwiftShader / llvmpipe)
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();

    // 2. Setup Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030303, 0.005);

    const width = window.innerWidth;
    const height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(52, width / height, 0.1, 1000);
    camera.position.set(0, 1.2, 8.5);

    // 3. Renderer configuration
    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: !isSoftwareGl,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // Mouse & Pointer Tracking with velocity physics
    const mouse = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
      vx: 0,
      vy: 0,
      prevX: 0,
      prevY: 0,
    };
    const scroll = { y: 0, targetY: 0 };

    // 4. Create Reusable Texture for Glowing Stars & Stardust
    const createStarTexture = (type: 'sharp' | 'soft' | 'flare') => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        if (type === 'sharp') {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.15, 'rgba(220, 240, 255, 0.85)');
          gradient.addColorStop(0.45, 'rgba(100, 180, 255, 0.25)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else if (type === 'soft') {
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.2, 'rgba(255, 200, 120, 0.7)');
          gradient.addColorStop(0.6, 'rgba(255, 120, 20, 0.15)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        } else {
          // Cross flare
          gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
          gradient.addColorStop(0.1, 'rgba(57, 255, 20, 0.9)');
          gradient.addColorStop(0.4, 'rgba(57, 255, 20, 0.2)');
          gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        }
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      const tex = new THREE.CanvasTexture(canvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      return tex;
    };

    const starTextureSharp = createStarTexture('sharp');
    const starTextureSoft = createStarTexture('soft');
    const starTextureFlare = createStarTexture('flare');

    // 5. Group for Black Hole Object
    const blackHoleGroup = new THREE.Group();
    scene.add(blackHoleGroup);

    // --- A. THE EVENT HORIZON (Pure Black Shadow Sphere) ---
    const horizonGeo = new THREE.SphereGeometry(1.72, 64, 64);
    const horizonMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const eventHorizon = new THREE.Mesh(horizonGeo, horizonMat);
    eventHorizon.renderOrder = 2;
    blackHoleGroup.add(eventHorizon);

    // --- B. PHOTON SPHERE GLOW RING ---
    const photonSphereGeo = new THREE.SphereGeometry(1.75, 48, 48);
    const photonSphereMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorHot: { value: new THREE.Color(0xffffff) },
        uColorWarm: { value: new THREE.Color(0xff9900) },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorHot;
        uniform vec3 uColorWarm;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          float glow = pow(rim, 5.0) * 3.2;
          float doppler = 1.0 - clamp(vPosition.x * 0.18, -0.4, 0.4);
          vec3 col = mix(uColorWarm, uColorHot, pow(rim, 8.0)) * glow * doppler;
          gl_FragColor = vec4(col, min(1.0, glow * 0.85));
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
      depthWrite: false,
    });
    const photonSphere = new THREE.Mesh(photonSphereGeo, photonSphereMat);
    photonSphere.renderOrder = 1;
    blackHoleGroup.add(photonSphere);

    // --- C. HORIZONTAL ACCRETION DISK ---
    const diskGeo = new THREE.RingGeometry(1.85, 6.2, isSoftwareGl ? 64 : 128, 16);
    const diskMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorInner: { value: new THREE.Color(0xfff0d0) },
        uColorMid: { value: new THREE.Color(0xff7700) },
        uColorOuter: { value: new THREE.Color(0x39ff14) },
        uColorFade: { value: new THREE.Color(0x3a0800) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vLocalPos;
        void main() {
          vUv = uv;
          vLocalPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorInner;
        uniform vec3 uColorMid;
        uniform vec3 uColorOuter;
        uniform vec3 uColorFade;
        varying vec2 vUv;
        varying vec3 vLocalPos;

        float hash(vec2 p) {
          return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
        }
        float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f*f*(3.0-2.0*f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
        }

        void main() {
          float dist = length(vLocalPos.xy);
          float angle = atan(vLocalPos.y, vLocalPos.x);

          float speed = 2.4 / (dist * 0.85);
          float rotAngle = angle - uTime * speed;

          float swirl = noise(vec2(dist * 5.0, rotAngle * 6.0));
          float filaments = sin(rotAngle * 24.0 + dist * 10.0) * 0.5 + 0.5;

          float normDist = clamp((dist - 1.85) / (6.2 - 1.85), 0.0, 1.0);
          float dopplerShift = clamp(1.0 - sin(angle) * 0.45, 0.4, 1.8);

          vec3 col = mix(uColorInner, uColorMid, smoothstep(0.0, 0.35, normDist));
          col = mix(col, uColorOuter, smoothstep(0.35, 0.75, normDist) * 0.25);
          col = mix(col, uColorFade, smoothstep(0.65, 1.0, normDist));

          float innerEdge = smoothstep(0.0, 0.08, normDist);
          float outerEdge = 1.0 - smoothstep(0.8, 1.0, normDist);
          float alpha = innerEdge * outerEdge * (0.65 + swirl * 0.35 + filaments * 0.2) * dopplerShift;

          gl_FragColor = vec4(col * (1.1 + filaments * 0.4) * dopplerShift, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const horizontalDisk = new THREE.Mesh(diskGeo, diskMat);
    horizontalDisk.rotation.x = Math.PI / 2.35;
    horizontalDisk.rotation.z = -0.2;
    blackHoleGroup.add(horizontalDisk);

    // --- D. GRAVITATIONAL LENSING HALO (Iconic Vertical Arch) ---
    const lensedDiskGeo = new THREE.RingGeometry(1.88, 5.0, isSoftwareGl ? 64 : 128, 12);
    const lensedDiskMat = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uColorInner: { value: new THREE.Color(0xffeedd) },
        uColorMid: { value: new THREE.Color(0xff8811) },
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vLocalPos;
        void main() {
          vUv = uv;
          vLocalPos = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uColorInner;
        uniform vec3 uColorMid;
        varying vec2 vUv;
        varying vec3 vLocalPos;

        void main() {
          float dist = length(vLocalPos.xy);
          float normDist = clamp((dist - 1.88) / (5.0 - 1.88), 0.0, 1.0);
          
          float innerGlow = smoothstep(0.0, 0.05, normDist);
          float outerFalloff = pow(1.0 - normDist, 2.8);
          float doppler = 1.0 - (vLocalPos.x / dist) * 0.35;

          vec3 color = mix(uColorInner, uColorMid, normDist);
          float alpha = innerGlow * outerFalloff * 0.85 * doppler;

          gl_FragColor = vec4(color * doppler, alpha);
        }
      `,
      transparent: true,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      depthWrite: false,
    });

    const lensedVerticalArch = new THREE.Mesh(lensedDiskGeo, lensedDiskMat);
    lensedVerticalArch.rotation.y = 0.05;
    blackHoleGroup.add(lensedVerticalArch);

    // --- E. ACCRETION DUST & INFALLING PARTICLES ---
    const particleCount = isSoftwareGl ? 400 : 1400;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleRadii = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);
    const particleAngles = new Float32Array(particleCount);
    const particleTilts = new Float32Array(particleCount);

    const colorA = new THREE.Color(0xffcc66);
    const colorB = new THREE.Color(0xff5500);
    const colorC = new THREE.Color(0x39ff14);

    for (let i = 0; i < particleCount; i++) {
      const radius = 1.9 + Math.pow(Math.random(), 1.8) * 5.2;
      const angle = Math.random() * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * 0.45;
      const speed = (0.4 + (1.0 / (radius * 0.6))) * 0.8;

      particleRadii[i] = radius;
      particleAngles[i] = angle;
      particleSpeeds[i] = speed;
      particleTilts[i] = tilt;

      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = Math.sin(angle) * radius * tilt;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;

      const rPick = Math.random();
      const chosenColor = rPick > 0.8 ? colorC : rPick > 0.4 ? colorA : colorB;
      particleColors[i * 3] = chosenColor.r;
      particleColors[i * 3 + 1] = chosenColor.g;
      particleColors[i * 3 + 2] = chosenColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.14,
      map: starTextureSoft,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    particles.rotation.x = Math.PI / 2.35;
    blackHoleGroup.add(particles);

    // =========================================================================
    // --- F. INTERACTIVE INTERSTELLAR SPACE BACKGROUND (DYNAMIC POINTER PARALLAX) ---
    // 3 Distinct Parallax Layers that shift with pointer coordinates and cursor drift
    // =========================================================================

    // Layer 1: FOREGROUND INTERSTELLAR STARDUST (Closest to camera, huge parallax)
    const dustCount = isSoftwareGl ? 300 : 750;
    const dustGeo = new THREE.BufferGeometry();
    const dustPositions = new Float32Array(dustCount * 3);
    const dustBasePositions = new Float32Array(dustCount * 3);
    const dustColors = new Float32Array(dustCount * 3);
    const dustPhases = new Float32Array(dustCount);
    const dustDriftSpeeds = new Float32Array(dustCount);

    const dustColorChoices = [
      new THREE.Color(0x39ff14), // Neon green interstellar ion
      new THREE.Color(0xffeedd), // Starlight white
      new THREE.Color(0xffa500), // Accretion amber
      new THREE.Color(0x66ccff), // Deep space blue
    ];

    for (let i = 0; i < dustCount; i++) {
      // Spread in front and around the camera (-18 to 18 in X, -12 to 12 in Y, -4 to 12 in Z)
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 26;
      const z = (Math.random() - 0.5) * 18 + 2;

      dustPositions[i * 3] = x;
      dustPositions[i * 3 + 1] = y;
      dustPositions[i * 3 + 2] = z;

      dustBasePositions[i * 3] = x;
      dustBasePositions[i * 3 + 1] = y;
      dustBasePositions[i * 3 + 2] = z;

      dustPhases[i] = Math.random() * Math.PI * 2;
      dustDriftSpeeds[i] = 0.2 + Math.random() * 0.6;

      const col = dustColorChoices[Math.floor(Math.random() * dustColorChoices.length)];
      dustColors[i * 3] = col.r;
      dustColors[i * 3 + 1] = col.g;
      dustColors[i * 3 + 2] = col.b;
    }

    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
    dustGeo.setAttribute('color', new THREE.BufferAttribute(dustColors, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.18,
      map: starTextureFlare,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const foregroundDust = new THREE.Points(dustGeo, dustMat);
    scene.add(foregroundDust);

    // Layer 2: MIDGROUND INTERSTELLAR STAR CLUSTERS (Medium distance parallax)
    const midStarCount = isSoftwareGl ? 800 : 2200;
    const midStarGeo = new THREE.BufferGeometry();
    const midStarPositions = new Float32Array(midStarCount * 3);
    const midStarColors = new Float32Array(midStarCount * 3);
    const midStarParallax = new Float32Array(midStarCount);

    for (let i = 0; i < midStarCount; i++) {
      const radius = 25 + Math.random() * 65;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      midStarPositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      midStarPositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      midStarPositions[i * 3 + 2] = radius * Math.cos(phi);

      midStarParallax[i] = 0.8 + Math.random() * 1.4;

      const pick = Math.random();
      const col = pick > 0.85 ? dustColorChoices[0] : pick > 0.6 ? dustColorChoices[2] : dustColorChoices[1];
      midStarColors[i * 3] = col.r;
      midStarColors[i * 3 + 1] = col.g;
      midStarColors[i * 3 + 2] = col.b;
    }

    midStarGeo.setAttribute('position', new THREE.BufferAttribute(midStarPositions, 3));
    midStarGeo.setAttribute('color', new THREE.BufferAttribute(midStarColors, 3));

    const midStarMat = new THREE.PointsMaterial({
      size: 0.45,
      map: starTextureSharp,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });

    const midStarfield = new THREE.Points(midStarGeo, midStarMat);
    scene.add(midStarfield);

    // Layer 3: DEEP SPACE SKYBOX STARFIELD (Distant background)
    const deepStarCount = isSoftwareGl ? 1200 : 3600;
    const deepStarGeo = new THREE.BufferGeometry();
    const deepStarPositions = new Float32Array(deepStarCount * 3);
    const deepStarColors = new Float32Array(deepStarCount * 3);

    for (let i = 0; i < deepStarCount; i++) {
      const r = 90 + Math.random() * 220;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      deepStarPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      deepStarPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      deepStarPositions[i * 3 + 2] = r * Math.cos(phi);

      const rVal = 0.85 + Math.random() * 0.15;
      const gVal = 0.85 + Math.random() * 0.15;
      const bVal = 0.9 + Math.random() * 0.1;
      deepStarColors[i * 3] = rVal;
      deepStarColors[i * 3 + 1] = gVal;
      deepStarColors[i * 3 + 2] = bVal;
    }

    deepStarGeo.setAttribute('position', new THREE.BufferAttribute(deepStarPositions, 3));
    deepStarGeo.setAttribute('color', new THREE.BufferAttribute(deepStarColors, 3));

    const deepStarMat = new THREE.PointsMaterial({
      size: 0.65,
      map: starTextureSharp,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const deepStarfield = new THREE.Points(deepStarGeo, deepStarMat);
    scene.add(deepStarfield);

    // Subtle soft ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    if (onLoaded) {
      onLoaded();
    }

    // 5. Interaction Listeners with Window Coordinates & Momentum
    const handleMouseMove = (e: MouseEvent) => {
      // Normalized between -1 and 1
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;

      mouse.targetX = nx;
      mouse.targetY = ny;

      // Track cursor velocity for momentum deflection
      mouse.vx = nx - mouse.prevX;
      mouse.vy = ny - mouse.prevY;
      mouse.prevX = nx;
      mouse.prevY = ny;
    };

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        mouse.targetX = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.targetY = -(touch.clientY / window.innerHeight) * 2 + 1;
      }
    };

    const handleScroll = () => {
      scroll.targetY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop with Multi-layer Parallax (using THREE.Timer)
    let animationFrameId = 0;
    const timer = new THREE.Timer();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      timer.update();
      const delta = Math.min(timer.getDelta(), 0.1);
      const elapsed = timer.getElapsed();

      // Exponential damping for smooth pointer physics
      mouse.x = THREE.MathUtils.damp(mouse.x, mouse.targetX, 4.0, delta);
      mouse.y = THREE.MathUtils.damp(mouse.y, mouse.targetY, 4.0, delta);
      scroll.y = THREE.MathUtils.damp(scroll.y, scroll.targetY, 4.5, delta);

      // Camera responds smoothly to pointer & scroll
      camera.position.x = mouse.x * 1.5;
      camera.position.y = 1.2 + mouse.y * 1.2 - scroll.y * 0.0025;
      camera.position.z = 8.5 + scroll.y * 0.0018;
      camera.lookAt(mouse.x * 0.25, -scroll.y * 0.0018, 0);

      // Black hole reacts to pointer
      blackHoleGroup.rotation.y = elapsed * 0.06 + mouse.x * 0.35;
      blackHoleGroup.rotation.x = mouse.y * 0.22;
      blackHoleGroup.position.x = mouse.x * 0.3;
      blackHoleGroup.position.y = mouse.y * 0.25;

      // Update shader uniforms
      diskMat.uniforms.uTime.value = elapsed;
      lensedDiskMat.uniforms.uTime.value = elapsed;
      photonSphereMat.uniforms.uTime.value = elapsed;

      // --- DYNAMIC POINTER INTERACTION: FOREGROUND DUST DRIFT & PARALLAX ---
      const dustAttr = dustGeo.attributes.position as THREE.BufferAttribute;
      const dustPos = dustAttr.array as Float32Array;

      // Cursor 3D projected focal point
      const pointerFocusX = mouse.x * 14;
      const pointerFocusY = mouse.y * 10;

      for (let i = 0; i < dustCount; i++) {
        const i3 = i * 3;
        const bx = dustBasePositions[i3];
        const by = dustBasePositions[i3 + 1];
        const bz = dustBasePositions[i3 + 2];

        // Cosmic drift
        const phase = dustPhases[i] + elapsed * dustDriftSpeeds[i];
        const driftX = Math.cos(phase) * 0.4;
        const driftY = Math.sin(phase * 1.3) * 0.35;

        // Pointer gravitational pull / displacement:
        // Stardust near the pointer gently deflects or flows with mouse movements
        const dx = bx - pointerFocusX;
        const dy = by - pointerFocusY;
        const distSq = dx * dx + dy * dy + 4.0;
        const force = 18.0 / distSq;

        // Move actively with mouse parallax
        dustPos[i3] = bx + driftX - mouse.x * 2.8 + (dx / Math.sqrt(distSq)) * force * 0.4;
        dustPos[i3 + 1] = by + driftY - mouse.y * 2.2 + (dy / Math.sqrt(distSq)) * force * 0.4;
        dustPos[i3 + 2] = bz + Math.sin(phase * 0.7) * 0.25;
      }
      dustAttr.needsUpdate = true;

      // --- MIDGROUND STARFIELD PARALLAX ---
      midStarfield.position.x = -mouse.x * 2.2;
      midStarfield.position.y = -mouse.y * 1.6;
      midStarfield.rotation.y = elapsed * 0.008 + mouse.x * 0.08;
      midStarfield.rotation.x = mouse.y * 0.05;

      // --- DEEP SKYBOX STARFIELD (SUBTLE DISTANT ROTATION & TILT) ---
      deepStarfield.position.x = -mouse.x * 0.8;
      deepStarfield.position.y = -mouse.y * 0.6;
      deepStarfield.rotation.y = elapsed * 0.003 + mouse.x * 0.04;
      deepStarfield.rotation.x = mouse.y * 0.03;

      // Accretion infalling particles
      const posAttr = particleGeo.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        particleAngles[i] += particleSpeeds[i] * delta * 0.85;
        const rad = particleRadii[i];
        const ang = particleAngles[i];
        const tilt = particleTilts[i];

        posArray[i * 3] = Math.cos(ang) * rad;
        posArray[i * 3 + 1] = Math.sin(ang) * rad * tilt;
        posArray[i * 3 + 2] = Math.sin(ang) * rad;
      }
      posAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 7. Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);

      horizonGeo.dispose();
      horizonMat.dispose();
      photonSphereGeo.dispose();
      photonSphereMat.dispose();
      diskGeo.dispose();
      diskMat.dispose();
      lensedDiskGeo.dispose();
      lensedDiskMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      midStarGeo.dispose();
      midStarMat.dispose();
      deepStarGeo.dispose();
      deepStarMat.dispose();
      starTextureSharp.dispose();
      starTextureSoft.dispose();
      starTextureFlare.dispose();
      renderer.dispose();

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [onLoaded]);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
