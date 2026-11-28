/**
 * 把畫面上的文字轉成適合朗讀的文字（瀏覽器朗讀與預錄音檔共用）
 *   barato/a → barato, barata；A / B → A, B；去掉 ___、…、括號
 */
export function speechText(s) {
  return s
    .replace(/(\p{L}+)o\/a\b/gu, (_, w) => `${w}o, ${w}a`)
    .replace(/\s[/—]\s/g, ', ')
    .replace(/_{2,}/g, ' ')
    .replace(/[()…]/g, ' ')
    .replace(/\s+([,.?!])/g, '$1')
    .replace(/\.\s*,/g, ',')
    .replace(/,\s*,/g, ',')
    .replace(/\s+/g, ' ')
    .trim();
}

/** 音檔清單的查詢鍵 */
export const audioKey = (lang, text) => `${lang}|${speechText(text)}`;
