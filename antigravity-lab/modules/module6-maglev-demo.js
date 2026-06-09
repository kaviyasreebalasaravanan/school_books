/* module6-maglev-demo.js — Magnetic Levitation Demo */
window.Module6 = (function() {
  'use strict';

  let magF = 50; // 0 to 100
  let gravF = 50; // constant gravity pull
  let objY = 200; // 0 is top, 400 is bottom
  let velocity = 0;
  let animId;
  let canvas, ctx;

  function init(container) {
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">MODULE 6</div>
          <h1 class="module-title">Magnetic Levitation Demo</h1>
          <p class="module-subtitle">Since true anti-gravity doesn't exist, we use electromagnetism to overpower gravity. When Magnetic Repulsion Force (Fm) is exactly equal to Gravitational Force (Fg), the object levitates!</p>
        </div>

        <div class="grid-2 mb-24">
          <div class="canvas-wrap" style="height:400px;background:linear-gradient(#050510, #151530);">
            <div class="canvas-label">ELECTROMAGNETIC CHAMBER</div>
            <canvas id="m6-canvas"></canvas>
            <!-- Magnet base -->
            <div style="position:absolute;bottom:0;width:100%;height:40px;background:linear-gradient(90deg, #333, #666, #333);border-top:2px solid var(--blue);box-shadow:0 -10px 30px rgba(0,212,255,0.2);">
              <div style="text-align:center;font-family:var(--font-h);font-size:14px;color:#fff;line-height:40px;letter-spacing:4px;">ELECTROMAGNET BASE</div>
            </div>
          </div>

          <div class="glass-card" style="display:flex;flex-direction:column;justify-content:center;">
            <div class="formula-box mb-24">
              <div class="formula-main" id="lev-formula">Fm = Fg</div>
              <div class="formula-label-txt" id="lev-status" style="color:var(--yellow);">PERFECT LEVITATION</div>
            </div>

            <div class="section-title">Force Balancer</div>
            
            <div class="force-row">
              <div class="force-lbl">Gravity (Fg)</div>
              <div class="force-bar-wrap"><div class="force-fill" style="width:50%;background:var(--pink);"></div></div>
              <div class="force-val" style="color:var(--pink);">50 N</div>
            </div>
            
            <div class="force-row mb-24">
              <div class="force-lbl">Magnetic (Fm)</div>
              <div class="force-bar-wrap"><div class="force-fill" id="fm-bar" style="width:50%;background:var(--blue);"></div></div>
              <div class="force-val" id="fm-val" style="color:var(--blue);">50 N</div>
            </div>

            <div class="slider-group">
              <div class="slider-lbl"><span>Adjust Electromagnet Power</span></div>
              <input type="range" id="mag-slide" min="0" max="100" value="50">
            </div>
            <p style="font-size:11px;color:var(--txt-dim);margin-top:10px;">Warning: If power drops, gravity wins. If power is too high, the object shoots into the ceiling.</p>

            <div style="text-align:right; margin-top:30px;">
              <button class="btn-primary" id="m6-complete">Complete Experiment →</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.getElementById('mag-slide').addEventListener('input', (e) => {
      magF = parseInt(e.target.value);
      document.getElementById('fm-bar').style.width = magF + '%';
      document.getElementById('fm-val').textContent = magF + ' N';
      updateStatus();
    });

    document.getElementById('m6-complete').addEventListener('click', () => {
      window.App.completeModule('module6', 25);
    });

    setupCanvas();
  }

  function updateStatus() {
    const fbox = document.getElementById('lev-formula');
    const stat = document.getElementById('lev-status');
    if (magF === gravF) {
      fbox.textContent = 'Fm = Fg';
      stat.textContent = 'PERFECT LEVITATION';
      stat.style.color = 'var(--yellow)';
    } else if (magF > gravF) {
      fbox.textContent = 'Fm > Fg';
      stat.textContent = 'ACCELERATING UPWARD';
      stat.style.color = 'var(--blue)';
    } else {
      fbox.textContent = 'Fm < Fg';
      stat.textContent = 'FALLING';
      stat.style.color = 'var(--pink)';
    }
  }

  function setupCanvas() {
    canvas = document.getElementById('m6-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Reset state
    objY = canvas.height / 2;
    velocity = 0;

    function draw() {
      if (!document.getElementById('m6-canvas')) return;
      animId = requestAnimationFrame(draw);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Physics
      const netForce = (gravF - magF) * 0.05; // positive means down
      velocity += netForce;
      velocity *= 0.95; // air resistance/damping
      objY += velocity;

      // Bounds
      const ground = canvas.height - 60; // above magnet base
      if (objY > ground) { objY = ground; velocity = 0; }
      if (objY < 30) { objY = 30; velocity = 0; }

      const cx = canvas.width / 2;

      // Draw magnetic field lines (intensity based on magF)
      ctx.strokeStyle = `rgba(0, 212, 255, ${magF/200})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      for(let i=-2; i<=2; i++) {
        ctx.moveTo(cx + i*30, canvas.height);
        // curve lines outward
        ctx.quadraticCurveTo(cx + i*60, objY + 50, cx + i*30, objY + 20);
      }
      ctx.stroke();

      // Draw object
      ctx.fillStyle = '#6c63ff';
      ctx.shadowColor = '#6c63ff';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.roundRect(cx - 30, objY - 20, 60, 40, 8);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw forces
      ctx.lineWidth = 3;
      // Gravity arrow (pink)
      ctx.strokeStyle = '#ff6b9d';
      ctx.fillStyle = '#ff6b9d';
      drawArrow(ctx, cx + 50, objY, cx + 50, objY + 20 + gravF);
      
      // Magnetic arrow (blue)
      if (magF > 0) {
        ctx.strokeStyle = '#00d4ff';
        ctx.fillStyle = '#00d4ff';
        drawArrow(ctx, cx - 50, objY, cx - 50, objY - 20 - magF);
      }
    }
    draw();
  }

  function drawArrow(ctx, fromX, fromY, toX, toY) {
    const headlen = 10;
    const dx = toX - fromX;
    const dy = toY - fromY;
    const angle = Math.atan2(dy, dx);
    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(toX - headlen * Math.cos(angle - Math.PI / 6), toY - headlen * Math.sin(angle - Math.PI / 6));
    ctx.lineTo(toX - headlen * Math.cos(angle + Math.PI / 6), toY - headlen * Math.sin(angle + Math.PI / 6));
    ctx.fill();
  }

  return { init };
})();
