
function aggiornaOrologio() {
    const adesso = new Date();

    // =========================
    // PARAMETRI STA
    // =========================

    // Il giorno STA comincia alle 22:50 reali
    const INIZIO_STA_ORE = 22;
    const INIZIO_STA_MINUTI = 50;

    const SECONDI_REALTA_PER_GIORNO_STA =
        23 * 3600 + 50 * 60; // 23h50m = 85.800 secondi

    const SECONDI_STA_PER_GIORNO =
        24 * 3600; // 24h STA = 86.400 secondi STA

    const INIZIO_GIORNO_STA =
        INIZIO_STA_ORE * 3600 +
        INIZIO_STA_MINUTI * 60;

    // =========================
    // ORA NORMALE
    // =========================

    const oreNormali =
        String(adesso.getHours()).padStart(2, "0");

    const minutiNormali =
        String(adesso.getMinutes()).padStart(2, "0");

    const secondiNormali =
        String(adesso.getSeconds()).padStart(2, "0");

    document.getElementById("normalTime").textContent =
        `${oreNormali}:${minutiNormali}:${secondiNormali}`;

    // =========================
    // SECONDI REALI TRASCORSI
    // DALLE 22:50
    // =========================

    const secondiDaMezzanotte =
        adesso.getHours() * 3600 +
        adesso.getMinutes() * 60 +
        adesso.getSeconds() +
        adesso.getMilliseconds() / 1000;

    const trascorsoReale =
        (
            secondiDaMezzanotte -
            INIZIO_GIORNO_STA +
            24 * 3600
        ) % (24 * 3600);

    // =========================
    // ACCELERAZIONE STA
    // =========================

    const fattoreSTA =
        SECONDI_STA_PER_GIORNO /
        SECONDI_REALTA_PER_GIORNO_STA;

    let secondiSTAtotali =
        trascorsoReale * fattoreSTA;

    // Evita di superare le 24:00 per piccoli errori numerici
    secondiSTAtotali =
        secondiSTAtotali % SECONDI_STA_PER_GIORNO;

    const oreSTA =
        Math.floor(secondiSTAtotali / 3600);

    const minutiSTA =
        Math.floor((secondiSTAtotali % 3600) / 60);

    const secondiSTA =
        Math.floor(secondiSTAtotali % 60);

    document.getElementById("staTime").textContent =
        `${String(oreSTA).padStart(2, "0")}:` +
        `${String(minutiSTA).padStart(2, "0")}:` +
        `${String(secondiSTA).padStart(2, "0")}`;

    // =========================
    // DATA STA
    // =========================

    const dataSTA = new Date(adesso);

    // Dalle 22:50 è già il giorno seguente
    if (secondiDaMezzanotte >= INIZIO_GIORNO_STA) {
        dataSTA.setDate(dataSTA.getDate() + 1);
    }

    document.getElementById("staDate").textContent =
        dataSTA.toLocaleDateString("it-IT", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

aggiornaOrologio();
setInterval(aggiornaOrologio, 100);
