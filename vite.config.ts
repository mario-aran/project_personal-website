// docs: https://vite.dev/config/

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), ''); // process.cwd requires "@types/node"

  return {
    plugins: [react(), tailwindcss()],
    server: { port: Number(env.VITE_PORT) || 5173 },
    resolve: {
      // Path aliases
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  };
});
