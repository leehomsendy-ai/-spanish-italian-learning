// 將 vite build 的結果內嵌成單一 HTML 片段（dist/artifact.html），用於發佈成 claude.ai Artifact 公開網頁
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';

const assets = readdirSync('dist/assets');
const css = readFileSync(`dist/assets/${assets.find((f) => f.endsWith('.css'))}`, 'utf8');
const js = readFileSync(`dist/assets/${assets.find((f) => f.endsWith('.js'))}`, 'utf8').replace(/<\/script/gi, '<\\/script');

const html = `<title>西義雙語學習</title>
<style>${css}</style>
<div id="root"></div>
<script type="module">${js}</script>
`;
writeFileSync('dist/artifact.html', html);
console.log(`dist/artifact.html ${(html.length / 1024).toFixed(1)} KB`);
