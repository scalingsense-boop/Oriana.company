import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Standard build (default): separate hashed JS/CSS chunks, cacheable and
// parallel-loadable - fastest for real visitors, use this for deploys.
// Single-file build (opt-in via SINGLEFILE=1): everything inlined into one
// index.html - slower to load but simplest for a one-shot manual upload.
export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === 'build' && process.env.SINGLEFILE ? [viteSingleFile()] : [])],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
  build: {
    sourcemap: false,
  },
}));
