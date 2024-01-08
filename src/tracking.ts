
interface TypeAcudit {
    _joke: string;
    _score: number;
    _date: string;  // Cambio Date a string para reflejar el formato ISO 8601
}

let reportAcudits: TypeAcudit[] = [];

const btnCaraTriste: HTMLElement | null = document.getElementById("btnCaraTriste");
const btnCaraNeutra: HTMLElement | null = document.getElementById("btnCaraNeutra");
const btnCaraFeliz: HTMLElement | null = document.getElementById("btnCaraFeliz");

const valoracioSal: HTMLElement | null = document.getElementById("valoracioSal");

btnCaraTriste?.addEventListener("click", () => puntuarAcudit(1));
btnCaraNeutra?.addEventListener("click", () => puntuarAcudit(2));
btnCaraFeliz?.addEventListener("click", () => puntuarAcudit(3));


function puntuarAcudit(puntuacio: number) {
    if (valoracioSal) {
        valoracioSal.innerHTML = `La teva valoració ha estat de <span class="destaca">${puntuacio.toString()} de 3 punts</span>`;
       
        trackingAcudits(puntuacio); 
    }
}
        

function trackingAcudits(puntuacio: number){

    const actualJoke: HTMLElement | null = document.querySelector("#mostraAcudit");
    const textAcudit: string = actualJoke?.textContent || "";

    // Compruebo si el acudit ya ha sido valorado para actualizar su puntuación
    const existeixAcudit = reportAcudits.find((acudit) => acudit._joke === textAcudit);

    if (existeixAcudit) {
        existeixAcudit._score = puntuacio;
        console.log("Acudit existent: ", textAcudit)
        console.log("Nova puntuació: ", puntuacio)
        console.log("La puntuació ha variat, només s'aplica la nova puntuació")
    } 
    else {

        let isoDate: string = new Date().toISOString();

        const nouAcudit: TypeAcudit = {
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

