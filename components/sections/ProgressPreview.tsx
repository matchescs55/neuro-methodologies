"use client";

import { COURSE_MODULES } from "../../lib/course-modules";
import { computeStats } from "../../lib/progress-stats";
import { useProgress } from "../progress/ProgressProvider";
import { SectionHeading } from "../ui/SectionHeading";

const BADGES = [
  { id: "tip", icon: "★", name: "First Tip", how: "Read a tip from SYNTHIA" },
  { id: "answer", icon: "✦", name: "First Answer", how: "Answer a SYNTHIA challenge" },
  { id: "master", icon: "◆", name: "Topic Master", how: "Master one topic" },
  { id: "all", icon: "●", name: "Neuro-Learner", how: "Master all five topics" },
] as const;

/** Real progress, driven by what the visitor does with SYNTHIA. */
export function ProgressPreview() {
  const { progress, reset } = useProgress();
  const stats = computeStats(progress);
  const started = progress.seen.length > 0 || progress.attempts > 0;

  return (
    <section id="progress" className="scroll-mt-20 px-6 py-20">
      <SectionHeading
        eyebrow="Track your growth"
        title="Progress and achievements"
        description="Learn with SYNTHIA and watch your progress and badges update."
      />

      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <span className="inline-block rounded-full bg-neon-violet/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-soft-purple">
            Saved in this browser
          </span>
          {started ? (
            <button
              type="button"
              onClick={reset}
              className="rounded-full border border-white/15 px-4 py-1.5 text-xs text-foreground/70 transition hover:border-red-400/60 hover:text-red-200"
            >
              Reset progress
            </button>
          ) : (
            <a
              href="#synthia"
              className="rounded-full bg-linear-to-r from-neon-cyan to-neon-violet px-4 py-1.5 text-xs font-semibold text-navy-950"
            >
              Start with SYNTHIA
            </a>
          )}
        </div>

        <div className="grid gap-10 md:grid-cols-[auto_1fr]">
          {/* Overall ring */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex size-36 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#22d3ee 0 ${stats.overall}%, rgba(255,255,255,0.1) ${stats.overall}% 100%)`,
              }}
            >
              <div className="flex size-28 flex-col items-center justify-center rounded-full bg-navy-900">
                <span className="font-display text-3xl font-bold">
                  {stats.overall}%
                </span>
                <span className="text-xs text-soft-purple/70">complete</span>
              </div>
            </div>
            <p className="text-sm text-soft-purple/80">
              Level {stats.level} · {stats.xp} XP
            </p>
          </div>

          {/* Module bars */}
          <div className="space-y-5">
            {COURSE_MODULES.map((m, i) => (
              <div key={m.id}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="truncate pr-4">{m.title}</span>
                  <span className="text-soft-purple/70">
                    {stats.perTopic[i]}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${m.gradient} transition-all duration-500`}
                    style={{ width: `${stats.perTopic[i]}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {BADGES.map((b) => {
            const unlocked = stats.badges[b.id];
            return (
              <div
                key={b.id}
                className={`rounded-2xl border p-4 text-center ${
                  unlocked
                    ? "border-neon-cyan/40 bg-neon-cyan/10"
                    : "border-white/10 bg-white/5 opacity-60"
                }`}
              >
                <div
                  className={`mx-auto flex size-12 items-center justify-center rounded-full text-xl ${
                    unlocked
                      ? "bg-linear-to-br from-neon-cyan to-neon-violet text-navy-950"
                      : "bg-white/10"
                  }`}
                >
                  {b.icon}
                </div>
                <p className="mt-3 text-sm font-medium">{b.name}</p>
                <p className="text-xs text-soft-purple/70">
                  {unlocked ? "Unlocked" : b.how}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
