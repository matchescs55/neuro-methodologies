"use client";

import { useEffect, useRef, useState } from "react";
import { SynthiaAvatar } from "./SynthiaAvatar";
import type { SynthiaState } from "./synthia-states";
import { GREETING, GUIDE_TOPICS } from "../../lib/synthia-guide";

type View =
  | { kind: "welcome" }
  | { kind: "tip"; topic: number; tip: number }
  | { kind: "challenge"; topic: number; picked: number | null };

export function SynthiaGuide() {
  const [view, setView] = useState<View>({ kind: "welcome" });
  const [bubble, setBubble] = useState(GREETING);
  const [mood, setMood] = useState<SynthiaState>("idle");
  const [done, setDone] = useState<number[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stop any pending timer when the component disappears.
  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  /** SYNTHIA says something, shows a mood, then goes back to idle. */
  function speak(text: string, nextMood: SynthiaState = "speaking") {
    setBubble(text);
    setMood(nextMood);
    if (timer.current) clearTimeout(timer.current);
    const ms =
      nextMood === "celebrating" ? 3500 : Math.min(4000, 800 + text.length * 30);
    timer.current = setTimeout(() => setMood("idle"), ms);
  }

  function pickTopic(i: number) {
    setView({ kind: "tip", topic: i, tip: 0 });
    speak(GUIDE_TOPICS[i].tips[0]);
  }

  function nextTip() {
    if (view.kind !== "tip") return;
    const topic = GUIDE_TOPICS[view.topic];
    if (view.tip < topic.tips.length - 1) {
      const next = view.tip + 1;
      setView({ kind: "tip", topic: view.topic, tip: next });
      speak(topic.tips[next]);
    } else {
      setView({ kind: "challenge", topic: view.topic, picked: null });
      speak("Challenge time! Pick the best answer.");
    }
  }

  function answer(optionIndex: number) {
    if (view.kind !== "challenge") return;
    const topic = GUIDE_TOPICS[view.topic];
    const correct = optionIndex === topic.challenge.correctIndex;
    setView({ kind: "challenge", topic: view.topic, picked: optionIndex });

    if (correct) {
      const nextDone = done.includes(view.topic) ? done : [...done, view.topic];
      setDone(nextDone);
      if (nextDone.length === GUIDE_TOPICS.length) {
        speak(
          "You mastered all five topics! You are a true neuro-learner. Fantastic work!",
          "celebrating",
        );
      } else {
        speak(`Correct! ${topic.challenge.explanation}`, "celebrating");
      }
    } else {
      speak("Not quite, but good thinking. Try another answer!");
    }
  }

  const activeTopic = view.kind === "welcome" ? -1 : view.topic;
  const challengeTopic =
    view.kind === "challenge" ? GUIDE_TOPICS[view.topic] : null;
  const solved =
    view.kind === "challenge" &&
    view.picked === GUIDE_TOPICS[view.topic].challenge.correctIndex;

  return (
    <div className="mx-auto grid max-w-5xl gap-8 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur md:grid-cols-[220px_1fr] md:p-10">
      {/* Avatar + progress */}
      <div className="flex flex-col items-center gap-3">
        <SynthiaAvatar state={mood} size={200} />
        <p className="font-display text-sm font-semibold capitalize text-neon-cyan">
          {mood}
        </p>
        <div
          className="flex items-center gap-1.5"
          aria-label={`${done.length} of ${GUIDE_TOPICS.length} topics mastered`}
        >
          {GUIDE_TOPICS.map((t, i) => (
            <span
              key={t.id}
              className={`size-2.5 rounded-full ${
                done.includes(i)
                  ? "bg-neon-cyan shadow-[0_0_10px_rgba(34,211,238,0.8)]"
                  : "bg-white/15"
              }`}
            />
          ))}
        </div>
        <p className="text-xs text-soft-purple/70">
          {done.length}/{GUIDE_TOPICS.length} topics mastered
        </p>
      </div>

      {/* Dialogue */}
      <div className="flex min-w-0 flex-col gap-5">
        <div
          aria-live="polite"
          className="rounded-2xl rounded-tl-sm border border-neon-violet/30 bg-navy-800/60 p-5 text-base sm:text-lg"
        >
          {bubble}
        </div>

        {/* Topic picker */}
        <div className="flex flex-wrap gap-2">
          {GUIDE_TOPICS.map((t, i) => (
            <button
              key={t.id}
              type="button"
              onClick={() => pickTopic(i)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                i === activeTopic
                  ? "border-neon-cyan bg-neon-cyan/20 text-neon-cyan"
                  : "border-white/15 bg-white/5 text-foreground/80 hover:border-neon-violet hover:bg-neon-violet/15"
              }`}
            >
              {done.includes(i) && <span className="mr-1">✓</span>}
              {t.label}
            </button>
          ))}
        </div>

        {/* Tip controls */}
        {view.kind === "tip" && (
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={nextTip}
              className="rounded-full bg-linear-to-r from-neon-cyan to-neon-violet px-6 py-3 font-semibold text-navy-950 transition hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            >
              {view.tip < GUIDE_TOPICS[view.topic].tips.length - 1
                ? "Next tip"
                : "Take the challenge"}
            </button>
            <span className="text-sm text-soft-purple/70">
              Tip {view.tip + 1} of {GUIDE_TOPICS[view.topic].tips.length}
            </span>
          </div>
        )}

        {/* Challenge */}
        {challengeTopic && view.kind === "challenge" && (
          <div className="rounded-2xl border border-white/10 bg-navy-950/60 p-5">
            <p className="font-display text-lg font-semibold">
              {challengeTopic.challenge.question}
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {challengeTopic.challenge.options.map((option, i) => {
                const isPicked = view.picked === i;
                const isRight = i === challengeTopic.challenge.correctIndex;
                let style =
                  "border-white/15 bg-white/5 hover:border-neon-violet hover:bg-neon-violet/15";
                if (isPicked && isRight)
                  style = "border-neon-cyan bg-neon-cyan/20 text-neon-cyan";
                else if (isPicked)
                  style = "border-red-400/60 bg-red-500/10 text-red-200";
                return (
                  <button
                    key={option}
                    type="button"
                    disabled={solved}
                    onClick={() => answer(i)}
                    className={`rounded-xl border px-4 py-3 text-left transition disabled:cursor-default ${style}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
            {solved && (
              <p className="mt-4 text-sm text-soft-purple/80">
                Great job! Choose another topic above to keep going.
              </p>
            )}
          </div>
        )}

        <p className="text-xs text-soft-purple/50">
          SYNTHIA&apos;s tips and challenges are pre-written for this platform.
        </p>
      </div>
    </div>
  );
}
