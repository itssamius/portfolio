import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Skills() {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {site.skills.map((col, i) => (
        <Reveal key={col.title} delay={i * 0.08}>
          <div className="rounded-2xl border border-border bg-bg-elev p-6">
            <span className="font-mono text-sm text-accent">{`{${col.no}}`}</span>
            <h3 className="mt-3 font-display text-xl font-semibold">{col.title}</h3>
            <ul className="mt-4 space-y-2">
              {col.items.map((item) => (
                <li key={item} className="text-sm text-muted">{item}</li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
