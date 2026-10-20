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
    this.currentMode = 'gift'; // 'gift', 'heart', 'rose', 'rain'
    this.currentTheme = 'meadow';

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
    this.scene.fog = new THREE.FogExp2(0xf4ebdd, 0.012);

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
    this.renderer.toneMappingExposure = 1.0;

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
    this.buildRoseBouquet();
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
    gradient.addColorStop(0.2, 'rgba(255, 214, 226, 0.9)');
    gradient.addColorStop(0.5, 'rgba(243, 157, 177, 0.4)');
    gradient.addColorStop(1, 'rgba(243, 157, 177, 0)');

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 64, 64);

    this.particleTexture = new THREE.CanvasTexture(canvas);
  }

  setupLighting() {
    // Soft Ambient Light
    const ambient = new THREE.AmbientLight(0xfff6ec, 0.6);
    this.scene.add(ambient);

    // Warm Key Directional Light
    const dirLight = new THREE.DirectionalLight(0xfff0dd, 0.9);
    dirLight.position.set(5, 12, 7);
    this.scene.add(dirLight);

    // Orbiting Rose Point Light
    this.pointLightRose = new THREE.PointLight(0xf39db1, 0.9, 20);
    this.pointLightRose.position.set(-4, 3, 3);
    this.scene.add(this.pointLightRose);

    // Orbiting Gold Point Light
    this.pointLightGold = new THREE.PointLight(0xffe0a3, 0.8, 20);
    this.pointLightGold.position.set(4, 2, 4);
    this.scene.add(this.pointLightGold);

    // Rim Lavender Point Light
    this.pointLightBlue = new THREE.PointLight(0xa5cf95, 0.6, 18);
    this.pointLightBlue.position.set(0, -2, -4);
    this.scene.add(this.pointLightBlue);
  }

  // ================= 1. THE 3D VELVET GIFT BOX =================
  buildGiftBox() {
    this.giftBoxGroup.position.set(0, 0, 0);

    // Box Body Material (velvety deep ruby red with subtle sheen)
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0xe0718d,
      roughness: 0.6,
      metalness: 0.05,
      emissive: 0x3a1018,
      emissiveIntensity: 0.4
    });

    // Gold Ribbon Material
    const goldRibbonMat = new THREE.MeshStandardMaterial({
      color: 0xfff1d6,
      roughness: 0.45,
      metalness: 0.15,
      emissive: 0x6b5530,
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

    // 2. Smooth fully-open rose centerpiece (same petal builder as the Rose mode)
    this.roseCenterGroup = new THREE.Group();
    const { flower, petals } = this.buildRoseFlower(34, this.rosePalette());
    petals.forEach(petal => {
      petal.node.rotation.z = -petal.openTilt * 0.9;
    });
    flower.position.y = 0.15;
    this.roseCenterGroup.add(flower);

    this.roseCenterGroup.scale.set(1.2, 1.2, 1.2);
    this.heartRoseGroup.add(this.roseCenterGroup);

    // Initial state: subtle hidden scale until switched to 'heart' mode
    this.heartRoseGroup.scale.set(0.001, 0.001, 0.001);
    this.heartRoseGroup.visible = false;
    this.scene.add(this.heartRoseGroup);
  }

  // ================= 2b. 3D BLOOMING ROSE =================
  // Bends a finely subdivided grid into shape so the shading stays soft and smooth (no facets).
  // shapeFn(u, v, color) gets u = -1..1 (left → right edge), v = 0..1 (base → tip),
  // writes the vertex colour into `color` and returns the bent position.
  buildCurvedSurface(cols, rows, shapeFn) {
    const geo = new THREE.PlaneGeometry(1, 1, cols, rows);
    const pos = geo.attributes.position;
    const colors = new Float32Array(pos.count * 3);
    const col = new THREE.Color();
    for (let i = 0; i < pos.count; i++) {
      const p = shapeFn(pos.getX(i) * 2, pos.getY(i) + 0.5, col);
      pos.setXYZ(i, p.x, p.y, p.z);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geo.computeVertexNormals();
    return geo;
  }

  // One rose petal: rounded fan with no corners, cupped around the heart, rim rolling softly outward
  buildRosePetalGeometry(layer, palette) {
    const smooth = THREE.MathUtils.smoothstep;
    const cup = 1.5 - layer * 0.9;              // inner petals wrap tightly around the heart
    const roll = 0.05 + layer * layer * 0.4;    // outer petals curl their rim back
    const seed = Math.random() * 10;
    const shade = 0.74 + layer * 0.26;          // heart of the rose sits in soft shadow

    return this.buildCurvedSurface(16, 20, (u, v, col) => {
      // v runs from the narrow claw at the base out to the circular rim, u sweeps across the fan
      const phi = u * 0.62;
      const rho = v * (1 - 0.16 * u * u);
      const x = Math.sin(phi) * rho * 1.15 + u * 0.05 * (1 - v);
      const y = Math.cos(phi) * rho;
      const rim = smooth(v, 0.5, 1);
      const z = -cup * x * x
        - (1 - layer) * 0.12 * y * y            // inner petals lean in to close the bud
        + roll * rim * rim                      // the whole rim rolls outward
        + 0.012 * Math.sin(u * 5 + seed) * rim; // gentle ruffle

      col.copy(palette.base).lerp(palette.body, smooth(v, 0.0, 0.55));
      col.lerp(palette.rim, smooth(v, 0.75, 1.0) * (0.25 + 0.35 * layer));
      if (palette.heart) col.lerp(palette.heart, (1 - layer) * (1 - layer) * 0.6);
      col.multiplyScalar(shade);
      return { x, y, z };
    });
  }

  // Builds one rose: petals arranged on a golden-angle spiral, each petal on a pivot so it can bloom open.
  // openness < 1 keeps the bloom softly cupped (bouquet roses), 1 lets the outer petals open wide.
  buildRoseFlower(petalCount, palette, { openness = 1, sepals = true } = {}) {
    const flower = new THREE.Group();
    const petals = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    const petalMat = new THREE.MeshStandardMaterial({
      vertexColors: true,
      roughness: 0.48,
      metalness: 0.0,
      side: THREE.DoubleSide,
      emissive: palette.glow,
      emissiveIntensity: 0.22
    });

    for (let i = 0; i < petalCount; i++) {
      const layer = i / (petalCount - 1); // 0 = heart of the rose, 1 = outermost petal
      const angle = i * goldenAngle;

      const pivot = new THREE.Group();
      pivot.rotation.y = -angle;

      const tiltNode = new THREE.Group();
      tiltNode.position.x = 0.02 + layer * 0.2;
      pivot.add(tiltNode);

      const mesh = new THREE.Mesh(this.buildRosePetalGeometry(layer, palette), petalMat);
      const s = 0.36 + layer * 0.62;
      mesh.scale.set(s, s, s);
      mesh.rotation.y = Math.PI / 2; // petal face points outward
      mesh.position.y = -layer * 0.2;
      tiltNode.add(mesh);

      flower.add(pivot);
      petals.push({
        node: tiltNode,
        closedTilt: layer * 0.12,
        openTilt: 0.04 + Math.pow(layer, 1.5) * 1.05 * openness,
        phase: Math.random() * Math.PI * 2
      });
    }

    if (sepals) {
      // Rounded green receptacle and slender sepals curling down beneath the bloom
      const { greenMat, sepalMat, receptacleGeo, sepalGeo } = this.roseGreenery();
      const receptacle = new THREE.Mesh(receptacleGeo, greenMat);
      receptacle.scale.set(1, 0.9, 1);
      receptacle.position.y = -0.2;
      flower.add(receptacle);

      for (let k = 0; k < 5; k++) {
        const pivot = new THREE.Group();
        pivot.rotation.y = -(k / 5) * Math.PI * 2 - 0.4;
        const sepal = new THREE.Mesh(sepalGeo, sepalMat);
        sepal.position.set(0.1, -0.2, 0);
        sepal.rotation.set(0, Math.PI / 2, -2.0);
        pivot.add(sepal);
        flower.add(pivot);
      }
    }

    return { flower, petals };
  }

  // Green materials and shapes shared by every rose
  roseGreenery() {
    if (!this.greenery) {
      const sepalLight = new THREE.Color(0x7fb86a);
      this.greenery = {
        greenMat: new THREE.MeshStandardMaterial({ color: 0x4f8f47, roughness: 0.6, side: THREE.DoubleSide }),
        sepalMat: new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, side: THREE.DoubleSide }),
        receptacleGeo: new THREE.SphereGeometry(0.15, 32, 24),
        sepalGeo: this.buildCurvedSurface(6, 14, (u, v, col) => {
          const halfW = 0.11 * Math.pow(1 - v, 0.7) * Math.pow(Math.min(v * 4, 1), 0.5) + 0.004;
          const x = u * halfW;
          col.setHex(0x3f7d3a).lerp(sepalLight, (1 - Math.abs(u)) * 0.6);
          return { x, y: v * 0.62, z: -Math.abs(x) * 0.6 + 0.3 * v * v };
        })
      };
    }
    return this.greenery;
  }

  // Bakes every mesh under a detached group into one geometry with vertex colours, so a static
  // cluster of flowers costs a single draw call. Meshes without vertex colours use userData.color.
  // (Avoid mirrored scales inside: baking would flip their winding.)
  bakeGroup(root) {
    root.updateMatrixWorld(true);
    const meshes = [];
    root.traverse(obj => {
      if (obj.isMesh) meshes.push(obj);
    });

    let vertexCount = 0;
    let indexCount = 0;
    const baked = meshes.map(mesh => {
      const geo = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld);
      vertexCount += geo.attributes.position.count;
      indexCount += geo.index.count;
      return { geo, tint: mesh.userData.color };
    });

    const position = new Float32Array(vertexCount * 3);
    const normal = new Float32Array(vertexCount * 3);
    const color = new Float32Array(vertexCount * 3);
    const index = new Uint32Array(indexCount);
    let v = 0;
    let i = 0;
    baked.forEach(({ geo, tint }) => {
      const count = geo.attributes.position.count;
      position.set(geo.attributes.position.array, v * 3);
      normal.set(geo.attributes.normal.array, v * 3);
      if (geo.attributes.color) {
        color.set(geo.attributes.color.array, v * 3);
      } else {
        for (let k = 0; k < count; k++) {
          color[(v + k) * 3] = tint.r;
          color[(v + k) * 3 + 1] = tint.g;
          color[(v + k) * 3 + 2] = tint.b;
        }
      }
      for (let k = 0; k < geo.index.count; k++) index[i + k] = geo.index.array[k] + v;
      v += count;
      i += geo.index.count;
      geo.dispose();
    });

    const merged = new THREE.BufferGeometry();
    merged.setAttribute('position', new THREE.BufferAttribute(position, 3));
    merged.setAttribute('normal', new THREE.BufferAttribute(normal, 3));
    merged.setAttribute('color', new THREE.BufferAttribute(color, 3));
    merged.setIndex(new THREE.BufferAttribute(index, 1));
    return merged;
  }

  // Petals fanned around +y on golden-angle pivots, tipped outward by tilt(layer) — shared by
  // carnations and daisies. Returns the head as a group of plain meshes ready for baking.
  buildPetalHead(count, petalGeo, { offset, tilt, size }) {
    const head = new THREE.Group();
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const layer = count > 1 ? i / (count - 1) : 1;
      const pivot = new THREE.Group();
      pivot.rotation.y = -i * goldenAngle;
      const tiltNode = new THREE.Group();
      tiltNode.position.x = offset(layer);
      tiltNode.rotation.z = -tilt(layer);
      const petal = new THREE.Mesh(petalGeo(layer, i));
      petal.rotation.y = Math.PI / 2;
      petal.scale.setScalar(size(layer));
      tiltNode.add(petal);
      pivot.add(tiltNode);
      head.add(pivot);
    }
    return head;
  }

  // A frilly carnation head opening toward +y, about 1 unit across
  buildCarnation(palette) {
    const smooth = THREE.MathUtils.smoothstep;
    return this.buildPetalHead(16, (layer) => {
      const seed = Math.random() * 10;
      return this.buildCurvedSurface(20, 6, (u, v, col) => {
        const frill = 1 + 0.09 * Math.sin(u * 24 + seed) * smooth(v, 0.55, 1); // zig-zag frilled rim
        const phi = u * 0.85;
        const rho = v * (1 - 0.1 * u * u) * frill;
        const x = Math.sin(phi) * rho;
        const z = -0.4 * x * x + 0.08 * Math.sin(u * 15 + seed) * smooth(v, 0.4, 1) + 0.12 * v * v;
        col.copy(palette.base).lerp(palette.body, smooth(v, 0, 0.6)).lerp(palette.rim, smooth(v, 0.8, 1) * 0.7);
        col.multiplyScalar(0.8 + 0.2 * layer);
        return { x, y: Math.cos(phi) * rho, z };
      });
    }, {
      offset: (layer) => 0.02 + layer * 0.1,
      tilt: (layer) => 0.25 + layer * 1.15,
      size: (layer) => 0.5 + layer * 0.4
    });
  }

  // A white daisy opening toward +y: slender petals around a domed golden centre
  buildDaisy() {
    const smooth = THREE.MathUtils.smoothstep;
    const petalBase = new THREE.Color(0xf3ecd8);
    const petalGeo = this.buildCurvedSurface(6, 10, (u, v, col) => {
      const halfW = 0.15 * Math.pow(Math.sin(Math.PI * Math.min(0.1 + v * 0.9, 1)), 0.5) + 0.01;
      const x = u * halfW;
      col.setHex(0xfffefa).lerp(petalBase, (1 - smooth(v, 0, 0.3)) * 0.7);
      return { x, y: v, z: -x * x * 2 + 0.05 * v * v };
    });
    const head = this.buildPetalHead(16, () => petalGeo, {
      offset: () => 0.1,
      tilt: () => 1.25,
      size: () => 0.42
    });
    const centreGeo = new THREE.SphereGeometry(0.13, 20, 14);
    [[1, 0x7b5a1a, 0.0], [0.8, 0xf2b630, 0.025]].forEach(([s, color, y]) => {
      const centre = new THREE.Mesh(centreGeo);
      centre.scale.set(s, s * 0.5, s);
      centre.position.y = y;
      centre.userData.color = new THREE.Color(color);
      head.add(centre);
    });
    return head;
  }

  // A wispy green filler sprig along a curve: thin stem, tiny paired leaves and a few buds at the tip
  buildSprig(curve, leafGeo, budGeo) {
    const sprig = new THREE.Group();
    const stemColor = new THREE.Color(0x84b54a);
    const stem = new THREE.Mesh(new THREE.TubeGeometry(curve, 24, 0.009, 5, false));
    stem.userData.color = stemColor;
    sprig.add(stem);

    const up = new THREE.Vector3(0, 1, 0);
    const tangent = new THREE.Vector3();
    const side = new THREE.Vector3();
    const dir = new THREE.Vector3();
    const roll = new THREE.Quaternion();
    let flip = 1;
    for (let t = 0.2; t < 0.96; t += 0.07) {
      curve.getTangent(t, tangent);
      side.crossVectors(tangent, up).normalize().multiplyScalar(flip);
      dir.copy(tangent).multiplyScalar(0.6).add(side).addScaledVector(up, 0.25).normalize();
      const leaf = new THREE.Mesh(leafGeo);
      leaf.position.copy(curve.getPoint(t));
      leaf.quaternion.setFromUnitVectors(up, dir).premultiply(roll.setFromAxisAngle(dir, Math.random() * Math.PI));
      leaf.scale.setScalar(0.07 + Math.random() * 0.04);
      sprig.add(leaf);
      flip = -flip;
    }

    const tip = curve.getPoint(1);
    for (let k = 0; k < 4; k++) {
      const bud = new THREE.Mesh(budGeo);
      bud.position.copy(tip).add(new THREE.Vector3((Math.random() - 0.5) * 0.06, Math.random() * 0.04, (Math.random() - 0.5) * 0.06));
      bud.scale.setScalar(0.012 + Math.random() * 0.008);
      bud.userData.color = new THREE.Color(0xc8e283);
      sprig.add(bud);
    }
    return sprig;
  }

  // Surface of revolution around +y from a [radius, height] profile (inside → rim).
  // shape(theta, v, r, y, col) returns the pushed { r, y } to add folds, crinkles and waves.
  // It wraps a little more than a full turn and spirals outward, so the overlap never z-fights.
  buildRevolvedSurface(profile, cols, rows, shape) {
    const curve = new THREE.CatmullRomCurve3(profile.map(([r, y]) => new THREE.Vector3(r, y, 0)));
    const turn = Math.PI * 2 + 0.5;
    const p = new THREE.Vector3();
    return this.buildCurvedSurface(cols, rows, (u, v, col) => {
      const around = u * 0.5 + 0.5;
      const theta = around * turn;
      curve.getPoint(v, p);
      const { r, y } = shape(theta, v, p.x, p.y, col);
      const rr = r * (1 + 0.03 * around);
      return { x: Math.sin(theta) * rr, y, z: Math.cos(theta) * rr };
    });
  }

  // A flat satin ribbon swept along a curve. widthDir(t, out) sets the direction its width spans;
  // notch > 0 cuts a V into the far end like a ribbon tail.
  buildRibbonGeometry(curve, width, widthDir, notch = 0) {
    const dir = new THREE.Vector3();
    return this.buildCurvedSurface(4, 48, (u, v) => {
      const t = v * (1 - notch * (1 - Math.abs(u)));
      const p = curve.getPoint(t);
      widthDir(t, dir);
      const w = u * width * 0.5;
      return { x: p.x + dir.x * w, y: p.y + dir.y * w, z: p.z + dir.z * w };
    });
  }

  // Ribbon bow loop: a teardrop running out along -x and back, bulging toward the front (+z)
  buildBowLoopGeometry(length, depth, width) {
    const points = [];
    for (let k = 0; k <= 24; k++) {
      const t = k / 24;
      const out = (1 - Math.cos(t * Math.PI * 2)) / 2;
      points.push(new THREE.Vector3(-length * out, 0, depth * Math.sin(t * Math.PI * 2) * Math.pow(out, 0.35)));
    }
    return this.buildRibbonGeometry(new THREE.CatmullRomCurve3(points), width, (t, out) => out.set(0, 1, 0));
  }

  // Little gift card hanging from the ribbons
  buildGiftCard() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fffaf3';
    ctx.fillRect(0, 0, 256, 320);
    ctx.strokeStyle = '#f2a7b8';
    ctx.lineWidth = 10;
    ctx.strokeRect(14, 14, 228, 292);
    ctx.fillStyle = '#e26a85';
    ctx.textAlign = 'center';
    ctx.font = 'italic 700 66px Georgia, serif';
    ctx.fillText('20/10', 128, 140);
    ctx.font = 'italic 32px Georgia, serif';
    ctx.fillText('Yêu thương', 128, 200);
    ctx.beginPath();
    ctx.moveTo(128, 278);
    ctx.bezierCurveTo(92, 254, 98, 220, 128, 238);
    ctx.bezierCurveTo(158, 220, 164, 254, 128, 278);
    ctx.fill();

    return new THREE.Mesh(
      new THREE.PlaneGeometry(0.3, 0.375),
      new THREE.MeshStandardMaterial({ map: new THREE.CanvasTexture(canvas), roughness: 0.8, side: THREE.DoubleSide })
    );
  }

  // ================= 2c. 3D FLOWER BOUQUET =================
  // A florist's round bouquet: cream-peach roses among frilly pink carnations and two white daisies,
  // wispy greenery, a crinkled pink lining inside a white paper collar, and a paper-wrapped handle
  // tied with long pink and white satin ribbons. The bouquet's face looks along its local +y.
  buildRoseBouquet() {
    this.roseBouquetGroup = new THREE.Group();
    this.roseBouquetGroup.position.set(0, 0.95, 0);
    this.bouquetRoses = [];
    this.roseBloom = 0;

    // The sway node rocks the bouquet gently; inside it the face tilts up toward the viewer
    this.bouquetSway = new THREE.Group();
    this.roseBouquetGroup.add(this.bouquetSway);
    const bouquet = new THREE.Group();
    bouquet.rotation.x = 0.45;
    this.bouquetSway.add(bouquet);

    const smooth = THREE.MathUtils.smoothstep;
    const domeHeight = (r) => 0.3 * (1 - Math.pow(r / 1.6, 2));
    // Sit a flower on the dome at (x, z) across the face, its head tipped outward with the curve
    const place = (obj, x, z, lift, scale) => {
      const r = Math.hypot(x, z);
      obj.position.set(x, domeHeight(r) + lift, z);
      obj.rotation.set(r * 0.55, Math.atan2(x, z), 0, 'YXZ');
      obj.scale.setScalar(scale);
      return obj;
    };

    // Nine cream-peach roses (local -z is the top of the face as the viewer sees it)
    const cream = this.rosePalette('cream');
    [
      [0, -0.02], [-0.27, -0.58], [0.33, -0.62], [-0.82, -0.48], [0.82, -0.42],
      [-0.62, 0.1], [0.6, 0.12], [-0.25, 0.54], [0.3, 0.56]
    ].forEach(([x, z]) => {
      const { flower, petals } = this.buildRoseFlower(24, cream, { openness: 0.75, sepals: false });
      bouquet.add(place(flower, x, z, -0.1, 0.32));
      this.bouquetRoses.push({ petals, bloomDelay: Math.hypot(x, z) * 0.3 });
    });

    // Everything that never moves is baked into one mesh: carnations, daisies, greenery, stem ends
    const statics = new THREE.Group();
    const carnation = this.rosePalette('carnation');
    [
      // a ring around the roses, a few tucked into the gaps, and a lower row under the lining
      [-1.25, -0.05, 0.23], [-1.12, 0.48, 0.23], [-0.72, 0.8, 0.23], [-0.2, 1.02, 0.23], [0.36, 1.02, 0.23],
      [0.86, 0.74, 0.23], [1.22, 0.36, 0.23], [1.28, -0.16, 0.23], [1.1, -0.74, 0.23], [0.6, -1.08, 0.23],
      [0.03, -1.15, 0.23], [-0.55, -1.07, 0.23], [-1.08, -0.82, 0.23],
      [-0.32, -0.2, 0.16], [0.33, -0.22, 0.16], [0.02, 0.38, 0.16],
      [-1.55, 0.3, 0.2], [-1.4, -0.65, 0.2], [-0.9, 1.25, 0.2], [0.1, 1.5, 0.2], [0.95, 1.2, 0.2],
      [1.5, 0.15, 0.2], [1.35, -0.8, 0.2], [0.35, -1.5, 0.2], [-0.45, -1.48, 0.2]
    ].forEach(([x, z, size]) => {
      statics.add(place(this.buildCarnation(carnation), x, z, Math.hypot(x, z) > 1.4 ? -0.08 : -0.02, size));
    });
    [[-0.6, -0.3], [0.55, -0.28]].forEach(([x, z]) => {
      statics.add(place(this.buildDaisy(), x, z, 0.14, 0.45));
    });

    // Wispy greenery spraying out past the paper, mostly toward the top and sides
    const leafLight = new THREE.Color(0xb7dc7e);
    const leafGeo = this.buildCurvedSurface(4, 6, (u, v, col) => {
      const x = u * 0.22 * Math.pow(Math.sin(Math.PI * v), 0.8);
      col.setHex(0x8cc152).lerp(leafLight, 1 - Math.abs(u));
      return { x, y: v, z: Math.abs(x) * 0.3 };
    });
    const budGeo = new THREE.SphereGeometry(1, 8, 6);
    for (let i = 0; i < 22; i++) {
      const a = (i / 22) * Math.PI * 2 + Math.random() * 0.2;
      const towardBottom = Math.max(Math.cos(a), 0);
      if (towardBottom > 0.5 && i % 2) continue;
      const radial = new THREE.Vector3(Math.sin(a), 0, Math.cos(a));
      const across = new THREE.Vector3(radial.z, 0, -radial.x).multiplyScalar((Math.random() - 0.5) * 0.5);
      const startR = 0.85 + Math.random() * 0.35;
      const length = (1.1 + Math.random() * 0.6) * (1 - towardBottom * 0.45);
      const points = [0, 0.33, 0.66, 1].map(t => radial.clone().multiplyScalar(startR + length * t)
        .addScaledVector(across, t * t)
        .setY(domeHeight(startR) + t * 0.55 + Math.sin(t * Math.PI) * 0.12));
      statics.add(this.buildSprig(new THREE.CatmullRomCurve3(points), leafGeo, budGeo));
    }
    // Short green sprigs peeking between the flowers
    for (let i = 0; i < 9; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = 0.3 + Math.random() * 0.9;
      const base = new THREE.Vector3(Math.sin(a) * r, domeHeight(r) + 0.05, Math.cos(a) * r);
      const tip = base.clone().add(new THREE.Vector3(Math.sin(a) * 0.3, 0.32, Math.cos(a) * 0.3));
      const mid = base.clone().lerp(tip, 0.5).add(new THREE.Vector3(0, 0.05, 0));
      statics.add(this.buildSprig(new THREE.CatmullRomCurve3([base, mid, tip]), leafGeo, budGeo));
    }

    // Cut stem ends peeking out of the bottom of the handle
    const stemGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.5, 10);
    for (let i = 0; i < 7; i++) {
      const a = (i / 7) * Math.PI * 2;
      const stem = new THREE.Mesh(stemGeo);
      stem.position.set(Math.sin(a) * 0.12, -2.62 - (i % 3) * 0.04, Math.cos(a) * 0.12);
      stem.userData.color = new THREE.Color(0x5e9a46);
      statics.add(stem);
    }

    bouquet.add(new THREE.Mesh(this.bakeGroup(statics), new THREE.MeshStandardMaterial({
      vertexColors: true, roughness: 0.6, side: THREE.DoubleSide
    })));

    // Wrapping: white paper collar with a rolled rim, crinkled pink lining, white paper handle
    const paperMat = (color, glow) => new THREE.MeshStandardMaterial({
      color, vertexColors: true, roughness: 0.85, side: THREE.DoubleSide, emissive: color, emissiveIntensity: glow
    });
    const collarGeo = this.buildRevolvedSurface([
      [0.27, -1.5], [0.5, -1.12], [0.9, -0.68], [1.35, -0.3], [1.8, 0.02],
      [2.15, 0.26], [2.32, 0.4], [2.4, 0.43], [2.45, 0.35]
    ], 160, 34, (theta, v, r, y, col) => {
      col.setScalar(0.8 + 0.2 * smooth(v, 0, 0.5)); // paper gathered at the handle sits in shadow
      return {
        r: r * (1 + 0.045 * Math.sin(theta * 6 + 0.7) * smooth(v, 0.15, 1) + 0.12 * Math.sin(theta * 10) * (1 - smooth(v, 0, 0.3))),
        y: y + 0.07 * Math.sin(theta * 3 + 0.4) * smooth(v, 0.55, 1)
      };
    });
    bouquet.add(new THREE.Mesh(collarGeo, paperMat(0xfffcfa, 0.22)));

    const liningGeo = this.buildRevolvedSurface([
      [1.05, -0.28], [1.3, -0.1], [1.55, 0.06], [1.78, 0.22], [1.88, 0.3], [1.93, 0.26]
    ], 280, 14, (theta, v, r, y, col) => {
      const crinkle = Math.sin(theta * 42 + 4 * Math.sin(theta * 3));
      col.setScalar(0.9 + 0.1 * crinkle);
      return {
        r: r + 0.03 * crinkle * smooth(v, 0.15, 1),
        y: y + 0.03 * Math.sin(theta * 29 + v * 8) * smooth(v, 0.3, 1)
      };
    });
    bouquet.add(new THREE.Mesh(liningGeo, paperMat(0xf9c3d1, 0.12)));

    const sleeveGeo = this.buildRevolvedSurface([
      [0.34, -1.36], [0.26, -1.56], [0.25, -1.85], [0.29, -2.3], [0.36, -2.7], [0.41, -2.78]
    ], 72, 20, (theta, v, r, y, col) => {
      col.setScalar(0.86 + 0.14 * v);
      return { r: r * (1 + 0.1 * Math.sin(theta * 9 + v * 2)), y };
    });
    bouquet.add(new THREE.Mesh(sleeveGeo, paperMat(0xfffaf7, 0.2)));

    // Satin ribbons: pink and white bands, a double bow at the front and long trailing tails
    const satin = (color, glow) => new THREE.MeshStandardMaterial({
      color, roughness: 0.32, metalness: 0.15, side: THREE.DoubleSide, emissive: color, emissiveIntensity: glow
    });
    const pinkSatin = satin(0xf29fb5, 0.1);
    const whiteSatin = satin(0xffffff, 0.18);
    const bandPink = new THREE.Mesh(new THREE.CylinderGeometry(0.285, 0.28, 0.08, 48, 1, true), pinkSatin);
    bandPink.position.y = -1.53;
    const bandWhite = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.275, 0.05, 48, 1, true), whiteSatin);
    bandWhite.position.y = -1.6;
    bouquet.add(bandPink, bandWhite);

    const bow = new THREE.Group();
    bow.position.set(0, -1.56, 0.3);
    bouquet.add(bow);

    const pinkLoop = this.buildBowLoopGeometry(0.42, 0.1, 0.075);
    const whiteLoop = this.buildBowLoopGeometry(0.32, 0.08, 0.06);
    [-1, 1].forEach(side => {
      [[pinkLoop, pinkSatin, 0.3, 0], [whiteLoop, whiteSatin, 0.75, 0.025]].forEach(([geo, mat, lift, front]) => {
        const loop = new THREE.Mesh(geo, mat);
        loop.scale.x = -side;
        loop.rotation.z = side * lift;
        loop.position.z = front;
        bow.add(loop);
      });
    });
    const knot = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), pinkSatin);
    knot.scale.set(0.05, 0.06, 0.045);
    knot.position.z = 0.03;
    bow.add(knot);

    const front = new THREE.Vector3(0, 0, 1);
    [
      [-0.05, 1.55, 0.07, pinkSatin, 0.6], [0.06, 1.75, 0.07, pinkSatin, -0.5],
      [-0.14, 1.35, 0.055, whiteSatin, -0.4], [0.16, 1.5, 0.055, whiteSatin, 0.7]
    ].forEach(([x, length, width, mat, twist]) => {
      const tail = new THREE.CatmullRomCurve3([
        new THREE.Vector3(x * 0.2, 0, 0.02),
        new THREE.Vector3(x * 0.8, -length * 0.3, 0.06),
        new THREE.Vector3(x * 1.4 - 0.03, -length * 0.62, 0.03),
        new THREE.Vector3(x * 2, -length, 0.07)
      ]);
      const tangent = new THREE.Vector3();
      const geo = this.buildRibbonGeometry(tail, width, (t, out) => {
        tail.getTangent(t, tangent);
        return out.crossVectors(tangent, front).normalize().applyAxisAngle(tangent, twist * t);
      }, 0.1);
      bow.add(new THREE.Mesh(geo, mat));
    });

    const card = this.buildGiftCard();
    card.position.set(0.16, -0.5, 0.06);
    card.rotation.set(-0.05, 0, 0.1);
    bow.add(card);

    this.roseBouquetGroup.scale.set(0.001, 0.001, 0.001);
    this.roseBouquetGroup.visible = false;
    this.scene.add(this.roseBouquetGroup);
  }

  // Flower colours: a glow at the heart of each bloom, the body colour and the rim colour.
  // `heart` (optional) tints the innermost rose petals.
  rosePalette(kind = 'crimson') {
    const palettes = {
      crimson: { base: 0xffb28c, body: 0xd8183d, rim: 0x7c0822, glow: 0x3a0612 },
      cream: { base: 0xffd8c6, body: 0xfbe0d3, rim: 0xfff4ec, heart: 0xeba39c, glow: 0x24120c },
      carnation: { base: 0xe27f8c, body: 0xf5a2ab, rim: 0xfccbcd, glow: 0x2a0c10 }
    };
    const p = palettes[kind];
    return {
      base: new THREE.Color(p.base),
      body: new THREE.Color(p.body),
      rim: new THREE.Color(p.rim),
      heart: p.heart !== undefined ? new THREE.Color(p.heart) : null,
      glow: p.glow
    };
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

    const petalColors = [0xf39db1, 0xf7c1cd, 0xe8657f, 0xffd8a8, 0xffffff, 0xa9d39b];

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
      color: 0xf39db1,
      transparent: true,
      opacity: 0.45,
      side: THREE.DoubleSide
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.y = -1.6;
    this.scene.add(ringMesh);

    // Inner glowing disc
    const discGeo = new THREE.CircleGeometry(3.4, 48);
    const discMat = new THREE.MeshBasicMaterial({
      color: 0x9cc98e,
      transparent: true,
      opacity: 0.55,
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

    // Target scale of each 3D group per mode (missing = hidden)
    const MODE_LAYOUT = {
      gift: { gift: 1 },
      heart: { heart: 1 },
      rose: { rose: 1 },
      rain: { gift: 0.85 } // zoom out for majestic panoramic view
    };
    const CAMERA_POS = {
      gift: [0, 2.5, 12],
      heart: [0, 2.2, 11],
      rose: [0, 2.6, 10.5],
      rain: [0, 4, 16]
    };
    const groups = { gift: this.giftBoxGroup, heart: this.heartRoseGroup, rose: this.roseBouquetGroup };
    const layout = MODE_LAYOUT[mode] || MODE_LAYOUT.gift;

    Object.keys(groups).forEach(key => {
      const group = groups[key];
      if (layout[key]) {
        group.visible = true;
        this.animateScale(group, layout[key]);
      } else if (group.visible) {
        this.animateScale(group, 0.001, () => {
          group.visible = false;
        });
      }
    });

    // Bouquet roses bloom again from bud every time it is shown
    if (mode === 'rose') this.roseBloom = 0;

    // Move camera smoothly
    this.targetCameraPos = new THREE.Vector3(...(CAMERA_POS[mode] || CAMERA_POS.gift));
  }

  animateScale(object, targetScale, onComplete) {
    const startScale = object.scale.x;
    const startTime = performance.now();
    const duration = 700; // ms, time-based so slow devices finish on time
    const animId = (object.userData.scaleAnimId || 0) + 1;
    object.userData.scaleAnimId = animId;

    const step = () => {
      if (object.userData.scaleAnimId !== animId) return;
      const p = Math.min((performance.now() - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3); // cubic ease out
      const current = startScale + (targetScale - startScale) * ease;
      object.scale.set(current, current, current);

      if (p < 1) {
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

    if (theme === 'meadow') {
      this.scene.fog.color.setHex(0xf4ebdd);
      this.pointLightRose.color.setHex(0xf39db1);
      this.pointLightGold.color.setHex(0xffe0a3);
      this.pointLightBlue.color.setHex(0xa5cf95);
    } else if (theme === 'rosegarden') {
      this.scene.fog.color.setHex(0xfbe6e6);
      this.pointLightRose.color.setHex(0xf28aa5);
      this.pointLightGold.color.setHex(0xffe3a3);
      this.pointLightBlue.color.setHex(0xb0d09d);
    } else if (theme === 'dusk') {
      this.scene.fog.color.setHex(0xf2d6d0);
      this.pointLightRose.color.setHex(0xf2a7b5);
      this.pointLightGold.color.setHex(0xffc98d);
      this.pointLightBlue.color.setHex(0xcbbbe6);
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

    // 2b. Rose Bouquet: sways gently from side to side while every rose blooms from bud
    if (this.roseBouquetGroup && this.roseBouquetGroup.visible) {
      this.bouquetSway.rotation.y = Math.sin(elapsedTime * 0.4) * 0.25;
      this.bouquetSway.rotation.z = Math.sin(elapsedTime * 0.7) * 0.03;
      this.bouquetSway.position.y = Math.sin(elapsedTime * 1.1) * 0.06;
      this.roseBloom = Math.min(this.roseBloom + delta * 0.22, 1.6);

      this.bouquetRoses.forEach(rose => {
        const local = Math.min(Math.max(this.roseBloom - rose.bloomDelay, 0), 1);
        const open = 1 - Math.pow(1 - local, 3); // ease out
        rose.petals.forEach(petal => {
          const breathe = Math.sin(elapsedTime * 1.3 + petal.phase) * 0.04 * open;
          petal.node.rotation.z = -(petal.closedTilt + (petal.openTilt - petal.closedTilt) * open + breathe);
        });
      });
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
      // Subtle organic mouse parallax (targetMouse stays centred until the mouse first moves)
      const parallaxTargetX = this.targetMouse.x * 1.2;
      const parallaxTargetY = 2.5 + this.targetMouse.y * 0.8;
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
