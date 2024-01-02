"use strict";
const nouAcuditBtn = document.querySelector("#nouAcudit");
// Verifico si el botón existe antes de agregar el evento, para evitar el error
if (nouAcuditBtn) {
    // Agregar un evento de clic al botón que llamará a la función obtenerDatos
    nouAcuditBtn.addEventListener("click", obtenirAcudit);
}
// La función "obtenirAcudit()" devuelve una Promise con el chiste
function obtenirAcudit() {
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
            .then(resultado => {
            // Muestro el resultado en la consola
            console.log(resultado);
            // Muestro el resultado en el html
            mostrarAcudit(resultado);
            // Resuelvo la "Promise" con el chiste
            resolve(resultado);
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
function mostrarAcudit(resultado) {
    const mostraAcuditSal = document.querySelector("#mostraAcudit");
    // Verifico si el elemento existe antes de agregar el evento, para evitar el error (is possibly 'null')
    if (mostraAcuditSal) {
        mostraAcuditSal.innerText = resultado.joke;
    }
}
// Llamo a obtenirAcudit al cargar la página para obtener y mostrar un chiste inicial
obtenirAcudit().catch(error => console.error(error));
function borrarValoracio() {
    const valoracioSal = document.getElementById("valoracioSal");
    if (valoracioSal) {
        valoracioSal.innerHTML = "";
    }
}
