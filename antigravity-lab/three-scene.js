/* three-scene.js — Three.js 3D Background
   Anti-Gravity Research Laboratory */

(function () {
  'use strict';

  let scene, camera, renderer;
  let stars, earth, earthWire, earthAtm;
  let floaters = [];
  let energyRings = [];
  let animId;
  let t = 0;

  function init() {
    const canvas = document.getElementById('three-canvas');
    if (!canvas || typeof THREE === 'undefined') return;

    /* ---- SCENE ---- */
    scene = new THREE.Scene();

    /* ---- CAMERA ---- */
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000);
    camera.position.set(0, 0, 6);

    /* ---- RENDERER ---- */
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    /* ---- LIGHTS ---- */
    scene.add(new THREE.AmbientLight(0x112255, 0.6));
    const sunLight = new THREE.PointLight(0x00d4ff, 1.2, 80);
    sunLight.position.set(8, 6, 8);
    scene.add(sunLight);
    const purpleLight = new THREE.PointLight(0x6c63ff, 0.7, 60);
    purpleLight.position.set(-6, -4, 4);
    scene.add(purpleLight);

    /* ---- BUILD SCENE ---- */
    buildStars();
    buildEarth();
    buildHolograms();
    buildEnergyCore();

    window.addEventListener('resize', onResize);
    animate();
  }

  /* ===================== STARS ===================== */
  function buildStars() {
    const N = 6000;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 2400;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 2400;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 2400;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    stars = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xaabbff, size: 1.4, sizeAttenuation: true, transparent: true, opacity: 0.72 }));
    scene.add(stars);
  }

  /* ===================== EARTH ===================== */
  function buildEarth() {
    const geo = new THREE.SphereGeometry(2.8, 48, 48);
    earth = new THREE.Mesh(geo, new THREE.MeshPhongMaterial({
      color: 0x1a6b3c, emissive: 0x0a2a18, shininess: 35, transparent: true, opacity: 0.92
    }));
    earth.position.set(13, -9, -5);
    scene.add(earth);

    earthWire = new THREE.Mesh(
      new THREE.SphereGeometry(2.82, 14, 14),
      new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.1 })
    );
    earthWire.position.copy(earth.position);
    scene.add(earthWire);

    earthAtm = new THREE.Mesh(
      new THREE.SphereGeometry(3.1, 32, 32),
      new THREE.MeshBasicMaterial({ color: 0x0099ff, transparent: true, opacity: 0.07, side: THREE.BackSide })
    );
    earthAtm.position.copy(earth.position);
    scene.add(earthAtm);
  }

  /* ===================== FLOATING HOLOGRAMS ===================== */
  function buildHolograms() {
    const defs = [
      { g: new THREE.OctahedronGeometry(0.32),   p: [-8, 3, -3],   c: 0x6c63ff },
      { g: new THREE.TetrahedronGeometry(0.28),   p: [6.5, 4, -4],  c: 0x00d4ff },
      { g: new THREE.IcosahedronGeometry(0.22, 0),p: [-6, -2, -2],  c: 0xff6b9d },
      { g: new THREE.OctahedronGeometry(0.20),    p: [4.5, -3, -3], c: 0x6c63ff },
      { g: new THREE.TetrahedronGeometry(0.30),   p: [-3.5, 5, -5], c: 0x00ff9f },
    ];

    defs.forEach(({ g, p, c }, i) => {
      const solid = new THREE.Mesh(g, new THREE.MeshPhongMaterial({
        color: c, emissive: c, emissiveIntensity: 0.42,
        transparent: true, opacity: 0.68
      }));
      solid.position.set(...p);
      solid.userData = { baseY: p[1], offset: i * 1.3, rs: 0.005 + Math.random() * 0.01 };
      scene.add(solid);
      floaters.push(solid);

      const wire = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.28 }));
      wire.position.set(...p);
      wire.userData = solid.userData;
      scene.add(wire);
      floaters.push(wire);
    });
  }

  /* ===================== ENERGY RINGS ===================== */
  function buildEnergyCore() {
    const rd = [
      { r: 1.6, t: 0.018, c: 0x00d4ff },
      { r: 1.1, t: 0.014, c: 0x6c63ff },
      { r: 0.65, t: 0.010, c: 0xff6b9d },
    ];
    rd.forEach(({ r, t, c }) => {
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(r, t, 8, 96),
        new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.58 })
      );
      ring.position.set(0, 0, -10);
      scene.add(ring);
      energyRings.push(ring);
    });
  }

  /* ===================== ANIMATE ===================== */
  function animate() {
    animId = requestAnimationFrame(animate);
    t += 0.01;

    if (stars) { stars.rotation.y = t * 0.018; stars.rotation.x = t * 0.009; }
    if (earth) { earth.rotation.y = t * 0.045; }
    if (earthWire) earthWire.rotation.y = t * 0.04;

    floaters.forEach(obj => {
      if (!obj.userData.rs) return;
      obj.rotation.x += obj.userData.rs;
      obj.rotation.y += obj.userData.rs * 0.65;
      obj.position.y = obj.userData.baseY + Math.sin(t + obj.userData.offset) * 0.28;
    });

    energyRings.forEach((ring, i) => {
      ring.rotation.x = t * (i % 2 === 0 ? 0.5 : -0.3);
      ring.rotation.y = t * (i % 2 === 0 ? 0.3 : 0.5);
      ring.rotation.z = t * 0.2;
    });

    renderer.render(scene, camera);
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  window.ThreeScene = { init };
})();
