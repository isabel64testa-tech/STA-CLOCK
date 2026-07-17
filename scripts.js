function aggiornaOrologio() {
    const adesso = new Date();

    // =====================================
    // PARAMETRI DEL SISTEMA STA
    // =====================================

    const ORE_STA_PER_GIORNO = 13;
    const MINUTI_STA_PER_ORA = 60;
    const SECONDI_STA_PER_MINUTO = 60;

    // Il nuovo giorno STA comincia alle 22:50 reali
    const ORA_INIZIO_STA = 22;
    const MINUTO_INIZIO_STA = 50;

    const SECONDI_REALI_PER_GIORNO = 24 * 60 * 60; // 86.400

    const SECONDI_STA_PER_GIORNO =
        ORE_STA_PER_GIORNO *
        MINUTI_STA_PER_ORA *
        SECONDI_STA_PER_MINUTO; // 46.800

    const INIZIO_STA_IN_SECONDI =
        ORA_INIZIO_STA * 3600 +
        MINUTO_INIZIO_STA * 60;

    // =====================================
    // ORA NORMALE
    // =====================================

    const oreNormali = String(adesso.getHours()).padStart(2, "0");
    const minutiNormali = String(adesso.getMinutes()).padStart(2, "0");
    const secondiNormali = String(adesso.getSeconds()).padStart(2, "0");

    document.getElementById("normalTime").textContent =
        `${oreNormali}:${minutiNormali}:${secondiNormali}`;

    // =====================================
    // TEMPO REALE TRASCORSO DALLE 22:50
    // =====================================

    const secondiRealiDaMezzanotte =
        adesso.getHours() * 3600 +
        adesso.getMinutes() * 60 +
        adesso.getSeconds() +
        adesso.getMilliseconds() / 1000;

    const secondiRealiTrascorsiNelGiornoSTA =
        (
            secondiRealiDaMezzanotte -
            INIZIO_STA_IN_SECONDI +
            SECONDI_REALI_PER_GIORNO
        ) % SECONDI_REALI_PER_GIORNO;

    // =====================================
    // CONVERSIONE IN SECONDI STA
    // =====================================

    const secondiSTAtotali =
        secondiRealiTrascorsiNelGiornoSTA *
        SECONDI_STA_PER_GIORNO /
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

    // =====================================
    // DATA STA
    // =====================================

    const dataSTA = new Date(adesso);

    // Dalle 22:50 è già il giorno seguente
    if (secondiRealiDaMezzanotte >= INIZIO_STA_IN_SECONDI) {
        dataSTA.setDate(dataSTA.getDate() + 1);
    }

    document.getElementById("staDate").textContent =
        dataSTA.toLocaleDateString("it-IT", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });

    // =====================================
    // INFORMAZIONI MATEMATICHE
    // =====================================

    /*
        1 ora STA =
        86.400 / 13 =
        6.646,1538 secondi reali
        ≈ 1 ora, 50 minuti e 46 secondi reali

        1 minuto STA =
        6.646,1538 / 60 =
        110,769 secondi reali
        ≈ 1 minuto e 50,77 secondi reali

        1 secondo STA =
        110,769 / 60 =
        1,846 secondi reali
    */
}

aggiornaOrologio();

// Aggiornamento frequente per mostrare bene i secondi STA
setInterval(aggiornaOrologio, 100);
