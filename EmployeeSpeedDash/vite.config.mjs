import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Polyfill __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const plugins = [react()];

if (process.env.REPL_ID) {
  const { default: runtimeErrorOverlay } = await import('@replit/vite-plugin-runtime-error-modal');
  const { cartographer } = await import('@replit/vite-plugin-cartographer');
  plugins.push(runtimeErrorOverlay(), cartographer());
}

export default defineConfig({
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'client', 'src'),
      '@shared': path.resolve(__dirname, 'shared'),
      '@assets': path.resolve(__dirname, 'attached_assets')
    }
  },
  root: path.resolve(__dirname, 'client'),
  build: {
    outDir: path.resolve(__dirname, 'dist/public'),
    emptyOutDir: true
  },
  server: {
    fs: {
      strict: true,
      deny: ['**/.*']
    }
  }
});
