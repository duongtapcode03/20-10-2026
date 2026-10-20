/**
 * 3D Scene Engine for 20-10 Vietnamese Women's Day Celebration
 * Built with Three.js (r128)
 * Features:
 *  - 3D Interactive Velvet Gift Box with Opening Animation & Butterfly/Heart Eruption
 *  - 3D Parametric Blooming Rose & Swirling Crystal Heart Particle Vortex
 *  - 3D Falling Rose Petal Physics System
 *  - Interactive 3D Fireworks on click
 *  - Dynamic Cinematic Lighting & Camera Parallax
 */

class Scene3DManager {
  constructor() {
    this.container = document.getElementById('canvas-container');
    this.canvas = document.getElementById('webgl-canvas');
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.clock = new THREE.Clock();

    // Interaction state
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-1000, -1000);
    this.targetMouse = new THREE.Vector2(0, 0);
    this.isBoxOpened = false;
    this.currentMode = 'gift'; // 'gift', 'heart', 'rain'
    this.currentTheme = 'sunset';

    // 3D Object Groups
    this.giftBoxGroup = new THREE.Group();
    this.boxLidGroup = new THREE.Group();
    this.heartRoseGroup = new THREE.Group();
    this.petalsGroup = new THREE.Group();
    this.fireworks = [];
    this.butterflies = [];

    // Lighting
    this.pointLightRose = null;
    this.pointLightGold = null;
    this.pointLightBlue = null;

    // Callbacks
    this.onGiftOpen = null;

    this.init();
  }

  init() {
    // 1. Scene
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2(0x12030d, 0.025);

    // 2. Camera
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(0, 2.5, 12);

    // 3. Renderer with high visual fidelity
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // 4. Orbit Controls (smooth damping)
    if (window.THREE && THREE.OrbitControls) {
      this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
      this.controls.maxDistance = 25;
      this.controls.minDistance = 4;
      this.controls.maxPolarAngle = Math.PI / 2 + 0.1; // Don't flip under floor
    }

    // 5. Lighting Setup
    this.setupLighting();

    // 6. Build 3D Entities
    this.createGlowingParticleTexture();
    this.buildGiftBox();
    this.buildHeartRoseSculpture();
    this.buildFallingPetalSystem();
    this.buildFloorReflectiveRing();

    // 7. Event Listeners
    window.addEventListener('resize', this.onWindowResize.bind(this));
    window.addEventListener('mousemove', this.onMouseMove.bind(this));
    window.addEventListener('click', this.onPointerClick.bind(this));
    window.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: true });

    // 8. Start Rendering Loop
    this.animate();
  }

  // Generate a procedural soft circular glowing texture for high-efficiency particles
  createGlowingParticleTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.2, 'rgba(255, 180, 210, 0.9)');
    gradient.addColorStop(0.5, 'rgba(255, 50, 120, 0.4)');
    gradient.addColorStop(1, 'rgba(255, 50, 120, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    this.particleTexture = new THREE.CanvasTexture(canvas);
  }

  setupLighting() {
    // Soft Ambient Light
    const ambient = new THREE.AmbientLight(0xffe6f0, 0.9);
    this.scene.add(ambient);

    // Warm Key Directional Light
    const dirLight = new THREE.DirectionalLight(0xfff0dd, 1.4);
    dirLight.position.set(5, 12, 7);
    this.scene.add(dirLight);

    // Orbiting Rose Point Light
    this.pointLightRose = new THREE.PointLight(0xff1493, 2.8, 20);
    this.pointLightRose.position.set(-4, 3, 3);
    this.scene.add(this.pointLightRose);

    // Orbiting Gold Point Light
    this.pointLightGold = new THREE.PointLight(0xffd700, 2.5, 20);
    this.pointLightGold.position.set(4, 2, 4);
    this.scene.add(this.pointLightGold);

    // Rim Lavender Point Light
    this.pointLightBlue = new THREE.PointLight(0xa855f7, 2.0, 18);
    this.pointLightBlue.position.set(0, -2, -4);
    this.scene.add(this.pointLightBlue);
  }

  // ================= 1. THE 3D VELVET GIFT BOX =================
  buildGiftBox() {
    this.giftBoxGroup.position.set(0, 0, 0);

    // Box Body Material (velvety deep ruby red with subtle sheen)
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x9e0836,
      roughness: 0.35,
      metalness: 0.25,
      emissive: 0x24020b,
      emissiveIntensity: 0.4
    });

    // Gold Ribbon Material
    const goldRibbonMat = new THREE.MeshStandardMaterial({
      color: 0xf6d365,
      roughness: 0.2,
      metalness: 0.85,
      emissive: 0x7c5a00,
      emissiveIntensity: 0.3
    });

    const boxSize = 2.6;
    const boxHeight = 2.0;

    // Main Box Base
    const baseGeo = new THREE.BoxGeometry(boxSize, boxHeight, boxSize);
    const boxBaseMesh = new THREE.Mesh(baseGeo, boxMat);
    boxBaseMesh.position.y = boxHeight / 2 - 0.5;
    boxBaseMesh.userData = { isGiftBox: true };
    this.giftBoxGroup.add(boxBaseMesh);

    // Ribbon on Base (Cross X & Z)
    const ribbonThick = 0.38;
    const ribbonBump = 0.03;
    const ribbonXGeo = new THREE.BoxGeometry(boxSize + ribbonBump, boxHeight + ribbonBump, ribbonThick);
    const ribbonXMesh = new THREE.Mesh(ribbonXGeo, goldRibbonMat);
    ribbonXMesh.position.y = boxBaseMesh.position.y;
    ribbonXMesh.userData = { isGiftBox: true };
    this.giftBoxGroup.add(ribbonXMesh);

    const ribbonZGeo = new THREE.BoxGeometry(ribbonThick, boxHeight + ribbonBump, boxSize + ribbonBump);
    const ribbonZMesh = new THREE.Mesh(ribbonZGeo, goldRibbonMat);
    ribbonZMesh.position.y = boxBaseMesh.position.y;
    ribbonZMesh.userData = { isGiftBox: true };
    this.giftBoxGroup.add(ribbonZMesh);

    // ============ Box Lid Group ============
    const lidMargin = 0.12;
    const lidHeight = 0.45;
    const lidGeo = new THREE.BoxGeometry(boxSize + lidMargin, lidHeight, boxSize + lidMargin);
    const lidMesh = new THREE.Mesh(lidGeo, boxMat);
    lidMesh.position.y = lidHeight / 2;
    lidMesh.userData = { isGiftBox: true };
    this.boxLidGroup.add(lidMesh);

    // Lid Ribbon Cross
    const lidRibbonX = new THREE.Mesh(
      new THREE.BoxGeometry(boxSize + lidMargin + 0.02, lidHeight + 0.02, ribbonThick),
      goldRibbonMat
    );
    lidRibbonX.position.y = lidHeight / 2;
    lidRibbonX.userData = { isGiftBox: true };
    this.boxLidGroup.add(lidRibbonX);

    const lidRibbonZ = new THREE.Mesh(
      new THREE.BoxGeometry(ribbonThick, lidHeight + 0.02, boxSize + lidMargin + 0.02),
      goldRibbonMat
    );
    lidRibbonZ.position.y = lidHeight / 2;
    lidRibbonZ.userData = { isGiftBox: true };
    this.boxLidGroup.add(lidRibbonZ);

    // Golden Bow on top of Lid (Torus Loops)
    const bowGroup = new THREE.Group();
    bowGroup.position.set(0, lidHeight + 0.05, 0);

    const bowTorusGeo = new THREE.TorusGeometry(0.38, 0.11, 16, 32);
    
    // Loop 1
    const loop1 = new THREE.Mesh(bowTorusGeo, goldRibbonMat);
    loop1.rotation.set(Math.PI / 4, 0, Math.PI / 4);
    loop1.position.set(0.22, 0.22, 0.22);
    bowGroup.add(loop1);

    // Loop 2
    const loop2 = new THREE.Mesh(bowTorusGeo, goldRibbonMat);
    loop2.rotation.set(Math.PI / 4, 0, -Math.PI / 4);
    loop2.position.set(-0.22, 0.22, -0.22);
    bowGroup.add(loop2);

    // Loop 3 & 4 (Cross angles)
    const loop3 = new THREE.Mesh(bowTorusGeo, goldRibbonMat);
    loop3.rotation.set(-Math.PI / 4, 0, Math.PI / 4);
    loop3.position.set(-0.22, 0.22, 0.22);
    bowGroup.add(loop3);

    const loop4 = new THREE.Mesh(bowTorusGeo, goldRibbonMat);
    loop4.rotation.set(-Math.PI / 4, 0, -Math.PI / 4);
    loop4.position.set(0.22, 0.22, -0.22);
    bowGroup.add(loop4);

    // Bow Center Knot Sphere
    const knotSphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 16, 16),
      goldRibbonMat
    );
    knotSphere.position.set(0, 0.15, 0);
    bowGroup.add(knotSphere);

    this.boxLidGroup.add(bowGroup);

    // Position Lid on top of box
    this.boxLidGroup.position.set(0, boxBaseMesh.position.y + boxHeight / 2, 0);
    this.giftBoxGroup.add(this.boxLidGroup);

    // Internal Light inside the gift box that glows when opened
    this.boxInnerLight = new THREE.PointLight(0xfff0aa, 0, 8);
    this.boxInnerLight.position.set(0, 0.8, 0);
    this.giftBoxGroup.add(this.boxInnerLight);

    // Internal Sparkle Particles ready to erupt on open
    this.buildBoxEruptionParticles();

    this.scene.add(this.giftBoxGroup);
  }

  // Sparkling golden & pink particle eruption when box opens
  buildBoxEruptionParticles() {
    const particleCount = 180;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = [];
    const colors = new Float32Array(particleCount * 3);

    const colRose = new THREE.Color(0xff2d75);
    const colGold = new THREE.Color(0xffd700);
    const colWhite = new THREE.Color(0xffffff);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 1.5;
      positions[i * 3 + 1] = 0.5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 1.5;

      velocities.push({
        vx: (Math.random() - 0.5) * 0.08,
        vy: 0.08 + Math.random() * 0.14,
        vz: (Math.random() - 0.5) * 0.08,
        life: 0,
        maxLife: 150 + Math.random() * 100
      });

      const rnd = Math.random();
      const c = rnd < 0.4 ? colRose : (rnd < 0.8 ? colGold : colWhite);
      colors[i * 3 + 0] = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.35,
      map: this.particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.boxEruptionPoints = new THREE.Points(geo, mat);
    this.boxEruptionVelocities = velocities;
    this.giftBoxGroup.add(this.boxEruptionPoints);
  }

  // ================= 2. 3D BLOOMING ROSE & CRYSTAL HEART SCULPTURE =================
  buildHeartRoseSculpture() {
    this.heartRoseGroup.position.set(0, 0.5, 0);

    // 1. Swirling 3D Parametric Heart Particles
    const heartParticleCount = 1800;
    const heartGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(heartParticleCount * 3);
    const colors = new Float32Array(heartParticleCount * 3);
    const basePositions = [];

    const colRose = new THREE.Color(0xff2d75);
    const colGold = new THREE.Color(0xffe066);
    const colPink = new THREE.Color(0xff85a2);

    for (let i = 0; i < heartParticleCount; i++) {
      // Parametric Heart Curve Formula:
      // x = 16 sin^3(t)
      // y = 13 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
      const t = Math.random() * Math.PI * 2;
      const scale = 0.14;
      const x = 16 * Math.pow(Math.sin(t), 3) * scale;
      const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * scale;
      // Spread thickness in Z
      const z = (Math.random() - 0.5) * 1.6;

      positions[i * 3 + 0] = x + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.3;
      positions[i * 3 + 2] = z;

      basePositions.push({ x: positions[i * 3], y: positions[i * 3 + 1], z, speed: 0.5 + Math.random() * 1.5 });

      const mixVal = Math.random();
      const col = mixVal < 0.6 ? colRose.clone().lerp(colPink, mixVal) : colGold;
      colors[i * 3 + 0] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    heartGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    heartGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const heartMat = new THREE.PointsMaterial({
      size: 0.28,
      map: this.particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    this.heartParticles = new THREE.Points(heartGeo, heartMat);
    this.heartBasePositions = basePositions;
    this.heartRoseGroup.add(this.heartParticles);

    // 2. Procedural Blooming Rose Centerpiece
    this.roseCenterGroup = new THREE.Group();
    const petalLayers = 7;
    const petalsPerLayer = [3, 4, 5, 6, 7, 8, 9];
    const petalMat = new THREE.MeshStandardMaterial({
      color: 0xe6004c,
      roughness: 0.3,
      metalness: 0.15,
      side: THREE.DoubleSide,
      emissive: 0x4a0018,
      emissiveIntensity: 0.3
    });

    for (let layer = 0; layer < petalLayers; layer++) {
      const count = petalsPerLayer[layer];
      const layerRadius = 0.25 + layer * 0.22;
      const layerTilt = 0.2 + layer * 0.14;

      for (let p = 0; p < count; p++) {
        const angle = (p / count) * Math.PI * 2 + (layer * 0.4);
        
        // Curved Petal Geometry
        const petalGeo = new THREE.CylinderGeometry(0.35 + layer * 0.08, 0.05, 0.8 + layer * 0.15, 12, 1, true, 0, Math.PI * 0.9);
        const petalMesh = new THREE.Mesh(petalGeo, petalMat);

        petalMesh.position.set(
          Math.cos(angle) * layerRadius,
          -layer * 0.08,
          Math.sin(angle) * layerRadius
        );
        petalMesh.rotation.set(
          Math.sin(angle) * layerTilt,
          -angle + Math.PI / 2,
          Math.cos(angle) * layerTilt
        );
        this.roseCenterGroup.add(petalMesh);
      }
    }

    // Golden Core Stamen
    const stamenGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const stamenMat = new THREE.MeshStandardMaterial({
      color: 0xffd700,
      emissive: 0xffb700,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2
    });
    const stamenMesh = new THREE.Mesh(stamenGeo, stamenMat);
    stamenMesh.position.y = 0.1;
    this.roseCenterGroup.add(stamenMesh);

    this.roseCenterGroup.scale.set(1.2, 1.2, 1.2);
    this.heartRoseGroup.add(this.roseCenterGroup);

    // Initial state: subtle hidden scale until switched to 'heart' mode
    this.heartRoseGroup.scale.set(0.001, 0.001, 0.001);
    this.heartRoseGroup.visible = false;
    this.scene.add(this.heartRoseGroup);
  }

  // ================= 3. 3D FALLING ROSE PETAL STORM =================
  buildFallingPetalSystem() {
    this.petalCount = 300;
    this.petalMeshes = [];

    // Smooth curved petal geometry
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.2, 0.3, 0.25, 0.7, 0, 1.0);
    petalShape.bezierCurveTo(-0.25, 0.7, -0.2, 0.3, 0, 0);

    const petalGeo = new THREE.ShapeGeometry(petalShape, 12);
    // Curl vertices slightly in Z to create realistic aerodynamic curvature
    const pos = petalGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const x = pos.getX(i);
      pos.setZ(i, Math.sin(y * Math.PI) * 0.12 - Math.abs(x) * 0.1);
    }
    petalGeo.computeVertexNormals();

    const petalColors = [0xff2d75, 0xff5e88, 0xff758c, 0xf43f5e, 0xfb7185];

    for (let i = 0; i < this.petalCount; i++) {
      const col = petalColors[Math.floor(Math.random() * petalColors.length)];
      const mat = new THREE.MeshStandardMaterial({
        color: col,
        roughness: 0.4,
        metalness: 0.1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.88
      });

      const mesh = new THREE.Mesh(petalGeo, mat);
      const scale = 0.25 + Math.random() * 0.3;
      mesh.scale.set(scale, scale, scale);

      // Random position in bounding room
      mesh.position.set(
        (Math.random() - 0.5) * 24,
        Math.random() * 20 - 5,
        (Math.random() - 0.5) * 24
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      mesh.userData = {
        fallSpeed: 0.025 + Math.random() * 0.035,
        swaySpeed: 1 + Math.random() * 2,
        swayRadius: 0.03 + Math.random() * 0.04,
        rotSpeedX: (Math.random() - 0.5) * 0.04,
        rotSpeedY: (Math.random() - 0.5) * 0.04,
        rotSpeedZ: (Math.random() - 0.5) * 0.03,
        initialOffset: Math.random() * Math.PI * 2
      };

      this.petalsGroup.add(mesh);
      this.petalMeshes.push(mesh);
    }

    this.scene.add(this.petalsGroup);
  }

  // Reflective Halo / Stage Ring on Floor
  buildFloorReflectiveRing() {
    const ringGeo = new THREE.RingGeometry(3.5, 4.2, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xff4d88,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -1.6;
    this.scene.add(ringMesh);

    // Inner glowing disc
    const discGeo = new THREE.CircleGeometry(3.4, 48);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x3d0718,
      transparent: true,
      opacity: 0.35,
      side: THREE.DoubleSide
    });
    const discMesh = new THREE.Mesh(discGeo, discMat);
    discMesh.rotation.x = -Math.PI / 2;
    discMesh.position.y = -1.61;
    this.scene.add(discMesh);
  }

  // ================= 4. INTERACTIVE 3D FIREWORKS =================
  spawnFirework(originX = null, originY = null, originZ = null) {
    const x = originX !== null ? originX : (Math.random() - 0.5) * 8;
    const y = originY !== null ? originY : 1.5 + Math.random() * 3.5;
    const z = originZ !== null ? originZ : (Math.random() - 0.5) * 6;

    const count = 75;
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const particles = [];

    const palette = [
      new THREE.Color(0xff2d75),
      new THREE.Color(0xffd700),
      new THREE.Color(0xff9a8b),
      new THREE.Color(0xffffff)
    ];
    const pickedColor = palette[Math.floor(Math.random() * palette.length)];

    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      // Spherical explosion velocity
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      const speed = 0.08 + Math.random() * 0.12;

      particles.push({
        vx: speed * Math.sin(phi) * Math.cos(theta),
        vy: speed * Math.sin(phi) * Math.sin(theta),
        vz: speed * Math.cos(phi),
        decay: 0.015 + Math.random() * 0.01
      });

      colors[i * 3 + 0] = pickedColor.r;
      colors[i * 3 + 1] = pickedColor.g;
      colors[i * 3 + 2] = pickedColor.b;
    }

    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.45,
      map: this.particleTexture,
      vertexColors: true,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const fireworkMesh = new THREE.Points(geo, mat);
    this.scene.add(fireworkMesh);

    this.fireworks.push({
      mesh: fireworkMesh,
      particles: particles,
      life: 1.0
    });
  }

  // ================= 5. OPEN GIFT BOX ANIMATION =================
  openGiftBox() {
    if (this.isBoxOpened) return;
    this.isBoxOpened = true;

    // Trigger procedural fanfare sound
    if (window.soundEngine) {
      window.soundEngine.playGiftOpenFanfare();
    }

    // Spawn initial fireworks & sound
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.spawnFirework(
          (Math.random() - 0.5) * 4,
          2.5 + Math.random() * 2,
          (Math.random() - 0.5) * 3
        );
      }, i * 200);
    }

    if (typeof this.onGiftOpen === 'function') {
      this.onGiftOpen();
    }
  }

  // ================= 6. SWITCH SCENE MODES =================
  setMode(mode) {
    this.currentMode = mode;

    if (mode === 'gift') {
      this.giftBoxGroup.visible = true;
      // Animate scale up
      this.animateScale(this.giftBoxGroup, 1);
      this.animateScale(this.heartRoseGroup, 0.001, () => {
        this.heartRoseGroup.visible = false;
      });
      // Move camera smoothly
      this.targetCameraPos = new THREE.Vector3(0, 2.5, 12);
    } else if (mode === 'heart') {
      this.heartRoseGroup.visible = true;
      this.animateScale(this.heartRoseGroup, 1);
      this.animateScale(this.giftBoxGroup, 0.001, () => {
        this.giftBoxGroup.visible = false;
      });
      this.targetCameraPos = new THREE.Vector3(0, 2.2, 11);
    } else if (mode === 'rain') {
      // Show both or zoom out for majestic panoramic view
      this.giftBoxGroup.visible = true;
      this.heartRoseGroup.visible = false;
      this.animateScale(this.giftBoxGroup, 0.85);
      this.targetCameraPos = new THREE.Vector3(0, 4, 16);
    }
  }

  animateScale(object, targetScale, onComplete) {
    const startScale = object.scale.x;
    let t = 0;
    const duration = 40; // frames

    const step = () => {
      t++;
      const p = t / duration;
      const ease = 1 - Math.pow(1 - p, 3); // cubic ease out
      const current = startScale + (targetScale - startScale) * ease;
      object.scale.set(current, current, current);

      if (t < duration) {
        requestAnimationFrame(step);
      } else {
        if (onComplete) onComplete();
      }
    };
    step();
  }

  // Change lighting & fog based on selected UI theme
  setTheme(theme) {
    this.currentTheme = theme;

    if (theme === 'sunset') {
      this.scene.fog.color.setHex(0x17030f);
      this.pointLightRose.color.setHex(0xff1493);
      this.pointLightGold.color.setHex(0xffd700);
      this.pointLightBlue.color.setHex(0xa855f7);
    } else if (theme === 'midnight') {
      this.scene.fog.color.setHex(0x0a0215);
      this.pointLightRose.color.setHex(0xd946ef);
      this.pointLightGold.color.setHex(0x38bdf8);
      this.pointLightBlue.color.setHex(0x6366f1);
    } else if (theme === 'fairy') {
      this.scene.fog.color.setHex(0x1c0413);
      this.pointLightRose.color.setHex(0xfb7185);
      this.pointLightGold.color.setHex(0xfde047);
      this.pointLightBlue.color.setHex(0x34d399);
    }
  }

  // ================= 7. INPUT HANDLING =================
  onMouseMove(e) {
    this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    this.targetMouse.x = this.mouse.x;
    this.targetMouse.y = this.mouse.y;
  }

  onPointerClick(e) {
    // Check if clicked on UI elements first
    if (e.target.closest('button') || e.target.closest('.luxury-card') || e.target.closest('.glass-modal-panel')) {
      return;
    }

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Check intersection with Gift Box
    if (this.giftBoxGroup.visible && !this.isBoxOpened) {
      const intersects = this.raycaster.intersectObjects(this.giftBoxGroup.children, true);
      if (intersects.length > 0) {
        this.openGiftBox();
        return;
      }
    }

    // Otherwise, spawn interactive 3D fireworks right at clicked ray position
    const planeZ = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const clickPoint = new THREE.Vector3();
    this.raycaster.ray.intersectPlane(planeZ, clickPoint);

    if (clickPoint) {
      this.spawnFirework(clickPoint.x, clickPoint.y, clickPoint.z);
      if (window.soundEngine) {
        window.soundEngine.playSparkleSound();
      }
    }
  }

  onTouchStart(e) {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      this.mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
      this.mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;
    }
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  // ================= 8. ANIMATION LOOP (60 FPS) =================
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();

    // Orbit controls update
    if (this.controls) {
      this.controls.update();
    }

    // Ambient floating lights oscillation
    if (this.pointLightRose) {
      this.pointLightRose.position.x = Math.sin(elapsedTime * 0.8) * 5;
      this.pointLightRose.position.y = 2.5 + Math.cos(elapsedTime * 0.6) * 1.5;
    }
    if (this.pointLightGold) {
      this.pointLightGold.position.x = Math.cos(elapsedTime * 0.7) * 5;
      this.pointLightGold.position.z = Math.sin(elapsedTime * 0.7) * 5;
    }

    // 1. Gift Box Hover Floating & Opening Animation
    if (this.giftBoxGroup.visible) {
      if (!this.isBoxOpened) {
        // Gentle breathing float
        this.giftBoxGroup.position.y = Math.sin(elapsedTime * 1.8) * 0.15;
        this.giftBoxGroup.rotation.y += 0.005;
      } else {
        // Opened state: Lid lifts and tilts back
        this.giftBoxGroup.rotation.y += 0.004;

        if (this.boxLidGroup.position.y < 3.8) {
          this.boxLidGroup.position.y += 0.06;
          this.boxLidGroup.position.z -= 0.03;
          this.boxLidGroup.rotation.x -= 0.02;
          this.boxLidGroup.rotation.z += 0.015;
        }

        // Inner light shines brighter
        if (this.boxInnerLight && this.boxInnerLight.intensity < 4.0) {
          this.boxInnerLight.intensity += 0.08;
        }

        // Box Eruption Particles
        if (this.boxEruptionPoints) {
          this.boxEruptionPoints.material.opacity = 0.95;
          const pos = this.boxEruptionPoints.geometry.attributes.position.array;
          for (let i = 0; i < this.boxEruptionVelocities.length; i++) {
            const v = this.boxEruptionVelocities[i];
            pos[i * 3 + 0] += v.vx;
            pos[i * 3 + 1] += v.vy;
            pos[i * 3 + 2] += v.vz;

            v.vy -= 0.001; // slight gravity
            v.life++;

            if (v.life > v.maxLife) {
              // recycle inside box
              pos[i * 3 + 0] = (Math.random() - 0.5) * 1.5;
              pos[i * 3 + 1] = 0.5;
              pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5;
              v.vy = 0.08 + Math.random() * 0.12;
              v.life = 0;
            }
          }
          this.boxEruptionPoints.geometry.attributes.position.needsUpdate = true;
        }
      }
    }

    // 2. Swirling Crystal Heart & Rose Sculpture
    if (this.heartRoseGroup.visible) {
      this.heartRoseGroup.rotation.y = elapsedTime * 0.35;
      this.heartRoseGroup.position.y = 0.4 + Math.sin(elapsedTime * 1.5) * 0.12;

      // Pulsating heartbeat in particles
      if (this.heartParticles) {
        const pArray = this.heartParticles.geometry.attributes.position.array;
        const pulse = 1.0 + Math.sin(elapsedTime * 3.5) * 0.06;

        for (let i = 0; i < this.heartBasePositions.length; i++) {
          const bp = this.heartBasePositions[i];
          pArray[i * 3 + 0] = bp.x * pulse;
          pArray[i * 3 + 1] = bp.y * pulse;
          // Soft wave in Z
          pArray[i * 3 + 2] = bp.z + Math.sin(elapsedTime * bp.speed + bp.x) * 0.15;
        }
        this.heartParticles.geometry.attributes.position.needsUpdate = true;
      }
    }

    // 3. Falling Petal System Physics
    for (let i = 0; i < this.petalMeshes.length; i++) {
      const petal = this.petalMeshes[i];
      const data = petal.userData;

      petal.position.y -= data.fallSpeed;
      petal.position.x += Math.sin(elapsedTime * data.swaySpeed + data.initialOffset) * data.swayRadius;
      petal.position.z += Math.cos(elapsedTime * data.swaySpeed * 0.8 + data.initialOffset) * data.swayRadius;

      petal.rotation.x += data.rotSpeedX;
      petal.rotation.y += data.rotSpeedY;
      petal.rotation.z += data.rotSpeedZ;

      // Respawn at top if fallen below ground
      if (petal.position.y < -3.5) {
        petal.position.y = 12 + Math.random() * 4;
        petal.position.x = (Math.random() - 0.5) * 24;
        petal.position.z = (Math.random() - 0.5) * 24;
      }
    }

    // 4. Update Active Fireworks
    for (let f = this.fireworks.length - 1; f >= 0; f--) {
      const fw = this.fireworks[f];
      fw.life -= fw.particles[0].decay;
      fw.mesh.material.opacity = Math.max(0, fw.life);

      const pos = fw.mesh.geometry.attributes.position.array;
      for (let p = 0; p < fw.particles.length; p++) {
        const vel = fw.particles[p];
        pos[p * 3 + 0] += vel.vx;
        pos[p * 3 + 1] += vel.vy;
        pos[p * 3 + 2] += vel.vz;
        vel.vy -= 0.002; // gravity
        vel.vx *= 0.98;
        vel.vz *= 0.98;
      }
      fw.mesh.geometry.attributes.position.needsUpdate = true;

      if (fw.life <= 0) {
        this.scene.remove(fw.mesh);
        fw.mesh.geometry.dispose();
        fw.mesh.material.dispose();
        this.fireworks.splice(f, 1);
      }
    }

    // Smooth Camera Transition when Mode Changes or Mouse Parallax or Cinematic Film
    if (this.isCinematicFilm) {
      this.filmAngle = (this.filmAngle || 0) + 0.0055;
      const targetRadius = this.filmRadius || 12;
      const targetHeight = this.filmHeight || 2.4;
      const cx = Math.sin(this.filmAngle) * targetRadius;
      const cz = Math.cos(this.filmAngle) * targetRadius;
      this.camera.position.x += (cx - this.camera.position.x) * 0.05;
      this.camera.position.z += (cz - this.camera.position.z) * 0.05;
      this.camera.position.y += (targetHeight - this.camera.position.y) * 0.04;
      this.camera.lookAt(0, 0.7, 0);
    } else if (this.targetCameraPos) {
      this.camera.position.lerp(this.targetCameraPos, 0.04);
      if (this.camera.position.distanceTo(this.targetCameraPos) < 0.05) {
        this.targetCameraPos = null;
      }
    } else if (!this.controls || !this.controls.state || this.controls.state === -1) {
      // Subtle organic mouse parallax
      const parallaxTargetX = this.mouse.x * 1.2;
      const parallaxTargetY = 2.5 + this.mouse.y * 0.8;
      this.camera.position.x += (parallaxTargetX - this.camera.position.x) * 0.03;
      this.camera.position.y += (parallaxTargetY - this.camera.position.y) * 0.03;
      this.camera.lookAt(0, 0.5, 0);
    }

    this.renderer.render(this.scene, this.camera);
  }

  // Cinematic Camera Choreography Controls
  startCinematicFilm() {
    this.isCinematicFilm = true;
    this.filmAngle = 0;
    this.filmRadius = 13;
    this.filmHeight = 2.0;
  }

  setCinematicShot(radius, height) {
    this.filmRadius = radius;
    this.filmHeight = height;
  }

  stopCinematicFilm() {
    this.isCinematicFilm = false;
    this.targetCameraPos = new THREE.Vector3(0, 2.5, 12);
  }
}

// Global reference
window.Scene3DManager = Scene3DManager;
