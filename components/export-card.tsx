import { forwardRef } from "react";

export type ExportCardData = {
  score: number;
  confidence: number;
  verdict: "gute" | "schlechte";
  input: string;
};

/** Fixed width, off-screen card that is rasterised for the screenshot export. */
export const ExportCard = forwardRef<HTMLDivElement, ExportCardData>(
  function ExportCard({ score, confidence, verdict, input }, ref) {
    const pct = Math.round(score * 100);
    const isGute = verdict === "gute";
    const note = isGute ? "Sensationally Gute Käse." : "Catastrophically schlechte Käse.";
    const badgeTop = isGute ? "Gute" : "Schlechte";
    const inputSize = input.length <= 60 ? 52 : input.length <= 160 ? 40 : 30;

    return (
      <div
        ref={ref}
        aria-hidden
        style={{ width: 1080 }}
        className="stage flex flex-col bg-cream px-[72px] py-[64px] font-body text-ink"
      >
        <p className="text-[22px] font-semibold uppercase tracking-[0.3em] text-ink-soft">
          A gut call by Jev
        </p>

        <div className="mt-10 flex items-start justify-between gap-10">
          <div>
            <h2 className="font-display text-[104px] font-bold leading-[0.9] tracking-tight">
              {isGute ? "GUTE" : "SCHLECHTE"}
              <br />
              KÄSE
            </h2>
            <p className="mt-4 font-display text-[34px] text-ink-soft">{note}</p>
          </div>

          {/* Certified stamp */}
          <div
            className="-rotate-12 shrink-0 rounded-full border-[6px] border-double border-ink/70 px-6 py-6 text-center"
            style={{ width: 210, height: 210 }}
          >
            <div className="pt-3 text-[13px] font-bold uppercase tracking-[0.25em] text-ink-soft">
              Certified
            </div>
            <div className="mt-1 font-display text-[30px] font-bold uppercase leading-none">
              {badgeTop}
              <br />
              Käse
            </div>
            <div className="mt-2 text-[11px] uppercase tracking-[0.25em] text-ink-soft">
              Jev · 2026
            </div>
          </div>
        </div>

        <div className="mt-10 flex items-baseline gap-4">
          <span className="font-display text-[180px] font-bold leading-none tracking-tight">
            {pct}
          </span>
          <span className="font-display text-[72px] font-bold leading-none">%</span>
        </div>

        <div className="relative mt-8 h-6 w-full rounded-full bg-cream-deep">
          <div
            className={`h-full rounded-full ${isGute ? "bg-cheese-deep" : "bg-bad"}`}
            style={{ width: `${pct}%` }}
          />
          <div
            className="absolute top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[5px] border-white bg-ink shadow-md"
            style={{ left: `clamp(1.25rem, ${pct}%, calc(100% - 1.25rem))` }}
          />
        </div>
        <div className="mt-3 flex justify-between text-[20px] text-ink-soft">
          <span>schlechte Käse</span>
          <span>Gute Käse</span>
        </div>

        <div className="mt-12 border-t-2 border-ink/10 pt-8">
          <p className="text-[20px] font-semibold uppercase tracking-[0.25em] text-ink-soft">
            Input
          </p>
          <p
            className="mt-3 font-display font-semibold leading-[1.15]"
            style={{ fontSize: inputSize }}
          >
            “{input}”
          </p>
          <p className="mt-6 text-[22px] text-ink-soft">
            Jev&apos;s confidence: {Math.round(confidence * 100)} %
          </p>
        </div>

        <div className="mt-10 flex items-center justify-between border-t-2 border-ink/10 pt-6">
          <span className="font-display text-[26px] font-bold">gute-kaese.vercel.app</span>
          <span className="text-[20px] text-ink-soft">No explanation, just a gut call.</span>
        </div>
      </div>
    );
  },
);