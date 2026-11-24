import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// GitHub Pages 會讓瀏覽器快取 index.html 約 10 分鐘。
// 開啟時以不快取的方式比對最新的 index.html，若程式檔名不同就自動重新載入一次。
function checkForUpdate() {
  if (!/^https?:$/.test(location.protocol)) return;
  const current = document.querySelector('script[type="module"][src]')?.getAttribute('src');
  if (!current) return;
  fetch(location.pathname, { cache: 'no-store' })
    .then((r) => (r.ok ? r.text() : ''))
    .then((html) => {
      const latest = html.match(/<script[^>]+type="module"[^>]+src="([^"]+)"/)?.[1];
      if (!latest || latest === current) return;
      let reloaded = '';
      try { reloaded = sessionStorage.getItem('sil-reloaded-for') || ''; } catch { /* ignore */ }
      if (reloaded === latest) return; // 避免無限重新載入
      try { sessionStorage.setItem('sil-reloaded-for', latest); } catch { /* ignore */ }
      location.reload();
    })
    .catch(() => {});
}
checkForUpdate();
document.addEventListener('visibilitychange', () => document.visibilityState === 'visible' && checkForUpdate());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
