
// La función "obtenirTemps()" devuelve una Promise con el pronóstico del tiempo
function obtenirTemps() {

    return new Promise(function(resolve, reject) {

        // Definir la URL de la API del tiempo
        const url = "https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/08019";

        // Realizo una solicitud Fetch a la API 
        fetch(url, {
/*             headers: {
                "Accept": "application/json"
            } */
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
            mostrarTemps(resultado);
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

function mostrarTemps(resultado: any) {

    const mostraTempsSal: HTMLElement | null = document.querySelector("#mostraTemps");


    // Verifico si el elemento existe antes de agregar el evento, para evitar el error (is possibly 'null')
    if(mostraTempsSal) {

        let mensaje: string = "";
        mensaje  = `<p>${resultado.fecha}</p>`;
        mensaje += `<p>${resultado.stateSky.description}</p>`;
        mensaje += `<p>${resultado.temperatura_actual} °C</p>`;
        mensaje += `<p>${resultado.humedad} % humitat</p>`;
        mensaje += `<p><a href="https://www.el-tiempo.net/" target="_blank">&nbsp;&nbsp;&nbsp;&nbsp;elTiempo.net | Barcelona</a></p>`;

        mostraTempsSal.innerHTML = mensaje;
    }
}
// Llamo a obtenirtemps al cargar la página para obtener y mostrar el tiempo al inicio
obtenirTemps().catch(error => console.error(error));


