/**
 * The five expressive states of SYNTHIA.
 * Add a new state here, then handle it in SynthiaAvatar.tsx.
 */
export const SYNTHIA_STATES = [
  "idle",
  "listening",
  "thinking",
  "speaking",
  "celebrating",
] as const;

export type SynthiaState = (typeof SYNTHIA_STATES)[number];

export const SYNTHIA_STATE_INFO: Record<
  SynthiaState,
  { label: string; description: string }
> = {
  idle: {
    label: "Idle",
    description: "Floating calmly and blinking, waiting for a student.",
  },
  listening: {
    label: "Listening",
    description: "Wider eyes and pulsing ears while the student types.",
  },
  thinking: {
    label: "Thinking",
    description: "Bouncing dots and a fast antenna light while the AI works.",
  },
  speaking: {
    label: "Speaking",
    description: "An animated mouth while the answer streams in.",
  },
  celebrating: {
    label: "Celebrating",
    description: "Happy eyes, jumping and sparkles for student progress.",
  },
};
