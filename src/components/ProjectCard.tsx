import Image from "next/image";
import Link from "next/link";
import type { ProjectSummary } from "@/content/projects";

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  const tags = project.tools ?? project.skills ?? [];

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-paper transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-serif text-lg text-ink">{project.title}</h3>
        <p className="line-clamp-3 text-sm text-body">{project.description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-tint px-2.5 py-1 text-xs text-brand-dark"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
