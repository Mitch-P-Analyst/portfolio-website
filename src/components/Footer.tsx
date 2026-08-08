import Link from "next/link";
import { nav, site, socials } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-border/70 bg-surface">
      <div className="container-page flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-paper font-serif text-sm">
            M
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base text-ink">{site.name}</span>
            <span className="text-xs text-mono tracking-wide uppercase">{site.title}</span>
          </span>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="text-body hover:text-brand transition-colors">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="text-body hover:text-brand transition-colors"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="container-page pb-8 text-xs text-mono">
        © {new Date().getFullYear()} {site.name}.
      </div>
    </footer>
  );
}
