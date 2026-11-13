import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/lib/caseStudies";
import { projects } from "@/lib/projects";

type Params = Promise<{ slug: string }>;

export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return { title: `${project.name} | Samuel Abera`, description: project.tagline };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const study = caseStudies[slug];
  if (!project || !study) notFound();

  return (
    <>
      <Header />
      <main className="mx-auto max-w-container px-6 pb-20 pt-10 md:pb-28 md:pt-16">
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 rounded text-sm text-muted transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          <ArrowLeft size={16} /> All work
        </Link>

        <div className="mt-10 flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted">
          <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
          Case study
        </div>
        <h1 className="mt-4 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
          {project.name}
        </h1>
        <p className="mt-6 max-w-2xl text-xl leading-relaxed md:text-2xl">{study.intro}</p>

        {project.href && (
          <Button href={project.href} target="_blank" rel="noopener noreferrer" className="mt-8">
            Open the live site <ArrowUpRight size={16} />
          </Button>
        )}

        <div className="relative mt-12 aspect-[16/10] overflow-hidden rounded-2xl border border-border">
          <Image
            src={project.image}
            alt={`Screenshot of ${project.name}`}
            fill
            priority
            className="object-cover object-top"
            sizes="(max-width: 1280px) 100vw, 1200px"
          />
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_280px]">
          <div className="max-w-2xl space-y-12">
            {study.sections.map((s) => (
              <section key={s.title}>
                <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{s.title}</h2>
                {s.body.map((para) => (
                  <p key={para} className="mt-4 leading-relaxed text-muted">
                    {para}
                  </p>
                ))}
              </section>
            ))}
          </div>
          <aside>
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-muted">Stack</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {study.stack.map((t) => (
                <li key={t} className="rounded-full border border-border px-3 py-1 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
