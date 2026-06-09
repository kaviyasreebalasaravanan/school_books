/* module2-planets.js — Moon & Planet Gravity Simulator */
window.Module2 = (function() {
  'use strict';

  let selectedObj = 'basketball';
  let isSimulating = false;
  let canvas, ctx, animId;
  
  const PLANETS = [
    { id: 'earth', name: 'Earth', g: 9.8,  c: '#00d4ff', emoji: '🌍' },
    { id: 'moon',  name: 'Moon',  g: 1.62, c: '#e0e8ff', emoji: '🌕' },
    { id: 'mars',  name: 'Mars',  g: 3.71, c: '#ff8c42', emoji: '🔴' },
    { id: 'jup',   name: 'Jupiter',g: 24.79,c: '#ffd700', emoji: '🪐' }
  ];

  const OBJECTS = {
    basketball: { emoji: '🏀', mass: 0.6, name: 'Basketball' },
    human:      { emoji: '🧑', mass: 70,  name: 'Human' },
    car:        { emoji: '🚗', mass: 1500,name: 'Car' },
    feather:    { emoji: '🪶', mass: 0.01,name: 'Feather' } // We ignore air resistance here to show pure gravity difference
  };

  let drops = [];

  function init(container) {
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">MODULE 2</div>
          <h1 class="module-title">Planet Gravity Simulator</h1>
          <p class="module-subtitle">Different planets have different masses, creating different gravitational pulls. Drop objects to compare how fast they fall under different gravitational constants (g).</p>
        </div>

        <div class="glass-card mb-24">
          <div class="section-title">1. Select an Object</div>
          <div class="obj-selector">
            <div class="obj-btn active" data-obj="basketball"><span class="obj-icon">🏀</span> Basketball</div>
            <div class="obj-btn" data-obj="human"><span class="obj-icon">🧑</span> Human</div>
            <div class="obj-btn" data-obj="car"><span class="obj-icon">🚗</span> Car</div>
            <div class="obj-btn" data-obj="feather"><span class="obj-icon">🪶</span> Feather</div>
          </div>
        </div>

        <div class="grid-2 mb-24">
          <div class="canvas-wrap" style="height:360px;">
            <div class="canvas-label">SIMULATION CAMERA</div>
            <canvas id="m2-canvas"></canvas>
          </div>
          
          <div class="glass-card">
            <div class="section-title">2. Observation Data</div>
            <div class="planet-grid" style="grid-template-columns:1fr; gap:8px;">
              ${PLANETS.map(p => `
                <div class="planet-card" style="display:flex;align-items:center;text-align:left;gap:12px;cursor:default;">
                  <div class="planet-emoji" style="margin:0;">${p.emoji}</div>
                  <div style="flex:1;">
                    <div class="planet-name">${p.name}</div>
                    <div class="planet-g">g = ${p.g} m/s²</div>
                  </div>
                  <div id="time-${p.id}" style="font-family:var(--font-h);font-size:14px;color:var(--yellow);">-- s</div>
                </div>
              `).join('')}
            </div>
            <button class="btn-primary" id="btn-drop" style="width:100%;">⏬ Drop on All Planets</button>
            <div style="text-align:center;margin-top:16px;">
              <button class="btn-secondary" id="m2-complete">Complete Experiment →</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.querySelectorAll('.obj-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (isSimulating) return;
        document.querySelectorAll('.obj-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedObj = btn.dataset.obj;
        resetDrops();
        drawCanvas();
      });
    });

    document.getElementById('btn-drop').addEventListener('click', () => {
      if (isSimulating) return;
      startDrop();
    });

    document.getElementById('m2-complete').addEventListener('click', () => {
      window.App.completeModule('module2', 25);
    });

    setupCanvas();
  }

  function setupCanvas() {
    canvas = document.getElementById('m2-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
      resetDrops();
      drawCanvas();
    }
    window.addEventListener('resize', resize);
    resize();
  }

  function resetDrops() {
    if (!canvas) return;
    const w = canvas.width / 4;
    drops = PLANETS.map((p, i) => ({
      planet: p,
      y: 40,
      v: 0,
      t: 0,
      x: w * i + w/2,
      done: false
    }));
    PLANETS.forEach(p => {
      const el = document.getElementById(`time-${p.id}`);
      if(el) el.textContent = '-- s';
    });
  }

  function drawCanvas() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const w = canvas.width / 4;
    
    // Draw columns
    for(let i=0; i<4; i++) {
      ctx.fillStyle = i%2===0 ? 'rgba(255,255,255,0.02)' : 'rgba(255,255,255,0.05)';
      ctx.fillRect(i*w, 0, w, canvas.height);
      ctx.fillStyle = PLANETS[i].c;
      ctx.fillRect(i*w, canvas.height - 10, w, 10);
    }

    // Draw objects
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    drops.forEach(d => {
      ctx.fillText(OBJECTS[selectedObj].emoji, d.x, d.y);
      if (d.done && d.t > 0) {
        ctx.fillStyle = '#00ff9f';
        ctx.font = '12px Orbitron';
        ctx.fillText(d.t.toFixed(2) + 's', d.x, canvas.height - 25);
        ctx.font = '28px sans-serif';
      }
    });
  }

  function startDrop() {
    isSimulating = true;
    resetDrops();
    let lastTime = performance.now();
    
    function animate(now) {
      if (!document.getElementById('m2-canvas')) {
        isSimulating = false;
        return;
      }
      const dt = (now - lastTime) / 1000;
      lastTime = now;
      let allDone = true;
      const ground = canvas.height - 30;

      drops.forEach(d => {
        if (!d.done) {
          allDone = false;
          // Scale down g so it fits on screen nicely, but keep proportions
          d.v += d.planet.g * dt * 50; 
          d.y += d.v * dt;
          d.t += dt; // simulation time
          
          if (d.y >= ground) {
            d.y = ground;
            d.done = true;
            document.getElementById(`time-${d.planet.id}`).textContent = d.t.toFixed(2) + ' s';
          }
        }
      });

      drawCanvas();

      if (!allDone) {
        requestAnimationFrame(animate);
      } else {
        isSimulating = false;
      }
    }
    requestAnimationFrame(animate);
  }

  return { init };
})();
