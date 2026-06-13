import { site } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-container px-6 py-24 md:py-36">
      <Reveal>
        <h2 className="font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl">
          Let&apos;s build something.
        </h2>
      </Reveal>
      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-lg">
          <a href={`mailto:${site.email}`} className="text-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded">
            {site.email}
          </a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded">
            GitHub ↗
          </a>
          <span className="text-muted">{site.phone}</span>
        </div>
      </Reveal>
    </section>
  );
}
