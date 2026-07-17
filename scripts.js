const OFFSET_MINUTES = 70;

let ultimoMinutoSTA = null;

function pad(numero) {
    return String(numero).padStart(2, "0");
}

function formattaOra(data) {
    return `${pad(data.getHours())}:${pad(data.getMinutes())}:${pad(data.getSeconds())}`;
}

function formattaDataSTA(data) {
    const giorni = [
        "domenica",
        "lunedì",
        "martedì",
        "mercoledì",
        "giovedì",
        "venerdì",
        "sabato"
    ];

    const mesi = [
        "gennaio",
        "febbraio",
        "marzo",
        "aprile",
        "maggio",
        "giugno",
        "luglio",
        "agosto",
        "settembre",
        "ottobre",
        "novembre",
        "dicembre"
    ];

    const giornoSettimana = giorni[data.getDay()];
    const giorno = data.getDate();
    const mese = mesi[data.getMonth()];
    const anno = data.getFullYear();

    return `${giornoSettimana} ${giorno} ${mese} ${anno}`;
}

function attivaFlashMinuto() {
    const flash = document.getElementById("minuteFlash");

    if (!flash) {
        return;
    }

    flash.classList.remove("active");

    void flash.offsetWidth;

    flash.classList.add("active");
}

function aggiornaOrologio() {
    const oraNormale = new Date();

    const oraSTA = new Date(
        oraNormale.getTime() + OFFSET_MINUTES * 60 * 1000
    );

    const elementoSTA = document.getElementById("staTime");
    const elementoNormale = document.getElementById("normalTime");
    const elementoData = document.getElementById("staDate");

    if (elementoSTA) {
        elementoSTA.textContent = formattaOra(oraSTA);
    }

    if (elementoNormale) {
        elementoNormale.textContent = formattaOra(oraNormale);
    }

    if (elementoData) {
        elementoData.textContent = formattaDataSTA(oraSTA);
    }

    const minutoSTA = oraSTA.getMinutes();

    if (
        ultimoMinutoSTA !== null &&
        minutoSTA !== ultimoMinutoSTA
    ) {
        attivaFlashMinuto();
    }

    ultimoMinutoSTA = minutoSTA;
}

function creaParticelle() {
    const contenitore = document.getElementById("particles");

    if (!contenitore) {
        return;
    }

    const numeroParticelle = 38;

    for (let i = 0; i < numeroParticelle; i++) {
        const particella = document.createElement("span");

        particella.classList.add("particle");

        const posizioneSinistra = Math.random() * 100;
        const posizioneVerticale = Math.random() * 100;

        const durata = 12 + Math.random() * 18;
        const ritardo = Math.random() * -25;

        const dimensione = 1 + Math.random() * 3;

        particella.style.left = `${posizioneSinistra}%`;
        particella.style.top = `${posizioneVerticale}%`;

        particella.style.width = `${dimensione}px`;
        particella.style.height = `${dimensione}px`;

        particella.style.animationDuration =
            `${durata}s, ${2 + Math.random() * 3}s`;

        particella.style.animationDelay =
            `${ritardo}s, ${Math.random() * -5}s`;

        contenitore.appendChild(particella);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    creaParticelle();
    aggiornaOrologio();

    setInterval(aggiornaOrologio, 1000);
});
