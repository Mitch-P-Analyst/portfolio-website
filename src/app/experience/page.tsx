import type { Metadata } from "next";
import { education, experience } from "@/content/experience";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `Experience | ${site.name}`,
  description: "Professional experience across hospitality, logistics, e-commerce, and data analytics.",
};

export default function ExperiencePage() {
  return (
    <div className="container-page py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-mono">Career</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Experience</h1>
      <p className="mt-4 max-w-2xl text-body">
        A career spanning hospitality, logistics, e-commerce, and data analytics, converting
        operational data into actionable business decisions.
      </p>

      <ol className="mt-12 space-y-10 border-l border-border/70 pl-8">
        {experience.map((e) => (
          <li key={`${e.role}-${e.period}`} className="relative">
            <span className="absolute -left-[calc(2rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-brand" />
            <p className="text-xs uppercase tracking-wide text-mono">
              {e.period} · {e.type}
            </p>
            <h2 className="mt-1 font-serif text-xl text-ink">{e.role}</h2>
            <p className="text-sm text-brand-dark">{e.org}</p>
            <ul className="mt-3 space-y-1.5 text-sm text-body">
              {e.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span className="text-brand">·</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            {e.tools && (
              <div className="mt-3 flex flex-wrap gap-2">
                {e.tools.map((t) => (
                  <span key={t} className="rounded-full bg-tint px-2.5 py-1 text-xs text-brand-dark">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </li>
        ))}
      </ol>

      <section className="mt-16 border-t border-border/70 pt-12">
        <h2 className="font-serif text-2xl text-ink">Education & Credentials</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2">
          {education.map((ed) => (
            <li key={ed.credential} className="rounded-2xl border border-border/70 p-5">
              <p className="text-ink">{ed.credential}</p>
              <p className="mt-1 text-sm text-mono">
                {ed.org ? `${ed.org} · ` : ""}
                {ed.year}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
