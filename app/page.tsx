
export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <nav className="flex items-center justify-between border-b border-slate-800 px-8 py-5">
        <h1 className="text-xl font-bold text-cyan-400">
          NEURO METHODOLOGIES
        </h1>
        <span className="text-sm text-slate-400">
          Learning Platform
        </span>
      </nav>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <p className="mb-4 font-semibold text-cyan-400">
          THE FUTURE OF LEARNING STARTS HERE
        </p>

        <h2 className="max-w-3xl text-5xl font-bold leading-tight">
          Understand the brain.
          <br />
          Transform education.
        </h2>

        <p className="mt-6 max-w-xl text-lg text-slate-400">
          Explore neuroscience, psychology, active learning
          methodologies and artificial intelligence.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950">
            Explore the course
          </button>

          <button className="rounded-xl border border-slate-600 px-7 py-4">
            Meet your AI assistant
          </button>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {[
            ["01", "Neuroscience", "Discover how the brain learns."],
            ["02", "Active Learning", "Explore innovative teaching methods."],
            ["03", "Artificial Intelligence", "Discover the future of education."],
          ].map(([number, title, description]) => (
            <div key={number} className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-cyan-400">{number}</p>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-3 text-sm text-slate-400">{description}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
