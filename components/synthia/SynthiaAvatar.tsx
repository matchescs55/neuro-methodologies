import { useId } from "react";
import { SYNTHIA_STATE_INFO, type SynthiaState } from "./synthia-states";

/**
 * SynthiaAvatar
 * -------------
 * An ORIGINAL character drawn with SVG + CSS animations.
 *
 * Modular by design: the rest of the app only uses
 *   <SynthiaAvatar state="thinking" size={200} />
 * so you can later replace everything inside this file with a custom
 * illustration, Lottie or video without touching the chat or homepage.
 */

type SynthiaAvatarProps = {
  state?: SynthiaState;
  /** Width and height in pixels. */
  size?: number;
  className?: string;
};

const EYE = "#67e8f9";

function Face({ state, glow }: { state: SynthiaState; glow: string }) {
  switch (state) {
    case "listening":
      return (
        <g filter={`url(#${glow})`} fill={EYE}>
          <ellipse className="synthia-eye" cx="76" cy="113" rx="11" ry="14" />
          <ellipse className="synthia-eye" cx="124" cy="113" rx="11" ry="14" />
        </g>
      );
    case "thinking":
      return (
        <g filter={`url(#${glow})`} fill={EYE}>
          <circle className="synthia-dot" cx="80" cy="115" r="6" />
          <circle
            className="synthia-dot"
            cx="100"
            cy="115"
            r="6"
            style={{ animationDelay: "0.15s" }}
          />
          <circle
            className="synthia-dot"
            cx="120"
            cy="115"
            r="6"
            style={{ animationDelay: "0.3s" }}
          />
        </g>
      );
    case "speaking":
      return (
        <g filter={`url(#${glow})`} fill={EYE}>
          <ellipse className="synthia-eye" cx="78" cy="106" rx="8" ry="11" />
          <ellipse className="synthia-eye" cx="122" cy="106" rx="8" ry="11" />
          <rect
            className="synthia-mouth"
            x="89"
            y="128"
            width="22"
            height="6"
            rx="3"
          />
        </g>
      );
    case "celebrating":
      return (
        <g
          filter={`url(#${glow})`}
          fill="none"
          stroke={EYE}
          strokeWidth="5"
          strokeLinecap="round"
        >
          <path d="M66 120 Q76 102 86 120" />
          <path d="M114 120 Q124 102 134 120" />
        </g>
      );
    case "idle":
    default:
      return (
        <g filter={`url(#${glow})`} fill={EYE}>
          <ellipse className="synthia-eye" cx="78" cy="113" rx="8" ry="11" />
          <ellipse className="synthia-eye" cx="122" cy="113" rx="8" ry="11" />
        </g>
      );
  }
}

const SPARKLES = [
  { x: 28, y: 52, delay: "0s" },
  { x: 174, y: 46, delay: "0.25s" },
  { x: 188, y: 150, delay: "0.5s" },
  { x: 12, y: 160, delay: "0.75s" },
  { x: 100, y: 6, delay: "0.4s" },
];

export function SynthiaAvatar({
  state = "idle",
  size = 220,
  className = "",
}: SynthiaAvatarProps) {
  // Unique ids so several avatars on one page never clash.
  const uid = useId().replace(/:/g, "");
  const bodyGrad = `body-${uid}`;
  const rimGrad = `rim-${uid}`;
  const glow = `glow-${uid}`;

  return (
    <div
      className={`synthia-wrap ${className}`}
      data-state={state}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`SYNTHIA is ${SYNTHIA_STATE_INFO[state].label.toLowerCase()}`}
    >
      <style>{CSS}</style>

      <div className="synthia-glow" />
      <div className="synthia-shadow" />

      <div className="synthia-mover">
        <svg
          viewBox="0 0 200 200"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id={bodyGrad} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
            <radialGradient id={rimGrad} cx="0.7" cy="0.95" r="0.6">
              <stop offset="0%" stopColor="#f0abfc" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#f0abfc" stopOpacity="0" />
            </radialGradient>
            <filter id={glow} x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Antenna */}
          <line
            x1="100"
            y1="24"
            x2="100"
            y2="38"
            stroke="#c4b5fd"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle
            className="synthia-antenna"
            cx="100"
            cy="16"
            r="7"
            fill="#22d3ee"
            filter={`url(#${glow})`}
          />

          {/* Ear pods */}
          <circle
            className="synthia-ear"
            cx="14"
            cy="118"
            r="6"
            fill="#a78bfa"
            filter={`url(#${glow})`}
          />
          <circle
            className="synthia-ear"
            cx="186"
            cy="118"
            r="6"
            fill="#a78bfa"
            filter={`url(#${glow})`}
          />
          {state === "listening" && (
            <g>
              <circle className="synthia-ring" cx="14" cy="118" r="6" />
              <circle
                className="synthia-ring"
                cx="14"
                cy="118"
                r="6"
                style={{ animationDelay: "0.8s" }}
              />
              <circle className="synthia-ring" cx="186" cy="118" r="6" />
              <circle
                className="synthia-ring"
                cx="186"
                cy="118"
                r="6"
                style={{ animationDelay: "0.8s" }}
              />
            </g>
          )}

          {/* Body */}
          <path
            d="M100 36 C142 36 178 66 180 112 C182 162 148 190 100 190 C52 190 18 164 20 114 C22 66 58 36 100 36 Z"
            fill={`url(#${bodyGrad})`}
          />
          <path
            d="M100 36 C142 36 178 66 180 112 C182 162 148 190 100 190 C52 190 18 164 20 114 C22 66 58 36 100 36 Z"
            fill={`url(#${rimGrad})`}
          />
          {/* Glossy highlight */}
          <ellipse
            cx="70"
            cy="62"
            rx="34"
            ry="15"
            fill="#ffffff"
            opacity="0.28"
            transform="rotate(-28 70 62)"
          />

          {/* Visor (face screen) */}
          <rect
            x="46"
            y="84"
            width="108"
            height="62"
            rx="31"
            fill="#050816"
            stroke="#22d3ee"
            strokeOpacity="0.45"
            strokeWidth="1.5"
          />

          <Face state={state} glow={glow} />

          {/* Celebration sparkles */}
          {state === "celebrating" &&
            SPARKLES.map((s, i) => (
              <g key={i} transform={`translate(${s.x} ${s.y})`}>
                <path
                  className="synthia-spark"
                  d="M0 -8 L2 -2 L8 0 L2 2 L0 8 L-2 2 L-8 0 L-2 -2 Z"
                  fill="#fde68a"
                  style={{ animationDelay: s.delay }}
                />
              </g>
            ))}
        </svg>
      </div>
    </div>
  );
}

/* All animations live here so this file is fully self-contained. */
const CSS = `
.synthia-wrap { position: relative; display: inline-block; }
.synthia-glow {
  position: absolute; inset: 8%; border-radius: 9999px;
  background: radial-gradient(circle, rgba(139,92,246,.55), rgba(34,211,238,.25) 55%, transparent 72%);
  filter: blur(28px);
  animation: synthia-glow 3s ease-in-out infinite;
}
.synthia-shadow {
  position: absolute; left: 25%; width: 50%; bottom: 0; height: 5%;
  border-radius: 9999px; background: rgba(0,0,0,.45); filter: blur(6px);
}
.synthia-mover { position: relative; width: 100%; height: 100%; }

.synthia-wrap[data-state="idle"] .synthia-mover { animation: synthia-float 6s ease-in-out infinite; }
.synthia-wrap[data-state="idle"] .synthia-shadow { animation: synthia-shadow 6s ease-in-out infinite; }
.synthia-wrap[data-state="listening"] .synthia-mover { animation: synthia-tilt 2.4s ease-in-out infinite; }
.synthia-wrap[data-state="thinking"] .synthia-mover { animation: synthia-sway 3s ease-in-out infinite; }
.synthia-wrap[data-state="speaking"] .synthia-mover { animation: synthia-talk 0.7s ease-in-out infinite; }
.synthia-wrap[data-state="speaking"] .synthia-shadow { animation: synthia-shadow 0.7s ease-in-out infinite; }
.synthia-wrap[data-state="celebrating"] .synthia-mover { animation: synthia-jump 0.8s ease-in-out infinite; }
.synthia-wrap[data-state="celebrating"] .synthia-shadow { animation: synthia-shadow 0.8s ease-in-out infinite; }

.synthia-eye, .synthia-dot, .synthia-mouth, .synthia-ring, .synthia-spark {
  transform-box: fill-box; transform-origin: center;
}
.synthia-eye { animation: synthia-blink 4.5s infinite; }
.synthia-dot { animation: synthia-dot 1.1s ease-in-out infinite; }
.synthia-mouth { animation: synthia-mouth 0.45s ease-in-out infinite alternate; }
.synthia-ring { fill: none; stroke: #22d3ee; stroke-width: 2; animation: synthia-ring 1.6s ease-out infinite; }
.synthia-spark { animation: synthia-spark 1s ease-in-out infinite; }
.synthia-antenna { animation: synthia-pulse 3s ease-in-out infinite; }
.synthia-wrap[data-state="thinking"] .synthia-antenna { animation: synthia-pulse 0.6s ease-in-out infinite; }
.synthia-wrap[data-state="listening"] .synthia-ear { animation: synthia-pulse 0.9s ease-in-out infinite; }

@keyframes synthia-glow { 0%,100% { opacity: .6; } 50% { opacity: 1; } }
@keyframes synthia-pulse { 0%,100% { opacity: .55; } 50% { opacity: 1; } }
@keyframes synthia-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes synthia-tilt { 0%,100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
@keyframes synthia-sway { 0%,100% { transform: rotate(-2deg) translateX(-3px); } 50% { transform: rotate(2deg) translateX(3px); } }
@keyframes synthia-talk { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-4px) scale(1.02); } }
@keyframes synthia-jump {
  0%,100% { transform: translateY(0) scale(1,1); }
  20% { transform: translateY(0) scale(1.05,.93); }
  50% { transform: translateY(-22px) scale(.97,1.04); }
  80% { transform: translateY(0) scale(1.04,.95); }
}
@keyframes synthia-shadow { 0%,100% { transform: scaleX(1); opacity: .5; } 50% { transform: scaleX(.8); opacity: .3; } }
@keyframes synthia-blink { 0%,92%,100% { transform: scaleY(1); } 96% { transform: scaleY(.1); } }
@keyframes synthia-dot { 0%,60%,100% { transform: translateY(0); opacity: .5; } 30% { transform: translateY(-8px); opacity: 1; } }
@keyframes synthia-mouth { from { transform: scale(.7,.4); } to { transform: scale(1.1,1.8); } }
@keyframes synthia-ring { from { transform: scale(1); opacity: .8; } to { transform: scale(2.8); opacity: 0; } }
@keyframes synthia-spark { 0%,100% { transform: scale(.2) rotate(0deg); opacity: 0; } 50% { transform: scale(1) rotate(45deg); opacity: 1; } }

@media (prefers-reduced-motion: reduce) {
  .synthia-wrap *, .synthia-wrap { animation: none !important; }
}
`;
