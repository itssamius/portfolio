"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { site } from "@/lib/site";
import { featuredProjects } from "@/lib/projects";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -60]);

  return (
    <>
      <section
        ref={sectionRef}
        id="top"
        className="mx-auto flex min-h-[90vh] max-w-container flex-col justify-between px-6 pb-8 pt-28 md:pt-36"
      >
        <div>
          <Reveal>
            <div className="flex items-center gap-2.5 text-xs font-medium uppercase tracking-[0.2em] text-muted">
              <span className="inline-block h-2 w-2 rounded-full bg-accent" aria-hidden />
              {site.role} — {site.location}
            </div>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="mt-6 max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl">
              {site.heroHeadline}
            </h1>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 max-w-xl text-lg text-muted">{site.heroSub}</p>
          </Reveal>
        </div>

        {/* Oversized wordmark — Arpeggio signature */}
        <div className="mt-16 overflow-hidden">
          <motion.span
            style={{ y }}
            aria-hidden
            className="block whitespace-nowrap font-display font-bold uppercase leading-[0.8] tracking-tighter text-accent text-[clamp(2.5rem,13.2vw,12rem)]"
          >
            {site.name}
          </motion.span>
        </div>
      </section>

      {/* Featured work */}
      <section className="mx-auto max-w-container px-6 pb-20 md:pb-28">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.08}>
              <Link
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block aspect-[4/5] overflow-hidden rounded-2xl border border-border transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  {...(i === 0 ? { priority: true } : {})}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-5">
                  <span className="font-display text-xl font-semibold text-white">{p.name}</span>
                  <ArrowUpRight
                    size={20}
                    className="text-white/70 transition-colors group-hover:text-accent"
                  />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
