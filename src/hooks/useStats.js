import { useCallback, useEffect, useState } from 'react';
import { load, save } from '../storage.js';

const EMPTY = {
  sessionAnswered: 0,
  sessionCorrect: 0,
  streak: 0,
  bestStreak: 0,
  totalAnswered: 0,
  totalCorrect: 0,
};

/** 每種語言各自記錄答題統計，儲存在 localStorage */
export function useStats(langCode) {
  const key = `sil-stats-${langCode}`;
  const [stats, setStats] = useState(() => load(key, EMPTY));

  useEffect(() => setStats(load(key, EMPTY)), [key]);

  const update = useCallback(
    (fn) =>
      setStats((prev) => {
        const next = fn(prev);
        save(key, next);
        return next;
      }),
    [key],
  );

  const record = useCallback(
    (correct) =>
      update((s) => {
        const streak = correct ? s.streak + 1 : 0;
        return {
          ...s,
          sessionAnswered: s.sessionAnswered + 1,
          sessionCorrect: s.sessionCorrect + (correct ? 1 : 0),
          totalAnswered: s.totalAnswered + 1,
          totalCorrect: s.totalCorrect + (correct ? 1 : 0),
          streak,
          bestStreak: Math.max(s.bestStreak, streak),
        };
      }),
    [update],
  );

  const resetSession = useCallback(() => update((s) => ({ ...s, sessionAnswered: 0, sessionCorrect: 0 })), [update]);
  const resetAll = useCallback(() => update(() => EMPTY), [update]);

  return { stats, record, resetSession, resetAll };
}
