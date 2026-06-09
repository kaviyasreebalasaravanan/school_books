/* module5-antigravity.js — Anti-Gravity Research Center */
window.Module5 = (function() {
  'use strict';

  function init(container) {
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge" style="border-color:var(--pink);color:var(--pink);">MODULE 5</div>
          <h1 class="module-title">Anti-Gravity Research Center</h1>
          <p class="module-subtitle">"Anti-gravity" refers to creating a place or object that is free from the force of gravity. Is it real? Let's review the current status of human scientific achievement.</p>
        </div>

        <div class="grid-2 mb-24">
          <div class="glass-card">
            <div class="section-title">Current Scientific Consensus</div>
            <div class="status-list mt-16">
              <div class="status-row yes">
                <div class="status-ico">✅</div>
                <div class="status-txt">Gravity exists (Newton/Einstein)</div>
                <div class="status-chip">PROVEN</div>
              </div>
              <div class="status-row yes">
                <div class="status-ico">✅</div>
                <div class="status-txt">Weightlessness (Free-fall)</div>
                <div class="status-chip">ACHIEVED</div>
              </div>
              <div class="status-row yes">
                <div class="status-ico">✅</div>
                <div class="status-txt">Magnetic Levitation (Maglev)</div>
                <div class="status-chip">ACHIEVED</div>
              </div>
              <div class="status-row yes">
                <div class="status-ico">✅</div>
                <div class="status-txt">Aerodynamic Lift (Airplanes)</div>
                <div class="status-chip">ACHIEVED</div>
              </div>
              <div class="status-row no" style="margin-top:10px;">
                <div class="status-ico">❌</div>
                <div class="status-txt" style="color:var(--pink);font-weight:700;">True Anti-Gravity Shielding</div>
                <div class="status-chip">IMPOSSIBLE (CURRENTLY)</div>
              </div>
            </div>
          </div>

          <div class="glass-card" style="display:flex;flex-direction:column;">
            <div class="section-title">Research Terminal</div>
            <p style="font-size:12px;color:var(--txt-dim);margin-bottom:12px;">Accessing theoretical physics database...</p>
            <div class="terminal" id="ag-terminal" style="flex:1;">
              <div class="t-line">> INIT RESEARCH QUERY...</div>
              <div class="t-line" style="animation-delay:0.5s;">> SEARCHING: "Anti-Gravity"</div>
              <div class="t-line" style="animation-delay:1.5s;color:var(--pink);">> WARNING: No verified anti-gravity particles (gravitons) found.</div>
              <div class="t-line" style="animation-delay:2.5s;">> ALTERNATIVE FOUND: Quantum Levitation via Meissner Effect.</div>
              <div class="t-line" style="animation-delay:3.5s;">> ALTERNATIVE FOUND: Electromagnetic propulsion.</div>
              <div class="t-line" style="animation-delay:4.5s;color:var(--blue);">> CONCLUSION: We cannot turn off gravity. We must overpower it.</div>
              <div style="animation-delay:5.5s;opacity:0;animation:type-in 0.1s forwards 5.5s;">> <span class="cursor"></span></div>
            </div>
          </div>
        </div>

        <div class="section-title">Theoretical Approaches</div>
        <div class="grid-3 mb-24">
          <div class="conn-card">
            <div class="conn-label">GENERAL RELATIVITY</div>
            <div style="font-size:12px;color:var(--txt-dim);">Einstein showed gravity is the bending of spacetime. To create anti-gravity, we would need "negative mass" to bend spacetime backwards. Negative mass has never been found.</div>
          </div>
          <div class="conn-card">
            <div class="conn-label">QUANTUM MECHANICS</div>
            <div style="font-size:12px;color:var(--txt-dim);">Scientists theorize a particle called the "graviton" carries gravitational force. If we could block or reflect gravitons, we might create an anti-gravity shield.</div>
          </div>
          <div class="conn-card">
            <div class="conn-label">ELECTROMAGNETISM</div>
            <div style="font-size:12px;color:var(--txt-dim);">The only proven way to defeat gravity is by using a stronger force. Electromagnetism is 10^36 times stronger than gravity! (See Module 6)</div>
          </div>
        </div>

        <div style="text-align:center;">
          <button class="btn-primary" id="m5-complete">Acknowledge Research Data →</button>
        </div>
      </div>
    `;

    document.getElementById('m5-complete').addEventListener('click', () => {
      window.App.completeModule('module5', 15);
      window.App.navigateTo('module6'); // auto transition to maglev
    });
  }

  return { init };
})();
