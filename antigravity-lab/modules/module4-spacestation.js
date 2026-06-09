/* module4-spacestation.js — Space Station Experiments */
window.Module4 = (function() {
  'use strict';

  let astPos = { x: 50, y: 50 };
  let keys = { ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false, w:false, a:false, s:false, d:false };
  let thrusterActive = false;

  function init(container) {
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">MODULE 4</div>
          <h1 class="module-title">Space Station Laboratory</h1>
          <p class="module-subtitle">Welcome aboard the orbital station. Because the station and everything inside it is falling around Earth at the same rate, you experience apparent weightlessness. Use WASD or Arrow Keys to navigate the astronaut via thruster puffs.</p>
        </div>

        <div class="canvas-wrap mb-24" style="height:460px; position:relative; overflow:hidden;">
          <div class="canvas-label">ORBITAL MODULE</div>
          
          <!-- Background -->
          <div style="position:absolute;inset:0;background:linear-gradient(to bottom, #050510, #111122);">
            <!-- Window showing Earth -->
            <div style="position:absolute;top:20px;right:40px;width:120px;height:120px;border-radius:50%;border:4px solid var(--panel);box-shadow:inset 0 0 20px #000;background:radial-gradient(circle at 30% 30%, #1a6b3c, #001144);overflow:hidden;">
               <div class="floating" style="position:absolute;top:10px;left:20px;width:40px;height:20px;background:#fff;border-radius:10px;opacity:0.4;"></div>
            </div>
          </div>

          <!-- Astronaut -->
          <div id="m4-astronaut" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:64px; user-select:none; filter:drop-shadow(0 0 10px rgba(0,212,255,0.4)); transition:transform 0.1s;">
            👨‍🚀
            <div id="thrust-fire" style="position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);width:20px;height:30px;background:linear-gradient(to bottom, var(--blue), transparent);border-radius:50%;opacity:0;transition:opacity 0.2s;"></div>
          </div>

          <!-- Floating Ball -->
          <div id="m4-ball" class="floating" style="position:absolute; top:70%; left:20%; font-size:32px; cursor:pointer;" title="Click to push">⚽</div>

          <!-- Floating Water -->
          <div class="floating" style="position:absolute; top:30%; left:30%; animation-delay:-1s;">
            <div style="width:30px;height:30px;background:radial-gradient(circle at 30% 30%, #fff, #00d4ff);border-radius:50%;opacity:0.7;box-shadow:0 0 10px #00d4ff;"></div>
          </div>
          <div class="floating" style="position:absolute; top:40%; left:70%; animation-delay:-2s;">
            <div style="width:40px;height:45px;background:radial-gradient(circle at 30% 30%, #fff, #00d4ff);border-radius:45% 55% 50% 50%;opacity:0.7;box-shadow:0 0 10px #00d4ff;"></div>
          </div>
        </div>

        <div class="grid-2">
          <div class="glass-card">
            <div class="section-title">Navigation Controls</div>
            <p style="font-size:12px;color:var(--txt-dim);margin-bottom:10px;">In space, there is no friction to stop you. A short thruster burst will keep you moving forever until you thrust in the opposite direction!</p>
            <div style="display:flex;gap:10px;justify-content:center;">
              <div style="display:grid;grid-template-columns:30px 30px 30px;gap:5px;">
                <div></div><div class="train-btn" style="text-align:center;">W</div><div></div>
                <div class="train-btn" style="text-align:center;">A</div><div class="train-btn" style="text-align:center;">S</div><div class="train-btn" style="text-align:center;">D</div>
              </div>
            </div>
          </div>
          <div style="display:flex;align-items:center;justify-content:flex-end;">
            <button class="btn-primary" id="m4-complete">Complete Experiment →</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('m4-complete').addEventListener('click', () => {
      window.App.completeModule('module4', 20);
    });

    const ball = document.getElementById('m4-ball');
    let ballVx = 0;
    let ballX = 20;
    ball.addEventListener('click', () => {
      ballVx = 0.5; // push ball
      window.App.showToast("Newton's 1st Law: Object in motion stays in motion!");
    });

    // Astronaut movement loop
    let astro = document.getElementById('m4-astronaut');
    let fire = document.getElementById('thrust-fire');
    let ax = 50, ay = 50;
    let avx = 0, avy = 0;
    
    function moveLoop() {
      if (!document.getElementById('m4-astronaut')) return;
      
      let thrusting = false;
      if (keys.ArrowUp || keys.w) { avy -= 0.05; thrusting = true; }
      if (keys.ArrowDown || keys.s) { avy += 0.05; thrusting = true; }
      if (keys.ArrowLeft || keys.a) { avx -= 0.05; thrusting = true; }
      if (keys.ArrowRight || keys.d) { avx += 0.05; thrusting = true; }

      fire.style.opacity = thrusting ? '1' : '0';

      ax += avx;
      ay += avy;

      // Wrap around screen
      if (ax < -10) ax = 110;
      if (ax > 110) ax = -10;
      if (ay < -10) ay = 110;
      if (ay > 110) ay = -10;

      astro.style.left = ax + '%';
      astro.style.top = ay + '%';
      
      // Ball movement
      if (ballVx > 0) {
        ballX += ballVx;
        if (ballX > 110) ballX = -10;
        ball.style.left = ballX + '%';
      }

      requestAnimationFrame(moveLoop);
    }
    moveLoop();

    window.addEventListener('keydown', onKd);
    window.addEventListener('keyup', onKu);
  }

  function onKd(e) { if(keys.hasOwnProperty(e.key)) keys[e.key] = true; }
  function onKu(e) { if(keys.hasOwnProperty(e.key)) keys[e.key] = false; }

  function cleanup() {
    window.removeEventListener('keydown', onKd);
    window.removeEventListener('keyup', onKu);
  }

  return { init, cleanup };
})();
