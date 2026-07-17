function aggiornaOrologio() {
    const adesso = new Date();

    const ORA_INIZIO_STA = 22;
    const MINUTO_INIZIO_STA = 50;

    // =========================
    // ORA NORMALE
    // =========================

    const oreNormali = String(adesso.getHours()).padStart(2, "0");
    const minutiNormali = String(adesso.getMinutes()).padStart(2, "0");
    const secondiNormali = String(adesso.getSeconds()).padStart(2, "0");

    document.getElementById("normalTime").textContent =
        `${oreNormali}:${minutiNormali}:${secondiNormali}`;

    // =========================
    // INIZIO DEL GIORNO STA
    // =========================

    let inizioGiornoSTA = new Date(adesso);

    inizioGiornoSTA.setHours(
        ORA_INIZIO_STA,
        MINUTO_INIZIO_STA,
        0,
        0
    );

    // Se non sono ancora le 22:50,
    // il giorno STA è iniziato ieri
    if (adesso < inizioGiornoSTA) {
        inizioGiornoSTA.setDate(
            inizioGiornoSTA.getDate() - 1
        );
    }

    // Tempo trascorso dall'inizio del giorno STA
    const millisecondiTrascorsi =
        adesso.getTime() - inizioGiornoSTA.getTime();

    const secondiTotaliSTA =
        Math.floor(millisecondiTrascorsi / 1000);

    // =========================
    // ORA STA
    // =========================

    const oreSTA =
        Math.floor(secondiTotaliSTA / 3600) % 24;

    const minutiSTA =
        Math.floor((secondiTotaliSTA % 3600) / 60);

    const secondiSTA =
        secondiTotaliSTA % 60;

    document.getElementById("staTime").textContent =
        `${String(oreSTA).padStart(2, "0")}:` +
        `${String(minutiSTA).padStart(2, "0")}:` +
        `${String(secondiSTA).padStart(2, "0")}`;

    // =========================
    // DATA STA
    // =========================

    const dataSTA = new Date(inizioGiornoSTA);

    // Il giorno iniziato alle 22:50
    // prende la data del giorno successivo
    dataSTA.setDate(dataSTA.getDate() + 1);

    document.getElementById("staDate").textContent =
        dataSTA.toLocaleDateString("it-IT", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        });
}

aggiornaOrologio();
setInterval(aggiornaOrologio, 1000);
