/**
 * Developer Zone - Core Application Logic
 * Supports Single-File & Multi-File (ES Modules, Virtual File System, In-browser Bundling)
 */

(function () {
  'use strict';

  // ---------------------------------------------------------------------------
  // Starter Templates
  // ---------------------------------------------------------------------------
  const TEMPLATES = {
    'single-canvas': [
      {
        id: 'f-index',
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Interactive Particle Network</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      background: radial-gradient(circle at center, #111827 0%, #030712 100%);
      height: 100vh;
      overflow: hidden;
      font-family: system-ui, sans-serif;
      color: #94a3b8;
    }
    canvas { display: block; width: 100%; height: 100%; cursor: crosshair; }
    .hud {
      position: absolute;
      top: 20px;
      left: 20px;
      pointer-events: none;
      background: rgba(15, 23, 42, 0.75);
      padding: 12px 18px;
      border-radius: 8px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(8px);
    }
    .hud h1 { font-size: 15px; color: #38bdf8; margin-bottom: 4px; }
    .hud p { font-size: 12px; }
  </style>
</head>
<body>
  <div class="hud">
    <h1>Single-File Concept: Particle Network</h1>
    <p>Move mouse or touch to attract particles. Click or tap to burst.</p>
  </div>
  <canvas id="canvas"></canvas>

  <script>
    console.log("Initializing Canvas Particle Simulation...");
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    const particles = [];
    const mouse = { x: null, y: null, radius: 120 };

    function resize() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
        for (let i = 0; i < 25; i++) {
          particles.push(new Particle(mouse.x, mouse.y, true));
        }
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      mouse.x = null;
      mouse.y = null;
    });

    window.addEventListener('click', () => {
      console.log("Particle shockwave triggered at:", mouse.x, mouse.y);
      for (let i = 0; i < 25; i++) {
        particles.push(new Particle(mouse.x, mouse.y, true));
      }
    });

    class Particle {
      constructor(x, y, burst = false) {
        this.x = x ?? Math.random() * width;
        this.y = y ?? Math.random() * height;
        const speed = burst ? Math.random() * 6 + 2 : Math.random() * 1.5 + 0.3;
        const angle = Math.random() * Math.PI * 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.size = burst ? Math.random() * 3 + 1 : Math.random() * 2 + 1.2;
        this.life = burst ? 80 : Infinity;
        this.color = burst ? '#f43f5e' : '#38bdf8';
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.life !== Infinity) this.life--;

        // Bounce
        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;

        // Mouse attraction
        if (mouse.x !== null) {
          const dx = mouse.x - this.x;
          const dy = mouse.y - this.y;
          const dist = Math.hypot(dx, dy);
          if (dist < mouse.radius) {
            this.x += dx * 0.02;
            this.y += dy * 0.02;
          }
        }
      }

      draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize 80 particles
    for (let i = 0; i < 80; i++) particles.push(new Particle());

    function connect() {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
          if (dist < 90) {
            ctx.strokeStyle = \`rgba(56, 189, 248, \${1 - dist / 90})\`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    }

    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.life <= 0) particles.splice(i, 1);
      }
      connect();
      requestAnimationFrame(animate);
    }

    animate();
    console.log("Particle animation running with 80 nodes.");
  </script>
</body>
</html>`
      }
    ],

    'multifile-kanban': [
      {
        id: 'f-index',
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Modular Kanban App</title>
  <!-- Multi-file virtual CSS link -->
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <div class="app-shell">
    <header class="header">
      <div class="logo">⚡ TaskFlow <span>(ES Modules)</span></div>
      <div class="new-task-bar">
        <input type="text" id="taskInput" placeholder="What needs to be done?"/>
        <button id="addBtn">Add Task</button>
      </div>
    </header>

    <main class="board">
      <div class="column" id="col-todo">
        <div class="column-header">To Do <span class="counter" id="count-todo">0</span></div>
        <div class="task-list" data-status="todo"></div>
      </div>
      <div class="column" id="col-progress">
        <div class="column-header">In Progress <span class="counter" id="count-progress">0</span></div>
        <div class="task-list" data-status="progress"></div>
      </div>
      <div class="column" id="col-done">
        <div class="column-header">Completed <span class="counter" id="count-done">0</span></div>
        <div class="task-list" data-status="done"></div>
      </div>
    </main>
  </div>

  <!-- Multi-file ES Module entry point -->
  <script type="module" src="app.js"></script>
</body>
</html>`
      },
      {
        id: 'f-css',
        name: 'style.css',
        type: 'css',
        content: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
body {
  background: #0f172a;
  color: #e2e8f0;
  min-height: 100vh;
  padding: 24px;
}
.app-shell { max-width: 900px; margin: 0 auto; }
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 16px;
}
.logo { font-size: 20px; font-weight: 700; color: #38bdf8; }
.logo span { font-size: 13px; color: #94a3b8; font-weight: normal; }
.new-task-bar { display: flex; gap: 8px; }
.new-task-bar input {
  background: #1e293b;
  border: 1px solid #334155;
  color: #fff;
  padding: 8px 14px;
  border-radius: 6px;
  outline: none;
  width: 260px;
}
.new-task-bar input:focus { border-color: #38bdf8; }
.new-task-bar button {
  background: #0284c7;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}
.board {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.column {
  background: #1e293b;
  border-radius: 8px;
  padding: 16px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}
.column-header {
  font-weight: 600;
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.counter {
  background: #334155;
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
}
.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  flex: 1;
}
.task-card {
  background: #0f172a;
  border: 1px solid #334155;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.15s ease, border-color 0.15s ease;
}
.task-card:hover { transform: translateY(-2px); border-color: #38bdf8; }
.task-title { font-size: 13px; color: #f8fafc; word-break: break-word; }
.task-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 11px;
}
.move-btn {
  background: #334155;
  color: #94a3b8;
  border: none;
  padding: 3px 8px;
  border-radius: 4px;
  cursor: pointer;
}
.move-btn:hover { background: #475569; color: #fff; }`
      },
      {
        id: 'f-store',
        name: 'store.js',
        type: 'js',
        content: `/**
 * Modular State Store for Kanban
 */
export class TaskStore {
  constructor() {
    this.tasks = [
      { id: 1, text: "Design UI Architecture", status: "done" },
      { id: 2, text: "Implement ES Module virtual import maps", status: "progress" },
      { id: 3, text: "Write unit tests for state persistence", status: "todo" }
    ];
    this.listeners = [];
  }

  getTasksByStatus(status) {
    return this.tasks.filter(t => t.status === status);
  }

  addTask(text) {
    if (!text.trim()) return;
    const newTask = {
      id: Date.now(),
      text,
      status: "todo"
    };
    this.tasks.push(newTask);
    this.notify();
    return newTask;
  }

  nextStatus(id) {
    const task = this.tasks.find(t => t.id === id);
    if (!task) return;
    if (task.status === "todo") task.status = "progress";
    else if (task.status === "progress") task.status = "done";
    else if (task.status === "done") {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
    this.notify();
  }

  subscribe(callback) {
    this.listeners.push(callback);
    callback(this.tasks);
  }

  notify() {
    this.listeners.forEach(cb => cb(this.tasks));
  }
}`
      },
      {
        id: 'f-app',
        name: 'app.js',
        type: 'js',
        content: `// Import from virtual store.js module
import { TaskStore } from './store.js';

console.log("Starting Kanban application with ES Modules...");

const store = new TaskStore();
const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');

function render() {
  ['todo', 'progress', 'done'].forEach(status => {
    const listEl = document.querySelector(\`.task-list[data-status="\${status}"]\`);
    const countEl = document.getElementById(\`count-\${status}\`);
    const tasks = store.getTasksByStatus(status);

    countEl.textContent = tasks.length;
    listEl.innerHTML = '';

    tasks.forEach(task => {
      const card = document.createElement('div');
      card.className = 'task-card';

      const nextAction = status === 'todo' ? 'Start' : (status === 'progress' ? 'Complete' : 'Archive');

      card.innerHTML = \`
        <div class="task-title">\${escapeHtml(task.text)}</div>
        <div class="task-footer">
          <span style="color:#64748b">#\${task.id.toString().slice(-4)}</span>
          <button class="move-btn" data-id="\${task.id}">\${nextAction} →</button>
        </div>
      \`;

      card.querySelector('button').addEventListener('click', () => {
        console.log(\`Transitioning task \${task.id} from status "\${status}"\`);
        store.nextStatus(task.id);
      });

      listEl.appendChild(card);
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function handleAdd() {
  const text = input.value.trim();
  if (text) {
    console.log("New task created:", text);
    store.addTask(text);
    input.value = '';
    input.focus();
  }
}

addBtn.addEventListener('click', handleAdd);
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') handleAdd();
});

store.subscribe(() => {
  render();
});
`
      }
    ],

    'glass-card': [
      {
        id: 'f-index',
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>3D Glass Card</title>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <div class="scene">
    <div class="card" id="tiltCard">
      <div class="card-glow"></div>
      <div class="card-content">
        <span class="chip">UI EXPERIMENT</span>
        <h2>Quantum Shield</h2>
        <p>Dynamic 3D perspective projection with real-time specular lighting calculation.</p>
        <div class="stats">
          <div><label>FREQUENCY</label><strong>4.2 GHz</strong></div>
          <div><label>EFFICIENCY</label><strong>99.8%</strong></div>
        </div>
        <button class="btn" id="pingBtn">Send Pulse</button>
      </div>
    </div>
  </div>

  <script src="tilt.js"></script>
</body>
</html>`
      },
      {
        id: 'f-css',
        name: 'style.css',
        type: 'css',
        content: `* { box-sizing: border-box; margin: 0; padding: 0; font-family: system-ui, sans-serif; }
body {
  background: #090d16;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1000px;
  overflow: hidden;
}
.scene {
  transform-style: preserve-3d;
}
.card {
  width: 320px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 30px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(16px);
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  transform-style: preserve-3d;
  transition: transform 0.1s ease-out;
  cursor: pointer;
}
.card-glow {
  position: absolute;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(56, 189, 248, 0.35) 0%, transparent 70%);
  top: 0;
  left: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition: opacity 0.3s;
}
.chip {
  background: rgba(56, 189, 248, 0.15);
  color: #38bdf8;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1px;
  padding: 4px 10px;
  border-radius: 20px;
  border: 1px solid rgba(56, 189, 248, 0.3);
}
.card-content h2 {
  color: #fff;
  margin: 18px 0 8px;
  font-size: 22px;
}
.card-content p {
  color: #94a3b8;
  font-size: 13px;
  line-height: 1.6;
  margin-bottom: 24px;
}
.stats {
  display: flex;
  justify-content: space-between;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 16px;
  margin-bottom: 20px;
}
.stats label {
  display: block;
  font-size: 10px;
  color: #64748b;
  margin-bottom: 4px;
}
.stats strong {
  color: #e2e8f0;
  font-size: 14px;
}
.btn {
  width: 100%;
  padding: 10px;
  background: #38bdf8;
  color: #04101e;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
}
.btn:hover { background: #7dd3fc; }`
      },
      {
        id: 'f-js',
        name: 'tilt.js',
        type: 'js',
        content: `const card = document.getElementById('tiltCard');
const glow = document.querySelector('.card-glow');
const btn = document.getElementById('pingBtn');

console.log("3D Tilt Card interactive initialized.");

function handleMove(clientX, clientY) {
  const rect = card.getBoundingClientRect();
  const cardCenterX = rect.left + rect.width / 2;
  const cardCenterY = rect.top + rect.height / 2;

  const mouseX = clientX - cardCenterX;
  const mouseY = clientY - cardCenterY;

  const rotateX = (-mouseY / (rect.height / 2)) * 18;
  const rotateY = (mouseX / (rect.width / 2)) * 18;

  card.style.transform = \`rotateX(\${rotateX}deg) rotateY(\${rotateY}deg)\`;

  // Glow position relative to card
  glow.style.left = \`\${clientX - rect.left}px\`;
  glow.style.top = \`\${clientY - rect.top}px\`;
}

window.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));

window.addEventListener('touchmove', (e) => {
  if (e.touches.length > 0) {
    handleMove(e.touches[0].clientX, e.touches[0].clientY);
  }
}, { passive: true });

window.addEventListener('mouseleave', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

window.addEventListener('touchend', () => {
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

btn.addEventListener('click', (e) => {
  e.stopPropagation();
  console.log("Pulse beacon emitted!");
  card.style.borderColor = '#38bdf8';
  setTimeout(() => {
    card.style.borderColor = 'rgba(255, 255, 255, 0.12)';
  }, 400);
});`
      }
    ],

    'blank-multifile': [
      {
        id: 'f-index',
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>My Concept</title>
  <link rel="stylesheet" href="style.css"/>
</head>
<body>
  <h1>Hello from Developer Zone!</h1>
  <p>Start editing this project to see live updates.</p>
  <button id="demoBtn">Click Me</button>

  <script src="script.js"></script>
</body>
</html>`
      },
      {
        id: 'f-css',
        name: 'style.css',
        type: 'css',
        content: `body {
  font-family: system-ui, sans-serif;
  padding: 30px;
  background-color: #f8fafc;
  color: #1e293b;
}
h1 { color: #0284c7; }
button {
  margin-top: 15px;
  padding: 8px 16px;
  background: #0284c7;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}`
      },
      {
        id: 'f-js',
        name: 'script.js',
        type: 'js',
        content: `console.log("Concept loaded!");
document.getElementById('demoBtn').addEventListener('click', () => {
  console.log("Button clicked at:", new Date().toLocaleTimeString());
  alert("Hello from script.js!");
});`
      }
    ],

    'blank-single': [
      {
        id: 'f-index',
        name: 'index.html',
        type: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Single-File Concept</title>
  <style>
    body {
      font-family: sans-serif;
      padding: 40px;
      text-align: center;
      background: #111;
      color: #eee;
    }
    .box {
      display: inline-block;
      padding: 20px 40px;
      border: 2px solid #38bdf8;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="box">
    <h2>Single File Concept</h2>
    <p>Everything in one file: HTML, &lt;style&gt;, and &lt;script&gt;.</p>
  </div>

  <script>
    console.log("Single file concept running!");
  </script>
</body>
</html>`
      }
    ]
  };

  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  let state = {
    files: [],
    activeFileId: null,
    openTabIds: [],
    autoRun: true,
    theme: 'theme-dark',
    logCount: 0,
    mobileActiveView: 'editor'
  };

  let runDebounceTimer = null;
  let activeBlobUrls = [];
  let cmEditor = null;

  function isMobileViewport() {
    const isSmallWidth = window.innerWidth <= 768;
    const isLandscapePhone = window.innerHeight <= 550 && window.innerWidth > window.innerHeight;
    const isUltraShort = window.innerHeight <= 500;
    const isTouchUA = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    return isSmallWidth || isLandscapePhone || isUltraShort || (isTouchUA && window.innerWidth <= 1024);
  }

  function getCodeMirrorMode(fileType) {
    switch (fileType) {
      case 'html': return 'htmlmixed';
      case 'css': return 'css';
      case 'js': return 'javascript';
      case 'json': return { name: 'javascript', json: true };
      default: return 'text/plain';
    }
  }

  function getCodeMirrorTheme(theme) {
    return theme === 'theme-light' ? 'eclipse' : 'dracula';
  }

  // ---------------------------------------------------------------------------
  // DOM Elements
  // ---------------------------------------------------------------------------
  const els = {
    appContainer: document.getElementById('app'),
    themeColorMeta: document.getElementById('themeColorMeta'),
    fileList: document.getElementById('fileList'),
    tabsBar: document.getElementById('tabsBar'),
    codeEditor: document.getElementById('codeEditor'),
    lineNumbers: document.getElementById('lineNumbers'),
    cursorPos: document.getElementById('cursorPos'),
    previewFrame: document.getElementById('previewFrame'),
    runBtn: document.getElementById('runBtn'),
    autoRunCheckbox: document.getElementById('autoRunCheckbox'),
    formatBtn: document.getElementById('formatBtn'),
    resetBtn: document.getElementById('resetBtn'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    templateSelect: document.getElementById('templateSelect'),
    newFileBtn: document.getElementById('newFileBtn'),
    fileModal: document.getElementById('fileModal'),
    newFileName: document.getElementById('newFileName'),
    confirmFileBtn: document.getElementById('confirmFileBtn'),
    cancelFileBtn: document.getElementById('cancelFileBtn'),
    closeModalBtn: document.getElementById('closeModalBtn'),
    exportMenuBtn: document.getElementById('exportMenuBtn'),
    exportDropdown: document.getElementById('exportDropdown'),
    exportSingleHtmlBtn: document.getElementById('exportSingleHtmlBtn'),
    exportZipBtn: document.getElementById('exportZipBtn'),
    copyBundleBtn: document.getElementById('copyBundleBtn'),
    clearConsoleBtn: document.getElementById('clearConsoleBtn'),
    toggleConsoleBtn: document.getElementById('toggleConsoleBtn'),
    consoleDrawer: document.getElementById('consoleDrawer'),
    consoleLogs: document.getElementById('consoleLogs'),
    consoleToggleIcon: document.getElementById('consoleToggleIcon'),
    logCount: document.getElementById('logCount'),
    runtimeErrorBanner: document.getElementById('runtimeErrorBanner'),
    mainSplitter: document.getElementById('mainSplitter'),
    consoleSplitter: document.getElementById('consoleSplitter'),
    editorPane: document.getElementById('editorPane'),
    fileExplorer: document.getElementById('fileExplorer'),
    collapseExplorerBtn: document.getElementById('collapseExplorerBtn'),
    expandExplorerBtn: document.getElementById('expandExplorerBtn'),
    refreshPreviewBtn: document.getElementById('refreshPreviewBtn'),
    openNewTabBtn: document.getElementById('openNewTabBtn'),
    modeBadge: document.getElementById('modeBadge'),
    toast: document.getElementById('toast'),
    // Mobile Navigation & Drawer Elements
    mobileNavBar: document.getElementById('mobileNavBar'),
    mobileNavBtns: document.querySelectorAll('.mobile-nav-btn'),
    mobileRunNavBtn: document.getElementById('mobileRunNavBtn'),
    mobileThemeNavBtn: document.getElementById('mobileThemeNavBtn'),
    mobileMenuBtn: document.getElementById('mobileMenuBtn'),
    mobileDrawerBackdrop: document.getElementById('mobileDrawerBackdrop'),
    mobileDrawer: document.getElementById('mobileDrawer'),
    closeMobileDrawerBtn: document.getElementById('closeMobileDrawerBtn'),
    mobileTemplateSelect: document.getElementById('mobileTemplateSelect'),
    mobileAutoRunCheckbox: document.getElementById('mobileAutoRunCheckbox'),
    mobileFormatBtn: document.getElementById('mobileFormatBtn'),
    mobileNewTabBtn: document.getElementById('mobileNewTabBtn'),
    mobileExportSingleHtmlBtn: document.getElementById('mobileExportSingleHtmlBtn'),
    mobileExportZipBtn: document.getElementById('mobileExportZipBtn'),
    mobileCopyBundleBtn: document.getElementById('mobileCopyBundleBtn'),
    mobileResetBtn: document.getElementById('mobileResetBtn'),
    mobileConsoleBadge: document.getElementById('mobileConsoleBadge'),
    // PWA & Installation Elements
    installAppBtn: document.getElementById('installAppBtn'),
    mobileInstallAppBtn: document.getElementById('mobileInstallAppBtn'),
    mobilePwaSection: document.getElementById('mobilePwaSection'),
    installModal: document.getElementById('installModal'),
    closeInstallModalBtn: document.getElementById('closeInstallModalBtn'),
    cancelInstallModalBtn: document.getElementById('cancelInstallModalBtn'),
    modalNativeInstallBtn: document.getElementById('modalNativeInstallBtn'),
    pwaInstructionsBox: document.getElementById('pwaInstructionsBox'),
    // Developer Tools (Regex & Cron)
    devToolsMenuBtn: document.getElementById('devToolsMenuBtn'),
    devToolsDropdown: document.getElementById('devToolsDropdown'),
    navOpenRegexBtn: document.getElementById('navOpenRegexBtn'),
    navOpenCronBtn: document.getElementById('navOpenCronBtn'),
    mobileRegexBtn: document.getElementById('mobileRegexBtn'),
    mobileCronBtn: document.getElementById('mobileCronBtn'),
    devToolsModal: document.getElementById('devToolsModal'),
    closeDevToolsModalBtn: document.getElementById('closeDevToolsModalBtn'),
    tabRegexBtn: document.getElementById('tabRegexBtn'),
    tabCronBtn: document.getElementById('tabCronBtn'),
    regexPane: document.getElementById('regexPane'),
    cronPane: document.getElementById('cronPane'),
    // RegEx Elements
    regexPresetSelect: document.getElementById('regexPresetSelect'),
    regexPatternInput: document.getElementById('regexPatternInput'),
    regexFlagsBadge: document.getElementById('regexFlagsBadge'),
    flagG: document.getElementById('flagG'),
    flagI: document.getElementById('flagI'),
    flagM: document.getElementById('flagM'),
    flagS: document.getElementById('flagS'),
    flagU: document.getElementById('flagU'),
    regexErrorAlert: document.getElementById('regexErrorAlert'),
    regexTestInput: document.getElementById('regexTestInput'),
    regexHighlightBox: document.getElementById('regexHighlightBox'),
    regexClearTestBtn: document.getElementById('regexClearTestBtn'),
    regexMatchCountBadge: document.getElementById('regexMatchCountBadge'),
    regexMatchTableBody: document.getElementById('regexMatchTableBody'),
    regexReplaceInput: document.getElementById('regexReplaceInput'),
    regexReplaceOutput: document.getElementById('regexReplaceOutput'),
    regexCopyReplacedBtn: document.getElementById('regexCopyReplacedBtn'),
    // Cron Elements
    cronPresetSelect: document.getElementById('cronPresetSelect'),
    cronExpressionInput: document.getElementById('cronExpressionInput'),
    cronErrorAlert: document.getElementById('cronErrorAlert'),
    cronHumanText: document.getElementById('cronHumanText'),
    cronFieldMinute: document.getElementById('cronFieldMinute'),
    cronFieldDescMinute: document.getElementById('cronFieldDescMinute'),
    cronFieldHour: document.getElementById('cronFieldHour'),
    cronFieldDescHour: document.getElementById('cronFieldDescHour'),
    cronFieldDom: document.getElementById('cronFieldDom'),
    cronFieldDescDom: document.getElementById('cronFieldDescDom'),
    cronFieldMonth: document.getElementById('cronFieldMonth'),
    cronFieldDescMonth: document.getElementById('cronFieldDescMonth'),
    cronFieldDow: document.getElementById('cronFieldDow'),
    cronFieldDescDow: document.getElementById('cronFieldDescDow'),
    cronNextRunsList: document.getElementById('cronNextRunsList')
  };

  // ---------------------------------------------------------------------------
  // Persistence Helpers
  // ---------------------------------------------------------------------------
  const STORAGE_KEY = 'ag_developer_zone_state';
  const LEGACY_STORAGE_KEY = 'ag_web_playground_state';

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        files: state.files,
        activeFileId: state.activeFileId,
        openTabIds: state.openTabIds,
        autoRun: state.autoRun,
        theme: state.theme
      }));
    } catch (e) {
      console.warn("Could not save state to localStorage:", e);
    }
  }

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.files && parsed.files.length > 0) {
          state.files = parsed.files;
          state.activeFileId = parsed.activeFileId || parsed.files[0].id;
          state.openTabIds = parsed.openTabIds || [state.activeFileId];
          state.autoRun = parsed.autoRun ?? true;
          state.theme = parsed.theme || 'theme-dark';
          return true;
        }
      }
    } catch (e) {
      console.warn("Could not load state:", e);
    }
    return false;
  }

  // ---------------------------------------------------------------------------
  // File System Operations
  // ---------------------------------------------------------------------------
  function getFileType(fileName) {
    if (fileName.endsWith('.html') || fileName.endsWith('.htm')) return 'html';
    if (fileName.endsWith('.css')) return 'css';
    if (fileName.endsWith('.js') || fileName.endsWith('.mjs')) return 'js';
    if (fileName.endsWith('.json')) return 'json';
    return 'other';
  }

  function getActiveFile() {
    return state.files.find(f => f.id === state.activeFileId) || state.files[0];
  }

  function setFileContent(fileId, content) {
    const file = state.files.find(f => f.id === fileId);
    if (file) {
      file.content = content;
      saveState();
      if (state.autoRun) {
        scheduleRun();
      }
    }
  }

  function openFile(fileId) {
    const file = state.files.find(f => f.id === fileId);
    if (!file) return;

    state.activeFileId = fileId;
    if (!state.openTabIds.includes(fileId)) {
      state.openTabIds.push(fileId);
    }

    renderFileTree();
    renderTabs();
    syncEditorContent();
    saveState();

    // On mobile / landscape, auto-switch to editor view upon opening file
    if (isMobileViewport()) {
      setMobileView('editor');
    }
  }

  function closeTab(fileId, e) {
    if (e) e.stopPropagation();
    state.openTabIds = state.openTabIds.filter(id => id !== fileId);

    if (state.activeFileId === fileId) {
      state.activeFileId = state.openTabIds.length > 0 
        ? state.openTabIds[state.openTabIds.length - 1] 
        : (state.files[0] ? state.files[0].id : null);
    }

    renderTabs();
    renderFileTree();
    syncEditorContent();
    saveState();
  }

  function createFile(name) {
    name = name.trim();
    if (!name) return showToast('File name cannot be empty');

    const exists = state.files.some(f => f.name.toLowerCase() === name.toLowerCase());
    if (exists) return showToast(`File "${name}" already exists`);

    const id = 'f-' + Date.now();
    const type = getFileType(name);
    let defaultContent = '';
    if (type === 'html') defaultContent = '<!DOCTYPE html>\n<html>\n<head>\n  <meta charset="UTF-8"/>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>\n  <title>New Page</title>\n</head>\n<body>\n  \n</body>\n</html>';
    else if (type === 'css') defaultContent = '/* New Styles */\n';
    else if (type === 'js') defaultContent = '// New Module\n';

    const newFile = { id, name, type, content: defaultContent };
    state.files.push(newFile);
    openFile(id);
    updateModeBadge();
    showToast(`Created ${name}`);
  }

  function deleteFile(fileId, e) {
    if (e) e.stopPropagation();
    const file = state.files.find(f => f.id === fileId);
    if (!file) return;

    if (state.files.length <= 1) {
      return showToast('Cannot delete the only file.');
    }

    if (!confirm(`Are you sure you want to delete "${file.name}"?`)) return;

    state.files = state.files.filter(f => f.id !== fileId);
    state.openTabIds = state.openTabIds.filter(id => id !== fileId);

    if (state.activeFileId === fileId) {
      state.activeFileId = state.files[0].id;
      if (!state.openTabIds.includes(state.activeFileId)) {
        state.openTabIds.push(state.activeFileId);
      }
    }

    renderFileTree();
    renderTabs();
    syncEditorContent();
    saveState();
    updateModeBadge();
    runCode();
    showToast(`Deleted ${file.name}`);
  }

  function updateModeBadge() {
    const isSingle = state.files.length === 1;
    els.modeBadge.textContent = isSingle ? 'Single-File' : 'Multi-File';
  }

  // ---------------------------------------------------------------------------
  // Rendering UI
  // ---------------------------------------------------------------------------
  function renderFileTree() {
    els.fileList.innerHTML = '';
    state.files.forEach(file => {
      const item = document.createElement('div');
      item.className = `file-item ${file.id === state.activeFileId ? 'active' : ''}`;
      item.innerHTML = `
        <div class="file-item-left">
          <span class="file-icon ${file.type}">${file.type.toUpperCase()}</span>
          <span class="file-name">${escapeHtml(file.name)}</span>
        </div>
        <div class="file-item-actions">
          <button class="file-action-btn delete-file" title="Delete file">✕</button>
        </div>
      `;

      item.addEventListener('click', () => openFile(file.id));
      const delBtn = item.querySelector('.delete-file');
      delBtn.addEventListener('click', (e) => deleteFile(file.id, e));

      els.fileList.appendChild(item);
    });
  }

  function renderTabs() {
    els.tabsBar.innerHTML = '';
    state.openTabIds.forEach(id => {
      const file = state.files.find(f => f.id === id);
      if (!file) return;

      const tab = document.createElement('div');
      tab.className = `tab ${file.id === state.activeFileId ? 'active' : ''}`;
      tab.innerHTML = `
        <span class="file-icon ${file.type}">${file.type.toUpperCase()}</span>
        <span>${escapeHtml(file.name)}</span>
        <span class="tab-close" title="Close Tab">&times;</span>
      `;

      tab.addEventListener('click', () => openFile(file.id));
      tab.querySelector('.tab-close').addEventListener('click', (e) => closeTab(file.id, e));

      els.tabsBar.appendChild(tab);
    });
  }

  function initCodeMirror() {
    if (typeof CodeMirror === 'undefined') {
      console.warn("CodeMirror not loaded; falling back to basic textarea editor.");
      return;
    }

    const wrapper = document.querySelector('.editor-wrapper');
    if (wrapper) wrapper.classList.add('has-codemirror');

    const activeFile = getActiveFile();
    const mode = activeFile ? getCodeMirrorMode(activeFile.type) : 'htmlmixed';
    const theme = getCodeMirrorTheme(state.theme);

    const isMobile = isMobileViewport();

    cmEditor = CodeMirror.fromTextArea(els.codeEditor, {
      mode: mode,
      theme: theme,
      lineNumbers: true,
      lineWrapping: isMobile,
      inputStyle: isMobile ? 'contenteditable' : 'textarea',
      tabSize: 2,
      indentUnit: 2,
      autoCloseBrackets: true,
      autoCloseTags: true,
      styleActiveLine: true,
      extraKeys: {
        'Ctrl-Enter': () => { runCode(); showToast('Code executed!'); },
        'Cmd-Enter': () => { runCode(); showToast('Code executed!'); },
        'Ctrl-S': () => { saveState(); runCode(); showToast('Project saved!'); },
        'Cmd-S': () => { saveState(); runCode(); showToast('Project saved!'); },
        'Tab': (cm) => {
          if (cm.somethingSelected()) {
            cm.indentSelection("add");
          } else {
            cm.replaceSelection("  ", "end");
          }
        },
        'Shift-Tab': (cm) => {
          cm.indentSelection("subtract");
        }
      }
    });

    setupMobileTouchScroll(cmEditor);

    cmEditor.on('change', () => {
      const activeFile = getActiveFile();
      if (activeFile && cmEditor.getValue() !== activeFile.content) {
        setFileContent(activeFile.id, cmEditor.getValue());
      }
    });

    cmEditor.on('cursorActivity', () => {
      const cursor = cmEditor.getCursor();
      els.cursorPos.textContent = `Ln ${cursor.line + 1}, Col ${cursor.ch + 1}`;
    });
  }

  function setupMobileTouchScroll(cm) {
    const scroller = cm.getScrollerElement();
    if (!scroller) return;

    let isTracking = false;
    let isScrolling = false;
    let startY = 0;
    let startX = 0;
    let startScrollTop = 0;
    let startScrollLeft = 0;
    let lastY = 0;
    let lastTime = 0;
    let velocityY = 0;
    let momentumRaf = null;

    function stopMomentum() {
      if (momentumRaf) {
        cancelAnimationFrame(momentumRaf);
        momentumRaf = null;
      }
    }

    function onPointerDown(e) {
      const isTouch = e.pointerType === 'touch' || e.pointerType === 'pen';
      const isSmallScreen = isMobileViewport();
      if (!isTouch && !isSmallScreen) return;

      stopMomentum();
      isTracking = true;
      isScrolling = false;
      startY = e.clientY;
      startX = e.clientX;
      lastY = e.clientY;
      lastTime = performance.now();
      velocityY = 0;
      startScrollTop = scroller.scrollTop;
      startScrollLeft = scroller.scrollLeft;
    }

    function onPointerMove(e) {
      if (!isTracking) return;

      const now = performance.now();
      const dt = now - lastTime;
      const currentY = e.clientY;
      const currentX = e.clientX;
      const deltaY = startY - currentY;
      const deltaX = startX - currentX;

      if (dt > 10) {
        const instantV = (lastY - currentY) / dt;
        velocityY = velocityY * 0.4 + instantV * 0.6;
        lastY = currentY;
        lastTime = now;
      }

      if (!isScrolling && (Math.abs(deltaY) > 4 || Math.abs(deltaX) > 4)) {
        isScrolling = true;
      }

      if (isScrolling) {
        scroller.scrollTop = startScrollTop + deltaY;
        if (!cm.getOption('lineWrapping')) {
          scroller.scrollLeft = startScrollLeft + deltaX;
        }
      }
    }

    function onPointerUp() {
      if (!isTracking) return;
      isTracking = false;

      if (isScrolling && Math.abs(velocityY) > 0.15) {
        let v = velocityY * 16;
        const friction = 0.94;

        function step() {
          if (Math.abs(v) < 0.5) {
            momentumRaf = null;
            return;
          }
          scroller.scrollTop += v;
          v *= friction;
          momentumRaf = requestAnimationFrame(step);
        }
        momentumRaf = requestAnimationFrame(step);
      }
    }

    if (window.PointerEvent) {
      scroller.addEventListener('pointerdown', onPointerDown, { passive: true });
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      window.addEventListener('pointerup', onPointerUp, { passive: true });
      window.addEventListener('pointercancel', onPointerUp, { passive: true });
    } else {
      scroller.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
          onPointerDown({
            pointerType: 'touch',
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
          });
        }
      }, { passive: true });

      window.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1) {
          onPointerMove({
            clientX: e.touches[0].clientX,
            clientY: e.touches[0].clientY
          });
        }
      }, { passive: true });

      window.addEventListener('touchend', onPointerUp, { passive: true });
      window.addEventListener('touchcancel', onPointerUp, { passive: true });
    }
  }

  function syncEditorContent() {
    const activeFile = getActiveFile();
    if (!activeFile) {
      if (cmEditor) {
        cmEditor.setValue('');
      } else {
        els.codeEditor.value = '';
        updateLineNumbers('');
      }
      return;
    }

    if (cmEditor) {
      if (cmEditor.getValue() !== activeFile.content) {
        cmEditor.setValue(activeFile.content);
        cmEditor.clearHistory();
      }
      cmEditor.setOption('mode', getCodeMirrorMode(activeFile.type));
      cmEditor.setOption('theme', getCodeMirrorTheme(state.theme));
      setTimeout(() => cmEditor.refresh(), 10);
    } else {
      els.codeEditor.value = activeFile.content;
      updateLineNumbers(activeFile.content);
      updateCursorPos();
    }
  }

  function updateLineNumbers(text) {
    const lines = text.split('\n').length;
    let numbers = '';
    for (let i = 1; i <= lines; i++) {
      numbers += i + '\n';
    }
    els.lineNumbers.innerText = numbers;
  }

  function updateCursorPos() {
    const val = els.codeEditor.value;
    const selStart = els.codeEditor.selectionStart;
    const lines = val.substring(0, selStart).split('\n');
    const row = lines.length;
    const col = lines[lines.length - 1].length + 1;
    els.cursorPos.textContent = `Ln ${row}, Col ${col}`;
  }

  // ---------------------------------------------------------------------------
  // Virtual Bundler & Sandboxed Execution Engine
  // ---------------------------------------------------------------------------
  function cleanActiveBlobs() {
    activeBlobUrls.forEach(url => URL.revokeObjectURL(url));
    activeBlobUrls = [];
  }

  /**
   * Bundles virtual files into a single self-contained HTML document.
   * Resolves <link href="xxx.css"> and generates an ES Module importmap for JS files.
   */
  function bundleProject() {
    cleanActiveBlobs();

    // 1. Identify Entry Point: Default to index.html, or first HTML file, or create minimal wrapper
    let entryHtmlFile = state.files.find(f => f.name.toLowerCase() === 'index.html') 
      || state.files.find(f => f.type === 'html');

    let htmlContent = '';
    if (entryHtmlFile) {
      htmlContent = entryHtmlFile.content;
    } else {
      // If user has no HTML file (e.g. only JS and CSS), synthesize entry
      htmlContent = `<!DOCTYPE html><html><head><title>Preview</title></head><body><div id="root"></div></body></html>`;
    }

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');

    // Ensure responsive viewport meta is present in preview
    if (!doc.querySelector('meta[name="viewport"]')) {
      const metaVp = doc.createElement('meta');
      metaVp.name = 'viewport';
      metaVp.content = 'width=device-width, initial-scale=1.0';
      if (doc.head) {
        doc.head.insertBefore(metaVp, doc.head.firstChild);
      }
    }

    // 2. Resolve CSS Links (<link rel="stylesheet" href="...">)
    const linkTags = Array.from(doc.querySelectorAll('link[rel="stylesheet"]'));
    linkTags.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;
      const cleanHref = href.replace(/^(\.\/|\/)/, '');
      const matchingFile = state.files.find(f => f.name === cleanHref && f.type === 'css');
      if (matchingFile) {
        const styleTag = doc.createElement('style');
        styleTag.setAttribute('data-bundle-source', matchingFile.name);
        styleTag.textContent = matchingFile.content;
        link.replaceWith(styleTag);
      }
    });

    // 3. Resolve Virtual JavaScript Files via ES Module Import Map
    // Modern browsers support native importmaps: { imports: { "./store.js": "blob:..." } }
    const importMap = { imports: {} };
    const jsFiles = state.files.filter(f => f.type === 'js');

    jsFiles.forEach(file => {
      const blob = new Blob([file.content], { type: 'application/javascript' });
      const blobUrl = URL.createObjectURL(blob);
      activeBlobUrls.push(blobUrl);

      // Map variations: store.js, ./store.js, /store.js
      importMap.imports[file.name] = blobUrl;
      importMap.imports['./' + file.name] = blobUrl;
      importMap.imports['/' + file.name] = blobUrl;
    });

    // 4. Resolve standard non-module <script src="...">
    const scriptTags = Array.from(doc.querySelectorAll('script[src]'));
    scriptTags.forEach(script => {
      const src = script.getAttribute('src');
      if (!src) return;
      const cleanSrc = src.replace(/^(\.\/|\/)/, '');
      const isModule = script.getAttribute('type') === 'module';

      const matchingFile = jsFiles.find(f => f.name === cleanSrc);
      if (matchingFile) {
        if (isModule) {
          // Point src to blob url
          const blobUrl = importMap.imports[matchingFile.name];
          script.setAttribute('src', blobUrl);
        } else {
          // Inline standard script
          const inlineScript = doc.createElement('script');
          inlineScript.setAttribute('data-bundle-source', matchingFile.name);
          inlineScript.textContent = matchingFile.content;
          script.replaceWith(inlineScript);
        }
      }
    });

    // 5. Inject Import Map if JS files exist
    if (jsFiles.length > 0) {
      const mapScript = doc.createElement('script');
      mapScript.type = 'importmap';
      mapScript.textContent = JSON.stringify(importMap, null, 2);
      doc.head.insertBefore(mapScript, doc.head.firstChild);
    }

    // 6. Inject Console Interceptor & Error Boundary into <head>
    const consoleInterceptor = doc.createElement('script');
    consoleInterceptor.textContent = `
      (function() {
        function serialize(arg) {
          if (arg === null) return 'null';
          if (arg === undefined) return 'undefined';
          if (typeof arg === 'object') {
            try { return JSON.stringify(arg, null, 2); } catch(e) { return String(arg); }
          }
          return String(arg);
        }
        function send(level, args) {
          try {
            const formatted = Array.from(args).map(serialize).join(' ');
            window.parent.postMessage({
              type: 'AG_CONSOLE_EVENT',
              level: level,
              message: formatted,
              timestamp: new Date().toLocaleTimeString()
            }, '*');
          } catch(err) {}
        }
        ['log', 'info', 'warn', 'error', 'debug'].forEach(function(fn) {
          const original = console[fn];
          console[fn] = function() {
            send(fn, arguments);
            if (original) original.apply(console, arguments);
          };
        });
        window.addEventListener('error', function(e) {
          send('error', [e.message + ' (' + (e.filename || 'script') + ':' + e.lineno + ')']);
        });
        window.addEventListener('unhandledrejection', function(e) {
          send('error', ['Unhandled Promise Rejection: ' + (e.reason ? (e.reason.stack || e.reason) : e)]);
        });
      })();
    `;
    doc.head.insertBefore(consoleInterceptor, doc.head.firstChild);

    return doc.documentElement.outerHTML;
  }

  function runCode() {
    els.runtimeErrorBanner.classList.add('hidden');
    els.runtimeErrorBanner.textContent = '';

    try {
      const bundledHtml = bundleProject();
      els.previewFrame.srcdoc = bundledHtml;
    } catch (err) {
      displayRuntimeError('Compilation / Bundle Error: ' + err.message);
    }
  }

  function scheduleRun() {
    clearTimeout(runDebounceTimer);
    runDebounceTimer = setTimeout(runCode, 500);
  }

  function displayRuntimeError(msg) {
    els.runtimeErrorBanner.textContent = msg;
    els.runtimeErrorBanner.classList.remove('hidden');
    addConsoleLog('error', msg, new Date().toLocaleTimeString());
  }

  // ---------------------------------------------------------------------------
  // Console Panel Management
  // ---------------------------------------------------------------------------
  function addConsoleLog(level, message, timestamp) {
    state.logCount++;
    els.logCount.textContent = `${state.logCount} log${state.logCount === 1 ? '' : 's'}`;

    if (els.mobileConsoleBadge) {
      els.mobileConsoleBadge.textContent = state.logCount > 99 ? '99+' : state.logCount;
      els.mobileConsoleBadge.classList.remove('hidden');
      if (level === 'error') {
        els.mobileConsoleBadge.classList.add('has-error');
      }
    }

    const emptyPlaceholder = els.consoleLogs.querySelector('.console-empty');
    if (emptyPlaceholder) emptyPlaceholder.remove();

    const line = document.createElement('div');
    line.className = `console-line ${level}`;
    line.innerHTML = `
      <span class="timestamp">[${timestamp}]</span>
      <span class="msg">${escapeHtml(message)}</span>
    `;

    els.consoleLogs.appendChild(line);
    els.consoleLogs.scrollTop = els.consoleLogs.scrollHeight;
  }

  function clearConsole() {
    state.logCount = 0;
    els.logCount.textContent = '0 logs';
    if (els.mobileConsoleBadge) {
      els.mobileConsoleBadge.textContent = '0';
      els.mobileConsoleBadge.classList.add('hidden');
      els.mobileConsoleBadge.classList.remove('has-error');
    }
    els.consoleLogs.innerHTML = '<div class="console-empty">Console cleared.</div>';
  }

  window.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'AG_CONSOLE_EVENT') {
      const { level, message, timestamp } = event.data;
      addConsoleLog(level, message, timestamp);
    }
  });

  // ---------------------------------------------------------------------------
  // Editor Enhancements (Tabs, Newlines, Shortcuts)
  // ---------------------------------------------------------------------------
  function setupEditorKeyHandlers() {
    const editor = els.codeEditor;

    editor.addEventListener('input', () => {
      const activeFile = getActiveFile();
      if (activeFile) {
        setFileContent(activeFile.id, editor.value);
        updateLineNumbers(editor.value);
      }
    });

    editor.addEventListener('keydown', (e) => {
      // Shortcut: Ctrl + Enter to Run
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        runCode();
        showToast('Code executed!');
        return;
      }

      // Shortcut: Ctrl + S to save & run
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveState();
        runCode();
        showToast('Project saved!');
        return;
      }

      // Tab Indentation handling
      if (e.key === 'Tab') {
        e.preventDefault();
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const value = editor.value;

        if (e.shiftKey) {
          // Shift+Tab: Unindent
          const before = value.substring(0, start);
          const lastNewline = before.lastIndexOf('\n');
          const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
          if (value.substring(lineStart, lineStart + 2) === '  ') {
            editor.value = value.substring(0, lineStart) + value.substring(lineStart + 2);
            editor.selectionStart = editor.selectionEnd = Math.max(lineStart, start - 2);
          }
        } else {
          // Tab: Insert 2 spaces
          editor.value = value.substring(0, start) + '  ' + value.substring(end);
          editor.selectionStart = editor.selectionEnd = start + 2;
        }

        const activeFile = getActiveFile();
        if (activeFile) setFileContent(activeFile.id, editor.value);
        updateLineNumbers(editor.value);
        return;
      }

      // Auto-indent on Enter
      if (e.key === 'Enter') {
        const start = editor.selectionStart;
        const value = editor.value;
        const currentLine = value.substring(0, start).split('\n').pop();
        const match = currentLine.match(/^\s+/);
        const indent = match ? match[0] : '';

        // If line ends with opening brace, add extra indent
        const extraIndent = currentLine.trim().endsWith('{') ? '  ' : '';

        setTimeout(() => {
          const insert = indent + extraIndent;
          if (insert) {
            const pos = editor.selectionStart;
            editor.value = editor.value.substring(0, pos) + insert + editor.value.substring(pos);
            editor.selectionStart = editor.selectionEnd = pos + insert.length;
            const activeFile = getActiveFile();
            if (activeFile) setFileContent(activeFile.id, editor.value);
            updateLineNumbers(editor.value);
          }
        }, 0);
      }

      // Auto-close brackets
      const pairs = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'", '`': '`' };
      if (pairs[e.key]) {
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        if (start === end) {
          const char = e.key;
          const closeChar = pairs[char];
          editor.value = editor.value.substring(0, start) + char + closeChar + editor.value.substring(end);
          editor.selectionStart = editor.selectionEnd = start + 1;
          e.preventDefault();
          const activeFile = getActiveFile();
          if (activeFile) setFileContent(activeFile.id, editor.value);
          updateLineNumbers(editor.value);
        }
      }
    });

    // Synchronize scroll with line numbers
    editor.addEventListener('scroll', () => {
      els.lineNumbers.scrollTop = editor.scrollTop;
    });

    // Cursor position tracking
    ['keyup', 'click', 'focus'].forEach(evt => {
      editor.addEventListener(evt, updateCursorPos);
    });
  }

  // ---------------------------------------------------------------------------
  // Format / Pretty Print
  // ---------------------------------------------------------------------------
  function formatActiveFile() {
    const file = getActiveFile();
    if (!file) return;

    try {
      if (file.type === 'json') {
        const raw = cmEditor ? cmEditor.getValue() : file.content;
        const formatted = JSON.stringify(JSON.parse(raw), null, 2);
        if (cmEditor) {
          cmEditor.setValue(formatted);
        }
        file.content = formatted;
        syncEditorContent();
        saveState();
        showToast(`Formatted ${file.name}`);
        return;
      }

      if (cmEditor) {
        // First sync file content with current editor value
        file.content = cmEditor.getValue();

        // Perform smart indentation across all lines using CodeMirror's mode grammar
        cmEditor.operation(() => {
          const totalLines = cmEditor.lineCount();
          for (let i = 0; i < totalLines; i++) {
            cmEditor.indentLine(i, 'smart');
          }
        });

        file.content = cmEditor.getValue();
        saveState();
        showToast(`Formatted ${file.name}`);
        return;
      }

      // Robust fallback for non-CodeMirror textarea
      const voidTags = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
      ]);

      const lines = file.content.split('\n');
      let indentLevel = 0;
      const formatted = lines.map(line => {
        const trimmed = line.trim();
        if (!trimmed) return '';

        // Decrement indent for closing tags/braces
        if (trimmed.startsWith('}') || trimmed.startsWith('</') || trimmed.startsWith(']')) {
          indentLevel = Math.max(0, indentLevel - 1);
        }

        const res = '  '.repeat(indentLevel) + trimmed;

        // Check if this line opens a new block
        if (trimmed.endsWith('{')) {
          indentLevel++;
        } else if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.startsWith('<!') && !trimmed.startsWith('<?')) {
          const tagMatch = trimmed.match(/^<([a-zA-Z0-9-]+)/);
          const tagName = tagMatch ? tagMatch[1].toLowerCase() : null;
          const isVoid = tagName && voidTags.has(tagName);
          const isSelfClosing = trimmed.endsWith('/>');
          const hasClosingTag = tagName && trimmed.includes(`</${tagName}>`);

          if (!isVoid && !isSelfClosing && !hasClosingTag && !trimmed.endsWith('-->')) {
            indentLevel++;
          }
        }

        return res;
      });

      file.content = formatted.join('\n');
      syncEditorContent();
      saveState();
      showToast(`Formatted ${file.name}`);
    } catch (e) {
      showToast('Could not auto-format: ' + e.message);
    }
  }

  // ---------------------------------------------------------------------------
  // Export Capabilities
  // ---------------------------------------------------------------------------
  function exportSingleHtml() {
    // Generate standalone portable bundle where everything is fully inlined
    const bundledHtml = bundleProject();
    downloadFile('standalone_concept.html', bundledHtml, 'text/html');
    showToast('Downloaded standalone_concept.html');
  }

  function exportZip() {
    if (typeof JSZip === 'undefined') {
      return showToast('JSZip not ready. Use Single .HTML export.');
    }
    const zip = new JSZip();
    state.files.forEach(file => {
      zip.file(file.name, file.content);
    });

    zip.generateAsync({ type: 'blob' }).then(content => {
      const url = URL.createObjectURL(content);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'developer_zone_project.zip';
      a.click();
      URL.revokeObjectURL(url);
      showToast('Downloaded project ZIP');
    }).catch(err => {
      showToast('ZIP error: ' + err.message);
    });
  }

  function copyBundleToClipboard() {
    const bundledHtml = bundleProject();
    navigator.clipboard.writeText(bundledHtml).then(() => {
      showToast('Copied standalone HTML to clipboard!');
    }).catch(() => {
      showToast('Failed to copy to clipboard');
    });
  }

  function downloadFile(filename, content, type) {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ---------------------------------------------------------------------------
  // Resizable Panels & Mobile View Controller
  // ---------------------------------------------------------------------------
  function setMobileView(viewName) {
    state.mobileActiveView = viewName;
    if (els.appContainer) {
      els.appContainer.setAttribute('data-mobile-view', viewName);
    }

    if (els.mobileNavBtns) {
      els.mobileNavBtns.forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-view') === viewName);
      });
    }

    if (viewName === 'editor') {
      if (els.editorPane) {
        els.editorPane.style.width = '';
        els.editorPane.style.flex = '';
      }
      if (cmEditor) {
        setTimeout(() => {
          cmEditor.refresh();
        }, 50);
      }
    } else if (viewName === 'preview') {
      runCode();
    } else if (viewName === 'console') {
      if (els.mobileConsoleBadge) {
        els.mobileConsoleBadge.classList.remove('has-error');
      }
    }
  }

  function openMobileDrawer() {
    if (els.mobileDrawerBackdrop) {
      els.mobileDrawerBackdrop.classList.remove('hidden');
      if (els.mobileAutoRunCheckbox) {
        els.mobileAutoRunCheckbox.checked = state.autoRun;
      }
    }
  }

  function closeMobileDrawer() {
    if (els.mobileDrawerBackdrop) {
      els.mobileDrawerBackdrop.classList.add('hidden');
    }
  }

  function toggleTheme() {
    state.theme = state.theme === 'theme-dark' ? 'theme-light' : 'theme-dark';
    document.body.className = state.theme;
    if (els.themeColorMeta) {
      els.themeColorMeta.setAttribute('content', state.theme === 'theme-light' ? '#ffffff' : '#181a1f');
    }
    if (cmEditor) {
      cmEditor.setOption('theme', getCodeMirrorTheme(state.theme));
    }
    saveState();
  }

  function handleRun(isMobile = false) {
    runCode();
    showToast('Code executed!');
    if ((isMobile || isMobileViewport()) && state.mobileActiveView === 'editor') {
      setMobileView('preview');
    }
  }

  function setupResizers() {
    let isDraggingMain = false;
    let isDraggingConsole = false;

    // Pointer events support both mouse and touch input
    els.mainSplitter.addEventListener('pointerdown', (e) => {
      isDraggingMain = true;
      try { els.mainSplitter.setPointerCapture(e.pointerId); } catch(err) {}
      els.mainSplitter.classList.add('dragging');
      document.body.style.cursor = 'col-resize';
      e.preventDefault();
    });

    els.consoleSplitter.addEventListener('pointerdown', (e) => {
      isDraggingConsole = true;
      try { els.consoleSplitter.setPointerCapture(e.pointerId); } catch(err) {}
      els.consoleSplitter.classList.add('dragging');
      document.body.style.cursor = 'row-resize';
      e.preventDefault();
    });

    window.addEventListener('pointermove', (e) => {
      if (isDraggingMain) {
        const workbenchRect = document.querySelector('.workbench').getBoundingClientRect();
        const explorerWidth = els.fileExplorer.classList.contains('collapsed') ? 0 : els.fileExplorer.offsetWidth;
        const newEditorWidth = e.clientX - workbenchRect.left - explorerWidth;
        if (newEditorWidth > 200 && newEditorWidth < workbenchRect.width - explorerWidth - 200) {
          els.editorPane.style.flex = 'none';
          els.editorPane.style.width = `${newEditorWidth}px`;
          if (cmEditor) cmEditor.refresh();
        }
      }

      if (isDraggingConsole) {
        const outputRect = document.getElementById('outputPane').getBoundingClientRect();
        const newConsoleHeight = outputRect.bottom - e.clientY;
        if (newConsoleHeight >= 36 && newConsoleHeight < outputRect.height - 100) {
          els.consoleDrawer.classList.remove('collapsed');
          els.consoleDrawer.style.height = `${newConsoleHeight}px`;
        }
      }
    });

    const stopDragging = () => {
      if (isDraggingMain) {
        isDraggingMain = false;
        els.mainSplitter.classList.remove('dragging');
        document.body.style.cursor = '';
        if (cmEditor) cmEditor.refresh();
      }
      if (isDraggingConsole) {
        isDraggingConsole = false;
        els.consoleSplitter.classList.remove('dragging');
        document.body.style.cursor = '';
      }
    };

    window.addEventListener('pointerup', stopDragging);
    window.addEventListener('pointercancel', stopDragging);
  }

  // ---------------------------------------------------------------------------
  // Toast & Utilities
  // ---------------------------------------------------------------------------
  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.remove('hidden');
    clearTimeout(els.toast._timer);
    els.toast._timer = setTimeout(() => {
      els.toast.classList.add('hidden');
    }, 2800);
  }

  function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function loadTemplate(key) {
    if (!TEMPLATES[key]) return;
    if (confirm(`Load template "${key}"? This will overwrite your current Developer Zone files.`)) {
      state.files = JSON.parse(JSON.stringify(TEMPLATES[key]));
      state.activeFileId = state.files[0].id;
      state.openTabIds = state.files.map(f => f.id);
      renderFileTree();
      renderTabs();
      syncEditorContent();
      updateModeBadge();
      clearConsole();
      runCode();
      saveState();
      showToast(`Loaded template`);
    }
  }

  // ---------------------------------------------------------------------------
  // Event Listeners & Initialization
  // ---------------------------------------------------------------------------
  function initEventListeners() {
    // Top Bar Actions (Desktop)
    els.runBtn.addEventListener('click', () => handleRun(false));

    els.autoRunCheckbox.addEventListener('change', (e) => {
      state.autoRun = e.target.checked;
      if (els.mobileAutoRunCheckbox) els.mobileAutoRunCheckbox.checked = state.autoRun;
      saveState();
      if (state.autoRun) runCode();
    });

    els.formatBtn.addEventListener('click', formatActiveFile);

    els.resetBtn.addEventListener('click', () => {
      loadTemplate('blank-multifile');
    });

    els.themeToggleBtn.addEventListener('click', toggleTheme);

    els.templateSelect.addEventListener('change', (e) => {
      loadTemplate(e.target.value);
      e.target.value = '';
    });

    // Mobile Top Bar Controls
    if (els.mobileRunNavBtn) {
      els.mobileRunNavBtn.addEventListener('click', () => handleRun(true));
    }
    if (els.mobileThemeNavBtn) {
      els.mobileThemeNavBtn.addEventListener('click', toggleTheme);
    }
    if (els.mobileMenuBtn) {
      els.mobileMenuBtn.addEventListener('click', openMobileDrawer);
    }
    if (els.closeMobileDrawerBtn) {
      els.closeMobileDrawerBtn.addEventListener('click', closeMobileDrawer);
    }
    if (els.mobileDrawerBackdrop) {
      els.mobileDrawerBackdrop.addEventListener('click', (e) => {
        if (e.target === els.mobileDrawerBackdrop) {
          closeMobileDrawer();
        }
      });
    }

    // Mobile Bottom Navigation Bar
    if (els.mobileNavBtns) {
      els.mobileNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          const view = btn.getAttribute('data-view');
          if (view) setMobileView(view);
        });
      });
    }

    // Mobile Options Drawer Actions
    if (els.mobileTemplateSelect) {
      els.mobileTemplateSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        closeMobileDrawer();
        if (val) {
          loadTemplate(val);
          e.target.value = '';
        }
      });
    }
    if (els.mobileAutoRunCheckbox) {
      els.mobileAutoRunCheckbox.addEventListener('change', (e) => {
        state.autoRun = e.target.checked;
        els.autoRunCheckbox.checked = state.autoRun;
        saveState();
        if (state.autoRun) runCode();
      });
    }
    if (els.mobileFormatBtn) {
      els.mobileFormatBtn.addEventListener('click', () => {
        closeMobileDrawer();
        formatActiveFile();
      });
    }
    if (els.mobileNewTabBtn) {
      els.mobileNewTabBtn.addEventListener('click', () => {
        closeMobileDrawer();
        els.openNewTabBtn.click();
      });
    }
    if (els.mobileExportSingleHtmlBtn) {
      els.mobileExportSingleHtmlBtn.addEventListener('click', () => {
        closeMobileDrawer();
        exportSingleHtml();
      });
    }
    if (els.mobileExportZipBtn) {
      els.mobileExportZipBtn.addEventListener('click', () => {
        closeMobileDrawer();
        exportZip();
      });
    }
    if (els.mobileCopyBundleBtn) {
      els.mobileCopyBundleBtn.addEventListener('click', () => {
        closeMobileDrawer();
        copyBundleToClipboard();
      });
    }
    if (els.mobileResetBtn) {
      els.mobileResetBtn.addEventListener('click', () => {
        closeMobileDrawer();
        loadTemplate('blank-multifile');
      });
    }

    // File Explorer Toggle
    els.collapseExplorerBtn.addEventListener('click', () => {
      els.fileExplorer.classList.add('collapsed');
      els.expandExplorerBtn.classList.remove('hidden');
      if (cmEditor) setTimeout(() => cmEditor.refresh(), 160);
    });
    els.expandExplorerBtn.addEventListener('click', () => {
      els.fileExplorer.classList.remove('collapsed');
      els.expandExplorerBtn.classList.add('hidden');
      if (cmEditor) setTimeout(() => cmEditor.refresh(), 160);
    });

    // Modal Create File
    els.newFileBtn.addEventListener('click', () => {
      els.newFileName.value = '';
      els.fileModal.classList.remove('hidden');
      setTimeout(() => els.newFileName.focus(), 50);
    });
    els.closeModalBtn.addEventListener('click', () => els.fileModal.classList.add('hidden'));
    els.cancelFileBtn.addEventListener('click', () => els.fileModal.classList.add('hidden'));
    els.confirmFileBtn.addEventListener('click', () => {
      createFile(els.newFileName.value);
      els.fileModal.classList.add('hidden');
    });
    els.newFileName.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        createFile(els.newFileName.value);
        els.fileModal.classList.add('hidden');
      } else if (e.key === 'Escape') {
        els.fileModal.classList.add('hidden');
      }
    });

    // Export Dropdown
    els.exportMenuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      els.exportDropdown.classList.toggle('hidden');
    });
    window.addEventListener('click', () => {
      els.exportDropdown.classList.add('hidden');
    });
    els.exportSingleHtmlBtn.addEventListener('click', exportSingleHtml);
    els.exportZipBtn.addEventListener('click', exportZip);
    els.copyBundleBtn.addEventListener('click', copyBundleToClipboard);

    // Output Preview Actions
    els.refreshPreviewBtn.addEventListener('click', runCode);
    els.openNewTabBtn.addEventListener('click', () => {
      const bundledHtml = bundleProject();
      const blob = new Blob([bundledHtml], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });

    // Console Actions
    els.clearConsoleBtn.addEventListener('click', clearConsole);
    els.toggleConsoleBtn.addEventListener('click', () => {
      els.consoleDrawer.classList.toggle('collapsed');
      const isCollapsed = els.consoleDrawer.classList.contains('collapsed');
      els.consoleToggleIcon.style.transform = isCollapsed ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    // Window Resize / Orientation Change Handling
    function handleViewportChange() {
      const isMobile = isMobileViewport();
      if (isMobile && els.editorPane) {
        els.editorPane.style.width = '';
        els.editorPane.style.flex = '';
      }
      if (cmEditor) {
        cmEditor.setOption('lineWrapping', isMobile);
        cmEditor.refresh();
      }
    }

    window.addEventListener('resize', handleViewportChange);
    window.addEventListener('orientationchange', () => {
      setTimeout(handleViewportChange, 100);
    });

    setupEditorKeyHandlers();
    setupResizers();

    // PWA Install Handlers
    if (els.installAppBtn) {
      els.installAppBtn.addEventListener('click', triggerInstallFlow);
    }
    if (els.mobileInstallAppBtn) {
      els.mobileInstallAppBtn.addEventListener('click', () => {
        closeMobileDrawer();
        triggerInstallFlow();
      });
    }
    if (els.closeInstallModalBtn) {
      els.closeInstallModalBtn.addEventListener('click', closeInstallModal);
    }
    if (els.cancelInstallModalBtn) {
      els.cancelInstallModalBtn.addEventListener('click', closeInstallModal);
    }
    if (els.modalNativeInstallBtn) {
      els.modalNativeInstallBtn.addEventListener('click', triggerInstallFlow);
    }
    if (els.installModal) {
      els.installModal.addEventListener('click', (e) => {
        if (e.target === els.installModal) {
          closeInstallModal();
        }
      });
    }

    // Developer Tools Dropdown & Modal Controls
    if (els.devToolsMenuBtn && els.devToolsDropdown) {
      els.devToolsMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        els.devToolsDropdown.classList.toggle('hidden');
      });
      window.addEventListener('click', () => {
        els.devToolsDropdown.classList.add('hidden');
      });
    }

    if (els.navOpenRegexBtn) {
      els.navOpenRegexBtn.addEventListener('click', () => openDevToolsModal('regex'));
    }
    if (els.navOpenCronBtn) {
      els.navOpenCronBtn.addEventListener('click', () => openDevToolsModal('cron'));
    }

    if (els.mobileRegexBtn) {
      els.mobileRegexBtn.addEventListener('click', () => {
        closeMobileDrawer();
        openDevToolsModal('regex');
      });
    }
    if (els.mobileCronBtn) {
      els.mobileCronBtn.addEventListener('click', () => {
        closeMobileDrawer();
        openDevToolsModal('cron');
      });
    }

    if (els.closeDevToolsModalBtn) {
      els.closeDevToolsModalBtn.addEventListener('click', closeDevToolsModal);
    }
    if (els.devToolsModal) {
      els.devToolsModal.addEventListener('click', (e) => {
        if (e.target === els.devToolsModal) {
          closeDevToolsModal();
        }
      });
    }

    if (els.tabRegexBtn) {
      els.tabRegexBtn.addEventListener('click', () => switchDevToolsTab('regex'));
    }
    if (els.tabCronBtn) {
      els.tabCronBtn.addEventListener('click', () => switchDevToolsTab('cron'));
    }

    // RegEx Listeners
    if (els.regexPatternInput) {
      els.regexPatternInput.addEventListener('input', updateRegexChecker);
    }
    if (els.regexTestInput) {
      els.regexTestInput.addEventListener('input', updateRegexChecker);
    }
    if (els.regexReplaceInput) {
      els.regexReplaceInput.addEventListener('input', updateRegexChecker);
    }
    [els.flagG, els.flagI, els.flagM, els.flagS, els.flagU].forEach(flagEl => {
      if (flagEl) flagEl.addEventListener('change', updateRegexChecker);
    });

    if (els.regexPresetSelect) {
      els.regexPresetSelect.addEventListener('change', (e) => {
        const key = e.target.value;
        if (key && REGEX_PRESETS[key]) {
          const p = REGEX_PRESETS[key];
          if (els.regexPatternInput) els.regexPatternInput.value = p.pattern;
          setRegexFlags(p.flags);
          if (els.regexTestInput) els.regexTestInput.value = p.sample;
          updateRegexChecker();
        }
      });
    }

    if (els.regexClearTestBtn) {
      els.regexClearTestBtn.addEventListener('click', () => {
        if (els.regexTestInput) els.regexTestInput.value = '';
        updateRegexChecker();
      });
    }

    if (els.regexCopyReplacedBtn) {
      els.regexCopyReplacedBtn.addEventListener('click', () => {
        if (els.regexReplaceOutput) {
          const text = els.regexReplaceOutput.textContent;
          if (text && text !== 'No replacement text entered') {
            navigator.clipboard.writeText(text).then(() => {
              showToast('Copied replaced text to clipboard');
            }).catch(() => {
              showToast('Failed to copy to clipboard');
            });
          }
        }
      });
    }

    // Cron Listeners
    if (els.cronExpressionInput) {
      els.cronExpressionInput.addEventListener('input', updateCronEvaluator);
    }
    if (els.cronPresetSelect) {
      els.cronPresetSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val && els.cronExpressionInput) {
          els.cronExpressionInput.value = val;
          updateCronEvaluator();
        }
      });
    }

    // Keyboard Shortcuts: Ctrl+Shift+R (Regex), Ctrl+Shift+C (Cron), Escape
    window.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'R' || e.key === 'r')) {
        e.preventDefault();
        openDevToolsModal('regex');
      } else if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'C' || e.key === 'c')) {
        e.preventDefault();
        openDevToolsModal('cron');
      } else if (e.key === 'Escape' && els.devToolsModal && !els.devToolsModal.classList.contains('hidden')) {
        closeDevToolsModal();
      }
    });

    // PWA Browser Install Prompt Event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredInstallPrompt = e;
      updateInstallButtonUI();
    });

    // PWA Installed Event
    window.addEventListener('appinstalled', () => {
      deferredInstallPrompt = null;
      updateInstallButtonUI();
      closeInstallModal();
      showToast('🎉 Developer Zone installed successfully!');
    });
  }

  // ---------------------------------------------------------------------------
  // Developer Tools Controller (RegEx Checker & Cron Expression Evaluator)
  // ---------------------------------------------------------------------------
  const REGEX_PRESETS = {
    'email': {
      pattern: '^[a-zA-Z0-9.!#$%&\'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\\.[a-zA-Z0-9-]+)*$',
      flags: { g: true, i: true, m: true, s: false, u: true },
      sample: 'developer@example.com\nhello.world+test@subdomain.org\ninvalid-email@\ncontact@domain.co.uk'
    },
    'url': {
      pattern: 'https?:\\/\\/(?:www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/\\/=]*)',
      flags: { g: true, i: true, m: true, s: false, u: true },
      sample: 'Visit https://developerzone.dev/benchmarks for performance data.\nDocs at http://localhost:8080/api/v1?token=xyz#overview\nIgnore ftp://not-supported.org'
    },
    'ipv4': {
      pattern: '\\b(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\b',
      flags: { g: true, i: false, m: true, s: false, u: true },
      sample: 'Server 1: 192.168.1.1\nGateway: 10.0.0.254\nDNS: 8.8.8.8 and 1.1.1.1\nInvalid IP: 999.300.12.1'
    },
    'date-iso': {
      pattern: '\\b\\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\\d|3[01])\\b',
      flags: { g: true, i: false, m: true, s: false, u: true },
      sample: 'Release Date: 2026-10-05\nTarget Deadline: 2026-12-31\nInvalid Date: 2026-13-45'
    },
    'phone-intl': {
      pattern: '\\+?[1-9]\\d{1,14}(?:x.+)?',
      flags: { g: true, i: false, m: true, s: false, u: true },
      sample: 'US: +14155552671\nUK: +442071838750\nIndia: +919876543210'
    },
    'hex-color': {
      pattern: '#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})\\b',
      flags: { g: true, i: true, m: true, s: false, u: true },
      sample: 'Accent: #38bdf8\nBackground: #181a1f\nLight: #fff and #09f\nBorder: #334155\nInvalid: #gggggg'
    },
    'uuid': {
      pattern: '[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}',
      flags: { g: true, i: true, m: true, s: false, u: true },
      sample: 'Session ID: c9bf9e57-1685-4c89-bafb-ff5af830be8a\nClient ID: 9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    },
    'html-tag': {
      pattern: '<([a-zA-Z][a-zA-Z0-9]*)\\b[^>]*>(.*?)<\\/\\1>',
      flags: { g: true, i: true, m: true, s: true, u: true },
      sample: '<h1 class="hero-title">Developer Zone</h1>\n<p>Interactive workbench with <strong>offline PWA</strong> power.</p>'
    },
    'slug': {
      pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
      flags: { g: false, i: false, m: true, s: false, u: true },
      sample: 'developer-zone-workbench'
    },
    'password-strong': {
      pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$',
      flags: { g: false, i: false, m: true, s: false, u: true },
      sample: 'DevZone2026!Secure'
    },
    'digits-only': {
      pattern: '\\b\\d+\\b',
      flags: { g: true, i: false, m: true, s: false, u: true },
      sample: 'Processed 48102 records in 350ms across 4 clusters.'
    }
  };

  function getRegexFlagsString() {
    let flags = '';
    if (els.flagG && els.flagG.checked) flags += 'g';
    if (els.flagI && els.flagI.checked) flags += 'i';
    if (els.flagM && els.flagM.checked) flags += 'm';
    if (els.flagS && els.flagS.checked) flags += 's';
    if (els.flagU && els.flagU.checked) flags += 'u';
    return flags;
  }

  function setRegexFlags(flagsObj) {
    if (els.flagG) els.flagG.checked = !!flagsObj.g;
    if (els.flagI) els.flagI.checked = !!flagsObj.i;
    if (els.flagM) els.flagM.checked = !!flagsObj.m;
    if (els.flagS) els.flagS.checked = !!flagsObj.s;
    if (els.flagU) els.flagU.checked = !!flagsObj.u;
    updateRegexFlagsBadge();
  }

  function updateRegexFlagsBadge() {
    if (els.regexFlagsBadge) {
      els.regexFlagsBadge.textContent = getRegexFlagsString();
    }
  }

  function updateRegexChecker() {
    if (!els.regexPatternInput || !els.regexTestInput) return;

    const pattern = els.regexPatternInput.value;
    const flags = getRegexFlagsString();
    updateRegexFlagsBadge();

    const testText = els.regexTestInput.value;
    const replacePattern = els.regexReplaceInput ? els.regexReplaceInput.value : '';

    // Clear previous errors
    if (els.regexErrorAlert) {
      els.regexErrorAlert.textContent = '';
      els.regexErrorAlert.classList.add('hidden');
    }

    if (!pattern) {
      if (els.regexHighlightBox) els.regexHighlightBox.textContent = testText;
      if (els.regexMatchCountBadge) {
        els.regexMatchCountBadge.textContent = '0 matches';
        els.regexMatchCountBadge.className = 'badge-pill';
      }
      if (els.regexMatchTableBody) {
        els.regexMatchTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">Enter a regular expression to see matches</td></tr>';
      }
      if (els.regexReplaceOutput) {
        els.regexReplaceOutput.textContent = replacePattern ? testText : 'No replacement text entered';
      }
      return;
    }

    let regex;
    try {
      regex = new RegExp(pattern, flags);
    } catch (err) {
      if (els.regexErrorAlert) {
        els.regexErrorAlert.textContent = '⚠️ ' + err.message;
        els.regexErrorAlert.classList.remove('hidden');
      }
      if (els.regexHighlightBox) els.regexHighlightBox.textContent = testText;
      if (els.regexMatchCountBadge) {
        els.regexMatchCountBadge.textContent = 'Invalid RegExp';
        els.regexMatchCountBadge.className = 'badge-pill warning';
      }
      if (els.regexMatchTableBody) {
        els.regexMatchTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--accent-danger);">RegExp Syntax Error</td></tr>';
      }
      return;
    }

    // Perform matching
    const matches = [];
    if (!regex.global) {
      const match = regex.exec(testText);
      if (match) {
        matches.push({
          index: match.index,
          length: match[0].length,
          text: match[0],
          groups: match.slice(1)
        });
      }
    } else {
      let match;
      let lastIndex = -1;
      const MAX_MATCHES = 500;
      while ((match = regex.exec(testText)) !== null) {
        matches.push({
          index: match.index,
          length: match[0].length,
          text: match[0],
          groups: match.slice(1)
        });
        if (matches.length >= MAX_MATCHES) break;
        if (regex.lastIndex === lastIndex) {
          regex.lastIndex++;
        }
        lastIndex = regex.lastIndex;
        if (regex.lastIndex > testText.length) break;
      }
    }

    // Match count badge
    if (els.regexMatchCountBadge) {
      const count = matches.length;
      els.regexMatchCountBadge.textContent = count === 0 ? 'No matches' : (count === 1 ? '1 match' : `${count} matches`);
      els.regexMatchCountBadge.className = 'badge-pill';
    }

    // Highlight Box Rendering
    if (els.regexHighlightBox) {
      if (matches.length === 0 || !testText) {
        els.regexHighlightBox.textContent = testText;
      } else {
        let html = '';
        let cursor = 0;
        matches.forEach((m, idx) => {
          if (m.index > cursor) {
            html += escapeHtml(testText.slice(cursor, m.index));
          }
          const markClass = (idx % 2 === 0) ? 'match-a' : 'match-b';
          const matchContent = escapeHtml(m.text || ' ');
          html += `<mark class="regex-match-mark ${markClass}" title="Match #${idx + 1} at index ${m.index}">${matchContent}</mark>`;
          cursor = m.index + m.length;
        });
        if (cursor < testText.length) {
          html += escapeHtml(testText.slice(cursor));
        }
        els.regexHighlightBox.innerHTML = html;
      }
    }

    // Match Table Rendering
    if (els.regexMatchTableBody) {
      if (matches.length === 0) {
        els.regexMatchTableBody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--text-muted);">No matches found</td></tr>';
      } else {
        let rowsHtml = '';
        matches.forEach((m, idx) => {
          let groupsHtml = '<em>none</em>';
          if (m.groups && m.groups.length > 0) {
            groupsHtml = m.groups.map((g, gIdx) => {
              const val = g !== undefined ? escapeHtml(g) : '<em style="color:var(--text-muted)">undefined</em>';
              return `<span style="display:inline-block; margin-right:6px;"><strong style="color:var(--accent-primary);">$${gIdx + 1}:</strong> ${val}</span>`;
            }).join(' ');
          }
          const textPreview = escapeHtml(m.text.length > 80 ? m.text.slice(0, 77) + '...' : m.text);
          rowsHtml += `
            <tr>
              <td><strong>#${idx + 1}</strong></td>
              <td>${m.index}..${m.index + m.length}</td>
              <td style="font-family:var(--font-mono); color:var(--text-bright);">${textPreview || '<em>empty</em>'}</td>
              <td>${groupsHtml}</td>
            </tr>
          `;
        });
        els.regexMatchTableBody.innerHTML = rowsHtml;
      }
    }

    // Substitution Rendering
    if (els.regexReplaceOutput) {
      if (replacePattern === '') {
        els.regexReplaceOutput.textContent = 'No replacement text entered';
      } else {
        try {
          const replaced = testText.replace(regex, replacePattern);
          els.regexReplaceOutput.textContent = replaced;
        } catch (e) {
          els.regexReplaceOutput.textContent = 'Replace error: ' + e.message;
        }
      }
    }
  }

  // ---------------------------------------------------------------------------
  // Cron Parser & Evaluator Logic
  // ---------------------------------------------------------------------------
  const CRON_MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  const CRON_DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  function parseCronPart(partStr, minVal, maxVal, nameMap) {
    let str = partStr.trim().toUpperCase();
    if (!str) throw new Error('Field cannot be empty');

    // Replace month/weekday names if present
    if (nameMap) {
      Object.keys(nameMap).forEach(k => {
        str = str.replace(new RegExp('\\b' + k + '\\b', 'g'), nameMap[k]);
      });
    }

    const values = new Set();
    const subParts = str.split(',');

    for (let sub of subParts) {
      sub = sub.trim();
      if (!sub) continue;

      let step = 1;
      let rangePart = sub;
      if (sub.includes('/')) {
        const slashTokens = sub.split('/');
        if (slashTokens.length !== 2) throw new Error(`Invalid step syntax in "${sub}"`);
        rangePart = slashTokens[0];
        step = parseInt(slashTokens[1], 10);
        if (isNaN(step) || step <= 0) throw new Error(`Invalid step size "${slashTokens[1]}"`);
      }

      let start = minVal;
      let end = maxVal;

      if (rangePart === '*' || rangePart === '?') {
        start = minVal;
        end = maxVal;
      } else if (rangePart.includes('-')) {
        const dashTokens = rangePart.split('-');
        if (dashTokens.length !== 2) throw new Error(`Invalid range syntax in "${rangePart}"`);
        start = parseInt(dashTokens[0], 10);
        end = parseInt(dashTokens[1], 10);
        if (isNaN(start) || isNaN(end)) throw new Error(`Invalid numeric range "${rangePart}"`);
      } else {
        const val = parseInt(rangePart, 10);
        if (isNaN(val)) throw new Error(`Invalid token "${rangePart}"`);
        if (sub.includes('/')) {
          start = val;
          end = maxVal;
        } else {
          start = val;
          end = val;
        }
      }

      if (start < minVal || start > maxVal) throw new Error(`Value ${start} out of range (${minVal}–${maxVal})`);
      if (end < minVal || end > maxVal) throw new Error(`Value ${end} out of range (${minVal}–${maxVal})`);
      if (start > end) throw new Error(`Range start ${start} cannot exceed end ${end}`);

      for (let i = start; i <= end; i += step) {
        values.add(i);
      }
    }

    if (values.size === 0) throw new Error(`No valid values evaluated for field "${partStr}"`);
    return Array.from(values).sort((a, b) => a - b);
  }

  function parseCronExpression(cronStr) {
    const rawTokens = cronStr.trim().split(/\s+/);
    if (rawTokens.length !== 5) {
      throw new Error(`Cron expression requires exactly 5 fields (Minute, Hour, Day of Month, Month, Day of Week), found ${rawTokens.length}`);
    }

    const monthMap = {};
    CRON_MONTHS.forEach((m, idx) => { monthMap[m] = idx + 1; });

    const dowMap = {};
    CRON_DAYS.forEach((d, idx) => { dowMap[d] = idx; });

    const minutes = parseCronPart(rawTokens[0], 0, 59);
    const hours = parseCronPart(rawTokens[1], 0, 23);
    const dom = parseCronPart(rawTokens[2], 1, 31);
    const months = parseCronPart(rawTokens[3], 1, 12, monthMap);

    // DOW: 0-7, where 7 = Sunday (0)
    let dows = parseCronPart(rawTokens[4], 0, 7, dowMap);
    dows = Array.from(new Set(dows.map(d => d === 7 ? 0 : d))).sort((a, b) => a - b);

    return {
      tokens: rawTokens,
      minutes,
      hours,
      dom,
      months,
      dows,
      domIsAny: rawTokens[2] === '*' || rawTokens[2] === '?',
      dowIsAny: rawTokens[4] === '*' || rawTokens[4] === '?'
    };
  }

  function getHumanFieldDescription(fieldIndex, token) {
    const t = token.trim();
    if (t === '*' || t === '?') {
      switch (fieldIndex) {
        case 0: return 'Every minute';
        case 1: return 'Every hour';
        case 2: return 'Every day of month';
        case 3: return 'Every month';
        case 4: return 'Every day of week';
      }
    }
    if (t.startsWith('*/')) {
      const step = t.replace('*/', '');
      switch (fieldIndex) {
        case 0: return `Every ${step} minutes`;
        case 1: return `Every ${step} hours`;
        case 2: return `Every ${step} days`;
        case 3: return `Every ${step} months`;
        case 4: return `Every ${step} days of week`;
      }
    }
    switch (fieldIndex) {
      case 0: return `At minute ${t}`;
      case 1: return `At hour ${t}:00`;
      case 2: return `On day ${t} of month`;
      case 3: return `In month ${t}`;
      case 4: return `On day-of-week ${t}`;
    }
    return t;
  }

  function generateHumanExplanation(parsed) {
    const [minT, hrT, domT, monT, dowT] = parsed.tokens;

    // Special exact matches
    if (minT === '*' && hrT === '*' && domT === '*' && monT === '*' && dowT === '*') {
      return 'Runs every minute of every day';
    }
    if (minT.startsWith('*/') && hrT === '*' && domT === '*' && monT === '*' && dowT === '*') {
      return `Runs every ${minT.replace('*/', '')} minutes`;
    }
    if (minT === '0' && hrT.startsWith('*/') && domT === '*' && monT === '*' && dowT === '*') {
      return `Runs every ${hrT.replace('*/', '')} hours at minute 00`;
    }
    if (minT === '0' && hrT === '*' && domT === '*' && monT === '*' && dowT === '*') {
      return 'Runs every hour on the hour (minute 00)';
    }
    if (minT === '0' && hrT === '0' && domT === '*' && monT === '*' && dowT === '*') {
      return 'Runs every day at midnight (00:00)';
    }

    // General composition
    let desc = '';
    // Time component
    if (minT === '0' && !isNaN(parseInt(hrT, 10)) && !hrT.includes(',') && !hrT.includes('-') && !hrT.includes('/')) {
      const h = parseInt(hrT, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      desc = `Runs at ${String(h).padStart(2, '0')}:00 (${h12}:00 ${ampm})`;
    } else if (!isNaN(parseInt(minT, 10)) && !isNaN(parseInt(hrT, 10)) && !minT.includes(',') && !hrT.includes(',')) {
      const h = parseInt(hrT, 10);
      const m = parseInt(minT, 10);
      const ampm = h >= 12 ? 'PM' : 'AM';
      const h12 = h % 12 === 0 ? 12 : h % 12;
      desc = `Runs at ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} (${h12}:${String(m).padStart(2, '0')} ${ampm})`;
    } else {
      desc = `Runs at minute ${minT}, hour ${hrT}`;
    }

    // Days / Weeks component
    if (dowT === '1-5' || dowT === 'MON-FRI') {
      desc += ', Monday through Friday';
    } else if (dowT === '0,6' || dowT === '6,0' || dowT === 'SUN,SAT') {
      desc += ', on weekends only';
    } else if (dowT !== '*' && dowT !== '?') {
      const dowNames = parsed.dows.map(d => CRON_DAYS[d]).join(', ');
      desc += `, on ${dowNames}`;
    }

    if (domT !== '*' && domT !== '?') {
      desc += `, on day ${domT} of the month`;
    }

    if (monT !== '*' && monT !== '?') {
      const monNames = parsed.months.map(m => CRON_MONTHS[m - 1]).join(', ');
      desc += `, in ${monNames}`;
    }

    return desc;
  }

  function calculateNextCronRuns(parsed, count = 5) {
    const runs = [];
    let current = new Date();
    // Advance to next full minute
    current.setSeconds(0, 0);
    current = new Date(current.getTime() + 60000);

    const minSet = new Set(parsed.minutes);
    const hrSet = new Set(parsed.hours);
    const domSet = new Set(parsed.dom);
    const monSet = new Set(parsed.months);
    const dowSet = new Set(parsed.dows);

    // Search max 500,000 minutes (approx ~1 year)
    let minutesChecked = 0;
    const MAX_SEARCH = 525600;

    while (runs.length < count && minutesChecked < MAX_SEARCH) {
      const year = current.getFullYear();
      const month = current.getMonth() + 1; // 1-12
      const date = current.getDate();       // 1-31
      const day = current.getDay();         // 0-6
      const hour = current.getHours();      // 0-23
      const minute = current.getMinutes();  // 0-59

      if (!monSet.has(month)) {
        current = new Date(year, month, 1, 0, 0, 0, 0);
        minutesChecked += 60;
        continue;
      }

      // POSIX Rule: If both DOM and DOW are restricted, match if EITHER matches.
      let dayMatch = false;
      if (!parsed.domIsAny && !parsed.dowIsAny) {
        dayMatch = domSet.has(date) || dowSet.has(day);
      } else {
        dayMatch = domSet.has(date) && dowSet.has(day);
      }

      if (!dayMatch) {
        current = new Date(year, month - 1, date + 1, 0, 0, 0, 0);
        minutesChecked += 60;
        continue;
      }

      if (!hrSet.has(hour)) {
        current = new Date(year, month - 1, date, hour + 1, 0, 0, 0);
        minutesChecked += 30;
        continue;
      }

      if (minSet.has(minute)) {
        runs.push(new Date(current.getTime()));
      }

      current = new Date(current.getTime() + 60000);
      minutesChecked++;
    }

    return runs;
  }

  function formatRelativeTime(targetDate) {
    const diffMs = targetDate.getTime() - Date.now();
    const diffMins = Math.round(diffMs / 60000);
    if (diffMins < 1) return 'in less than a minute';
    if (diffMins === 1) return 'in 1 minute';
    if (diffMins < 60) return `in ${diffMins} minutes`;
    const diffHours = Math.floor(diffMins / 60);
    const remMins = diffMins % 60;
    if (diffHours < 24) {
      return remMins > 0 ? `in ${diffHours}h ${remMins}m` : `in ${diffHours} hours`;
    }
    const diffDays = Math.floor(diffHours / 24);
    return `in ${diffDays} day${diffDays > 1 ? 's' : ''}`;
  }

  function updateCronEvaluator() {
    if (!els.cronExpressionInput) return;
    const cronStr = els.cronExpressionInput.value.trim();

    // Reset error
    if (els.cronErrorAlert) {
      els.cronErrorAlert.textContent = '';
      els.cronErrorAlert.classList.add('hidden');
    }

    let parsed;
    try {
      parsed = parseCronExpression(cronStr);
    } catch (err) {
      if (els.cronErrorAlert) {
        els.cronErrorAlert.textContent = '⚠️ ' + err.message;
        els.cronErrorAlert.classList.remove('hidden');
      }
      if (els.cronHumanText) {
        els.cronHumanText.textContent = 'Invalid expression';
      }
      if (els.cronNextRunsList) {
        els.cronNextRunsList.innerHTML = '<div class="cron-run-item" style="color:var(--accent-danger); justify-content:center;">Please fix the cron expression above</div>';
      }
      return;
    }

    // 5-field breakdown cards
    const [minT, hrT, domT, monT, dowT] = parsed.tokens;
    if (els.cronFieldMinute) els.cronFieldMinute.textContent = minT;
    if (els.cronFieldDescMinute) els.cronFieldDescMinute.textContent = getHumanFieldDescription(0, minT);
    if (els.cronFieldHour) els.cronFieldHour.textContent = hrT;
    if (els.cronFieldDescHour) els.cronFieldDescHour.textContent = getHumanFieldDescription(1, hrT);
    if (els.cronFieldDom) els.cronFieldDom.textContent = domT;
    if (els.cronFieldDescDom) els.cronFieldDescDom.textContent = getHumanFieldDescription(2, domT);
    if (els.cronFieldMonth) els.cronFieldMonth.textContent = monT;
    if (els.cronFieldDescMonth) els.cronFieldDescMonth.textContent = getHumanFieldDescription(3, monT);
    if (els.cronFieldDow) els.cronFieldDow.textContent = dowT;
    if (els.cronFieldDescDow) els.cronFieldDescDow.textContent = getHumanFieldDescription(4, dowT);

    // Human Explanation
    if (els.cronHumanText) {
      els.cronHumanText.textContent = generateHumanExplanation(parsed);
    }

    // Calculate next runs
    if (els.cronNextRunsList) {
      const runs = calculateNextCronRuns(parsed, 5);
      if (runs.length === 0) {
        els.cronNextRunsList.innerHTML = '<div class="cron-run-item" style="justify-content:center; color:var(--text-muted);">No upcoming executions found within the next year.</div>';
      } else {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let html = '';
        runs.forEach((d, idx) => {
          const y = d.getFullYear();
          const m = String(d.getMonth() + 1).padStart(2, '0');
          const day = String(d.getDate()).padStart(2, '0');
          const hr = String(d.getHours()).padStart(2, '0');
          const min = String(d.getMinutes()).padStart(2, '0');
          const dayName = days[d.getDay()];
          const formatted = `${y}-${m}-${day} ${hr}:${min} (${dayName})`;
          const rel = formatRelativeTime(d);
          html += `
            <div class="cron-run-item">
              <div class="cron-run-item-left">
                <span class="cron-run-num">#${idx + 1}</span>
                <span class="cron-run-date">${formatted}</span>
              </div>
              <span class="cron-run-rel">${rel}</span>
            </div>
          `;
        });
        els.cronNextRunsList.innerHTML = html;
      }
    }
  }

  // ---------------------------------------------------------------------------
  // DevTools Modal Controls & Tab Management
  // ---------------------------------------------------------------------------
  function openDevToolsModal(tab = 'regex') {
    if (els.devToolsDropdown) els.devToolsDropdown.classList.add('hidden');
    if (els.devToolsModal) {
      els.devToolsModal.classList.remove('hidden');
    }
    switchDevToolsTab(tab);
  }

  function closeDevToolsModal() {
    if (els.devToolsModal) {
      els.devToolsModal.classList.add('hidden');
    }
  }

  function switchDevToolsTab(tabName) {
    if (tabName === 'cron') {
      if (els.tabCronBtn) els.tabCronBtn.classList.add('active');
      if (els.tabRegexBtn) els.tabRegexBtn.classList.remove('active');
      if (els.cronPane) els.cronPane.classList.remove('hidden');
      if (els.regexPane) els.regexPane.classList.add('hidden');
      updateCronEvaluator();
      if (els.cronExpressionInput) setTimeout(() => els.cronExpressionInput.focus(), 50);
    } else {
      if (els.tabRegexBtn) els.tabRegexBtn.classList.add('active');
      if (els.tabCronBtn) els.tabCronBtn.classList.remove('active');
      if (els.regexPane) els.regexPane.classList.remove('hidden');
      if (els.cronPane) els.cronPane.classList.add('hidden');
      updateRegexChecker();
      if (els.regexPatternInput) setTimeout(() => els.regexPatternInput.focus(), 50);
    }
  }

  function initDevToolsDefaults() {
    // Populate default demo state for RegEx Checker
    if (els.regexPatternInput && !els.regexPatternInput.value) {
      const emailPreset = REGEX_PRESETS['email'];
      els.regexPatternInput.value = emailPreset.pattern;
      setRegexFlags(emailPreset.flags);
      if (els.regexTestInput) els.regexTestInput.value = emailPreset.sample;
      if (els.regexReplaceInput) els.regexReplaceInput.value = 'developer@domain.com';
    }
    updateRegexChecker();
    updateCronEvaluator();
  }

  // ---------------------------------------------------------------------------
  // Progressive Web App (PWA) & Offline Controller
  // ---------------------------------------------------------------------------
  let deferredInstallPrompt = null;

  function isStandaloneMode() {
    return window.matchMedia('(display-mode: standalone)').matches ||
           window.navigator.standalone === true ||
           document.referrer.includes('android-app://');
  }

  function getPlatformInfo() {
    const ua = navigator.userAgent || '';
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isAndroid = /Android/i.test(ua);
    const isEdge = /Edg\//i.test(ua);
    const isChrome = /Chrome\//i.test(ua) && !isEdge;
    const isSafari = /Safari\//i.test(ua) && !isChrome && !isEdge;
    const isFirefox = /Firefox\//i.test(ua);
    const isMac = /Macintosh/i.test(ua) && !isIOS;
    const isWindows = /Windows/i.test(ua);

    return { isIOS, isAndroid, isEdge, isChrome, isSafari, isFirefox, isMac, isWindows };
  }

  function updateInstallButtonUI() {
    const isInstalled = isStandaloneMode();

    if (isInstalled) {
      if (els.installAppBtn) {
        els.installAppBtn.classList.add('hidden');
      }
      if (els.mobileInstallAppBtn) {
        els.mobileInstallAppBtn.classList.add('hidden');
      }
      if (els.mobilePwaSection) {
        els.mobilePwaSection.classList.add('hidden');
      }
      return;
    }

    if (els.installAppBtn) {
      els.installAppBtn.classList.remove('hidden');
    }
    if (els.mobileInstallAppBtn) {
      els.mobileInstallAppBtn.classList.remove('hidden');
    }
    if (els.mobilePwaSection) {
      els.mobilePwaSection.classList.remove('hidden');
    }

    if (els.modalNativeInstallBtn) {
      if (deferredInstallPrompt) {
        els.modalNativeInstallBtn.classList.remove('hidden');
      } else {
        els.modalNativeInstallBtn.classList.add('hidden');
      }
    }
  }

  function renderInstallInstructions() {
    if (!els.pwaInstructionsBox) return;

    if (deferredInstallPrompt) {
      els.pwaInstructionsBox.innerHTML = `
        <div class="pwa-highlight-note">
          🎉 Developer Zone is ready to install directly from your browser!
        </div>
        <div class="pwa-step-card">
          <div class="pwa-step-num">1</div>
          <div class="pwa-step-content">
            Click the <strong>"Install Now"</strong> button below to open the prompt.
          </div>
        </div>
        <div class="pwa-step-card">
          <div class="pwa-step-num">2</div>
          <div class="pwa-step-content">
            Confirm the browser prompt to install Developer Zone as a standalone native app.
          </div>
        </div>
      `;
      if (els.modalNativeInstallBtn) {
        els.modalNativeInstallBtn.classList.remove('hidden');
      }
      return;
    }

    const { isIOS, isAndroid } = getPlatformInfo();

    if (isIOS) {
      els.pwaInstructionsBox.innerHTML = `
        <div class="pwa-step-card">
          <div class="pwa-step-num">1</div>
          <div class="pwa-step-content">
            Tap the <strong>Share</strong> button <span class="pwa-inline-kbd">⎋</span> in Safari's bottom toolbar.
          </div>
        </div>
        <div class="pwa-step-card">
          <div class="pwa-step-num">2</div>
          <div class="pwa-step-content">
            Scroll down the menu and tap <strong>"Add to Home Screen"</strong> <span class="pwa-inline-kbd">⊞</span>.
          </div>
        </div>
        <div class="pwa-step-card">
          <div class="pwa-step-num">3</div>
          <div class="pwa-step-content">
            Tap <strong>"Add"</strong> in the top-right corner to launch with its own icon and full-screen view.
          </div>
        </div>
      `;
    } else if (isAndroid) {
      els.pwaInstructionsBox.innerHTML = `
        <div class="pwa-step-card">
          <div class="pwa-step-num">1</div>
          <div class="pwa-step-content">
            Tap the browser menu <span class="pwa-inline-kbd">⋮</span> at the top-right of Chrome.
          </div>
        </div>
        <div class="pwa-step-card">
          <div class="pwa-step-num">2</div>
          <div class="pwa-step-content">
            Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
          </div>
        </div>
        <div class="pwa-step-card">
          <div class="pwa-step-num">3</div>
          <div class="pwa-step-content">
            Follow the prompt to add Developer Zone to your home screen and app launcher.
          </div>
        </div>
      `;
    } else {
      els.pwaInstructionsBox.innerHTML = `
        <div class="pwa-step-card">
          <div class="pwa-step-num">1</div>
          <div class="pwa-step-content">
            Look for the <strong>Install App icon</strong> <span class="pwa-inline-kbd">⊕</span> in the right side of the address bar.
          </div>
        </div>
        <div class="pwa-step-card">
          <div class="pwa-step-num">2</div>
          <div class="pwa-step-content">
            Or open the browser menu <span class="pwa-inline-kbd">⋮</span> &rarr; select <strong>"Save and share"</strong> or <strong>"Apps"</strong> &rarr; <strong>"Install Developer Zone"</strong>.
          </div>
        </div>
        <div class="pwa-step-card">
          <div class="pwa-step-num">3</div>
          <div class="pwa-step-content">
            Click <strong>Install</strong> to enjoy a dedicated window, faster launch, and full offline coding!
          </div>
        </div>
      `;
    }

    if (els.modalNativeInstallBtn) {
      els.modalNativeInstallBtn.classList.add('hidden');
    }
  }

  function openInstallModal() {
    renderInstallInstructions();
    if (els.installModal) {
      els.installModal.classList.remove('hidden');
    }
  }

  function closeInstallModal() {
    if (els.installModal) {
      els.installModal.classList.add('hidden');
    }
  }

  async function triggerInstallFlow() {
    if (deferredInstallPrompt) {
      try {
        deferredInstallPrompt.prompt();
        const choice = await deferredInstallPrompt.userChoice;
        if (choice && choice.outcome === 'accepted') {
          showToast('Installing Developer Zone...');
        }
      } catch (err) {
        console.warn('Install prompt error:', err);
      }
      deferredInstallPrompt = null;
      updateInstallButtonUI();
      closeInstallModal();
    } else {
      openInstallModal();
    }
  }

  function registerServiceWorker() {
    const isSupported = 'serviceWorker' in navigator;
    const isSecureOrLocal = window.location.protocol === 'https:' ||
      window.location.hostname === 'localhost' ||
      window.location.hostname === '127.0.0.1';

    if (isSupported && isSecureOrLocal) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then((reg) => {
            reg.addEventListener('updatefound', () => {
              const newWorker = reg.installing;
              if (newWorker) {
                newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                    showToast('⚡ Developer Zone updated! Refresh to use the latest version.');
                  }
                });
              }
            });
          })
          .catch((err) => {
            console.warn('[PWA] Service Worker registration failed:', err);
          });
      });
    }
  }

  function handleStartupTemplate() {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#template=')) {
      const templateKey = hash.replace('#template=', '').trim();
      if (TEMPLATES[templateKey]) {
        state.files = JSON.parse(JSON.stringify(TEMPLATES[templateKey]));
        state.activeFileId = state.files[0].id;
        state.openTabIds = state.files.map(f => f.id);
        saveState();
        return true;
      }
    }
    return false;
  }

  function init() {
    const hasHashTemplate = handleStartupTemplate();
    const hasExisting = !hasHashTemplate && loadState();
    if (!hasExisting && !hasHashTemplate) {
      // Default to the Modular Kanban multi-file template
      state.files = JSON.parse(JSON.stringify(TEMPLATES['multifile-kanban']));
      state.activeFileId = state.files[0].id;
      state.openTabIds = state.files.map(f => f.id);
    }

    document.body.className = state.theme;
    if (els.themeColorMeta) {
      els.themeColorMeta.setAttribute('content', state.theme === 'theme-light' ? '#ffffff' : '#181a1f');
    }
    els.autoRunCheckbox.checked = state.autoRun;
    if (els.mobileAutoRunCheckbox) {
      els.mobileAutoRunCheckbox.checked = state.autoRun;
    }

    setMobileView('editor');
    renderFileTree();
    renderTabs();
    initCodeMirror();
    syncEditorContent();
    updateModeBadge();
    initEventListeners();
    initDevToolsDefaults();
    updateInstallButtonUI();
    registerServiceWorker();

    // Initial Execution
    setTimeout(runCode, 200);
  }

  init();
})();
