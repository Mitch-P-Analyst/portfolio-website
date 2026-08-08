import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getProjectSlugs, getProjectSource } from "@/content/projects";
import { site } from "@/content/site";
import { projectMdxComponents } from "@/components/ProjectEmbeds";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  if (!getProjectSlugs().includes(slug)) return {};
  const { frontmatter } = getProjectSource(slug);
  return {
    title: `${frontmatter.title} | ${site.name}`,
    description: frontmatter.description,
  };
}

export default async function ProjectPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  if (!getProjectSlugs().includes(slug)) notFound();

  const { frontmatter, content } = getProjectSource(slug);
  const { content: mdxContent } = await compileMDX({
    source: content,
    components: projectMdxComponents,
    options: {
      parseFrontmatter: false,
      mdxOptions: { remarkPlugins: [remarkGfm] },
    },
  });

  const heroImage = frontmatter.heroImage ?? frontmatter.image;

  return (
    <div className="container-page py-16 md:py-24">
      <Link href="/projects" className="text-sm font-medium text-brand hover:text-brand-dark">
        ← All projects
      </Link>

      <h1 className="mt-4 max-w-3xl font-serif text-4xl text-ink">{frontmatter.title}</h1>
      <p className="mt-4 max-w-2xl text-lg text-body">{frontmatter.description}</p>

      {frontmatter.link && (
        <a
          href={frontmatter.link.href}
          target="_blank"
          rel="noreferrer"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-paper hover:bg-brand-dark transition-colors"
        >
          {frontmatter.link.label} →
        </a>
      )}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        {frontmatter.techGroups ? (
          Object.entries(frontmatter.techGroups).map(([group, items]) => (
            <div key={group} className="flex flex-wrap items-center gap-2">
              <p className="text-xs uppercase tracking-widest text-mono">{group}</p>
              {items.map((item) => (
                <span key={item} className="rounded-full bg-tint px-2.5 py-1 text-xs text-brand-dark">
                  {item}
                </span>
              ))}
            </div>
          ))
        ) : (
          <>
            {frontmatter.skills && (
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs uppercase tracking-widest text-mono">Skills</p>
                {frontmatter.skills.map((item) => (
                  <span key={item} className="rounded-full bg-tint px-2.5 py-1 text-xs text-brand-dark">
                    {item}
                  </span>
                ))}
              </div>
            )}
            {frontmatter.tools && (
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-xs uppercase tracking-widest text-mono">Technologies / Tools</p>
                {frontmatter.tools.map((item) => (
                  <span key={item} className="rounded-full bg-surface border border-border/70 px-2.5 py-1 text-xs text-body">
                    {item}
                  </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <div className="relative mt-8 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-surface">
        <Image
          src={heroImage}
          alt={frontmatter.title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 960px"
          className="object-cover"
        />
      </div>

      <article className="prose-breakout prose prose-neutral mt-10 max-w-none prose-headings:font-serif prose-headings:text-ink prose-a:text-brand prose-a:no-underline hover:prose-a:text-brand-dark prose-strong:text-ink prose-blockquote:border-brand prose-blockquote:text-body prose-code:before:content-none prose-code:after:content-none prose-th:text-ink prose-img:rounded-xl">
        {mdxContent}
      </article>
    </div>
  );
}
