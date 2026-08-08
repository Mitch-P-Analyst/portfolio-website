"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

export type Photo = {
  src: string;
  season: string;
  location: string;
  type: string;
};

function FilterGroup({
  label,
  options,
  active,
  onToggle,
}: {
  label: string;
  options: string[];
  active: Set<string>;
  onToggle: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest text-mono">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => {
          const isActive = active.has(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
                isActive
                  ? "border-brand bg-brand text-paper"
                  : "border-border text-body hover:border-brand hover:text-brand"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function PhotoGallery({ photos }: { photos: Photo[] }) {
  const [type, setType] = useState<Set<string>>(new Set());
  const [location, setLocation] = useState<Set<string>>(new Set());
  const [season, setSeason] = useState<Set<string>>(new Set());

  const options = useMemo(
    () => ({
      type: Array.from(new Set(photos.map((p) => p.type))).sort(),
      location: Array.from(new Set(photos.map((p) => p.location))).sort(),
      season: Array.from(new Set(photos.map((p) => p.season))).sort(),
    }),
    [photos]
  );

  const toggle = (set: Set<string>, setter: (s: Set<string>) => void, value: string) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = photos.filter(
    (p) =>
      (type.size === 0 || type.has(p.type)) &&
      (location.size === 0 || location.has(p.location)) &&
      (season.size === 0 || season.has(p.season))
  );

  const hasFilters = type.size > 0 || location.size > 0 || season.size > 0;

  return (
    <div>
      <div className="flex flex-wrap items-start gap-x-10 gap-y-6 rounded-2xl border border-border/70 bg-surface p-6">
        <FilterGroup label="Type" options={options.type} active={type} onToggle={(v) => toggle(type, setType, v)} />
        <FilterGroup
          label="Location"
          options={options.location}
          active={location}
          onToggle={(v) => toggle(location, setLocation, v)}
        />
        <FilterGroup
          label="Season"
          options={options.season}
          active={season}
          onToggle={(v) => toggle(season, setSeason, v)}
        />
        {hasFilters && (
          <button
            type="button"
            onClick={() => {
              setType(new Set());
              setLocation(new Set());
              setSeason(new Set());
            }}
            className="ml-auto self-end text-xs font-medium text-brand hover:text-brand-dark"
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="mt-4 text-sm text-mono">
        {filtered.length} photo{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 columns-1 gap-4 sm:columns-2 lg:columns-3">
        {filtered.map((photo) => (
          <div
            key={photo.src}
            className="relative mb-4 break-inside-avoid overflow-hidden rounded-xl bg-surface"
          >
            <Image
              src={photo.src}
              alt={`${photo.location}, ${photo.season} (${photo.type})`}
              width={800}
              height={600}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="h-auto w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
