"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { EMPTY_PROGRESS, type ProgressState } from "../../lib/progress-stats";

const STORAGE_KEY = "neuro-methodologies-progress-v1";

type ProgressContextValue = {
  progress: ProgressState;
  markTip: (topic: number, tip: number) => void;
  markAttempt: () => void;
  markMastered: (topic: number) => void;
  reset: () => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<ProgressState>(EMPTY_PROGRESS);
  const [loaded, setLoaded] = useState(false);

  // Load saved progress once, after the page appears in the browser.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (
          saved &&
          Array.isArray(saved.seen) &&
          Array.isArray(saved.mastered) &&
          typeof saved.attempts === "number"
        ) {
          setProgress(saved as ProgressState);
        }
      }
    } catch {
      // Storage unavailable or corrupted: start fresh.
    }
    setLoaded(true);
  }, []);

  // Save whenever progress changes (but never before loading).
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch {
      // Ignore: progress just will not persist.
    }
  }, [progress, loaded]);

  const markTip = useCallback((topic: number, tip: number) => {
    const key = `${topic}:${tip}`;
    setProgress((p) =>
      p.seen.includes(key) ? p : { ...p, seen: [...p.seen, key] },
    );
  }, []);

  const markAttempt = useCallback(() => {
    setProgress((p) => ({ ...p, attempts: p.attempts + 1 }));
  }, []);

  const markMastered = useCallback((topic: number) => {
    setProgress((p) =>
      p.mastered.includes(topic)
        ? p
        : { ...p, mastered: [...p.mastered, topic] },
    );
  }, []);

  const reset = useCallback(() => setProgress(EMPTY_PROGRESS), []);

  const value = useMemo(
    () => ({ progress, markTip, markAttempt, markMastered, reset }),
    [progress, markTip, markAttempt, markMastered, reset],
  );

  return (
    <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextValue {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used inside ProgressProvider");
  return ctx;
}
