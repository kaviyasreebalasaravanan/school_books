/* module7-maglev-train.js — Maglev Train Simulator */
window.Module7 = (function() {
  'use strict';

  let speed = 0;
  let targetSpeed = 0;
  let isLevitating = false;
  let trackOffset = 0;
  let animId;
  let trainY = 50; // px offset from track

  function init(container) {
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">MODULE 7</div>
          <h1 class="module-title">Maglev Train Simulator</h1>
          <p class="module-subtitle">Experience the ultimate real-world application of magnetic levitation. Maglev trains float above their tracks, eliminating all friction except air resistance, allowing speeds over 400 km/h!</p>
        </div>

        <div class="canvas-wrap mb-24" style="height:350px; background:linear-gradient(to bottom, #0d0d2b, #1a1a3e);">
          <div class="canvas-label">SCMAGLEV SCM-01</div>
          <canvas id="m7-canvas"></canvas>
        </div>

        <div class="grid-2">
          <div class="glass-card">
            <div class="section-title">Train Controls</div>
            <div class="train-ctrl-group">
              <button class="train-btn go" id="btn-power">⚡ POWER ON (LEVITATE)</button>
              <button class="train-btn danger" id="btn-brake">🛑 EMERGENCY BRAKE</button>
            </div>
            <div class="train-ctrl-group">
              <button class="train-btn" id="btn-accel">⏫ ACCELERATE</button>
              <button class="train-btn" id="btn-decel">⏬ DECELERATE</button>
            </div>
            <p style="font-size:11px;color:var(--txt-dim);margin-top:10px;">Notice: Acceleration is disabled until the train achieves magnetic levitation.</p>
          </div>

          <div class="glass-card">
            <div class="section-title">Telemetry Data</div>
            <div class="speed-row">
              <div class="speed-lbl" style="width:80px;">Velocity</div>
              <div class="speed-val" id="tele-speed">0</div>
              <div class="speed-unit">km/h</div>
            </div>
            <div class="speed-row">
              <div class="speed-lbl" style="width:80px;">Friction</div>
              <div class="speed-val" id="tele-fric" style="color:var(--pink);">HIGH</div>
              <div class="speed-unit">(Wheels on track)</div>
            </div>
            <div style="text-align:right;">
              <button class="btn-primary" id="m7-complete">Complete Experiment →</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-power').addEventListener('click', () => {
      isLevitating = !isLevitating;
      document.getElementById('btn-power').textContent = isLevitating ? '🔌 POWER OFF (DROP)' : '⚡ POWER ON (LEVITATE)';
      document.getElementById('btn-power').style.background = isLevitating ? 'var(--card)' : 'linear-gradient(135deg,var(--blue),var(--purple))';
      document.getElementById('btn-power').style.color = isLevitating ? 'var(--blue)' : '#fff';
      
      const fricEl = document.getElementById('tele-fric');
      if (isLevitating) {
        fricEl.textContent = 'ZERO';
        fricEl.style.color = 'var(--green)';
        fricEl.nextElementSibling.textContent = '(Magnetic cushion)';
        window.App.speak("Magnets engaged. Train is levitating 10 millimeters above the track.");
      } else {
        fricEl.textContent = 'HIGH';
        fricEl.style.color = 'var(--pink)';
        fricEl.nextElementSibling.textContent = '(Wheels on track)';
        targetSpeed = 0; // train stops if dropped
        window.App.speak("Power cut. Train resting on wheels.");
      }
    });

    document.getElementById('btn-accel').addEventListener('click', () => {
      if (!isLevitating) {
        window.App.showToast('Train must be levitating to accelerate!');
        return;
      }
      targetSpeed = Math.min(targetSpeed + 100, 500);
    });

    document.getElementById('btn-decel').addEventListener('click', () => {
      targetSpeed = Math.max(targetSpeed - 100, 0);
    });

    document.getElementById('btn-brake').addEventListener('click', () => {
      targetSpeed = 0;
      window.App.showToast('Emergency brakes applied!');
    });

    document.getElementById('m7-complete').addEventListener('click', () => {
      window.App.completeModule('module7', 20);
    });

    setupCanvas();
  }

  function setupCanvas() {
    const canvas = document.getElementById('m7-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Reset state on load
    speed = 0;
    targetSpeed = 0;
    isLevitating = false;
    trainY = 0; // 0 = resting, -15 = levitating

    function draw() {
      if (!document.getElementById('m7-canvas')) return;
      animId = requestAnimationFrame(draw);

      // Smooth speed transition
      speed += (targetSpeed - speed) * 0.05;
      document.getElementById('tele-speed').textContent = Math.round(speed);

      // Smooth height transition
      const targetY = isLevitating ? -15 : 0;
      trainY += (targetY - trainY) * 0.1;

      // Track movement
      trackOffset -= speed * 0.05;
      if (trackOffset < -100) trackOffset = 0;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 50;

      // Draw background city parallax
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      const cityOffset = trackOffset * 0.2;
      for(let i=0; i<15; i++) {
        let h = 50 + (i%3)*40;
        ctx.fillRect((i*100 + cityOffset)%canvas.width, cy - 20 - h, 60, h);
      }

      // Draw track
      ctx.fillStyle = '#222';
      ctx.fillRect(0, cy, canvas.width, 40);
      ctx.fillStyle = '#00d4ff';
      // Track segments
      for(let i=0; i<canvas.width+100; i+=100) {
        ctx.fillRect(i + trackOffset, cy + 5, 50, 4);
      }

      // Draw Train
      ctx.save();
      ctx.translate(cx, cy + trainY);

      // Maglev glow if levitating
      if (isLevitating) {
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 20;
        ctx.fillStyle = 'rgba(0, 212, 255, 0.5)';
        ctx.fillRect(-140, -5, 280, 8);
      }

      // Train Body
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#e0e8ff';
      ctx.beginPath();
      ctx.moveTo(-160, 0);
      ctx.lineTo(-140, -40);
      ctx.lineTo(140, -40);
      ctx.lineTo(160, 0);
      ctx.closePath();
      ctx.fill();

      // Train Stripe
      ctx.fillStyle = '#6c63ff';
      ctx.fillRect(-145, -25, 290, 6);

      // Windows
      ctx.fillStyle = '#050510';
      for(let i=-120; i<=120; i+=30) {
        ctx.fillRect(i, -32, 20, 12);
      }

      ctx.restore();
    }
    draw();
  }

  return { init };
})();
