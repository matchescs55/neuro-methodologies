"use client";

import { useEffect, useState } from "react";
import { SynthiaAvatar } from "../synthia/SynthiaAvatar";
import {
  SYNTHIA_STATES,
  SYNTHIA_STATE_INFO,
  type SynthiaState,
} from "../synthia/synthia-states";
import { SectionHeading } from "../ui/SectionHeading";

const MESSAGES: Record<SynthiaState, string> = {
  idle: "Hi, I am SYNTHIA! I am your learning companion. Ask me anything about how the brain learns.",
  listening: "Tell me what you would like to learn today. I am all ears!",
  thinking: "Hmm, let me connect a few ideas for you...",
  speaking:
    "Here is a tip: quizzing yourself beats rereading. Try recalling it before you look!",
  celebrating: "You finished a module. Fantastic progress, keep going!",
};

const TRAITS = ["Curious", "Warm", "Clear", "Encouraging"];

export function SynthiaIntro() {
  const [index, setIndex] = useState(0);
  const [auto, setAuto] = useState(true);
  const state = SYNTHIA_STATES[index];

  // Gently cycle through SYNTHIA's moods until the visitor picks one.
  useEffect(() => {
    if (!auto) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % SYNTHIA_STATES.length),
      4500,
    );
    return () => clearInterval(id);
  }, [auto]);

  return (
    <section id="synthia" className="scroll-mt-20 px-6 py-20">
      <SectionHeading
        eyebrow="Your companion"
        title="Meet SYNTHIA"
        description="An intelligent, expressive guide who explains complex ideas simply, asks great questions and celebrates your progress."
      />

      <div className="mx-auto grid max-w-5xl items-center gap-10 rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur md:grid-cols-[auto_1fr] md:p-12">
        <div className="flex justify-center">
          <SynthiaAvatar state={state} size={220} />
        </div>

        <div>
          {/* Speech bubble */}
          <div
            aria-live="polite"
            className="relative rounded-2xl border border-neon-violet/30 bg-navy-800/60 p-5 text-lg"
          >
            <span className="absolute -top-2 left-10 size-4 rotate-45 border-l border-t border-neon-violet/30 bg-navy-800 md:-left-2 md:top-10 md:-rotate-45" />
            {MESSAGES[state]}
          </div>

          {/* State picker */}
          <div className="mt-6 flex flex-wrap gap-2">
            {SYNTHIA_STATES.map((s, i) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setIndex(i);
                  setAuto(false);
                }}
                className={`rounded-full border px-4 py-1.5 text-sm capitalize transition ${
                  s === state
                    ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                    : "border-white/15 text-foreground/70 hover:border-neon-violet"
                }`}
                title={SYNTHIA_STATE_INFO[s].description}
              >
                {s}
              </button>
            ))}
          </div>

          {/* Personality */}
          <div className="mt-6 flex flex-wrap gap-2">
            {TRAITS.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neon-violet/20 px-3 py-1 text-xs font-medium text-soft-purple"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="mt-6 text-sm text-soft-purple/60">
            Live conversation with SYNTHIA is coming in an upcoming update.
          </p>
        </div>
      </div>
    </section>
  );
}
