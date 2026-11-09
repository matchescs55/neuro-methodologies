import { GUIDE_TOPICS } from "./synthia-guide";

/**
 * Real progress data, saved in the visitor's own browser.
 * Guide topic number i matches course module number i + 1.
 */
export type ProgressState = {
  /** Tips the visitor has read, stored as "topicIndex:tipIndex". */
  seen: string[];
  /** Topic indexes whose challenge was answered correctly. */
  mastered: number[];
  /** How many challenge answers were submitted (right or wrong). */
  attempts: number;
};

export const EMPTY_PROGRESS: ProgressState = {
  seen: [],
  mastered: [],
  attempts: 0,
};

export type Stats = {
  perTopic: number[];
  overall: number;
  xp: number;
  level: number;
  badges: Record<"tip" | "answer" | "master" | "all", boolean>;
};

export function computeStats(progress: ProgressState): Stats {
  const perTopic = GUIDE_TOPICS.map((topic, i) => {
    const seen = topic.tips.filter((_, j) =>
      progress.seen.includes(`${i}:${j}`),
    ).length;
    const tipsPart = (seen / topic.tips.length) * 50;
    const masteredPart = progress.mastered.includes(i) ? 50 : 0;
    return Math.round(tipsPart + masteredPart);
  });

  const overall = Math.round(
    perTopic.reduce((sum, v) => sum + v, 0) / GUIDE_TOPICS.length,
  );
  const xp = progress.seen.length * 10 + progress.mastered.length * 40;

  return {
    perTopic,
    overall,
    xp,
    level: Math.floor(xp / 100) + 1,
    badges: {
      tip: progress.seen.length >= 1,
      answer: progress.attempts >= 1,
      master: progress.mastered.length >= 1,
      all: progress.mastered.length >= GUIDE_TOPICS.length,
    },
  };
}
