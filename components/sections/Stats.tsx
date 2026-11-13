import { projects, projectsByCategory } from "@/lib/projects";
import { caseStudies } from "@/lib/caseStudies";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CountUp } from "@/components/ui/CountUp";
import { Reveal } from "@/components/ui/Reveal";

// Counts only, taken from what is on this page, so they cannot go out of date.
const stats = [
  { value: projects.length, label: "Projects on this page" },
  { value: projectsByCategory("product").filter((p) => p.href).length, label: "Live products you can open" },
  { value: projectsByCategory("client").length, label: "Client storefronts" },
  { value: Object.keys(caseStudies).length, label: "Case studies" },
];

export function Stats() {
  return (
    <section className="mx-auto max-w-container px-6 py-20 md:py-28">
      <SectionLabel no="03" title="By the numbers" />
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="border-t border-border pt-6">
              <div className="font-display text-5xl font-bold md:text-6xl">
                <CountUp value={s.value} />
              </div>
              <p className="mt-3 text-sm text-muted">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
