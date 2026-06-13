export function SectionLabel({
  no,
  title,
  subtitle,
}: {
  no: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 md:mb-16">
      <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted">
        <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
        <span>{no}</span>
        {subtitle && (
          <>
            <span className="text-border" aria-hidden>
              /
            </span>
            <span>{subtitle}</span>
          </>
        )}
      </div>
      <h2 className="mt-4 font-display text-4xl font-bold tracking-tight md:text-6xl">{title}</h2>
    </div>
  );
}
