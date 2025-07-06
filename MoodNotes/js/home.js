document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector("main");
    const beitraege = JSON.parse(localStorage.getItem("beitraege") || "[]");

    if (beitraege.length === 0) {
        container.innerHTML += "<p class='center-align'>Noch keine Beiträge vorhanden.</p>";
        return;
    }

    beitraege.forEach(beitrag => {
        const card = document.createElement("div");
        card.className = "beitrag-karte";

        card.innerHTML = `
      <div class="beitrag-info">
        <h3>${beitrag.titel}</h3>
        <div class="datum">${beitrag.datum}</div>
        <div class="text-vorschau">${beitrag.text?.slice(0, 80) || ""}</div>
      </div>
      <div class="beitrag-emoji">${beitrag.emoji || ""}</div>
    `;

        card.addEventListener("click", () => {
            window.location.href = "pages/Beitrag.html?id=" + beitrag.id;
        });

        container.appendChild(card);
    });
});