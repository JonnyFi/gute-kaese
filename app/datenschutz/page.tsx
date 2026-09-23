import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Datenschutz · Gute Käse",
  description: "Wie auf dieser Website personenbezogene Daten verarbeitet werden.",
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website ist:
      </p>
      <p>
        <strong>Jonny Fischer</strong>
        <br />
        E-Mail:{" "}
        <a href="mailto:joxi@jonnyfischer.de">joxi@jonnyfischer.de</a>
      </p>
      <p>
        Bei Fragen zum Datenschutz erreichen Sie mich jederzeit unter dieser
        E-Mail-Adresse.
      </p>

      <h2>2. Welche Daten verarbeitet werden</h2>
      <p>
        <strong>Beim Aufruf der Website:</strong> Unser Hosting-Anbieter
        speichert in Server-Logs automatisch technische Zugriffsdaten. Dazu
        gehören die IP-Adresse, Datum und Uhrzeit des Zugriffs, die angeforderte
        Datei, Browsertyp und Betriebssystem sowie die zuvor besuchte Seite
        (Referrer).
      </p>
      <p>
        <strong>Bei der Nutzung des Entscheiders:</strong> Der Text, den Sie in
        das Eingabefeld eingeben, wird an den Dienst Jev der TypeSafe AI
        übermittelt, um daraus das Urteil („Gute Käse“ oder „schlechte Käse“) zu
        berechnen. Wir speichern Ihre Eingabe selbst nicht dauerhaft.
      </p>
      <p>
        <strong>Bitte geben Sie keine personenbezogenen Daten ein</strong> –
        insbesondere keine Namen, Kontaktdaten oder Daten anderer Personen. Die
        Eingabe wird zur Berechnung an einen Dienst in den USA übertragen (siehe
        Abschnitt 5).
      </p>
      <p>
        <strong>Cookies und Tracking:</strong> Diese Website setzt keine
        Cookies. Zur anonymisierten Reichweitenmessung nutzen wir Vercel Web
        Analytics (siehe Abschnitt 4). Es werden keine Werbe- oder sonstigen
        Tracking-Dienste eingesetzt, und es werden keine externen Schriftarten
        im Browser geladen.
      </p>

      <h2>3. Zwecke und Rechtsgrundlagen</h2>
      <p>
        Den Betrieb und die Sicherheit der Website stützen wir auf unser
        berechtigtes Interesse gemäß Art. 6 Abs. 1 lit. f DSGVO. Die Berechnung
        des Urteils aus Ihrer Eingabe erfolgt, weil Sie die Funktion aktiv
        anfordern; Rechtsgrundlage ist ebenfalls Art. 6 Abs. 1 lit. f DSGVO
        (berechtigtes Interesse an der Bereitstellung der von Ihnen gewünschten
        Funktion). Die anonymisierte Reichweitenmessung stützt sich ebenfalls
        auf Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Auswertung
        der Nutzung unserer Website).
      </p>

      <h2>4. Hosting (Vercel)</h2>
      <p>
        Diese Website wird bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA
        91789, USA, gehostet. Beim Aufruf werden die oben genannten technischen
        Daten an die Server von Vercel übertragen. Weitere Informationen:{" "}
        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer">
          vercel.com/legal/privacy-policy
        </a>
        .
      </p>
      <p>
        Zusätzlich nutzen wir <strong>Vercel Web Analytics</strong> zur
        anonymisierten Reichweitenmessung. Dabei werden keine Cookies gesetzt
        und keine IP-Adressen gespeichert. Besucher werden über einen Hash aus
        der Anfrage erkannt, der nach 24 Stunden verworfen wird. Eine
        Identifizierung einzelner Personen oder ein websiteübergreifendes
        Tracking ist damit nicht möglich; es werden keine Daten zu Werbezwecken
        weitergegeben.
      </p>

      <h2>5. Übermittlung in die USA (TypeSafe AI / Jev)</h2>
      <p>
        Für die Berechnung des Urteils nutzen wir das Modell Jev der TypeSafe AI.
        Ihre Eingabe wird dazu an Server in den USA übermittelt. Die Übermittlung
        erfolgt auf Grundlage der Standardvertragsklauseln der Europäischen
        Kommission gemäß Art. 46 Abs. 2 lit. c DSGVO, soweit für den Empfänger
        kein Angemessenheitsbeschluss (z. B. das EU-US Data Privacy Framework)
        greift.
      </p>

      <h2>6. Speicherdauer</h2>
      <p>
        Wir speichern Ihre Eingabe nicht. Die Server-Logs werden vom
        Hosting-Anbieter nach dessen Vorgaben gespeichert und automatisch
        gelöscht.
      </p>

      <h2>7. Ihre Rechte</h2>
      <p>
        Sie haben nach der DSGVO folgende Rechte hinsichtlich Ihrer
        personenbezogenen Daten:
      </p>
      <ul>
        <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
        <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
        <li>Recht auf Löschung (Art. 17 DSGVO)</li>
        <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>
          Widerspruchsrecht gegen Verarbeitungen auf Grundlage von Art. 6 Abs. 1
          lit. f DSGVO (Art. 21 DSGVO)
        </li>
      </ul>
      <p>
        Zur Ausübung Ihrer Rechte wenden Sie sich bitte an{" "}
        <a href="mailto:joxi@jonnyfischer.de">joxi@jonnyfischer.de</a>.
      </p>

      <h2>8. Beschwerderecht</h2>
      <p>
        Sie haben das Recht, sich bei einer Aufsichtsbehörde zu beschweren, wenn
        Sie der Ansicht sind, dass die Verarbeitung Ihrer Daten gegen die DSGVO
        verstößt. Zuständig ist:
      </p>
      <p>
        Österreichische Datenschutzbehörde
        <br />
        Barichgasse 40–42, 1030 Wien
        <br />
        E-Mail: <a href="mailto:dsb@dsb.gv.at">dsb@dsb.gv.at</a>
        <br />
        <a href="https://www.dsb.gv.at" target="_blank" rel="noreferrer">
          www.dsb.gv.at
        </a>
      </p>

      <p className="mt-8 text-xs">Stand: September 2026</p>
    </LegalPage>
  );
}