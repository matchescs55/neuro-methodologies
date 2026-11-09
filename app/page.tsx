export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <div className="size-24 animate-float rounded-full bg-linear-to-br from-neon-cyan to-neon-violet shadow-[0_0_60px_rgba(139,92,246,0.6)]" />
      <h1 className="font-display text-4xl font-bold sm:text-6xl">
        <span className="bg-linear-to-r from-neon-cyan to-soft-purple bg-clip-text text-transparent">
          Neuro Methodologies
        </span>
      </h1>
      <p className="max-w-md text-soft-purple/80">
        Stage 1 complete: theme, fonts and animations are working.
      </p>
    </main>
  );
}
