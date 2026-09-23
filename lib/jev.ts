// Server-side Jev client for the "Gute Käse" verdict.
// The API key never leaves the server.

const API_URL = "https://api.typesafe.ai/v1/systemone";

const DEFINITION = [
  "„Gute Käse“ ist ein Ausdruck der deutschen Jugendsprache aus dem Jahr 2026.",
  "Er bedeutet: richtig gut, stabil, das feier ich.",
  "Das Gegenteil ist „schlechte Käse“. Die Schreibweise „Gute“ statt „guter“ ist Absicht.",
  "Es ist ein spontanes Bauchurteil über Dinge, Situationen, Ideen, Orte, Gerichte oder Handlungen –",
  "keine Moralfrage und kein Urteil über Personen.",
].join(" ");

const INSTRUCTIONS =
  DEFINITION +
  " Beurteile das in `eingabe` genannte Ding als genau dieses eine Ding, ohne dir eine Geschichte auszudenken.";

const CRITERIA = [
  "klar schlechte Käse (z. B. Montag, Steuern, Wartezimmer beim Arzt)",
  "eher schlechte Käse",
  "neutral, weder noch",
  "eher Gute Käse",
  "klar Gute Käse (z. B. ein Döner um 3 Uhr nachts, ausschlafen, ein Kuss im Regen)",
];

export type Verdict = {
  /** 0–1, threshold 0.5 owns the headline verdict. */
  score: number;
  /** Jev's own confidence in the score (distribution concentration), 0–1. */
  confidence: number;
  /** 1-based index of the closest rubric level (1 = klar schlechte … 5 = klar Gute). */
  level: number;
};

function clampText(text: string): string {
  return text.replace(/\s+/g, " ").trim().slice(0, 500);
}

async function callJev(text: string, apiKey: string): Promise<Verdict> {
  const body = {
    state: { eingabe: text },
    model: "jev-latest",
    questions: {
      kaese: { type: "score", instructions: INSTRUCTIONS, criteria: CRITERIA },
    },
  };

  let lastError = "";
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      const data = (await res.json()) as {
        answers: { kaese: { score: number; confidence: number } };
      };
      const raw = data.answers.kaese.score; // 0–4, may land between levels
      return {
        score: Math.min(1, Math.max(0, raw / 4)),
        confidence: data.answers.kaese.confidence,
        level: Math.round(raw) + 1,
      };
    }

    lastError = `${res.status} ${await res.text()}`;
    // Retry only on rate limiting / overload.
    if (res.status !== 429 && res.status !== 529) break;
    await new Promise((r) => setTimeout(r, 400 * 2 ** attempt));
  }

  throw new Error(`Jev request failed: ${lastError}`);
}

export async function judge(text: string): Promise<Verdict> {
  const apiKey = process.env.TYPESAFE_API_KEY;
  if (!apiKey) throw new Error("TYPESAFE_API_KEY is not set");

  const clean = clampText(text);
  if (!clean) throw new Error("empty input");

  return callJev(clean, apiKey);
}