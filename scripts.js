function aggiornaOrologio() {
    const adesso = new Date();

    // =========================
    // ORA NORMALE
    // =========================

    const oreNormali = String(adesso.getHours()).padStart(2, "0");
    const minutiNormali = String(adesso.getMinutes()).padStart(2, "0");
    const secondiNormali = String(adesso.getSeconds()).padStart(2, "0");

    document.getElementById("normalTime").textContent =
        `${oreNormali}:${minutiNormali}:${secondiNormali}`;

    // =========================
    // PARAMETRI DEL TEMPO STA
    // =========================

    const ORE_STA_PER_GIORNO = 13;
    const MINUTI_STA_PER_ORA = 60;
    const SECONDI_STA_PER_MINUTO = 60;

    // Il nuovo giorno STA comincia alle 22:50 normali
    const INIZIO_STA_ORE = 22;
    const INIZIO_STA_MINUTI = 50;

    const SECONDI_REALI_PER_GIORNO = 24 * 60 * 60;

    const INIZIO_GIORNO_STA =
        INIZIO_STA_ORE * 3600 +
        INIZIO_STA_MINUTI * 60;

    // =========================
    // TEMPO REALE TRASCORSO
    // =========================

    const secondiRealiDaMezzanotte =
        adesso.getHours() * 3600 +
        adesso.getMinutes() * 60 +
        adesso.getSeconds() +
        adesso.getMilliseconds() / 1000;

    // Tempo trascorso dalle 22:50
    const secondiRealiTrascorsiSTA =
        (
            secondiRealiDaMezzanotte -
            INIZIO_GIORNO_STA +
            SECONDI_REALI_PER_GIORNO
        ) % SECONDI_REALI_PER_GIORNO;

    // =========================
    // CONVERSIONE IN TEMPO STA
    // =========================

    const secondiSTAPerGiorno =
        ORE_STA_PER_GIORNO *
        MINUTI_STA_PER_ORA *
        SECONDI_STA_PER_MINUTO;

    const secondiSTAtotali =
        secondiRealiTrascorsiSTA *
        secondiSTAPerGiorno /
        SECONDI_REALI_PER_GIORNO;

    const oreSTA = Math.floor(
        secondiSTAtotali /
        (MINUTI_STA_PER_ORA * SECONDI_STA_PER_MINUTO)
    );

    const minutiSTA = Math.floor(
        (
            secondiSTAtotali %
            (MINUTI_STA_PER_ORA * SECONDI_STA_PER_MINUTO)
        ) / SECONDI_STA_PER_MINUTO
    );

    const secondiSTA = Math.floor(
        secondiSTAtotali % SECONDI_STA_PER_MINUTO
    );

    document.getElementById("staTime").textContent =
        `${String(oreSTA).padStart(2, "0")}:` +
        `${String(minutiSTA).padStart(2, "0")}:` +
        `${String(secondiSTA).padStart(2, "0")}`;

    // =========================
    // DATA STA
    // =========================

    const dataSTA = new Date(adesso);

    // Dalle 22:50 normali, per STA è già domani
    if (secondiRealiDaMezzanotte >= INIZIO_GIORNO_STA) {
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

// Aggiornamento frequente per non perdere i secondi STA
aggiornaOrologio();
setInterval(aggiornaOrologio, 100);
