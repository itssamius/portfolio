"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectsByCategory, type FilterKey } from "@/lib/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { WorkCard } from "@/components/sections/WorkCard";
import { clsx } from "@/lib/clsx";

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "product", label: "Products" },
  { key: "client", label: "Client Work" },
];

export function Work() {
  const [filter, setFilter] = useState<FilterKey>("all");
  const items = projectsByCategory(filter);

  return (
    <section id="work" className="mx-auto max-w-container px-6 py-20 md:py-28">
      <SectionLabel no="01" title="Selected Work" subtitle="Products & client builds" />

      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setFilter(f.key)}
            className={clsx(
              "rounded-full px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              filter === f.key
                ? "bg-accent text-accent-fg"
                : "border border-border text-muted hover:text-fg"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div data-testid="work-grid" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {items.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <WorkCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
