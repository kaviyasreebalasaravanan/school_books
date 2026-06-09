/* module3-weightless.js — Zero-Gravity Chamber */
window.Module3 = (function() {
  'use strict';

  let canvas, ctx, animId;
  let objects = [];
  let isDragging = false;
  let dragObj = null;
  let mouse = { x: 0, y: 0, vx: 0, vy: 0 };

  const EMOJIS = ['🔧', '💧', '🥪', '🍎', '👨‍🚀', '🖊️'];

  function init(container) {
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">MODULE 3</div>
          <h1 class="module-title">Weightlessness Chamber</h1>
          <p class="module-subtitle">Experience microgravity. Objects in free fall do not experience a "normal force" pushing back against them, creating the sensation of weightlessness. Click and drag to throw objects around the chamber!</p>
        </div>

        <div class="canvas-wrap mb-24" style="height:500px; border-color:var(--purple); background:url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PGRlZnM+PHBhdHRlcm4gaWQ9InBhdHRlcm4iIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgNDBoNDBWMEgwem0yMCAwdjIwaDIwIiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNwYXR0ZXJuKSIvPjwvc3ZnPg==')">
          <div class="canvas-label">ZERO-G SIMULATOR</div>
          <canvas id="m3-canvas"></canvas>
          <div style="position:absolute;bottom:15px;left:15px;font-size:12px;color:var(--txt-mute);">Gravity: 0.0 m/s² | Drag to throw</div>
        </div>

        <div class="grid-2">
          <div class="glass-card">
            <div class="section-title">Add Objects</div>
            <div class="btn-group">
              <button class="btn-secondary" id="btn-add-obj">+ Add Random Object</button>
              <button class="btn-secondary" id="btn-clear-obj" style="border-color:var(--pink);color:var(--pink);">Clear Chamber</button>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:flex-end;">
            <button class="btn-primary" id="m3-complete">Complete Experiment →</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-add-obj').addEventListener('click', spawnObject);
    document.getElementById('btn-clear-obj').addEventListener('click', () => { objects = []; });
    document.getElementById('m3-complete').addEventListener('click', () => {
      window.App.completeModule('module3', 20);
    });

    setupCanvas();
    // Spawn a few initial objects
    for(let i=0; i<5; i++) spawnObject();
  }

  function setupCanvas() {
    canvas = document.getElementById('m3-canvas');
    if (!canvas) return;
    ctx = canvas.getContext('2d');
    
    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    // Mouse events
    canvas.addEventListener('mousedown', onDown);
    canvas.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', e => { e.preventDefault(); onDown(e.touches[0]); });
    canvas.addEventListener('touchmove', e => { e.preventDefault(); onMove(e.touches[0]); });
    window.addEventListener('touchend', onUp);

    animate();
  }

  function spawnObject() {
    if (!canvas) return;
    objects.push({
      e: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: canvas.width/2 + (Math.random()-0.5)*100,
      y: canvas.height/2 + (Math.random()-0.5)*100,
      vx: (Math.random()-0.5)*3,
      vy: (Math.random()-0.5)*3,
      r: 0,
      vr: (Math.random()-0.5)*0.05,
      size: 30 + Math.random()*20
    });
  }

  function onDown(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    // Find clicked object
    for (let i = objects.length - 1; i >= 0; i--) {
      const obj = objects[i];
      const dist = Math.hypot(mx - obj.x, my - obj.y);
      if (dist < obj.size) {
        dragObj = obj;
        isDragging = true;
        mouse.x = mx;
        mouse.y = my;
        // Move to front
        objects.splice(i, 1);
        objects.push(dragObj);
        break;
      }
    }
  }

  function onMove(e) {
    const rect = canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    
    mouse.vx = mx - mouse.x;
    mouse.vy = my - mouse.y;
    mouse.x = mx;
    mouse.y = my;

    if (isDragging && dragObj) {
      dragObj.x = mx;
      dragObj.y = my;
      dragObj.vx = 0;
      dragObj.vy = 0;
      dragObj.vr = mouse.vx * 0.01;
    }
  }

  function onUp() {
    if (isDragging && dragObj) {
      // Throw with mouse velocity
      dragObj.vx = mouse.vx * 0.5;
      dragObj.vy = mouse.vy * 0.5;
    }
    isDragging = false;
    dragObj = null;
  }

  function animate() {
    if (!document.getElementById('m3-canvas')) return;
    animId = requestAnimationFrame(animate);

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    objects.forEach(obj => {
      if (obj !== dragObj) {
        // Physics step (no gravity)
        obj.x += obj.vx;
        obj.y += obj.vy;
        obj.r += obj.vr;

        // Bounce off walls perfectly (elastic collision)
        if (obj.x - obj.size/2 < 0) { obj.x = obj.size/2; obj.vx *= -1; }
        if (obj.x + obj.size/2 > canvas.width) { obj.x = canvas.width - obj.size/2; obj.vx *= -1; }
        if (obj.y - obj.size/2 < 0) { obj.y = obj.size/2; obj.vy *= -1; }
        if (obj.y + obj.size/2 > canvas.height) { obj.y = canvas.height - obj.size/2; obj.vy *= -1; }
      }

      // Draw
      ctx.save();
      ctx.translate(obj.x, obj.y);
      ctx.rotate(obj.r);
      ctx.font = `${obj.size}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      if (obj === dragObj) {
        ctx.shadowColor = '#00d4ff';
        ctx.shadowBlur = 15;
      }
      ctx.fillText(obj.e, 0, 0);
      ctx.restore();
    });
  }

  function cleanup() {
    cancelAnimationFrame(animId);
  }

  return { init, cleanup };
})();
