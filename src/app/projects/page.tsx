import type { Metadata } from "next";
import { getAllProjects } from "@/content/projects";
import { site } from "@/content/site";
import ProjectCard from "@/components/ProjectCard";

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: "A collection of data analytics, geospatial, and machine learning projects.",
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <div className="container-page py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-mono">Portfolio</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Projects</h1>
      <p className="mt-4 max-w-2xl text-body">
        Analytics, geospatial, and machine learning projects spanning energy, climate, logistics,
        and e-commerce.
      </p>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
