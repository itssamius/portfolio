import { describe, it, expect } from "vitest";
import { existsSync } from "node:fs";
import { projects, featuredProjects, projectsByCategory } from "@/lib/projects";
import { caseStudies } from "@/lib/caseStudies";

describe("projects data", () => {
  it("has exactly 3 featured projects", () => {
    expect(featuredProjects).toHaveLength(3);
    expect(featuredProjects.map((p) => p.slug).sort()).toEqual(
      ["blackjack", "folio", "journey"].sort()
    );
  });

  it("has 9 client-work projects", () => {
    expect(projectsByCategory("client")).toHaveLength(9);
  });

  it("every project has required fields and unique slug", () => {
    const slugs = new Set<string>();
    for (const p of projects) {
      expect(p.name).toBeTruthy();
      expect(p.tagline).toBeTruthy();
      expect(p.image).toMatch(/^\/work\/.+\.jpg$/);
      expect(existsSync(`public${p.image}`)).toBe(true);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(slugs.has(p.slug)).toBe(false);
      slugs.add(p.slug);
    }
  });

  it("every featured project and every case study maps to a live product", () => {
    for (const p of featuredProjects) expect(caseStudies[p.slug]).toBeDefined();
    for (const slug of Object.keys(caseStudies)) {
      expect(projects.find((p) => p.slug === slug)?.href).toBeTruthy();
    }
  });

  it('"all" returns every project', () => {
    expect(projectsByCategory("all")).toHaveLength(projects.length);
  });
});
