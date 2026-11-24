import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 相對路徑，讓網站可放在 GitHub Pages 的子路徑下
  base: './',
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5173 },
});
