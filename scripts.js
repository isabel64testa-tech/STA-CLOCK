function aggiornaOrologio() {
    const adesso = new Date();

    // ORA NORMALE
    const oreNormali = String(adesso.getHours()).padStart(2, "0");
    const minutiNormali = String(adesso.getMinutes()).padStart(2, "0");
    const secondiNormali = String(adesso.getSeconds()).padStart(2, "0");

    document.getElementById("normalTime").textContent =
        `${oreNormali}:${minutiNormali}:${secondiNormali}`;

    // SECONDI TRASCORSI DALLA MEZZANOTTE NORMALE
    const secondiNormaliTotali =
        adesso.getHours() * 3600 +
        adesso.getMinutes() * 60 +
        adesso.getSeconds() +
        adesso.getMilliseconds() / 1000;

    // Il giorno STA comincia alle 22:50
    const inizioGiornoSTA = 22 * 3600 + 50 * 60;
    const durataGiorno = 24 * 3600;

    // Tempo trascorso dall'inizio del giorno STA
    const trascorsoSTA =
        (secondiNormaliTotali - inizioGiornoSTA + durataGiorno)
        % durataGiorno;

    // Una giornata normale viene convertita in 13 ore STA
    const secondiSTAtotali =
        trascorsoSTA * (13 * 3600) / durataGiorno;

    const oreSTA = Math.floor(secondiSTAtotali / 3600);
    const minutiSTA = Math.floor((secondiSTAtotali % 3600) / 60);
    const secondiSTA = Math.floor(secondiSTAtotali % 60);

    document.getElementById("staTime").textContent =
        `${String(oreSTA).padStart(2, "0")}:` +
        `${String(minutiSTA).padStart(2, "0")}:` +
        `${String(secondiSTA).padStart(2, "0")}`;

    // DATA STA: dalle 22:50 è già il giorno successivo
    const dataSTA = new Date(adesso);

    if (secondiNormaliTotali >= inizioGiornoSTA) {
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
setInterval(aggiornaOrologio, 200);
