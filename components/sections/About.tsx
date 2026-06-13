import Image from "next/image";
import { site } from "@/lib/site";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Reveal } from "@/components/ui/Reveal";
import { Skills } from "@/components/sections/Skills";

export function About() {
  return (
    <section id="about" className="mx-auto max-w-container px-6 py-20 md:py-28">
      <SectionLabel no="02" title="About" />
      <div className="mb-16 grid items-center gap-10 md:grid-cols-[280px_1fr]">
        <Reveal>
          <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border">
            <Image src="/headshot.jpg" alt={site.name} fill className="object-cover" sizes="280px" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-2xl text-2xl leading-relaxed md:text-3xl">{site.bio}</p>
          <p className="mt-6 text-muted">{site.role} · {site.location}</p>
        </Reveal>
      </div>
      <Skills />
    </section>
  );
}
