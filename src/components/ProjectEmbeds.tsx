export function DashboardEmbed({ src, title }: { src: string; title?: string }) {
  return (
    <div className="not-prose breakout my-8 overflow-hidden rounded-2xl border border-border/70">
      <iframe
        src={src}
        title={title ?? "Embedded dashboard"}
        loading="lazy"
        className="h-[80vh] w-full border-0"
      />
      <p className="border-t border-border/70 bg-surface px-4 py-2 text-xs text-mono">
        Note: the dashboard may take ~15 seconds to wake up on first load.{" "}
        <a href={src} target="_blank" rel="noreferrer" className="text-brand hover:text-brand-dark">
          Open in full screen →
        </a>
      </p>
    </div>
  );
}

export function PdfEmbed({ src }: { src: string }) {
  return (
    <div className="not-prose breakout my-8 overflow-hidden rounded-2xl border border-border/70">
      <iframe src={src} loading="lazy" className="min-h-[700px] w-full border-0" />
      <p className="border-t border-border/70 bg-surface px-4 py-2 text-xs text-mono">
        Your browser doesn&apos;t support embedded PDFs.{" "}
        <a href={src} target="_blank" rel="noreferrer" className="text-brand hover:text-brand-dark">
          Download the PDF →
        </a>
      </p>
    </div>
  );
}

export const projectMdxComponents = { DashboardEmbed, PdfEmbed };
