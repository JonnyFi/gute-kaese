# Gute Käse Entscheider

Tipp irgendwas ein. [Jev](https://docs.typesafe.ai) (TypeSafe AI) entscheidet in rund 0,4 Sekunden, ob es
**Gute Käse** oder **schlechte Käse** ist. Über 50 % = Gute Käse, darunter = schlechte Käse.

Ein Bauchurteil, keine Erklärung. Gebaut für einen LinkedIn-Shitpost.

## Wie es funktioniert

- **Jev** ist ein System-One-Modell. Es generiert keinen Text, sondern beantwortet typisierte Fragen mit
  Wahrscheinlichkeiten.
- Ein einzelnes Ja/Nein („Ist das Gute Käse?“) trennt nichts — Jev drückt fast alles auf ~40 %. Deshalb
  nutzt die App eine **Score-Frage mit fünf Stufen und Anker-Beispielen**. Der Score (0–4) wird auf 0–1
  normalisiert; 0,5 ist die Grenze zum Guten.
- Alles läuft serverseitig in `/api/judge`. Der API-Key liegt nie im Client.
- Das Urteil aktualisiert sich beim Tippen (650 ms Debounce) oder per Enter/Button.

Der Prompt steht in `lib/jev.ts`, die Route in `app/api/judge/route.ts`, die Oberfläche in `app/page.tsx`.

## Lokal starten

```bash
pnpm install
cp .env.example .env   # TYPESAFE_API_KEY eintragen (console.typesafe.ai)
pnpm dev               # http://localhost:3000
```

## Deployment (Vercel)

Vercel liest das Repo direkt, keine Konfiguration nötig. Den Key als Environment Variable
`TYPESAFE_API_KEY` setzen (Production + Preview).

```bash
vercel            # Preview
vercel --prod     # Production
```

Oder im Vercel-Dashboard: „Add New Project“ → Repo importieren → Env-Var setzen → Deploy.

## Grenzen

- Kein Sharing-Link, keine Bildkarte, keine Accounts, keine Datenbank.
- Einfaches In-Memory-Rate-Limit pro IP (Best-Effort) und Eingaben bis 2000 Zeichen.
- Jev ist auf Deutsch nicht offiziell getestet; der Prompt liefert trotzdem brauchbare Ergebnisse.
- Jev kann durch geschickt formulierte Eingaben manipuliert werden. Für ein Spaßprojekt in Ordnung.