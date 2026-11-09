type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

/** Reusable heading block used by every homepage section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-neon-cyan">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-bold sm:text-4xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-soft-purple/80 sm:text-lg">
          {description}
        </p>
      )}
    </div>
  );
}
