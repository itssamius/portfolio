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

  const y = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -40]);

  return (
    <section ref={sectionRef} id="top" className="mx-auto max-w-container px-6 pb-16 pt-20 md:pb-24 md:pt-32">
      <Reveal>
        <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-8xl">
          {site.heroHeadline}
        </h1>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-6 max-w-xl text-lg text-muted">{site.heroSub}</p>
      </Reveal>

      <motion.div style={{ y }} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {featuredProjects.map((p, i) => (
          <Reveal key={p.slug} delay={0.15 + i * 0.08}>
            <Link
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block overflow-hidden rounded-2xl border border-border bg-bg-elev transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  {...(i === 0 ? { priority: true } : {})}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="flex items-center justify-between p-5">
                <span className="font-display text-lg font-semibold">{p.name}</span>
                <ArrowUpRight size={18} className="text-muted transition-colors group-hover:text-accent" />
              </div>
            </Link>
          </Reveal>
        ))}
      </motion.div>
    </section>
  );
}
