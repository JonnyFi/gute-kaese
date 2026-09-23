import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Impressum · Gute Käse",
  description: "Impressum und Anbieterkennzeichnung dieser Website.",
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben gemäß § 5 ECG und § 25 MedienG</h2>
      <p>Medieninhaber und für den Inhalt verantwortlich:</p>
      <p>
        <strong>Jonny Fischer</strong>
        <br />
        E-Mail:{" "}
        <a href="mailto:joxi@jonnyfischer.de">joxi@jonnyfischer.de</a>
      </p>
      <p>
        Dies ist ein privates, nicht kommerzielles Projekt. Es besteht keine
        Unternehmereigenschaft und es werden keine Waren oder Dienstleistungen
        entgeltlich angeboten.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website wurden mit größter Sorgfalt erstellt. Für die
        Richtigkeit, Vollständigkeit und Aktualität der Inhalte wird jedoch
        keine Gewähr übernommen.
      </p>
      <p>
        Die Urteile („Gute Käse“ / „schlechte Käse“) werden automatisch von
        einem KI-Modell erzeugt und dienen ausschließlich der Unterhaltung. Sie
        sind keine Tatsachenbehauptung und keine Bewertung von Personen,
        Produkten oder Organisationen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites Dritter, auf deren
        Inhalte kein Einfluss besteht. Für die Inhalte der verlinkten Seiten ist
        stets der jeweilige Anbieter oder Betreiber verantwortlich. Rechtswidrige
        Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei
        Bekanntwerden von Rechtsverletzungen werden derartige Links umgehend
        entfernt.
      </p>

      <p className="mt-8 text-xs">Stand: September 2026</p>
    </LegalPage>
  );
}