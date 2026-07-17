function aggiornaOrologio() {

    const now = new Date();

    const ore = String(now.getHours()).padStart(2, "0");
    const minuti = String(now.getMinutes()).padStart(2, "0");
    const secondi = String(now.getSeconds()).padStart(2, "0");

    document.getElementById("normalTime").textContent =
        `${ore}:${minuti}:${secondi}`;

    document.getElementById("staTime").textContent =
        `${ore}:${minuti}`;

    document.getElementById("staDate").textContent =
        now.toLocaleDateString("it-IT", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

}

aggiornaOrologio();
setInterval(aggiornaOrologio, 1000);
