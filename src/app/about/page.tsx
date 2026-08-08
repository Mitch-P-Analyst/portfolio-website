import Image from "next/image";
import type { Metadata } from "next";
import { about } from "@/content/about";
import { education, services, skills } from "@/content/experience";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: `About Me | ${site.name}`,
  description: about.intro,
};

export default function AboutPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <div className="grid gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
        <div>
          <p className="text-sm uppercase tracking-widest text-mono">About Me</p>
          <h1 className="mt-3 font-serif text-4xl text-ink">{about.intro}</h1>

          <div className="mt-8 space-y-5 text-body">
            {about.bio.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="relative mt-10 aspect-[3/2] w-full overflow-hidden rounded-2xl bg-surface">
            <Image
              src="/images/site/portrait-secondary.jpg"
              alt={site.name}
              fill
              sizes="(max-width: 768px) 100vw, 640px"
              className="object-cover"
            />
          </div>

          <h2 className="mt-12 font-serif text-2xl text-ink">The Path Here</h2>
          <div className="mt-4 space-y-5 text-body">
            {about.journey.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <blockquote className="mt-8 border-l-2 border-brand pl-5 font-serif text-lg italic text-ink">
            {about.mission}
          </blockquote>
        </div>

        <aside className="space-y-10">
          <div>
            <h2 className="font-serif text-xl text-ink">Education & Credentials</h2>
            <ul className="mt-4 space-y-3 text-sm text-body">
              {education.map((e) => (
                <li key={e.credential} className="flex flex-col">
                  <span className="text-ink">{e.credential}</span>
                  <span className="text-mono">
                    {e.org ? `${e.org} · ` : ""}
                    {e.year}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">Toolkit</h2>
            <ul className="mt-4 space-y-2 text-sm text-body">
              {skills.map((s) => (
                <li key={s} className="flex gap-2">
                  <span className="text-brand">·</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-serif text-xl text-ink">Status</h2>
            <ul className="mt-4 space-y-1 text-sm text-body">
              {about.status.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </aside>
      </div>

      <section className="mt-20 border-t border-border/70 pt-16">
        <h2 className="font-serif text-3xl text-ink">Services</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border/70 p-6">
              <div className="relative h-10 w-10">
                <Image src={s.icon} alt="" fill className="object-contain" />
              </div>
              <h3 className="mt-4 font-serif text-lg text-ink">{s.title}</h3>
              <p className="mt-2 text-sm text-body">{s.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
