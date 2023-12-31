"use strict";
let reportAcudits = [];
const btnCaraTriste = document.getElementById("btnCaraTriste");
const btnCaraNeutra = document.getElementById("btnCaraNeutra");
const btnCaraFeliz = document.getElementById("btnCaraFeliz");
const valoracioSal = document.getElementById("valoracioSal");
btnCaraTriste === null || btnCaraTriste === void 0 ? void 0 : btnCaraTriste.addEventListener("click", () => puntuarAcudit(1));
btnCaraNeutra === null || btnCaraNeutra === void 0 ? void 0 : btnCaraNeutra.addEventListener("click", () => puntuarAcudit(2));
btnCaraFeliz === null || btnCaraFeliz === void 0 ? void 0 : btnCaraFeliz.addEventListener("click", () => puntuarAcudit(3));
function puntuarAcudit(puntuacio) {
    if (valoracioSal) {
        valoracioSal.innerHTML = `La teva valoració ha estat de <span class="destaca">${puntuacio.toString()} de 3 punts</span>`;
        trackingAcudits(puntuacio);
    }
}
function trackingAcudits(puntuacio) {
    const actualJoke = document.querySelector("#mostraAcudit");
    const textAcudit = (actualJoke === null || actualJoke === void 0 ? void 0 : actualJoke.textContent) || "";
    // Compruebo si el acudit ya ha sido valorado para actualizar su puntuación
    const existeixAcudit = reportAcudits.find((acudit) => acudit._joke === textAcudit);
    if (existeixAcudit) {
        existeixAcudit._score = puntuacio;
        console.log("Acudit existent: ", textAcudit);
        console.log("Nova puntuació: ", puntuacio);
        console.log("La puntuació ha variat, només s'aplica la nova puntuació");
    }
    else {
        let isoDate = new Date().toISOString();
        const nouAcudit = {
            _joke: textAcudit,
            _score: puntuacio,
            _date: isoDate
        };
        reportAcudits.push(nouAcudit);
        console.log("Acudit: ", textAcudit);
        console.log("Puntuació: ", puntuacio);
        console.log("Data: ", nouAcudit._date);
        console.table(reportAcudits);
    }
}
