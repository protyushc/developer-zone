# 🚀 Web Playground

A lightweight, zero-dependency, self-contained HTML, JavaScript, and CSS playground with real-time execution, virtual multi-file support, native ES module bundling, and an integrated developer console.

---

## 🌟 Key Features

1. **Syntax Color Coding & Code Intelligence**:
   - Integrated CodeMirror engine with automatic language mode switching (`htmlmixed`, `javascript`, `css`, `json`).
   - Theme-adaptive color schemes (**Dracula** for dark theme, **Eclipse** for light theme).
   - Auto-closing brackets and HTML tags, active-line highlighting, and gutter line numbering.
   - Graceful fallback for offline usage.

2. **Single-File & Multi-File Architecture**:
   - **Single-File Mode**: Edit self-contained HTML with embedded `<style>` and `<script>` blocks (e.g., quick prototypes, canvas animations).
   - **Multi-File Mode**: Create and organize multiple virtual files (e.g. `index.html`, `style.css`, `store.js`, `utils.js`).
   - **Native ES Modules**: Resolves `import { foo } from './helper.js'` out-of-the-box using dynamic in-browser `<script type="importmap">` generation without needing Webpack or Vite.
   - **Virtual CSS Linking**: Automatically resolves `<link rel="stylesheet" href="style.css">` against virtual files.

2. **Sandboxed Live Preview**:
   - Debounced live reloading as you type, with an instant **Run** button (`Ctrl + Enter`).
   - Isolated `iframe` environment with an error boundary catching uncaught exceptions and rejected promises.
   - Expand preview to a new browser window anytime.

3. **Integrated Developer Console**:
   - Bridges `console.log`, `console.info`, `console.warn`, and `console.error` directly from the running preview into an interactive drawer below the canvas.
   - Collapsible and resizable.

4. **Built-in Starter Templates**:
   - **⚡ Particle Network**: Single-file HTML5 Canvas + physics simulation.
   - **📦 Modular Kanban**: Multi-file ES Module architecture with separate state store and components.
   - **🎨 3D Tilt Glass Card**: CSS 3D perspective projection + interactive JavaScript specular highlights.
   - **📄 Blank Multi-File & Single-File** starters.

5. **Export & Sharing**:
   - **Single Standalone `.html`**: Inlines all virtual CSS and JavaScript files into one portable `.html` file that can be double-clicked and opened in any browser offline.
   - **Project `.zip`**: Exports individual files organized in a ZIP archive.
   - **Clipboard**: Copy bundled code in one click.

---

## 🏃 How to Run

Because this playground is pure client-side vanilla JavaScript, HTML, and CSS:

### Option A: Direct Open
Double-click [`index.html`](.../web-playground/index.html) in Windows File Explorer to open it in Chrome, Edge, or Firefox.

### Option B: Local Static Server (Recommended)
From PowerShell:
```powershell
cd C:\Users\Protyush\scratch\web-playground
# Using Python
python -m http.server 3000

# Or using npx
npx serve .
```
Then navigate to `http://localhost:3000`.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` (or `Cmd + Enter`) | Execute / Run Code |
| `Ctrl + S` | Save state and re-run |
| `Tab` | Indent (2 spaces) |
| `Shift + Tab` | Unindent |
| `Enter` | Auto-indent to current level |
