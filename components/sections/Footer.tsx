export function Footer() {
  return (
    <footer className="mt-10 border-t border-white/10 px-6 py-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
        <div>
          <p className="font-display text-lg font-bold">Neuro Methodologies</p>
          <p className="mt-1 text-sm text-soft-purple/70">
            Learning, powered by neuroscience and guided by SYNTHIA.
          </p>
        </div>
        <ul className="flex gap-6 text-sm text-foreground/80">
          <li><a href="#synthia" className="hover:text-neon-cyan">SYNTHIA</a></li>
          <li><a href="#modules" className="hover:text-neon-cyan">Modules</a></li>
          <li><a href="#journey" className="hover:text-neon-cyan">Journey</a></li>
          <li><a href="#progress" className="hover:text-neon-cyan">Progress</a></li>
        </ul>
      </div>
      <p className="mt-8 text-center text-xs text-soft-purple/50">
        © 2026 Neuro Methodologies. All rights reserved.
      </p>
    </footer>
  );
}
