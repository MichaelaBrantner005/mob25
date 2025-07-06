# mob25
# MoodNotes – Progressive Web App (PWA)

**MoodNotes** ist eine mobile Webanwendung zum Erfassen und Reflektieren der eigenen Stimmung.  
Die App wurde im Rahmen der Lehrveranstaltung *Mobile Web Apps (SS25)* an der FH Oberösterreich entwickelt.

---

## Funktionen

- Beiträge mit **Titel, Emoji-Stimmung, Text, Zitat und Foto**
- Einfache **Emoji-Auswahl** zur Stimmungserfassung
- **Kamera-Funktion** zur Bildaufnahme (über `<input type="file" capture>`)
- **Zitat-Integration** über externe API
- Speichern, Bearbeiten und Löschen von Beiträgen
- Darstellung aller Beiträge auf der Startseite
- Responsive Oberfläche mit **Materialize Design**
- Vollständige **Offline-Nutzung durch PWA-Integration**

---

## Installation & Inbetriebnahme

### Option 1 – Lokal im Browser öffnen

1. ZIP-Datei entpacken
2. Öffne die Datei `index.html` per Doppelklick oder im Browser deiner Wahl
3. Die App ist sofort einsatzbereit – alle Daten werden im `localStorage` gespeichert

> Tipp: Nutze Google Chrome oder Firefox für beste Kompatibilität

---

### Option 2 – Deployment auf einem Webserver (z. B. Hetzner)

1. Lade den Inhalt des Projekts auf einen Webserver hoch (z. B. per SFTP)
2. Achte darauf, dass `manifest.webmanifest` und der `service-worker` korrekt erreichbar sind
3. Öffne die URL im Browser (z. B. `https://moodnotes.deinserver.at`)
4. Die App kann als **PWA installiert** und offline verwendet werden

---

## Technische Hinweise

- Die App ist vollständig **clientseitig** (kein Backend)
- Beiträge werden **lokal im Browser gespeichert**
- Es werden keine personenbezogenen Daten an externe Dienste übermittelt
- Externe Zitat-API wird nur bei Bedarf aufgerufen

---

## Team

Projektumsetzung durch zwei Studierende der FH OÖ
Michaela Brantner, Annika Mauser
Studiengang: **Kommunikation, Wissen, Medien**  
Lehrveranstaltung: *Mobile Web Apps (SS25)*  
Juli 2025
