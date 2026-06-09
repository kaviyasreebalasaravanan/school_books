/* app.js — Core Application: Routing, Teacher AI, XP System
   Anti-Gravity Research Laboratory */

'use strict';

/* ============================================================
   GLOBAL APP OBJECT
   ============================================================ */
const App = (function () {

  /* ---- STATE ---- */
  const state = {
    currentModule: 'intro',
    xp: 0,
    completedModules: new Set(),
    formulasLearned: new Set(),
    isMuted: false,
  };

  /* ---- LEVELS ---- */
  const LEVELS = [
    { xp: 0,   label: '🥉 Junior Scientist',  next: 100 },
    { xp: 100, label: '🥈 Gravity Explorer',   next: 250 },
    { xp: 250, label: '🥇 Space Researcher',   next: 500 },
    { xp: 500, label: '🏆 Anti-Gravity Master',next: Infinity },
  ];

  /* ---- MODULE REGISTRY ---- */
  const MODULES = {
    module1: { label: 'Gravity Formula',  icon: '⚛️',  xp: 30, formulas: ["Newton's Gravitation Law"] },
    module2: { label: 'Planet Simulator', icon: '🪐',  xp: 25, formulas: ['Planetary g values']       },
    module3: { label: 'Zero-G Chamber',   icon: '🌀',  xp: 20, formulas: ['Microgravity / Free Fall'] },
    module4: { label: 'Space Station',    icon: '🛰️', xp: 20, formulas: ['Orbital Mechanics']        },
    module5: { label: 'Anti-Gravity Lab', icon: '⚡',  xp: 15, formulas: ['Theoretical Physics']      },
    module6: { label: 'Maglev Demo',      icon: '🧲',  xp: 25, formulas: ['Magnetic vs Gravity Force'] },
    module7: { label: 'Maglev Train',     icon: '🚄',  xp: 20, formulas: ['EM Propulsion']            },
  };

  /* ---- TEACHER DIALOGUES ---- */
  const TEACHER = {
    intro:        "Welcome, Scientist! I am Dr. Newton, your AI Physics Guide. This is the Anti-Gravity Research Laboratory — a NASA-style facility where we explore the forces shaping the universe! Choose a module from the sidebar to begin your research mission!",
    module1:      "Computing resolution! Newton's Law of Universal Gravitation is now LOADED. Adjust the mass and distance sliders and watch how gravitational force changes instantly. Remember: when distance doubles, force drops by 4 times — that's the inverse square law!",
    module2:      "Planet coordinates scanned! You are about to drop objects on Earth, Moon, Mars, and Jupiter simultaneously. Select your object, press Drop on All Planets, and observe how different gravity values control the fall speed!",
    module3:      "Zero-G Chamber ACTIVATED. This simulates microgravity — the same condition astronauts experience aboard the International Space Station. Important note: objects still have gravity acting on them, but everything is in free fall together. Click anywhere to launch objects!",
    module4:      "Space Station systems ONLINE! You are now aboard an orbital laboratory 400km above Earth. With no air drag and constant free fall, objects float indefinitely. Push the ball and observe Newton's First Law — objects in motion stay in motion!",
    module5:      "Anti-Gravity Research Center INITIALIZED. Alert: True anti-gravity technology does NOT yet exist. However, scientists have achieved weightlessness, magnetic levitation, and advanced propulsion. Let us review the current state of human knowledge!",
    module6:      "Magnetic levitation simulation READY! The levitation formula: Fm greater than Fg means the object rises. Fm less than Fg means it falls. Adjust the magnetic force slider and find the perfect balance point where the object hovers motionless!",
    module7:      "Maglev Train simulator ONLINE! The Shanghai Maglev reaches 431 kilometers per hour with ZERO wheel contact. Start the train and observe how electromagnetic repulsion propels it without any friction from wheels touching a track!",
    challenges:   "Challenge Mode ACTIVATED! These advanced experiments will test everything you have learned. Complete all four challenges to achieve Anti-Gravity Master rank!",
    applications: "Real World Applications LOADED! Hover over each card to discover how gravity, magnetism, and physics shape technology from satellites to medical scanners!",
    dashboard:    "Mission Dashboard ONLINE! Here you can review your XP, completed experiments, formulas unlocked, and progress toward Anti-Gravity Master rank. Keep experimenting!",
  };

  /* ---- HINTS ---- */
  const HINTS = {
    module1: "Hint: Set the distance to 1 meter and push both masses to maximum. You will see how powerful gravity becomes when massive objects are extremely close together!",
    module2: "Hint: Drop a feather on Jupiter! Even the lightest objects fall fast when gravity is 24.79 meters per second squared. Compare its fall time with the Moon!",
    module3: "Hint: Try clicking rapidly to fill the chamber with objects. Notice how they all drift independently — no object pulls another in zero-G!",
    module4: "Hint: Push the ball hard and trace its path. With no air resistance, it will travel forever in a straight line — Newton's First Law of Motion!",
    module5: "Hint: Research the Meissner Effect! When certain materials become superconducting at very low temperatures, they expel magnetic fields and achieve true quantum levitation!",
    module6: "Hint: Try to find the exact slider position where the force balance reads exactly equal. The object will hover with perfect stability at that precise point!",
    module7: "Hint: Calculate the energy savings — at 430 km/h with zero wheel friction, maglev trains use far less energy per kilometer than traditional high-speed rail!",
    default:  "Keep experimenting, Scientist! Every control and slider in this lab reveals a new physics principle. Adventure coordinates are everywhere!",
  };

  /* ============================================================
     INITIALISE
     ============================================================ */
  function init() {
    loadState();
    setupNav();
    setupTeacher();
    updateXP();
    navigateTo('intro');
  }

  /* ============================================================
     STATE PERSISTENCE
     ============================================================ */
  function loadState() {
    try {
      const s = JSON.parse(localStorage.getItem('agLab') || '{}');
      state.xp = s.xp || 0;
      state.completedModules = new Set(s.done || []);
      state.formulasLearned  = new Set(s.formulas || []);
    } catch (_) {}
  }

  function saveState() {
    try {
      localStorage.setItem('agLab', JSON.stringify({
        xp: state.xp,
        done: [...state.completedModules],
        formulas: [...state.formulasLearned],
      }));
    } catch (_) {}
  }

  /* ============================================================
     NAVIGATION
     ============================================================ */
  function setupNav() {
    document.querySelectorAll('.nav-btn').forEach(btn => {
      btn.addEventListener('click', () => navigateTo(btn.dataset.module));
    });
    refreshBadges();
  }

  function navigateTo(id) {
    /* deactivate old module */
    const prevMod = getModuleObj(state.currentModule);
    if (prevMod && prevMod.cleanup) { try { prevMod.cleanup(); } catch(_){} }

    /* update nav active state */
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`[data-module="${id}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    state.currentModule = id;
    const container = document.getElementById('main-content');
    if (!container) return;

    /* render content */
    switch (id) {
      case 'intro':        renderIntro(container);        break;
      case 'module1':      if (window.Module1) window.Module1.init(container); break;
      case 'module2':      if (window.Module2) window.Module2.init(container); break;
      case 'module3':      if (window.Module3) window.Module3.init(container); break;
      case 'module4':      if (window.Module4) window.Module4.init(container); break;
      case 'module5':      if (window.Module5) window.Module5.init(container); break;
      case 'module6':      if (window.Module6) window.Module6.init(container); break;
      case 'module7':      if (window.Module7) window.Module7.init(container); break;
      case 'challenges':   renderChallenges(container);   break;
      case 'applications': renderApplications(container); break;
      case 'dashboard':    renderDashboard(container);    break;
      default:             container.innerHTML = '<div class="module-panel"><p style="color:var(--txt-dim)">Loading...</p></div>';
    }

    /* teacher */
    const speech = TEACHER[id] || TEACHER.intro;
    setDialogue(speech);
    if (!state.isMuted) speak(speech);

    /* scroll top */
    container.scrollTop = 0;
  }

  function getModuleObj(id) {
    return { module1: window.Module1, module2: window.Module2, module3: window.Module3,
             module4: window.Module4, module5: window.Module5, module6: window.Module6,
             module7: window.Module7 }[id];
  }

  /* ============================================================
     TEACHER AI
     ============================================================ */
  function setupTeacher() {
    document.getElementById('btn-speak')?.addEventListener('click', () => {
      const txt = document.getElementById('teacher-dialogue')?.textContent;
      if (txt) speak(txt);
    });

    document.getElementById('btn-hint')?.addEventListener('click', () => {
      const hint = HINTS[state.currentModule] || HINTS.default;
      setDialogue(hint);
      if (!state.isMuted) speak(hint);
    });

    document.getElementById('btn-mute')?.addEventListener('click', () => {
      state.isMuted = !state.isMuted;
      const btn = document.getElementById('btn-mute');
      if (btn) btn.textContent = state.isMuted ? '🔈' : '🔇';
      if (state.isMuted) window.speechSynthesis?.cancel();
    });
  }

  function setDialogue(txt) {
    const el = document.getElementById('teacher-dialogue');
    if (el) el.textContent = txt;
    const panel = document.getElementById('teacher-panel');
    if (panel) {
      panel.classList.add('speaking');
      setTimeout(() => panel.classList.remove('speaking'), 4000);
    }
  }

  function speak(txt) {
    if (state.isMuted || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    /* strip emoji for cleaner TTS */
    const clean = txt.replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
                     .replace(/[⚛️🪐🌀🛰️⚡🧲🚄🏆🌍📊🌌💡🔐🎓🎉✅❌⚗️📐⭐🎯🥉🥈🥇🔬🧪]/g, '');
    const u = new SpeechSynthesisUtterance(clean);
    u.rate = 0.92; u.pitch = 0.88; u.volume = 0.82;
    window.speechSynthesis.speak(u);
  }

  /* ============================================================
     XP & LEVELS
     ============================================================ */
  function getLevel(xp) {
    let lv = LEVELS[0];
    LEVELS.forEach(l => { if (xp >= l.xp) lv = l; });
    return lv;
  }

  function updateXP() {
    const lv = getLevel(state.xp);
    const lvIdx = LEVELS.indexOf(lv);
    const next = LEVELS[lvIdx + 1];
    const pct = next ? ((state.xp - lv.xp) / (next.xp - lv.xp)) * 100 : 100;

    const xpEl  = document.getElementById('sidebar-xp');
    const barEl = document.getElementById('sidebar-xp-bar');
    const lvEl  = document.getElementById('sidebar-level');
    if (xpEl)  xpEl.textContent  = state.xp + ' XP';
    if (barEl) barEl.style.width = Math.min(pct, 100) + '%';
    if (lvEl)  lvEl.textContent  = lv.label;
  }

  function refreshBadges() {
    state.completedModules.forEach(id => {
      const b = document.getElementById('badge-' + id);
      if (b) b.classList.add('done');
    });
  }

  /* ---- PUBLIC: complete a module ---- */
  function completeModule(id, xpReward) {
    if (state.completedModules.has(id)) {
      showToast('✅ Module already complete! Explore more experiments.');
      return;
    }
    state.completedModules.add(id);
    state.xp += xpReward;
    const mod = MODULES[id];
    if (mod?.formulas) mod.formulas.forEach(f => state.formulasLearned.add(f));

    saveState();
    updateXP();
    refreshBadges();
    celebrate(xpReward, mod?.label || id);
  }

  function celebrate(xp, label) {
    const ov  = document.getElementById('celebration-overlay');
    const xpE = document.getElementById('celeb-xp');
    const msg = document.getElementById('celeb-msg');
    if (!ov) return;

    if (xpE) xpE.textContent = '+' + xp + ' XP';
    if (msg) msg.textContent = 'Outstanding work, Scientist! ' + label + ' complete!';
    ov.classList.remove('hidden');

    /* confetti */
    spawnConfetti();

    /* TTS */
    if (!state.isMuted) speak('Experiment complete! You earned ' + xp + ' experience points! Outstanding work, Scientist!');

    document.getElementById('btn-celeb-close')?.addEventListener('click', () => {
      ov.classList.add('hidden');
    }, { once: true });
  }

  function spawnConfetti() {
    const container = document.getElementById('confetti-container');
    if (!container) return;
    container.innerHTML = '';
    const colors = ['#00d4ff','#6c63ff','#ff6b9d','#ffd700','#00ff9f','#ff8c42'];
    for (let i = 0; i < 80; i++) {
      const el = document.createElement('div');
      el.className = 'confetti-piece';
      el.style.cssText = `
        left:${Math.random()*100}%;
        background:${colors[Math.floor(Math.random()*colors.length)]};
        --dur:${1.5+Math.random()*2}s;
        --delay:${Math.random()*0.8}s;
        width:${6+Math.random()*8}px;
        height:${6+Math.random()*8}px;
        border-radius:${Math.random()>0.5?'50%':'2px'};
      `;
      container.appendChild(el);
    }
    setTimeout(() => { container.innerHTML = ''; }, 4000);
  }

  function showToast(msg) {
    const area = document.getElementById('toast-area');
    if (!area) return;
    const t = document.createElement('div');
    t.className = 'toast'; t.textContent = msg;
    area.appendChild(t);
    setTimeout(() => { t.style.opacity = '0'; setTimeout(() => t.remove(), 400); }, 3000);
  }

  /* ============================================================
     RENDER: INTRO
     ============================================================ */
  function renderIntro(container) {
    const modCards = Object.entries(MODULES).map(([id, m]) => `
      <div class="intro-mod-card" onclick="App.navigateTo('${id}')">
        <div class="imc-icon">${m.icon}</div>
        <div class="imc-title">${m.label}</div>
        <div class="imc-xp">+${m.xp} XP</div>
      </div>
    `).join('');

    container.innerHTML = `
      <div class="intro-hero">
        <div class="module-badge" style="font-size:12px;padding:6px 20px;margin-bottom:20px;">🌌 NASA-STYLE ANTI-GRAVITY RESEARCH LABORATORY</div>
        <h1 class="intro-title">Explore the Forces<br>That Shape the Universe</h1>
        <p class="intro-subtitle">Welcome, Scientist! This virtual physics lab lets you manipulate gravity, simulate weightlessness, experiment with magnetic levitation, and push the boundaries of anti-gravity research.</p>

        <div class="intro-mod-grid">${modCards}</div>

        <div class="btn-group" style="justify-content:center;margin-bottom:10px;">
          <button class="btn-primary" onclick="App.navigateTo('module1')">🚀 Start Experiments</button>
          <button class="btn-secondary" onclick="App.navigateTo('dashboard')">📊 My Dashboard</button>
        </div>

        <div class="intro-stats">
          <div class="istat">
            <div class="istat-val" style="color:var(--blue)">${state.completedModules.size}</div>
            <div class="istat-lbl">MODULES DONE</div>
          </div>
          <div class="istat">
            <div class="istat-val" style="color:var(--yellow)">${state.xp}</div>
            <div class="istat-lbl">TOTAL XP</div>
          </div>
          <div class="istat">
            <div class="istat-val" style="color:var(--purple)">${state.formulasLearned.size}</div>
            <div class="istat-lbl">FORMULAS</div>
          </div>
        </div>
      </div>
    `;
  }

  /* ============================================================
     RENDER: CHALLENGES
     ============================================================ */
  function renderChallenges(container) {
    const chs = [
      { icon:'🚀', title:'Rocket Escape Velocity',    desc:'Can you calculate and achieve the minimum speed to escape Earth\'s gravity? Explore Newton\'s formula to find escape velocity!',              diff:'MEDIUM', mod:'module1' },
      { icon:'🧲', title:'Stable Magnetic Levitation', desc:'Balance the magnetic force exactly equal to gravitational force. Hold your object hovering with perfect stability for 5 seconds!',           diff:'HARD',   mod:'module6' },
      { icon:'🌀', title:'Zero-G Navigation',          desc:'Use thruster puffs to move the astronaut from one side of the chamber to the other without touching any walls!',                              diff:'EASY',   mod:'module3' },
      { icon:'🪐', title:'Planetary Gravity Race',     desc:'Drop the same object on all four planets at once. Record each planet\'s fall time and rank them from weakest to strongest gravity!',          diff:'EASY',   mod:'module2' },
    ];
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">🏆 CHALLENGES</div>
          <h1 class="module-title">Scientist Challenges</h1>
          <p class="module-subtitle">Advanced experiments that test everything you've learned. Complete all 4 to become an Anti-Gravity Master!</p>
        </div>
        <div class="challenge-grid mb-32">
          ${chs.map(c => `
            <div class="challenge-card" onclick="App.navigateTo('${c.mod}')">
              <div class="ch-badge">${c.diff}</div>
              <div class="ch-icon">${c.icon}</div>
              <div class="ch-title">${c.title}</div>
              <div class="ch-desc">${c.desc}</div>
              <div style="margin-top:16px;"><button class="btn-secondary" style="font-size:10px;padding:7px 14px;">Launch Challenge →</button></div>
            </div>
          `).join('')}
        </div>
        <div class="glass-card" style="text-align:center;">
          <div style="font-size:40px;margin-bottom:12px;">🏆</div>
          <div style="font-family:var(--font-h);font-size:18px;color:var(--yellow);margin-bottom:8px;">Anti-Gravity Master</div>
          <div style="font-size:13px;color:var(--txt-dim);">Complete all 7 modules to claim this legendary rank!</div>
          <div style="margin-top:16px;font-family:var(--font-h);font-size:24px;color:var(--blue);">${state.completedModules.size}/7</div>
          <div style="font-size:11px;color:var(--txt-mute);">MODULES COMPLETED</div>
        </div>
      </div>`;
  }

  /* ============================================================
     RENDER: REAL-WORLD APPLICATIONS
     ============================================================ */
  function renderApplications(container) {
    const apps = [
      { icon:'🚀', title:'Space Exploration',   desc:'Astronauts experience microgravity — everything orbiting Earth is in constant free fall. The ISS travels at 27,600 km/h to maintain orbit.' },
      { icon:'🛰️', title:'Satellites & GPS',    desc:'GPS satellites use Einstein\'s relativity to correct for time dilation caused by both their speed and reduced gravity at altitude.' },
      { icon:'🚄', title:'Maglev Trains',        desc:'Shanghai\'s maglev reaches 431 km/h with zero wheel contact. Superconductors create the magnetic cushion that lifts 15 tons.' },
      { icon:'🌋', title:'Rocket Science',       desc:'Reaching escape velocity of 11.2 km/s requires fighting Earth\'s gravity well. Every kg of payload needs roughly 50 kg of fuel!' },
      { icon:'🔬', title:'MRI Scanners',         desc:'Magnetic Resonance Imaging uses magnetic fields 60,000× stronger than Earth\'s to image the human body — pure electromagnetic physics.' },
      { icon:'🌍', title:'Planetary Research',   desc:'Mars rovers are designed for 38% Earth gravity. Future human habitats must account for bone loss in low gravity environments.' },
    ];
    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">🌍 REAL-WORLD APPLICATIONS</div>
          <h1 class="module-title">Physics in the Real World</h1>
          <p class="module-subtitle">Hover over each card to see how gravity and electromagnetism shape the technology around us every day.</p>
        </div>
        <div class="flip-grid mb-32">
          ${apps.map(a => `
            <div class="flip-card">
              <div class="flip-inner">
                <div class="flip-front"><div class="flip-icon">${a.icon}</div><div class="flip-title">${a.title}</div></div>
                <div class="flip-back"><div class="flip-desc">${a.desc}</div></div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="glass-card">
          <div class="section-title">📡 Quick Physics Facts</div>
          <div class="grid-3">
            <div style="text-align:center;padding:14px;">
              <div style="font-family:var(--font-h);font-size:26px;color:var(--blue);">9.81</div>
              <div style="font-size:11px;color:var(--txt-mute);">m/s² — Earth gravity</div>
            </div>
            <div style="text-align:center;padding:14px;">
              <div style="font-family:var(--font-h);font-size:26px;color:var(--purple);">431</div>
              <div style="font-size:11px;color:var(--txt-mute);">km/h — Shanghai Maglev</div>
            </div>
            <div style="text-align:center;padding:14px;">
              <div style="font-family:var(--font-h);font-size:26px;color:var(--yellow);">11.2</div>
              <div style="font-size:11px;color:var(--txt-mute);">km/s — escape velocity</div>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ============================================================
     RENDER: DASHBOARD
     ============================================================ */
  function renderDashboard(container) {
    const lv    = getLevel(state.xp);
    const lvIdx = LEVELS.indexOf(lv);
    const next  = LEVELS[lvIdx + 1];
    const pct   = next ? ((state.xp - lv.xp) / (next.xp - lv.xp)) * 100 : 100;
    const allIds = Object.keys(MODULES);

    container.innerHTML = `
      <div class="module-panel">
        <div class="module-header">
          <div class="module-badge">📊 DASHBOARD</div>
          <h1 class="module-title">Mission Dashboard</h1>
          <p class="module-subtitle">Track your science progress, unlocked formulas, and rank advancement.</p>
        </div>

        <div class="dash-stats mb-24">
          <div class="stat-card"><div class="stat-icon">⚗️</div><div class="stat-val">${state.completedModules.size}</div><div class="stat-label">EXPERIMENTS</div></div>
          <div class="stat-card"><div class="stat-icon">📐</div><div class="stat-val">${state.formulasLearned.size}</div><div class="stat-label">FORMULAS</div></div>
          <div class="stat-card"><div class="stat-icon">⭐</div><div class="stat-val">${state.xp}</div><div class="stat-label">TOTAL XP</div></div>
          <div class="stat-card"><div class="stat-icon">🎯</div><div class="stat-val">${Math.round((state.completedModules.size/7)*100)}%</div><div class="stat-label">PROGRESS</div></div>
        </div>

        <div class="level-banner mb-24">
          <div class="lvl-icon">${lv.label.split(' ')[0]}</div>
          <div class="lvl-info">
            <div class="lvl-title">${lv.label}</div>
            <div class="lvl-desc">${next ? 'Next level: ' + next.label + ' at ' + next.xp + ' XP' : 'Maximum rank achieved! Legendary Scientist!'}</div>
            <div class="lvl-bar-wrap"><div class="lvl-bar-fill" style="width:${Math.min(pct,100)}%"></div></div>
          </div>
          <div class="lvl-xp-info">
            <div class="lvl-xp-num">${state.xp} XP</div>
            <div class="lvl-xp-sub">${next ? (next.xp - state.xp) + ' XP to next' : 'MAX RANK'}</div>
          </div>
        </div>

        <div class="grid-2">
          <div>
            <div class="section-title">📋 Module Progress</div>
            <div class="checklist">
              ${allIds.map(id => {
                const done = state.completedModules.has(id);
                const m = MODULES[id];
                return `<div class="cl-item ${done?'done':''}">
                  <div class="cl-ico">${m.icon}</div>
                  <div class="cl-label">${m.label}</div>
                  <div class="cl-status">${done ? '✅ DONE' : '⏳ TODO'}</div>
                </div>`;
              }).join('')}
            </div>
          </div>
          <div>
            <div class="section-title">📐 Formulas Unlocked</div>
            <div class="glass-card mb-24" style="min-height:120px;">
              ${state.formulasLearned.size === 0
                ? '<p style="color:var(--txt-mute);font-size:13px;text-align:center;padding:24px 0;">Complete modules to unlock formulas!</p>'
                : [...state.formulasLearned].map(f => `
                    <div style="display:flex;align-items:center;gap:10px;padding:8px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                      <span style="color:var(--green);">✅</span>
                      <span style="font-size:13px;color:var(--txt);">${f}</span>
                    </div>`).join('')
              }
            </div>

            <div class="section-title">🏅 Scientist Levels</div>
            <div class="glass-card">
              ${LEVELS.map((l, i) => {
                const earned = state.xp >= l.xp;
                return `<div style="display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.05);">
                  <span style="font-size:20px;${!earned?'filter:grayscale(1);opacity:0.3':''}">${l.label.split(' ')[0]}</span>
                  <div style="flex:1;">
                    <div style="font-size:13px;color:${earned?'var(--txt)':'var(--txt-mute)'};">${l.label.substring(2)}</div>
                    <div style="font-size:10px;color:var(--txt-mute);">${l.xp}${LEVELS[i+1]?' – '+(LEVELS[i+1].xp-1):'+' } XP</div>
                  </div>
                  <span style="font-size:${earned?'16px':'12px'};color:${earned?'var(--green)':'var(--txt-mute)'};">${earned?'✓':'LOCKED'}</span>
                </div>`;
              }).join('')}
            </div>

            <div style="margin-top:16px;text-align:center;">
              <button class="btn-secondary"
                onclick="if(confirm('Reset all progress and start fresh?')){localStorage.removeItem('agLab');location.reload();}">
                🔄 Reset Progress
              </button>
            </div>
          </div>
        </div>
      </div>`;
  }

  /* ============================================================
     PUBLIC API
     ============================================================ */
  return { init, navigateTo, completeModule, showToast, speak, getState: () => state };
})();

/* ============================================================
   LOADING SEQUENCE
   ============================================================ */
(function () {
  const bar    = document.getElementById('loading-bar');
  const status = document.getElementById('loading-status');

  const steps = [
    [0,  'Loading Three.js Environment...'],
    [15, 'Initializing Physics Engine...'],
    [30, 'Loading Module Assets...'],
    [50, 'Calibrating Gravity Sensors...'],
    [65, 'Building Planet Database...'],
    [80, 'Activating AI Teacher...'],
    [92, 'Running Final Checks...'],
    [100,'Welcome to Anti-Gravity Lab!'],
  ];
  let i = 0;

  function nextStep() {
    if (i >= steps.length) { setTimeout(launch, 500); return; }
    const [pct, msg] = steps[i++];
    if (bar)    bar.style.width = pct + '%';
    if (status) status.textContent = msg;
    setTimeout(nextStep, 300 + Math.random() * 350);
  }

  function launch() {
    /* start Three.js */
    if (window.ThreeScene) { try { window.ThreeScene.init(); } catch (e) {} }

    /* hide loader */
    const loader = document.getElementById('loading-screen');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        const app = document.getElementById('app');
        if (app) app.classList.remove('hidden');
        App.init();
      }, 800);
    }
  }

  setTimeout(nextStep, 200);
})();
