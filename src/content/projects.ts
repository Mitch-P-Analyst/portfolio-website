import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PROJECTS_DIR = path.join(process.cwd(), "src/content/projects");

export type ProjectLink = { label: string; href: string };

export type ProjectFrontmatter = {
  title: string;
  description: string;
  image: string;
  heroImage?: string;
  featured?: boolean;
  link?: ProjectLink;
  skills?: string[];
  tools?: string[];
  techGroups?: Record<string, string[]>;
};

export type ProjectSummary = ProjectFrontmatter & { slug: string };

export function getProjectSlugs(): string[] {
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getProjectSource(slug: string) {
  const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { frontmatter: data as ProjectFrontmatter, content, slug };
}

export function getAllProjects(): ProjectSummary[] {
  return getProjectSlugs()
    .map((slug) => {
      const { frontmatter } = getProjectSource(slug);
      return { slug, ...frontmatter };
    })
    .sort((a, b) => Number(b.featured) - Number(a.featured));
}

export function getFeaturedProjects(): ProjectSummary[] {
  return getAllProjects().filter((p) => p.featured);
}
