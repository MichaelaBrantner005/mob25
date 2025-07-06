// beitragErstellen.js


document.addEventListener("DOMContentLoaded", () => {
    const datumElement = document.getElementById("aktuellesDatum");
    const jetzt = new Date();
    const datum = jetzt.toLocaleDateString('de-DE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
    const uhrzeit = jetzt.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit'
    });
    datumElement.textContent = `${datum}, ${uhrzeit} Uhr`;

    const fileInput = document.getElementById("fotoInput");
    const fotoVorschau = document.getElementById("fotoVorschau");
    let fotoBase64 = "";

    // Foto hinzufügen Button auslösen
    document.getElementById("fotoButton").addEventListener("click", () => {
        fileInput.click();
    });

    // Datei auswählen → Vorschau anzeigen & speichern
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            fotoBase64 = e.target.result;
            fotoVorschau.src = fotoBase64;
            fotoVorschau.style.display = "block";
        };
        reader.readAsDataURL(file);
    });

    // Emoji-Auswahl
    document.querySelectorAll(".emoji").forEach(emoji => {
        emoji.addEventListener("click", () => {
            document.querySelectorAll(".emoji").forEach(e => e.classList.remove("selected"));
            emoji.classList.add("selected");
        });
    });

    // Daten speichern und Zitat wählen
    document.getElementById("zitatWaehlenBtn").addEventListener("click", () => {
        const beitrag = {
            titel: document.getElementById("titel").value,
            text: document.querySelector(".text-input").value,
            emoji: document.querySelector(".emoji.selected")?.textContent || "",
            datum,
            foto: fotoBase64
        };
        localStorage.setItem("tempBeitrag", JSON.stringify(beitrag));
        window.location.href = "/pages/zitate.html";
    });

    // Zitat speichern
    function initSelectedQuote() {
        const saved = localStorage.getItem("selectedQuote");
        if (saved) {
            const quote = JSON.parse(saved);

            const box = document.getElementById("beitrags-zitat");
            if (box) {
                box.innerHTML = `
                <blockquote>
                    "${quote.body}"<br>
                    <span>– ${quote.author || "Unbekannt"}</span>
                </blockquote>
            `;
            }

            const bodyInput = document.getElementById("zitat_body");
            const authorInput = document.getElementById("zitat_author");
            if (bodyInput) bodyInput.value = quote.body;
            if (authorInput) authorInput.value = quote.author || "Unbekannt";

            localStorage.removeItem("selectedQuote");
        }
    }

    // Direkt ausführen
        initSelectedQuote();

    // Beitrag wiederherstellen, wenn vorhanden
    const gespeicherterBeitrag = localStorage.getItem("tempBeitrag");
    if (gespeicherterBeitrag) {
        const beitrag = JSON.parse(gespeicherterBeitrag);
        document.getElementById("titel").value = beitrag.titel || "";
        document.querySelector(".text-input").value = beitrag.text || "";
        if (beitrag.emoji) {
            document.querySelectorAll(".emoji").forEach(e => {
                if (e.textContent === beitrag.emoji) {
                    e.classList.add("selected");
                }
            });
        }
        localStorage.removeItem("tempBeitrag");
    }



    // Beitrag speichern
    document.querySelector(".save-button").addEventListener("click", () => {
        const titel = document.getElementById("titel").value.trim();
        const text = document.querySelector(".text-input").value.trim();
        const emoji = document.querySelector(".emoji.selected")?.textContent || "";
        const datum = datumElement.textContent;
        const zitatBody = document.getElementById("zitat_body").value;
        const zitatAuthor = document.getElementById("zitat_author").value;


        if (!titel) {
            alert("Bitte gib einen Titel ein.");
            return;
        }

        const beitrag = {
            id: Date.now(),
            titel,
            text,
            emoji,
            datum,
            foto: fotoBase64,
            zitat: {
                body: zitatBody,
                author: zitatAuthor
            }
        };

        const gespeicherte = JSON.parse(localStorage.getItem("beitraege") || "[]");
        gespeicherte.unshift(beitrag);
        localStorage.setItem("beitraege", JSON.stringify(gespeicherte));

        window.location.href = "../index.html";
    });

    // Beitrag abbrechen
    const abbrechenBtn = document.querySelector(".cancel-button");
    if (abbrechenBtn) {
        abbrechenBtn.addEventListener("click", () => {
            window.location.href = "../index.html";
        });
    }

});