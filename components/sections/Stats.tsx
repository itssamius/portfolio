import { site } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

export function Stats() {
  return (
    <section className="mx-auto max-w-container px-6 py-20 md:py-28">
      <SectionLabel no="03" title="By the numbers" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {site.stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="border-t border-border pt-6">
              <div className="font-display text-5xl font-bold md:text-6xl">
                <CountUp value={s.value} suffix={s.suffix} />
              </div>
              <p className="mt-3 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
