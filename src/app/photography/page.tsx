import type { Metadata } from "next";
import { site } from "@/content/site";
import PhotoGallery from "@/components/PhotoGallery";
import photos from "@/content/photography.json";

export const metadata: Metadata = {
  title: `Photography | ${site.name}`,
  description: "A personal collection of film and digital photography.",
};

export default function PhotographyPage() {
  return (
    <div className="container-page py-16 md:py-24">
      <p className="text-sm uppercase tracking-widest text-mono">Personal</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Photography</h1>
      <p className="mt-4 max-w-2xl text-body">
        Photography offers another way to explore and observe the present moment, wherever we may
        be. I don&apos;t consider myself an expert, but I enjoy the creative process and how it
        intersects with storytelling across multiple disciplines.
      </p>

      <div className="mt-10">
        <PhotoGallery photos={photos} />
      </div>
    </div>
  );
}
