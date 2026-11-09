import { SectionHeading } from "../ui/SectionHeading";

const STEPS = [
  {
    title: "Discover",
    text: "Learn the science through short, guided lessons.",
  },
  {
    title: "Explore",
    text: "Ask SYNTHIA questions and take on curiosity challenges.",
  },
  {
    title: "Practice",
    text: "Try hands-on interactive activities.",
  },
  {
    title: "Reflect",
    text: "Apply each idea to your own teaching or design work.",
  },
  {
    title: "Celebrate",
    text: "Earn achievements and watch your progress grow.",
  },
];

export function LearningJourney() {
  return (
    <section id="journey" className="scroll-mt-20 px-6 py-20">
      <SectionHeading
        eyebrow="How it works"
        title="Your learning journey"
        description="Every module follows the same rhythm, designed around how the brain actually learns."
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Connecting line (desktop) */}
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-linear-to-r from-transparent via-neon-violet/60 to-transparent md:block" />

        <ol className="grid gap-8 md:grid-cols-5">
          {STEPS.map((s, i) => (
            <li key={s.title} className="relative text-center">
              <span className="relative z-10 mx-auto flex size-12 items-center justify-center rounded-full border border-neon-cyan/50 bg-navy-900 font-display font-bold text-neon-cyan shadow-[0_0_20px_rgba(34,211,238,0.3)]">
                {i + 1}
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold">
                {s.title}
              </h3>
              <p className="mt-2 text-sm text-soft-purple/80">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
