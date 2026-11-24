import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// 版本標記：建置時間（台北時間），顯示在頁尾，方便確認是否為最新版
const BUILD = new Date().toLocaleString('sv-SE', { timeZone: 'Asia/Taipei' }).slice(0, 16);

export default defineConfig({
  define: { __BUILD__: JSON.stringify(BUILD) },
  // 相對路徑，讓網站可放在 GitHub Pages 的子路徑下
  base: './',
  plugins: [react(), tailwindcss()],
  server: { host: true, port: 5173 },
});
