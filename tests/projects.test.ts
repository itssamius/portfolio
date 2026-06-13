import { describe, it, expect } from "vitest";
import { projects, featuredProjects, projectsByCategory } from "@/lib/projects";

describe("projects data", () => {
  it("has exactly 3 featured projects", () => {
    expect(featuredProjects).toHaveLength(3);
    expect(featuredProjects.map((p) => p.slug).sort()).toEqual(
      ["blackjack", "caravan", "fitness-tracker"].sort()
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
      expect(p.href).toBeTruthy();
      expect(p.image).toMatch(/^\/work\//);
      expect(p.tags.length).toBeGreaterThan(0);
      expect(slugs.has(p.slug)).toBe(false);
      slugs.add(p.slug);
    }
  });

  it('"all" returns every project', () => {
    expect(projectsByCategory("all")).toHaveLength(projects.length);
  });
});
