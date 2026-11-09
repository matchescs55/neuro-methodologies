"use client";

import { useState } from "react";
import { SynthiaAvatar } from "../components/synthia/SynthiaAvatar";
import {
  SYNTHIA_STATES,
  SYNTHIA_STATE_INFO,
  type SynthiaState,
} from "../components/synthia/synthia-states";

/**
 * TEMPORARY test page for Stage 2.
 * It lets you preview every SYNTHIA state. Stage 3 replaces it
 * with the real homepage.
 */
export default function Home() {
  const [state, setState] = useState<SynthiaState>("idle");
  const info = SYNTHIA_STATE_INFO[state];

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-12 text-center">
      <h1 className="font-display text-3xl font-bold sm:text-5xl">
        <span className="bg-linear-to-r from-neon-cyan to-soft-purple bg-clip-text text-transparent">
          Meet SYNTHIA
        </span>
      </h1>

      <SynthiaAvatar state={state} size={280} />

      <div>
        <p className="font-display text-xl font-semibold text-neon-cyan">
          {info.label}
        </p>
        <p className="mt-1 max-w-sm text-sm text-soft-purple/80">
          {info.description}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-3">
        {SYNTHIA_STATES.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => setState(s)}
            className={`rounded-full border px-5 py-2 text-sm font-medium capitalize transition ${
              s === state
                ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan shadow-[0_0_20px_rgba(34,211,238,0.35)]"
                : "border-white/15 bg-white/5 text-foreground/80 hover:border-neon-violet hover:bg-neon-violet/20"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-6 pt-4">
        <SynthiaAvatar state={state} size={64} />
        <SynthiaAvatar state={state} size={96} />
        <SynthiaAvatar state={state} size={128} />
      </div>
      <p className="text-xs text-soft-purple/50">
        The same component at different sizes
      </p>
    </main>
  );
}
