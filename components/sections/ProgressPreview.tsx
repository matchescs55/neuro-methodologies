import { COURSE_MODULES } from "../../lib/course-modules";
import { SectionHeading } from "../ui/SectionHeading";

/** SAMPLE data: this section is a visual preview, not real tracking yet. */
const ACHIEVEMENTS = [
  { icon: "★", name: "First Question", unlocked: true },
  { icon: "✦", name: "Memory Explorer", unlocked: true },
  { icon: "◆", name: "Playful Mind", unlocked: false },
  { icon: "●", name: "AI Pioneer", unlocked: false },
];

const OVERALL = 37;

export function ProgressPreview() {
  return (
    <section id="progress" className="scroll-mt-20 px-6 py-20">
      <SectionHeading
        eyebrow="Track your growth"
        title="Progress and achievements"
        description="See how far you have come and unlock badges along the way."
      />

      <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:p-10">
        <span className="mb-8 inline-block rounded-full bg-neon-violet/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-soft-purple">
          Preview · sample data
        </span>

        <div className="grid gap-10 md:grid-cols-[auto_1fr]">
          {/* Overall ring */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex size-36 items-center justify-center rounded-full"
              style={{
                background: `conic-gradient(#22d3ee 0 ${OVERALL}%, #8b5cf6 ${OVERALL}% ${OVERALL + 1}%, rgba(255,255,255,0.1) ${OVERALL + 1}% 100%)`,
              }}
            >
              <div className="flex size-28 flex-col items-center justify-center rounded-full bg-navy-900">
                <span className="font-display text-3xl font-bold">
                  {OVERALL}%
                </span>
                <span className="text-xs text-soft-purple/70">complete</span>
              </div>
            </div>
            <p className="text-sm text-soft-purple/80">Level 3 · 1,240 XP</p>
          </div>

          {/* Module bars */}
          <div className="space-y-5">
            {COURSE_MODULES.map((m) => (
              <div key={m.id}>
                <div className="mb-1.5 flex justify-between text-sm">
                  <span className="truncate pr-4">{m.title}</span>
                  <span className="text-soft-purple/70">
                    {m.sampleProgress}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${m.gradient}`}
                    style={{ width: `${m.sampleProgress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.name}
              className={`rounded-2xl border p-4 text-center ${
                a.unlocked
                  ? "border-neon-cyan/40 bg-neon-cyan/10"
                  : "border-white/10 bg-white/5 opacity-50"
              }`}
            >
              <div
                className={`mx-auto flex size-12 items-center justify-center rounded-full text-xl ${
                  a.unlocked
                    ? "bg-linear-to-br from-neon-cyan to-neon-violet text-navy-950"
                    : "bg-white/10"
                }`}
              >
                {a.icon}
              </div>
              <p className="mt-3 text-sm font-medium">{a.name}</p>
              <p className="text-xs text-soft-purple/60">
                {a.unlocked ? "Unlocked" : "Locked"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
