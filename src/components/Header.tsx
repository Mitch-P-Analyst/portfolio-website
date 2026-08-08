import Link from "next/link";
import { nav, site } from "@/content/site";

export default function Header() {
  return (
    <header className="border-b border-border/70 bg-paper/90 backdrop-blur sticky top-0 z-40">
      <div className="container-page flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand text-paper font-serif text-sm">
            M
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-serif text-base text-ink group-hover:text-brand transition-colors">
              {site.name}
            </span>
            <span className="text-xs text-mono tracking-wide uppercase">{site.title}</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-sm">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-body hover:text-brand transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <details className="md:hidden group">
          <summary className="list-none cursor-pointer text-body hover:text-brand transition-colors">
            Menu
          </summary>
          <nav className="absolute inset-x-0 top-full flex flex-col gap-1 border-b border-border/70 bg-paper px-6 py-4 text-sm shadow-sm">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-2 text-body hover:text-brand transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
