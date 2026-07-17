function aggiornaOrologio() {
    const adesso = new Date();

    // Il tempo STA è avanti di 1 ora e 10 minuti
    const ANTICIPO_STA_MINUTI = 70;

    // =========================
    // ORA NORMALE
    // =========================

    const oreNormali = String(adesso.getHours()).padStart(2, "0");
    const minutiNormali = String(adesso.getMinutes()).padStart(2, "0");
    const secondiNormali = String(adesso.getSeconds()).padStart(2, "0");

    document.getElementById("normalTime").textContent =
        `${oreNormali}:${minutiNormali}:${secondiNormali}`;

    // =========================
    // ORA STA
    // =========================

    const dataSTA = new Date(
        adesso.getTime() + ANTICIPO_STA_MINUTI * 60 * 1000
    );

    const oreSTA = String(dataSTA.getHours()).padStart(2, "0");
    const minutiSTA = String(dataSTA.getMinutes()).padStart(2, "0");
    const secondiSTA = String(dataSTA.getSeconds()).padStart(2, "0");

    document.getElementById("staTime").textContent =
        `${oreSTA}:${minutiSTA}:${secondiSTA}`;

    // =========================
    // DATA STA
    // =========================

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
