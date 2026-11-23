# 西義雙語學習 · Español & Italiano

使用 Vite + React + Tailwind CSS 製作的西班牙文／義大利文學習單頁應用程式。全部在瀏覽器執行，不需要後端。

## 快速開始

```bash
npm install
npm run dev        # 開發模式：http://localhost:5173
npm run build      # 打包到 dist/，可用 npm run preview 預覽
```

## 功能

| 模組 | 內容 |
| --- | --- |
| 💬 情境對話 | 點餐、問路、購物、旅遊；每句可朗讀（es-ES / it-IT）、0.7x / 1.0x 語速、翻譯可逐句或全部顯示 |
| 📖 短文閱讀 | 100–200 字文化短文；高亮單字滑過／點擊顯示詞性、原形、中文；附是非題與選擇題 |
| ✏️ 互動題庫 | 動詞變位填空、單字／文法選擇、句子重組；即時對錯與繁中文法解析；答對率與連勝存於 localStorage |

頂部可切換語言與難度（A1 / A2 / B1），設定會自動記住。

## 擴充資料

所有內容都在 `src/data/`：

- `spanish.js`、`italian.js`：對話（`dialogues`）、文章（`readings`）、題庫（`exercises`）
- `index.js`：註冊語言與難度

檔案開頭有格式說明。文章中用 `{{單字}}` 或 `{{顯示文字|vocab鍵值}}` 標記重點單字，並在 `vocab` 中補上解釋。

義大利文的餐廳對話與多數題庫改編自雲端硬碟中的課程講義與 Esercizi 練習卷（來源列在 `italian.js` 開頭）。

## 語音

朗讀使用瀏覽器內建的 Web Speech API。若裝置沒有安裝對應語言的語音，畫面會顯示提示（Windows 可在「設定 → 時間與語言 → 語音」新增；macOS / iOS 在「輔助使用 → 朗讀內容」）。
