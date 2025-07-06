// beitragBearbeiten.js

document.addEventListener("DOMContentLoaded", () => {
    const gespeicherter = JSON.parse(localStorage.getItem("bearbeitenBeitrag"));
    const datumElement = document.getElementById("aktuellesDatum");

    if (!gespeicherter) {
        alert("Kein Beitrag zum Bearbeiten gefunden.");
        window.location.href = "../index.html";
        return;
    }

    // Datum anzeigen
    datumElement.textContent = gespeicherter.datum;

    // Felder befüllen
    document.getElementById("titel").value = gespeicherter.titel || "";
    document.querySelector(".text-input").value = gespeicherter.text || "";
    if(gespeicherter.zitat){
        const box = document.getElementById("beitrags-zitat");
        box.innerHTML = `
            <blockquote>
                "${gespeicherter.zitat.body}"<br>
                <span>– ${gespeicherter.zitat.author || "Unbekannt"}</span>
            </blockquote>
        `;
        document.getElementById("zitat_body").value = gespeicherter.zitat.body;
        document.getElementById("zitat_author").value = gespeicherter.zitat.author || "Unbekannt";
    }

    // Emoji vorauswählen
    if (gespeicherter.emoji) {
        document.querySelectorAll(".emoji").forEach(e => {
            if (e.textContent === gespeicherter.emoji) {
                e.classList.add("selected");
            }
        });
    }

    // Emoji-Auswahl ermöglichen
    document.querySelectorAll(".emoji").forEach(emoji => {
        emoji.addEventListener("click", () => {
            document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));
            emoji.classList.add("selected");
        });
    });

    // Speichern
    document.querySelector(".save-button").addEventListener("click", () => {
        const titel = document.getElementById("titel").value.trim();
        const text = document.querySelector(".text-input").value.trim();
        const emoji = document.querySelector(".emoji.selected")?.textContent || "";
        const datum = datumElement.textContent;

        if (!titel) {
            alert("Bitte gib einen Titel ein.");
            return;
        }

        const beitragNeu = {
            id: gespeicherter.id,
            titel,
            text,
            emoji,
            datum
        };

        const alle = JSON.parse(localStorage.getItem("beitraege") || "[]");
        const aktualisiert = alle.map(b => b.id === beitragNeu.id ? beitragNeu : b);

        localStorage.setItem("beitraege", JSON.stringify(aktualisiert));
        localStorage.removeItem("bearbeitenBeitrag");
        window.location.href = "../index.html";
    });

    // Abbrechen
    document.querySelector(".cancel-button").addEventListener("click", () => {
        window.location.href = "../index.html";
    });
});