"use client";

import { useState } from "react";

const LINKS = [
  { href: "#synthia", label: "SYNTHIA" },
  { href: "#modules", label: "Modules" },
  { href: "#journey", label: "Journey" },
  { href: "#progress", label: "Progress" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="flex items-center gap-3">
          <span className="size-8 rounded-full bg-linear-to-br from-neon-cyan to-neon-violet shadow-[0_0_20px_rgba(139,92,246,0.6)]" />
          <span className="font-display text-lg font-bold">
            Neuro Methodologies
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm text-foreground/80 transition hover:text-neon-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#modules"
              className="rounded-full bg-linear-to-r from-neon-cyan to-neon-violet px-5 py-2 text-sm font-semibold text-navy-950 transition hover:shadow-[0_0_25px_rgba(34,211,238,0.5)]"
            >
              Start learning
            </a>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          type="button"
          className="rounded-lg border border-white/15 p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile links */}
      {open && (
        <ul className="flex flex-col gap-1 border-t border-white/10 px-6 py-4 md:hidden">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-3 text-foreground/90 hover:bg-white/5"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
