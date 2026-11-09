import { SynthiaAvatar } from "../synthia/SynthiaAvatar";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-6 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        <div className="text-center md:text-left">
          <span className="inline-block rounded-full border border-neon-cyan/30 bg-neon-cyan/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-neon-cyan">
            Interactive learning platform
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-tight sm:text-6xl">
            Learn how{" "}
            <span className="bg-linear-to-r from-neon-cyan via-neon-violet to-soft-purple bg-clip-text text-transparent">
              learning
            </span>{" "}
            really works
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-soft-purple/80 md:mx-0">
            Neuro Methodologies blends neuroscience, active methodologies,
            play and adaptive AI into one interactive journey, guided by
            SYNTHIA, your virtual learning companion.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row md:justify-start">
            <a
              href="#modules"
              className="rounded-full bg-linear-to-r from-neon-cyan to-neon-violet px-8 py-3.5 text-center font-semibold text-navy-950 transition hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
            >
              Start the journey
            </a>
            <a
              href="#synthia"
              className="rounded-full border border-white/20 bg-white/5 px-8 py-3.5 text-center font-semibold transition hover:border-neon-violet hover:bg-neon-violet/20"
            >
              Meet SYNTHIA
            </a>
          </div>
        </div>

        <div className="flex justify-center">
          <SynthiaAvatar state="idle" size={260} />
        </div>
      </div>
    </section>
  );
}
