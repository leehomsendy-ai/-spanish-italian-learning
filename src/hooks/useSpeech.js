import { useCallback, useEffect, useRef, useState } from 'react';
import manifest from '../data/audio-manifest.json';
import { audioKey, speechText } from '../speechText.js';

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;
const canAudio = typeof window !== 'undefined' && typeof window.Audio !== 'undefined';

// 音檔網址前綴：一般網站用相對路徑；Claude 版建置時改成 GitHub Pages 的絕對網址
const AUDIO_BASE = import.meta.env.VITE_AUDIO_BASE || import.meta.env.BASE_URL;

/** 這句有沒有預錄音檔？有的話回傳網址 */
export function audioUrl(text, lang) {
  const path = manifest[audioKey(lang.slice(0, 2), text)];
  return path ? AUDIO_BASE + path : null;
}

/** 整段對話的音檔網址 */
export function dialogueAudioUrl(id) {
  const path = manifest[`dialogue|${id}`];
  return path ? AUDIO_BASE + path : null;
}

function pickVoice(voices, lang) {
  const norm = (l) => l.replace('_', '-').toLowerCase();
  const target = lang.toLowerCase();
  const prefix = target.slice(0, 2);
  return (
    voices.find((v) => norm(v.lang) === target && v.localService) ||
    voices.find((v) => norm(v.lang) === target) ||
    voices.find((v) => norm(v.lang).startsWith(prefix))
  );
}

/**
 * 朗讀：有預錄音檔就播音檔，沒有（或載入失敗）就改用瀏覽器的 Web Speech API。
 * 回報目前正在念的 id，讓畫面標示。
 */
export function useSpeech() {
  const [voices, setVoices] = useState([]);
  const [speakingId, setSpeakingId] = useState(null);
  const token = useRef(0);
  const audioEl = useRef(null); // 重複使用同一個 <audio>，iOS 上連續播放比較穩定

  useEffect(() => {
    if (!synth) return undefined;
    const update = () => setVoices(synth.getVoices());
    update();
    synth.addEventListener?.('voiceschanged', update);
    return () => {
      synth.removeEventListener?.('voiceschanged', update);
      synth.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    token.current += 1;
    synth?.cancel();
    audioEl.current?.pause();
    setSpeakingId(null);
  }, []);

  /** items: [{ id, text }]，依序念完 */
  const speakSequence = useCallback(
    (items, lang, rate = 1) => {
      if (items.length === 0) return;
      synth?.cancel();
      audioEl.current?.pause();
      const my = ++token.current;
      const voice = pickVoice(voices, lang);

      const tts = (text, done) => {
        if (!synth) return done();
        const u = new SpeechSynthesisUtterance(speechText(text));
        u.lang = lang;
        u.rate = rate;
        if (voice) u.voice = voice;
        u.onend = u.onerror = done;
        synth.speak(u);
      };

      const step = (i) => {
        if (token.current !== my) return;
        if (i >= items.length) return setSpeakingId(null);
        const item = items[i];
        setSpeakingId(item.id);
        let finished = false;
        const next = () => {
          if (finished) return;
          finished = true;
          step(i + 1);
        };
        const src = canAudio && audioUrl(item.text, lang);
        if (!src) return tts(item.text, next);

        if (!audioEl.current) audioEl.current = new Audio();
        const a = audioEl.current;
        let fellBack = false;
        const fallback = () => {
          if (fellBack || finished || token.current !== my) return;
          fellBack = true;
          tts(item.text, next);
        };
        a.onended = next;
        a.onerror = fallback;
        a.src = src;
        a.playbackRate = rate;
        a.preservesPitch = true;
        a.play().catch(fallback);
      };
      step(0);
    },
    [voices],
  );

  const speak = useCallback((id, text, lang, rate) => speakSequence([{ id, text }], lang, rate), [speakSequence]);

  const hasVoiceFor = useCallback((lang) => voices.length === 0 || !!pickVoice(voices, lang), [voices]);

  return { supported: !!synth || canAudio, speak, speakSequence, stop, speakingId, hasVoiceFor };
}
