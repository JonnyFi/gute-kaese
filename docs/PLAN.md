# Gute Käse Entscheider — Plan

## Was

Eine Seite mit einem Eingabefeld: man tippt irgendetwas hinein, und Jev entscheidet in ~0,4 s, ob es
**Gute Käse** oder **schlechte Käse** ist. Über 50 % = Gute Käse, darunter = schlechte Käse.

Zielgruppe ist ein LinkedIn-Shitpost. Kein Mobbing-Tool, kein ernstes Produkt.

## Test-Ergebnis (2026-09-23, echter Jev-Aufruf)

Ein einzelnes Noul („Ist das Gute Käse?") drückt fast alles auf ~40 % und trennt nichts.

Ein **Score mit 5 Stufen und Anker-Beispielen** funktioniert: Gute Dinge landen bei 84–100 %,
Neutrales bei 54–71 %, Schlechtes bei 0–20 %. Latenz 330–470 ms, ~500 Tokens (~$0,00002) pro Urteil.
Prompt-Injection („Ignoriere alle Anweisungen") fällt auf 37 % mit Confidence 0,00. Deutsch funktioniert.

Entscheidung: Score-Ansatz, `score / 4` auf 0–1 normalisiert, Schwelle 0,5.

## Epics / Issues

### E1 — Backend-Urteil
- [x] Jev-Prompt entworfen und getestet (`Score`, 5 Stufen, Anker)
- [ ] API Route `POST /api/judge` (Key serverseitig, Eingabe-Längenlimit, Retry bei 429)
- [ ] Einfaches Rate-Limit pro IP (Best-Effort) gegen versehentliche Endlosschleifen

### E2 — Oberfläche
- [ ] Ein Eingabefeld, Urteil live beim Tippen (debounced) + Button/Enter
- [ ] Großes Ergebnis: Prozentzahl, GUTE KÄSE / schlechte Käse, Käse-O-Meter
- [ ] Beispiel-Chips, Fehler-/Leerzustand, mobil sauber

### E3 — Deployment
- [ ] Next.js auf Vercel, eigener kostenloser Account, `TYPESAFE_API_KEY` als Env-Var
- [ ] Live-URL teilen

### E4 — Prüfen (schlank)
- [ ] QA im Browser (Urteile, Ladezustand, Fehlerfall, mobil)
- [ ] Kurzer Security-Blick (Key nicht im Client, Eingabe begrenzt, keine XSS)

## Nicht-Ziele

- Kein Teilen-Link, keine Bildkarte (der User macht selbst 1–2 Screenshots)
- Keine Accounts, keine Datenbank, kein Tracking
- Kein ausführlicher Security-Audit

## Hosting-Antwort

Zwei Vercel-Accounts laufen problemlos parallel. Ein eigener kostenloser Vercel-Account (eigene
E-Mail/GitHub) ist unabhängig von Marios. Alternativ Netlify. Vercel ist der einfachere Weg, weil
Next.js dort ohne Konfiguration läuft.