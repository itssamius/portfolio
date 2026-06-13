import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-container flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <div className="flex gap-6">
          <a href={`mailto:${site.email}`} className="hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded">Email</a>
          <a href={site.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg rounded">GitHub</a>
        </div>
        <span>Built with Next.js</span>
      </div>
    </footer>
  );
}
