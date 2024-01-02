
interface TypeAcudit {
    _joke: string;
    _score: number;
    _date: string;  // Cambio Date a string para reflejar el formato ISO 8601
}

let reportAcudits: TypeAcudit[] = [];

// const btnValoracions: NodeListOf<HTMLInputElement> = document.querySelectorAll('input[name="valoracio"]');
// console.log("Botones de valoración:", btnValoracions);

// const triste = btnValoracions[0];
// const neutra = btnValoracions[1];
// const feliz = btnValoracions[3];

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
       
        trackingAcudits(puntuacio); // Llamo a la función de tracking con la puntuación
    }
}
        

function trackingAcudits(puntuacio: number){

    // Obtener el texto del chiste
    const actualJoke: HTMLElement | null = document.querySelector("#mostraAcudit");
    const textAcudit: string = actualJoke?.textContent || "";

    // Comprueb0 si el acudit ya ha sido valorado
    const existeixAcudit = reportAcudits.find((acudit) => acudit._joke === textAcudit);

    if (existeixAcudit) {
        // Si ya existe, actualizar la puntuación
        existeixAcudit._score = puntuacio;
        console.log("Acudit existent: ", textAcudit)
        console.log("Nova puntuació: ", puntuacio)
        console.log("La puntuació ha variat, només s'aplica la nova puntuació")
    } 
    else {

        // Si no existe, creo un objeto TypeAcudit con la información

            // Obtengo la fecha en formato ISO 8601
        let isoDate: string = new Date().toISOString();

        const nouAcudit: TypeAcudit = {
                _joke: textAcudit,
                _score: puntuacio,
                _date: isoDate
            };

        // Agregar el objeto al array
        reportAcudits.push(nouAcudit);

        // Mostrar información en la consola
        console.log("Acudit: ", textAcudit);
        console.log("Puntuació: ", puntuacio);
        console.log("Data: ", nouAcudit._date);

        console.table(reportAcudits);
        
    }
}

