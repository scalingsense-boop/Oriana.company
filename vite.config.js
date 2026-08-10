import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === 'build' ? [viteSingleFile()] : [])],
  server: {
    port: Number(process.env.PORT) || 5173,
  },
}));
