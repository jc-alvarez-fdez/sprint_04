

const nouAcuditBtn: HTMLElement | null = document.querySelector("#nouAcudit");

if (nouAcuditBtn) {
    nouAcuditBtn.addEventListener("click", obtenirAcudit);
}

// Alternar API de chistes __________________

function obtenirAcudit() {

    alternarColor();

    const aleatori: number = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
    console.log("Num. aleatori= ", aleatori);

    if (aleatori % 2 === 0) {

        obtenirAcuditApi01();
    }
    else {

        obtenirAcuditApi02();
    }
}


// Api chistes 01 (https://icanhazdadjoke.com/)

function obtenirAcuditApi01() {

    return new Promise(function(resolve, reject) {

        const url = "https://icanhazdadjoke.com/";

        fetch(url)

        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`Error a la sol·licitud: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        
        .then(resultado01 => {
            console.log(resultado01);
            mostrarAcuditApi01(resultado01);
            resolve(resultado01);
        })

        .catch(error => {
            console.error(error);
        })
        
        .then(() => {
            borrarValoracio();

        });

    });
    

    
}

function mostrarAcuditApi01(resultado01: any) {

    const mostraAcuditSal: HTMLElement | null = document.querySelector("#mostraAcudit");

    if(mostraAcuditSal) {
        mostraAcuditSal.innerText = resultado01.joke;
    }
}

// Api chistes 02 (https://v2.jokeapi.dev/joke/Any?lang=es&type=single)

function obtenirAcuditApi02() {

    return new Promise(function(resolve, reject) {

        const url = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?lang=en&type=single";

        fetch(url)

        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`Error a la sol·licitud: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        
        .then(resultado02 => {
            console.log(resultado02);
            mostrarAcuditApi01(resultado02);
            resolve(resultado02);
        })

        .catch(error => {
            console.error(error);
        })
        
        .then(() => {
             borrarValoracio();
        });

    });
}

function mostrarAcuditApi02(resultado02: any) {

    const mostraAcuditSal: HTMLElement | null = document.querySelector("#mostraAcudit");

    if(mostraAcuditSal) {
        mostraAcuditSal.innerHTML = resultado02.joke;
    }
}

// _________________________
// Reseteo la valoración del html al pasar al siguiente chiste

function borrarValoracio() {

    const valoracioSal: HTMLElement | null = document.getElementById("valoracioSal");

    if(valoracioSal) {
        valoracioSal.innerHTML = "";
    }
    
}

// Alternancia de colores _________________________

function canviarFons() {
    const canviSvg01: HTMLElement | null = document.querySelector("#contenido");
    const canviSvg02: HTMLElement | null = document.querySelector("#preparat");

    if (canviSvg01 && canviSvg02) {
        canviSvg01.classList.toggle("svg01_fondo01");
        canviSvg01.classList.toggle("svg01_fondo02");

        canviSvg02.classList.toggle("svg02_fondo01");
        canviSvg02.classList.toggle("svg02_fondo02");
    }
}

function alternarColor() {
    const rootElement = document.documentElement;

    const colorActual = getComputedStyle(rootElement).getPropertyValue('--color01').trim();

    const colorAlterna01 = '#a55d07';
    const colorAlterna02 = '#896BB2';

    const nuevoColor = (colorActual === colorAlterna01) ? colorAlterna02 : colorAlterna01;

    rootElement.style.setProperty('--color01', nuevoColor);

    canviarFons();
}


// Muestro un chiste inicial al cargar la página _________________________
obtenirAcuditApi01().catch(error => console.error(error));

