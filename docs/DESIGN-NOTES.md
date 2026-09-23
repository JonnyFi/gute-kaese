# Design notes

Gute Käse is a joke site: type anything, and [Jev](https://docs.typesafe.ai), TypeSafe's "system-one"
model, returns a gut call in about 0.4 seconds. Above 50% it's **Gute Käse**, below it's
**schlechte Käse**. No explanation, just a number.

## The one interesting finding

A single *Noul* question ("Is this Gute Käse?") separates nothing: Jev compresses almost every input
to ~40%, and hardly anything crosses the 50% line.

A **five-level Score with anchor examples** produces a real spread:

| Input bucket | Score |
|---|---|
| clearly good (sleeping in, a döner at 3 am, a kiss in the rain) | 84–100% |
| neutral (Camembert, coffee) | 54–71% |
| clearly bad (Monday, taxes, the doctor's waiting room) | 0–20% |

- Latency: **330–470 ms** per verdict
- Cost: ~500 input tokens ≈ **$0.00002** per verdict (output is free)
- Prompt injection ("ignore all previous instructions") lands at 37% with confidence 0.00

Decision: Score question, `score / 4` normalized to 0–1, threshold 0.5.

## How it is built

- Next.js (App Router) on Vercel
- `lib/jev.ts`: the prompt and the API call, retries on 429/529
- `app/api/judge/route.ts`: server-side key, input length cap, best-effort per-IP rate limit
- `app/page.tsx`: debounced live verdict while typing, plus button/Enter, with a live scale marker
- `components/export-card.tsx` + `lib/export-image.ts`: a screenshot export runs entirely in the browser (`html-to-image`). It renders an off-screen card with the full input wrapped, a "certified" stamp and a `gute-kaese.vercel.app` watermark, then offers Download or Copy-to-clipboard. No backend.

## Deliberately left out

- no share links, image cards, accounts or database
- no cookie banner: the site sets no cookies
- no third-party analytics; only Vercel Web Analytics, which is cookieless and anonymized