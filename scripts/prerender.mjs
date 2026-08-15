// Build-time prerender: renders the full App to static HTML and injects it
// into dist/index.html's #root, so crawlers that don't execute JavaScript
// (GPTBot, PerplexityBot, ClaudeBot, and some traditional search bots) see
// the actual page content instead of an empty <div id="root"></div> shell.
//
// The client bundle still does a full createRoot().render() on load (not
// hydrateRoot), so there's no hydration-mismatch risk - the browser just
// paints the prerendered markup first, then React replaces it with an
// identical client-rendered tree once JS loads. Interactivity is unaffected.

import { JSDOM } from 'jsdom';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const distIndex = path.join(root, 'dist', 'index.html');

// --- 1. Set up a jsdom global environment BEFORE importing React/App ---
const dom = new JSDOM('<!doctype html><html><body><div id="root"></div></body></html>', {
  url: 'https://oriana.company/',
  pretendToBeVisual: true,
});

global.window = dom.window;
global.document = dom.window.document;

// Copy every enumerable window property (Element, SVGElement, HTMLElement,
// HTMLCanvasElement, CSS, etc.) onto global, so any library that references
// a browser constructor by its bare global name (not via window.X) finds it.
// navigator needs defineProperty since Node 21+ ships its own read-only one.
for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (key in global && !['window', 'document', 'navigator'].includes(key)) continue;
  try {
    Object.defineProperty(global, key, {
      value: dom.window[key],
      configurable: true,
      writable: true,
    });
  } catch {
    // a handful of window props are non-configurable getters on window
    // itself (location, top, etc.) - safe to skip, nothing here needs them.
  }
}

global.requestAnimationFrame = (cb) => setTimeout(cb, 16);
global.cancelAnimationFrame = (id) => clearTimeout(id);

// jsdom doesn't implement these - stub them so components that reference
// them at render/mount time (not just inside effects) don't throw.
class FakeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}
global.window.IntersectionObserver = FakeObserver;
global.IntersectionObserver = FakeObserver;
global.window.ResizeObserver = FakeObserver;
global.ResizeObserver = FakeObserver;

global.window.matchMedia = global.window.matchMedia || ((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener() {},
  removeListener() {},
  addEventListener() {},
  removeEventListener() {},
  dispatchEvent() { return false; },
}));

// Hero's particle canvas calls getContext('2d') in a useEffect (which
// doesn't run during static rendering), but stub it anyway as a safety net
// in case any component reads canvas dimensions at render time.
dom.window.HTMLCanvasElement.prototype.getContext = () => null;

// --- 2. Use Vite's SSR module loader to get a JSX-transformed App ---
// (Node can't import .jsx directly - Vite's own pipeline handles the
// transform the same way it does for the client build.)
const { createServer } = await import('vite');
const viteServer = await createServer({
  root,
  server: { middlewareMode: true },
  appType: 'custom',
});

const React = await import('react');
const { renderToStaticMarkup } = await import('react-dom/server');

let markup;
try {
  const { default: App } = await viteServer.ssrLoadModule('/src/App.ssr.jsx');
  markup = renderToStaticMarkup(React.createElement(App));
} catch (err) {
  console.error('Prerender failed - leaving dist/index.html as the empty-shell build output.');
  console.error(err);
  await viteServer.close();
  process.exit(1);
}
await viteServer.close();

// --- 3. Inject the rendered markup into the built index.html ---
let html = fs.readFileSync(distIndex, 'utf-8');
if (!html.includes('<div id="root"></div>')) {
  console.error('Could not find <div id="root"></div> in dist/index.html - aborting injection.');
  process.exit(1);
}
html = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
fs.writeFileSync(distIndex, html);

console.log(`Prerendered ${markup.length.toLocaleString()} chars of static HTML into dist/index.html`);
