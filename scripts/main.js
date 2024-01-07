"use strict";
// Botón següent acudit
const nouAcuditBtn = document.querySelector("#nouAcudit");
// Verifico si el botón existe antes de agregar el evento, para evitar el error
if (nouAcuditBtn) {
    // Agregar un evento de clic al botón que llamará a la función obtenerDatos
    nouAcuditBtn.addEventListener("click", obtenirAcudit);
}
// __________________
// Escoger API
// Genero un número aleatorio entre 1 y 10. Si es un número par ejecuto la Api01, en caso contrario ejecuto la Api02
function obtenirAcudit() {
    const aleatori = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
    console.log("Num. aleatori= ", aleatori);
    if (aleatori % 2 === 0) {
        obtenirAcuditApi01();
    }
    else {
        obtenirAcuditApi02();
    }
    canviarColors();
}
// __________________
// Api chistes 01 (https://icanhazdadjoke.com/)
// La función "obtenirAcuditApi01()" devuelve una Promise con el chiste
function obtenirAcuditApi01() {
    return new Promise(function (resolve, reject) {
        // Definir la URL de la API de chistes
        const url = "https://icanhazdadjoke.com/";
        // Realizo una solicitud Fetch a la API con el encabezado "Accept" para JSON, según la documentación de la API
        fetch(url, {
            headers: {
                "Accept": "application/json"
            }
        })
            .then(respuesta => {
            // Verifico la respuesta: exito = status code 200
            if (!respuesta.ok) {
                throw new Error(`Error a la sol·licitud: ${respuesta.status}`);
            }
            // Convierto la respuesta a formato JSON
            return respuesta.json();
        })
            .then(resultado01 => {
            // Muestro el resultado en la consola
            console.log(resultado01);
            // Muestro el resultado en el html
            mostrarAcuditApi01(resultado01);
            // Resuelvo la "Promise" con el chiste
            resolve(resultado01);
        })
            .catch(error => {
            // Manejo de los errores, si los hay
            console.error(error);
        })
            .then(() => {
            // Llamar a borrarValoracio al final
            borrarValoracio();
        });
    });
}
function mostrarAcuditApi01(resultado01) {
    const mostraAcuditSal = document.querySelector("#mostraAcudit");
    // Verifico si el elemento existe antes de agregar el evento, para evitar el error (is possibly 'null')
    if (mostraAcuditSal) {
        mostraAcuditSal.innerText = resultado01.joke;
    }
}
// __________________
// Api chistes 02 (https://v2.jokeapi.dev/joke/Any?lang=es&type=single)
// La función "obtenirAcuditApi02()" devuelve una Promise con el chiste
function obtenirAcuditApi02() {
    return new Promise(function (resolve, reject) {
        // Definir la URL de la API de chistes
        const url = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?lang=en&type=single";
        // Realizo una solicitud Fetch a la API con el encabezado "Accept" para JSON, según la documentación de la API
        fetch(url, {
        // headers: {
        //     "Accept": "application/json"
        // }
        })
            .then(respuesta => {
            // Verifico la respuesta: exito = status code 200
            if (!respuesta.ok) {
                throw new Error(`Error a la sol·licitud: ${respuesta.status}`);
            }
            // Convierto la respuesta a formato JSON
            return respuesta.json();
        })
            .then(resultado02 => {
            // Muestro el resultado en la consola
            console.log(resultado02);
            // Muestro el resultado en el html
            mostrarAcuditApi01(resultado02);
            // Resuelvo la "Promise" con el chiste
            resolve(resultado02);
        })
            .catch(error => {
            // Manejo de los errores, si los hay
            console.error(error);
        })
            .then(() => {
            // Llamar a borrarValoracio al final
            borrarValoracio();
        });
    });
}
function mostrarAcuditApi02(resultado02) {
    const mostraAcuditSal = document.querySelector("#mostraAcudit");
    // Verifico si el elemento existe antes de agregar el evento, para evitar el error (is possibly 'null')
    if (mostraAcuditSal) {
        mostraAcuditSal.innerHTML = resultado02.joke;
    }
}
// _________________________
// Cambio de colores
function canviarColors() {
    const canviSvg01 = document.querySelector("#contenedor");
    const canviSvg02 = document.querySelector("#contenido");
    if (canviSvg01 === null || canviSvg01 === void 0 ? void 0 : canviSvg01.getElementsByClassName("svgFondo01")) {
    }
}
// _________________________
// Llamo a obtenirAcudit al cargar la página para obtener y mostrar un chiste inicial
obtenirAcuditApi01().catch(error => console.error(error));
// _________________________
// Borro la valoración del html al pasar al siguiente chiste
function borrarValoracio() {
    const valoracioSal = document.getElementById("valoracioSal");
    if (valoracioSal) {
        valoracioSal.innerHTML = "";
    }
}
// Esto funciona
/* _________________________________________


// Botón següent acudit

const nouAcuditBtn: HTMLElement | null = document.querySelector("#nouAcudit");

// Verifico si el botón existe antes de agregar el evento, para evitar el error
if (nouAcuditBtn) {
    // Agregar un evento de clic al botón que llamará a la función obtenerDatos
    nouAcuditBtn.addEventListener("click", obtenirAcudit);
}


// __________________
// Escoger API

// Genero un número aleatorio entre 1 y 10. Si es un número par ejecuto la Api01, en caso contrario ejecuto la Api02

function obtenirAcudit() {

    const aleatori: number = Math.floor(Math.random() * (9 - 3 + 1)) + 3;
    console.log("Num. aleatori= ", aleatori);

    if (aleatori % 2 === 0) {

        obtenirAcuditApi01();
    }
    else {

        obtenirAcuditApi02();
    }
}


// __________________

// Api chistes 01 (https://icanhazdadjoke.com/)

// La función "obtenirAcuditApi01()" devuelve una Promise con el chiste
function obtenirAcuditApi01() {

    return new Promise(function(resolve, reject) {

        // Definir la URL de la API de chistes
        const url = "https://icanhazdadjoke.com/";

        // Realizo una solicitud Fetch a la API con el encabezado "Accept" para JSON, según la documentación de la API
        fetch(url, {
            headers: {
                "Accept": "application/json"
            }
        })

        .then(respuesta => {
            // Verifico la respuesta: exito = status code 200
            if (!respuesta.ok) {
                throw new Error(`Error a la sol·licitud: ${respuesta.status}`);
            }
            // Convierto la respuesta a formato JSON
            return respuesta.json();
        })
        
        .then(resultado01 => {
            // Muestro el resultado en la consola
            console.log(resultado01);
            // Muestro el resultado en el html
            mostrarAcuditApi01(resultado01);
            // Resuelvo la "Promise" con el chiste
            resolve(resultado01);
        })

        .catch(error => {
            // Manejo de los errores, si los hay
            console.error(error);
        })
        
        .then(() => {
            // Llamar a borrarValoracio al final
            borrarValoracio();
        });

    });
    

    
}

function mostrarAcuditApi01(resultado01: any) {

    const mostraAcuditSal: HTMLElement | null = document.querySelector("#mostraAcudit");


    // Verifico si el elemento existe antes de agregar el evento, para evitar el error (is possibly 'null')
    if(mostraAcuditSal) {
        mostraAcuditSal.innerText = resultado01.joke;
    }
}

// __________________

// Api chistes 02 (https://v2.jokeapi.dev/joke/Any?lang=es&type=single)

// La función "obtenirAcuditApi02()" devuelve una Promise con el chiste
function obtenirAcuditApi02() {

    return new Promise(function(resolve, reject) {

        // Definir la URL de la API de chistes
        const url = "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?lang=en&type=single";

        // Realizo una solicitud Fetch a la API con el encabezado "Accept" para JSON, según la documentación de la API
        fetch(url, {
            // headers: {
            //     "Accept": "application/json"
            // }
        })

        .then(respuesta => {
            // Verifico la respuesta: exito = status code 200
            if (!respuesta.ok) {
                throw new Error(`Error a la sol·licitud: ${respuesta.status}`);
            }
            // Convierto la respuesta a formato JSON
            return respuesta.json();
        })
        
        .then(resultado02 => {
            // Muestro el resultado en la consola
            console.log(resultado02);
            // Muestro el resultado en el html
            mostrarAcuditApi01(resultado02);
            // Resuelvo la "Promise" con el chiste
            resolve(resultado02);
        })

        .catch(error => {
            // Manejo de los errores, si los hay
            console.error(error);
        })
        
        .then(() => {
            // Llamar a borrarValoracio al final
            borrarValoracio();
        });

    });
    

    
}

function mostrarAcuditApi02(resultado02: any) {

    const mostraAcuditSal: HTMLElement | null = document.querySelector("#mostraAcudit");


    // Verifico si el elemento existe antes de agregar el evento, para evitar el error (is possibly 'null')
    if(mostraAcuditSal) {
        mostraAcuditSal.innerHTML = resultado02.joke;
    }
}



// _________________________
// Llamo a obtenirAcudit al cargar la página para obtener y mostrar un chiste inicial
obtenirAcuditApi01().catch(error => console.error(error));


// _________________________
// Borro la valoración del html al pasar al siguiente chiste

function borrarValoracio() {

    const valoracioSal: HTMLElement | null = document.getElementById("valoracioSal");

    if(valoracioSal) {
        valoracioSal.innerHTML = "";
    }
    
}


*/ 
