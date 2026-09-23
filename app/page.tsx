"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type Verdict = "gute" | "schlechte";

type Result = {
  score: number;
  confidence: number;
  level: number;
  verdict: Verdict;
};

const EXAMPLES = [
  "Camembert",
  "Montag",
  "Ein Döner um 3 Uhr nachts",
  "Donald Trump",
  "Das Fahrrad vom Nachbarn klauen",
  "Ausschlafen",
];

const DEBOUNCE_MS = 650;

function tierHeadline(score: number): string {
  if (score >= 0.5) return "GUTE KÄSE";
  return "SCHLECHTE KÄSE";
}

function tierNote(score: number): string {
  if (score >= 0.85) return "Sensationelle Käse.";
  if (score >= 0.65) return "Gute Käse.";
  if (score >= 0.5) return "Eher Gute Käse.";
  if (score >= 0.35) return "Eher schlechte Käse.";
  if (score >= 0.15) return "Schlechte Käse.";
  return "Kaputte Käse.";
}

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [judged, setJudged] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reqId = useRef(0);

  const run = useCallback(async (value: string) => {
    const clean = value.trim();
    if (clean.length < 2) return;
    const id = reqId.current;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/judge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: clean }),
      });
      const data = await res.json();
      if (id !== reqId.current) return;
      if (!res.ok) {
        setError(data?.error ?? "Da ist etwas schiefgelaufen.");
        setLoading(false);
        return;
      }
      setResult(data);
      setJudged(clean);
      setLoading(false);
    } catch {
      if (id !== reqId.current) return;
      setError("Keine Verbindung zu Jev.");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reqId.current += 1;
    if (timer.current) clearTimeout(timer.current);

    const clean = text.trim();
    if (clean.length < 2) return;

    timer.current = setTimeout(() => run(text), DEBOUNCE_MS);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [text, run]);

  function updateText(value: string) {
    setText(value);
    if (value.trim().length < 2) {
      setResult(null);
      setJudged("");
      setError(null);
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    reqId.current += 1;
    if (timer.current) clearTimeout(timer.current);
    run(text);
  }

  function pickExample(value: string) {
    updateText(value);
  }

  const isGute = result ? result.verdict === "gute" : true;
  const glow = !result
    ? "#ffe9c2"
    : isGute
      ? "#ffe08a"
      : "#e7e3db";

  return (
    <main
      className="stage min-h-screen w-full px-6 py-10 sm:py-16"
      style={{ ["--stage-glow" as string]: glow }}
    >
      <div className="mx-auto flex w-full max-w-2xl flex-col">
        <header className="text-center">
          <p className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-ink-soft">
            Ein Bauchurteil von Jev
          </p>
          <h1 className="mt-3 font-display text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
            GUTE
            <br />
            KÄSE?
          </h1>
          <p className="mx-auto mt-4 max-w-md text-balance text-base text-ink-soft sm:text-lg">
            Tipp irgendwas ein. Jev entscheidet in unter einer Sekunde, ob es
            Gute Käse ist — oder nicht.
          </p>
        </header>

        <form onSubmit={onSubmit} className="mt-8 sm:mt-10">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={text}
              onChange={(e) => updateText(e.target.value)}
              maxLength={2000}
              autoFocus
              placeholder="z. B. ein Döner um 3 Uhr nachts"
              aria-label="Eingabe"
              className="w-full rounded-2xl border-2 border-ink/10 bg-white/80 px-5 py-4 font-display text-lg outline-none transition focus:border-cheese-deep focus:bg-white focus:ring-4 focus:ring-cheese/40"
            />
            <button
              type="submit"
              disabled={text.trim().length < 2 || loading}
              className="shrink-0 rounded-2xl bg-ink px-7 py-4 font-display text-lg font-semibold text-cream transition hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? "Kaut…" : "Entscheiden"}
            </button>
          </div>
        </form>

        <div className="mt-4 flex flex-wrap gap-2">
          {EXAMPLES.map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => pickExample(ex)}
              className="rounded-full border border-ink/15 bg-white/60 px-3 py-1.5 text-sm text-ink-soft transition hover:border-ink/30 hover:text-ink"
            >
              {ex}
            </button>
          ))}
        </div>

        <section className="mt-10 min-h-[15rem]" aria-live="polite">
          {error && (
            <div className="rounded-2xl border border-bad/30 bg-white/70 p-6 text-center text-ink-soft">
              {error}
            </div>
          )}

          {!error && result && (
            <div
              data-testid="result"
              className={`animate-pop-in rounded-3xl border-2 p-6 sm:p-8 ${
                isGute
                  ? "border-cheese-deep/40 bg-white/70"
                  : "border-bad/25 bg-white/50"
              }`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <span
                  data-testid="headline"
                  className={`font-display text-2xl font-bold tracking-tight sm:text-3xl ${
                    isGute ? "text-ink" : "text-ink-soft"
                  }`}
                >
                  {tierHeadline(result.score)}
                </span>
                <span className="font-display text-4xl font-bold tabular-nums sm:text-5xl">
                  {Math.round(result.score * 100)}
                  <span className="text-xl align-top sm:text-2xl">%</span>
                </span>
              </div>

              <div className="mt-6">
                <div className="relative h-4 w-full overflow-hidden rounded-full bg-cream-deep">
                  <div
                    className={`h-full rounded-full transition-[width] duration-500 ease-out ${
                      isGute ? "bg-cheese-deep" : "bg-bad"
                    }`}
                    style={{ width: `${Math.round(result.score * 100)}%` }}
                  />
                  <div
                    className="absolute top-0 h-full w-0.5 bg-ink/40"
                    style={{ left: "50%" }}
                    aria-hidden
                  />
                </div>
                <div className="mt-1.5 flex justify-between text-xs text-ink-soft">
                  <span>schlechte Käse</span>
                  <span>Gute Käse</span>
                </div>
              </div>

              <p className="mt-6 font-display text-lg">
                {tierNote(result.score)}{" "}
                <span className="text-ink-soft">
                  „{judged.length > 60 ? judged.slice(0, 57) + "…" : judged}“
                </span>
              </p>
              <p className="mt-1 text-sm text-ink-soft">
                Jevs Sicherheit: {Math.round(result.confidence * 100)} %
              </p>
            </div>
          )}

          {!error && !result && (
            <div className="rounded-3xl border-2 border-dashed border-ink/10 p-10 text-center text-ink-soft">
              {loading ? (
                <span className="inline-flex items-center gap-2 font-display text-lg">
                  <span className="animate-wiggle">🧀</span> Jev kaut noch…
                </span>
              ) : (
                <span className="font-display text-lg">
                  Was ist Gute Käse? Tipp los.
                </span>
              )}
            </div>
          )}
        </section>

        <footer className="mt-10 text-center text-sm text-ink-soft">
          Jev ist ein System-One-Modell. Keine Erklärung, nur ein Bauchurteil,
          in rund 0,4 Sekunden. Keine Garantie.
        </footer>
      </div>
    </main>
  );
}