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
      <span className="font-mono text-sm text-accent">{`{${no}}`}</span>
      <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-6xl">{title}</h2>
      {subtitle && <p className="mt-3 text-muted">{subtitle}</p>}
    </div>
  );
}
