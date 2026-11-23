import { useCallback, useEffect, useRef, useState } from 'react';

const synth = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

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

/** 包裝 Web Speech API：朗讀單句或依序朗讀多句，並回報目前正在念的 id */
export function useSpeech() {
  const [voices, setVoices] = useState([]);
  const [speakingId, setSpeakingId] = useState(null);
  const token = useRef(0);

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
    setSpeakingId(null);
  }, []);

  /** items: [{ id, text }] */
  const speakSequence = useCallback(
    (items, lang, rate = 1) => {
      if (!synth || items.length === 0) return;
      synth.cancel();
      const my = ++token.current;
      const voice = pickVoice(voices, lang);
      items.forEach((item, i) => {
        const u = new SpeechSynthesisUtterance(item.text);
        u.lang = lang;
        u.rate = rate;
        if (voice) u.voice = voice;
        u.onstart = () => token.current === my && setSpeakingId(item.id);
        if (i === items.length - 1) {
          u.onend = u.onerror = () => token.current === my && setSpeakingId(null);
        }
        synth.speak(u);
      });
    },
    [voices],
  );

  const speak = useCallback((id, text, lang, rate) => speakSequence([{ id, text }], lang, rate), [speakSequence]);

  const hasVoiceFor = useCallback((lang) => voices.length === 0 || !!pickVoice(voices, lang), [voices]);

  return { supported: !!synth, speak, speakSequence, stop, speakingId, hasVoiceFor };
}
