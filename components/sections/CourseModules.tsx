import { COURSE_MODULES } from "../../lib/course-modules";
import { SectionHeading } from "../ui/SectionHeading";

export function CourseModules() {
  return (
    <section id="modules" className="scroll-mt-20 px-6 py-20">
      <SectionHeading
        eyebrow="Curriculum"
        title="Five modules, one journey"
        description="From the science of the brain to the design of great learning experiences."
      />

      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-6">
        {COURSE_MODULES.map((m, i) => (
          <article
            key={m.id}
            className={`group rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur transition hover:-translate-y-1 hover:border-neon-cyan/40 hover:shadow-[0_0_40px_rgba(139,92,246,0.2)] ${
              i < 3 ? "lg:col-span-2" : "lg:col-span-3"
            }`}
          >
            <span
              className={`inline-flex size-12 items-center justify-center rounded-2xl bg-linear-to-br ${m.gradient} font-display text-lg font-bold text-navy-950`}
            >
              {String(m.id).padStart(2, "0")}
            </span>
            <h3 className="mt-5 font-display text-xl font-semibold">
              {m.title}
            </h3>
            <p className="mt-2 text-soft-purple/80">{m.summary}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {m.topics.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-foreground/80"
                >
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
