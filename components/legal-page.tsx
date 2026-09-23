import Link from "next/link";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main
      className="stage min-h-screen w-full px-6 py-12 sm:py-16"
      style={{ ["--stage-glow" as string]: "#ffe9c2" }}
    >
      <div className="mx-auto w-full max-w-2xl">
        <Link
          href="/"
          className="text-sm font-semibold text-ink-soft transition hover:text-ink"
        >
          ← Gute Käse
        </Link>
        <h1 className="mt-6 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        <div className="legal mt-8 text-sm leading-relaxed text-ink-soft">
          {children}
        </div>
        <footer className="mt-12 flex gap-5 border-t border-ink/10 pt-6 text-sm text-ink-soft">
          <Link href="/datenschutz" className="transition hover:text-ink">
            Datenschutz
          </Link>
          <Link href="/impressum" className="transition hover:text-ink">
            Impressum
          </Link>
        </footer>
      </div>
    </main>
  );
}