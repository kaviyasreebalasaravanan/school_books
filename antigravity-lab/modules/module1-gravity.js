/* module1-gravity.js — Understanding Gravity Formula */
window.Module1 = (function() {
  'use strict';

  let m1 = 10;
  let m2 = 20;
  let r = 5;
  let animId;

  function init(container) {
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">MODULE 1</div>
          <h1 class="module-title">Understanding Gravity</h1>
          <p class="module-subtitle">Sir Isaac Newton formulated the Law of Universal Gravitation, stating that every mass attracts every other mass. The force depends on the size of the masses and the distance between them.</p>
        </div>

        <div class="grid-2 mb-24">
          <!-- Formula Panel -->
          <div class="glass-card">
            <div class="section-title">Newton's Law of Gravitation</div>
            <div class="formula-box">
              <div class="formula-main">
                F = G <span style="color:var(--txt-mute);font-size:20px;">×</span> 
                <span style="display:inline-block;vertical-align:middle;text-align:center;font-size:20px;">
                  <span style="border-bottom:2px solid var(--blue);padding:0 4px;">m₁ × m₂</span><br>
                  <span style="padding-top:2px;">r²</span>
                </span>
              </div>
              <div class="formula-label-txt" title="F = Gravitational Force, G = Constant, m1/m2 = Masses, r = Distance">Hover formula terms for details</div>
            </div>

            <div class="mt-24">
              <div class="slider-group">
                <div class="slider-lbl"><span>Mass 1 (m₁)</span><span id="m1-val">10 kg</span></div>
                <input type="range" id="m1-slide" min="1" max="100" value="10">
              </div>
              <div class="slider-group">
                <div class="slider-lbl"><span>Mass 2 (m₂)</span><span id="m2-val">20 kg</span></div>
                <input type="range" id="m2-slide" min="1" max="100" value="20">
              </div>
              <div class="slider-group">
                <div class="slider-lbl"><span>Distance (r)</span><span id="r-val">5 m</span></div>
                <input type="range" id="r-slide" min="1" max="20" value="5">
              </div>
            </div>
          </div>

          <!-- Calculation Panel -->
          <div class="glass-card" style="display:flex;flex-direction:column;">
            <div class="section-title">Live Calculation</div>
            <div class="calc-panel" style="flex:1;">
              <div class="calc-step">
                <div class="step-num">1</div>
                <div class="step-content">Multiply Masses (m₁ × m₂)</div>
                <div class="step-result" id="calc-step1">200</div>
              </div>
              <div class="calc-step">
                <div class="step-num">2</div>
                <div class="step-content">Square Distance (r²)</div>
                <div class="step-result" id="calc-step2">25</div>
              </div>
              <div class="calc-step">
                <div class="step-num">3</div>
                <div class="step-content">Divide (Step 1 ÷ Step 2)</div>
                <div class="step-result" id="calc-step3">8.00</div>
              </div>
              <div class="calc-final-box">
                <div class="final-label">GRAVITATIONAL FORCE (F)</div>
                <div class="final-value">G × <span id="calc-final">8.00</span></div>
              </div>
            </div>
          </div>
        </div>

        <div class="canvas-wrap" style="height:220px;">
          <div class="canvas-label">GRAVITY VISUALIZATION</div>
          <canvas id="m1-canvas"></canvas>
        </div>

        <div style="text-align:right; margin-top:20px;">
          <button class="btn-primary" id="m1-complete">Complete Experiment →</button>
        </div>
      </div>
    `;

    document.getElementById('m1-slide').addEventListener('input', (e) => { m1 = +e.target.value; update(); });
    document.getElementById('m2-slide').addEventListener('input', (e) => { m2 = +e.target.value; update(); });
    document.getElementById('r-slide').addEventListener('input', (e) => { r = +e.target.value; update(); });
    
    document.getElementById('m1-complete').addEventListener('click', () => {
      window.App.completeModule('module1', 30);
    });

    startCanvas();
    update();
  }

  function update() {
    document.getElementById('m1-val').textContent = m1 + ' kg';
    document.getElementById('m2-val').textContent = m2 + ' kg';
    document.getElementById('r-val').textContent = r + ' m';

    const s1 = m1 * m2;
    const s2 = r * r;
    const s3 = (s1 / s2).toFixed(2);

    document.getElementById('calc-step1').textContent = s1;
    document.getElementById('calc-step2').textContent = s2;
    document.getElementById('calc-step3').textContent = s3;
    document.getElementById('calc-final').textContent = s3;
  }

  function startCanvas() {
    const canvas = document.getElementById('m1-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    function resize() {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    let t = 0;
    function draw() {
      if (!document.getElementById('m1-canvas')) {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', resize);
        return;
      }
      animId = requestAnimationFrame(draw);
      t += 0.05;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Map values
      const force = (m1 * m2) / (r * r);
      const rad1 = 10 + Math.sqrt(m1) * 3;
      const rad2 = 10 + Math.sqrt(m2) * 3;
      
      // Distance range 1-20 maps to pixel distance
      const maxD = Math.min(canvas.width/2 - 50, 400);
      const pxDist = 60 + (r / 20) * (maxD - 60);

      const x1 = cx - pxDist/2;
      const x2 = cx + pxDist/2;

      // Draw connection line
      ctx.beginPath();
      ctx.moveTo(x1, cy);
      ctx.lineTo(x2, cy);
      ctx.strokeStyle = `rgba(0, 212, 255, ${Math.min(1, force/50)})`;
      ctx.setLineDash([5, 5]);
      ctx.lineWidth = 1 + force/10;
      ctx.stroke();
      ctx.setLineDash([]);

      // Draw force arrows
      if (force > 0.5) {
        const arrowL = Math.min(pxDist/2 - 20, 15 + force*2);
        
        ctx.fillStyle = 'rgba(0, 212, 255, 0.7)';
        ctx.beginPath();
        ctx.moveTo(x1 + rad1 + 10, cy);
        ctx.lineTo(x1 + rad1 + 10 + arrowL, cy - 5);
        ctx.lineTo(x1 + rad1 + 10 + arrowL, cy + 5);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(x2 - rad2 - 10, cy);
        ctx.lineTo(x2 - rad2 - 10 - arrowL, cy - 5);
        ctx.lineTo(x2 - rad2 - 10 - arrowL, cy + 5);
        ctx.fill();
      }

      // Draw m1
      ctx.beginPath();
      ctx.arc(x1, cy, rad1, 0, Math.PI*2);
      ctx.fillStyle = '#6c63ff';
      ctx.shadowColor = '#6c63ff';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 0;
      ctx.font = '10px Orbitron';
      ctx.textAlign = 'center';
      ctx.fillText('m₁', x1, cy - rad1 - 10);

      // Draw m2
      ctx.beginPath();
      ctx.arc(x2, cy, rad2, 0, Math.PI*2);
      ctx.fillStyle = '#00d4ff';
      ctx.shadowColor = '#00d4ff';
      ctx.shadowBlur = 15;
      ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.shadowBlur = 0;
      ctx.fillText('m₂', x2, cy - rad2 - 10);
    }
    draw();
  }

  return { init };
})();
