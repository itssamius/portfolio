import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projectLink, type Project } from "@/lib/projects";

export function WorkCard({ project }: { project: Project }) {
  const link = projectLink(project);
  const className =
    "group relative block aspect-[4/3] overflow-hidden rounded-2xl border border-border transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";
  const body = (
    <>
      <Image
        src={project.image}
        alt={project.name}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-white">{project.name}</h3>
          {link && (
            <ArrowUpRight
              size={18}
              className="shrink-0 text-white/60 transition-colors group-hover:text-accent"
            />
          )}
        </div>
        <p className="mt-1 line-clamp-1 text-sm text-white/70">{project.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {project.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/20 bg-black/20 px-3 py-1 text-xs text-white/80 backdrop-blur-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  // No link: the client's site no longer loads, so the card is a picture only.
  if (!link) return <div className={className}>{body}</div>;
  return (
    <Link
      href={link.href}
      className={className}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </Link>
  );
}
