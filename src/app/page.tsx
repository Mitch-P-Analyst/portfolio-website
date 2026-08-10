import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { about } from "@/content/about";
import { getFeaturedProjects } from "@/content/projects";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const featured = getFeaturedProjects();

  return (
    <>
      {/* Hero */}
      <section className="container-page grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div>
          <p className="text-sm uppercase tracking-widest text-mono">{site.title}</p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-ink md:text-5xl">
            {site.name}
          </h1>
          <p className="mt-5 max-w-md text-lg text-body">{site.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/projects"
              className="rounded-full bg-brand px-6 py-3 text-sm font-medium text-paper hover:bg-brand-dark transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/about"
              className="rounded-full border border-border px-6 py-3 text-sm font-medium text-ink hover:border-brand hover:text-brand transition-colors"
            >
              About Me
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-surface">
          <Image
            src="/images/site/portrait-hero.jpg"
            alt={site.name}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 480px"
            className="object-cover"
          />
        </div>
      </section>

      {/* About teaser */}
      <section className="border-y border-border/70 bg-surface">
        <div className="container-page grid gap-8 py-16 md:grid-cols-[1fr_2fr] md:py-20">
          <h2 className="font-serif text-3xl text-ink">Data Portfolio</h2>
          <div className="space-y-4 text-body">
            <p>{about.intro}</p>
            <p>{about.bio[0]}</p>
            <Link href="/about" className="inline-block text-sm font-medium text-brand hover:text-brand-dark">
              Read my full story →
            </Link>
          </div>
        </div>
      </section>

      {/* Projects grid */}
      <section className="container-page py-16 md:py-24">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl text-ink">Selected Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-brand hover:text-brand-dark">
            All projects →
          </Link>
        </div>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </>
  );
}
