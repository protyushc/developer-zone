# 🚀 Developer Zone

A lightweight, zero-dependency, self-contained web development workbench, live code playground, Regular Expression checker, and Cron expression evaluator with real-time execution, virtual multi-file support, native ES module bundling, integrated developer console, and 100% offline Progressive Web App (PWA) capabilities.

---

## 🌟 Key Features

1. **Regular Expression Checker (DevTools)**:
   - **Live RegExp Compilation & Testing**: Real-time evaluation as you type with flag toggles (`g` global, `i` case-insensitive, `m` multiline, `s` dotAll, `u` unicode).
   - **Visual Match Highlighting**: Color-coded alternating marks (`match-a`, `match-b`) highlighting matches directly inside the test text with index tracking.
   - **Capture Group Extraction Table**: Detailed table listing each match number, string span indices, matched text, and isolated capture groups (`$1`, `$2`, etc.).
   - **Live Substitution & Replacement**: Test replacement patterns (including `$1`, `$&`) with instantaneous live preview and one-click clipboard copy.
   - **Curated Regex Presets**: Instant starter patterns for Email, Web URL, IPv4 Address, ISO 8601 Date, International Phone, HEX Color, UUID v4, HTML Tag matching, URL Slug, and Strong Password.

2. **Cron Expression Evaluator (DevTools)**:
   - **5-Field POSIX Cron Parser**: Full support for `minute`, `hour`, `day-of-month`, `month`, and `day-of-week` with numbers, ranges (`-`), lists (`,`), steps (`/`), wildcards (`*`), and month/day names (`JAN-DEC`, `SUN-SAT`).
   - **Plain-English Schedule Translation**: Automatic conversion of cron syntax into intuitive sentences (e.g. *"Runs every 15 minutes"*, *"Runs at 09:00, Monday through Friday"*).
   - **5-Field Visual Breakdown**: Individual inspection cards detailing each field's token, bounds, and purpose.
   - **Upcoming Schedule Timeline**: Calculates and displays the next 5 upcoming executions in local time with formatted timestamps and relative countdowns (*"in 14 minutes"*, *"in 3 hours"*).
   - **Common Schedule Presets**: Quick-select expressions for every minute, every 5/15 minutes, hourly, daily at midnight, weekdays at 9am, weekly on Sunday, monthly, and yearly.

3. **Syntax Color Coding & Code Intelligence**:
   - Integrated CodeMirror engine with automatic language mode switching (`htmlmixed`, `javascript`, `css`, `json`).
   - Theme-adaptive color schemes (**Dracula** for dark theme, **Eclipse** for light theme).
   - 100% self-contained and offline-ready with all vendor libraries (CodeMirror, JSZip, and typography) vendored locally.

4. **Single-File & Multi-File Architecture**:
   - **Single-File Mode**: Edit self-contained HTML, JavaScript, CSS, or JSON files.
   - **Multi-File Mode**: Create and organize multiple virtual files (e.g. `index.html`, `style.css`, `script.js`, `data.json`).
   - **Native ES Modules & JSON Imports**: Resolves `import { foo } from './helper.js'` and `import data from './data.json'` out-of-the-box using dynamic in-browser `<script type="importmap">` generation without needing Webpack or Vite.
   - **Virtual CSS Linking**: Automatically resolves `<link rel="stylesheet" href="style.css">` against virtual files.

5. **Sandboxed Live Preview & Output Panel Rendering**:
   - Debounced live reloading as you type, with an instant **Run** button (`Ctrl + Enter`).
   - **Conditional Output Rendering**:
     - **HTML Present**: If the project contains an HTML file or if HTML is generated/rendered dynamically via a JavaScript file, renders the resulting webpage normally in the Output panel.
     - **No HTML Present**: If the project only contains JSON, CSS, or a JS file (without HTML generation), does not render a webpage and displays `"There is no html to render"`.
   - Isolated `iframe` environment with an error boundary catching uncaught exceptions and rejected promises.
   - Expand preview to a new browser window anytime.

6. **Integrated Developer Console**:
   - **Direct JS Execution**: Run JavaScript files directly in the console when there is no HTML to render, streaming `console.log`, warnings, and errors into the drawer.
   - **JSON Import Support**: JavaScript files can import JSON files (`import data from './data.json'`) within the execution environment.
   - Resizable drawer with live log counter and error highlights.
   - Physically preserved in the UI layout at all times as a blank, empty panel when not required to prevent structural shifts.

7. **Starter Templates (Web Tools)**:
   - **Template 1: JSON**: A single `data.json` file containing a simple object with exactly one property (`{"greeting": "hello"}`).
   - **Template 2: HTML**: A single `index.html` file containing `"Hello World"` text, inline CSS styling, and a button with inline JavaScript triggering an alert on click.
   - **Template 3: JS**: A single `script.js` file that dynamically creates and appends HTML to the DOM, rendering a button that triggers an alert on click.
   - **Template 4: Multi-file**: A project containing 3 separate files (`index.html`, `style.css`, and `script.js`) linked together.

8. **Mobile-Ready & Touch-Optimized**:
   - **Responsive View Switching**: Intuitive bottom navigation bar on mobile to switch between **Files**, **Code**, **Preview**, and **Console**.
   - **Touch-Friendly Controls**: Touch targets sized for mobile ergonomics (>= 44px), Pointer-Events-powered splitters, and iOS Safari zoom prevention (`font-size: 16px` inputs).
   - **Dynamic Viewports & Notches**: Utilizes `100dvh` dynamic viewports and safe-area insets (`viewport-fit=cover`).
   - **Mobile Options Drawer**: Slide-up sheet for loading templates, live preview toggles, DevTools, code formatting, and exports.

9. **Progressive Web App (PWA) & Offline Capability**:
   - **Installable Native Window**: Built-in **Install App** button in the desktop top-bar and mobile options drawer triggering native app installation (`beforeinstallprompt`).
   - **Cross-Platform Install Guide**: Integrated install modal providing step-by-step guidance for Chrome, Edge, Safari iOS (Add to Home Screen), and Android.
   - **High-DPI App Icons & Favicon**: Complete raster PNG icon suite (`16x16` up to `512x512`) and `favicon.ico` for sharp rendering across Windows taskbar/desktop, Chrome, and Android.
   - **Complete Offline Support**: Powered by a root-scoped Service Worker bridge (`sw.js`) that imports `pwa/sw.js` to pre-cache all core assets and local vendor dependencies (CodeMirror, JSZip, fonts).
   - **Web App Manifest**: Modular `pwa/manifest.json` configured with `id: "developer-zone-app"`, `name: "Developer Zone"`, `short_name: "Developer Zone"`, standalone display mode, and quick launch shortcuts.

10. **Export & Sharing**:
    - **Single Standalone `.html`**: Inlines all virtual CSS and JavaScript files into one portable `.html` file that can be double-clicked and opened in any browser offline.
    - **Project `.zip`**: Exports individual files organized in a ZIP archive (`developer_zone_project.zip`).
    - **Clipboard**: Copy bundled code in one click.

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl + Enter` (or `Cmd + Enter`) | Execute / Run Code |
| `Ctrl + S` | Save state and re-run |
| `Ctrl + Shift + R` | Open Regular Expression Checker |
| `Ctrl + Shift + C` | Open Cron Expression Evaluator |
| `Escape` | Close active dialog / DevTools modal |
| `Tab` | Indent (2 spaces) |
| `Shift + Tab` | Unindent |
| `Enter` | Auto-indent to current level |

---

## 📁 Project Structure

```text
developer-zone/
├── index.html              # Main application shell, workbench UI & DevTools modals
├── sw.js                   # Root-scoped Service Worker bridge (loads pwa/sw.js)
├── favicon.ico             # Native browser & desktop favicon
├── pwa/                    # Progressive Web App definitions & offline engine
│   ├── manifest.json       # PWA Web App Manifest (Developer Zone)
│   ├── sw.js               # Service Worker implementation & precache controller
│   └── build-png-icons.ps1 # Offline icon generation utility
├── assets/                 # Application assets (styles, scripts, icons)
│   ├── css/
│   │   └── styles.css      # Core theme styles, DevTools layouts & components
│   ├── js/
│   │   └── app.js          # Core application logic, RegEx/Cron tools & PWA controller
│   └── icons/              # Full raster PNG suite & SVG icons (16px to 512px)
│       ├── icon-16.png
│       ├── icon-32.png
│       ├── icon-48.png
│       ├── icon-72.png
│       ├── icon-96.png
│       ├── icon-128.png
│       ├── icon-144.png
│       ├── icon-192.png
│       ├── icon-256.png
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

---

## 👨‍💻 Developer

Developed by **Protyush**.

