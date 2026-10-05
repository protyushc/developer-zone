# 🚀 Web Playground

A lightweight, zero-dependency, self-contained HTML, JavaScript, and CSS playground with real-time execution, virtual multi-file support, native ES module bundling, and an integrated developer console.

---

## 🌟 Key Features

1. **Syntax Color Coding & Code Intelligence**:
   - Integrated CodeMirror engine with automatic language mode switching (`htmlmixed`, `javascript`, `css`, `json`).
   - Theme-adaptive color schemes (**Dracula** for dark theme, **Eclipse** for light theme).
   - 100% self-contained and offline-ready with all vendor libraries (CodeMirror, JSZip, and typography) vendored locally.

2. **Single-File & Multi-File Architecture**:
   - **Single-File Mode**: Edit self-contained HTML with embedded `<style>` and `<script>` blocks (e.g., quick prototypes, canvas animations).
   - **Multi-File Mode**: Create and organize multiple virtual files (e.g. `index.html`, `style.css`, `store.js`, `utils.js`).
   - **Native ES Modules**: Resolves `import { foo } from './helper.js'` out-of-the-box using dynamic in-browser `<script type="importmap">` generation without needing Webpack or Vite.
   - **Virtual CSS Linking**: Automatically resolves `<link rel="stylesheet" href="style.css">` against virtual files.

3. **Sandboxed Live Preview**:
   - Debounced live reloading as you type, with an instant **Run** button (`Ctrl + Enter`).
   - Isolated `iframe` environment with an error boundary catching uncaught exceptions and rejected promises.
   - Expand preview to a new browser window anytime.

4. **Integrated Developer Console**:
   - Bridges `console.log`, `console.info`, `console.warn`, and `console.error` directly from the running preview into an interactive drawer below the canvas.
   - Collapsible and resizable with live log counter and error highlights.

5. **Built-in Starter Templates**:
   - **⚡ Particle Network**: Single-file HTML5 Canvas + physics simulation (with touch support).
   - **📦 Modular Kanban**: Multi-file ES Module architecture with separate state store and components.
   - **🎨 3D Tilt Glass Card**: CSS 3D perspective projection + interactive touch & mouse specular highlights.
   - **📄 Blank Multi-File & Single-File** starters.

6. **Mobile-Ready & Touch-Optimized**:
   - **Responsive View Switching**: Intuitive bottom navigation bar on mobile to switch between **Files**, **Code**, **Preview**, and **Console**.
   - **Touch-Friendly Controls**: Touch targets sized for mobile ergonomics (>= 44px), Pointer-Events-powered splitters, and iOS Safari zoom prevention (`font-size: 16px` inputs).
   - **Dynamic Viewports & Notches**: Utilizes `100dvh` dynamic viewports and safe-area insets (`viewport-fit=cover`).
   - **Mobile Options Drawer**: Slide-up sheet for loading templates, live preview toggles, code formatting, and exports.
   - **Responsive Live Preview**: Injects `<meta name="viewport">` into sandboxed output if not specified.

7. **Progressive Web App (PWA) & Offline Capability**:
   - **Installable Native Window**: Built-in **Install App** button in the desktop top-bar and mobile options drawer triggering native app installation (`beforeinstallprompt`).
   - **Cross-Platform Install Guide**: Integrated install modal providing step-by-step guidance for Chrome, Edge, Safari iOS (Add to Home Screen), and Android.
   - **Complete Offline Support**: Powered by a Service Worker (`sw.js`) that pre-caches all core assets and local vendor dependencies (CodeMirror, JSZip, fonts).
   - **App Manifest**: Web App Manifest (`manifest.json`) with standard and maskable icons (192px and 512px) and quick template launch shortcuts.

8. **Export & Sharing**:
   - **Single Standalone `.html`**: Inlines all virtual CSS and JavaScript files into one portable `.html` file that can be double-clicked and opened in any browser offline.
   - **Project `.zip`**: Exports individual files organized in a ZIP archive.
   - **Clipboard**: Copy bundled code in one click.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` (or `Cmd + Enter`) | Execute / Run Code |
| `Ctrl + S` | Save state and re-run |
| `Tab` | Indent (2 spaces) |
| `Shift + Tab` | Unindent |
| `Enter` | Auto-indent to current level |

---

## 📁 Project Structure

```text
web-playground/
├── index.html              # Main application shell & workbench UI
├── manifest.json           # PWA Web App Manifest
├── sw.js                   # Root-scoped Service Worker for 100% offline support
├── assets/                 # Application assets (styles, scripts, icons)
│   ├── css/
│   │   └── styles.css      # Core theme styles, layouts, and components
│   ├── js/
│   │   └── app.js          # Core application logic & PWA controller
│   └── icons/              # Standard & maskable PWA app icons (192, 512, SVG)
│       ├── icon-192.png
│       ├── icon-512.png
│       ├── icon-maskable-192.png
│       ├── icon-maskable-512.png
│       ├── icon.svg
│       └── icon-maskable.svg
└── vendor/                 # Self-contained local dependencies (zero CDN reliance)
    ├── codemirror/         # Syntax highlighting engine, themes & modes
    ├── fonts/              # Offline typography (.woff2)
    └── jszip/              # Client-side zip generation
```
