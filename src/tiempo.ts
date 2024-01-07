
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

    // La API utiliza la información de AEMET, por lo que las descripciones de estado de cielo se corresponden con las suyas
    // Creo un objeto de mapeo que mapee las descripciones del estado del cielo a las rutas de las imágenes correspondientes

    const anchoImagen: string = "48px";
    const altoImagen: string = "48px";
    const mapeoEstadoCielo: { [descripcion: string]: { ruta: string; ancho?: string; alto?: string } } = {
        
        "Despejado": { ruta: "./img/darksky/despejado.svg", ancho: anchoImagen, alto: altoImagen },
        "Despejado noche": { ruta: "./img/darksky/despejado-noche.svg", ancho: anchoImagen, alto: altoImagen },
        "Poco nuboso": { ruta: "./img/darksky/dia-parcialmente-nublado.svg", ancho: anchoImagen, alto: altoImagen },
        "Poco nuboso noche": { ruta: "./img/darksky/noche-parcialmente-nublada.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos": { ruta: "./img/darksky/dia-parcialmente-nublado.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos noche": { ruta: "./img/darksky/noche-parcialmente-nublada.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso": { ruta: "./img/darksky/nublado.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso noche": { ruta: "./img/darksky/nublado.svg", ancho: anchoImagen, alto: altoImagen },
        "Muy nuboso": { ruta: "./img/darksky/nublado.svg", ancho: anchoImagen, alto: altoImagen },
        "Cubierto": { ruta: "./img/darksky/nublado.svg", ancho: anchoImagen, alto: altoImagen },
        "Nubes altas": { ruta: "./img/darksky/nublado.svg", ancho: anchoImagen, alto: altoImagen },
        "Nubes altas noche": { ruta: "./img/darksky/nublado.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con lluvia escasa": { ruta: "./img/darksky/dia-parcialmente-nublado-lluvia.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con lluvia escasa noche": { ruta: "./img/darksky/noche-lluvia-parcialmente-nublada.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con lluvia escasa": { ruta: "./img/darksky/dia-parcialmente-nublado-lluvia.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con lluvia escasa noche": { ruta: "./img/darksky/noche-lluvia-parcialmente-nublada.svg", ancho: anchoImagen, alto: altoImagen },
        "Muy nuboso con lluvia escasa": { ruta: "./img/darksky/llovizna.svg", ancho: anchoImagen, alto: altoImagen },
        "Cubierto con lluvia escasa": { ruta: "./img/darksky/llovizna.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con lluvia": { ruta: "./img/darksky/dia-parcialmente-nublado-lluvia.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con lluvia noche": { ruta: "./img/darksky/cloudy.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con lluvia": { ruta: "./img/darksky/noche-lluvia-parcialmente-nublada.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con lluvia noche": { ruta: "./img/darksky/lluvia.svg", ancho: anchoImagen, alto: altoImagen },
        "Muy nuboso con lluvia": { ruta: "./img/darksky/lluvia.svg", ancho: anchoImagen, alto: altoImagen },
        "Cubierto con lluvia": { ruta: "./img/darksky/lluvia.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con nieve escasa": { ruta: "./img/darksky/aguanieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con nieve escasa noche": { ruta: "./img/darksky/aguanieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con nieve escasa": { ruta: "./img/darksky/aguanieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con nieve escasa noche": { ruta: "./img/darksky/aguanieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Muy nuboso con nieve escasa": { ruta: "./img/darksky/aguanieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Cubierto con nieve escasa": { ruta: "./img/darksky/aguanieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con nieve": { ruta: "./img/darksky/cloudy.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con nieve noche": { ruta: "./img/darksky/nieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con nieve": { ruta: "./img/darksky/nieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con nieve noche": { ruta: "./img/darksky/nieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Muy nuboso con nieve": { ruta: "./img/darksky/nieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Cubierto con nieve": { ruta: "./img/darksky/nieve.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con tormenta": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con tormenta noche": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con tormenta": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con tormenta noche": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Muy nuboso con tormenta": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Cubierto con tormenta": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con tormenta y lluvia escasa": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Intervalos nubosos con tormenta y lluvia escasa noche": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con tormenta y lluvia escasa": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Nuboso con tormenta y lluvia escasa noche": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Muy nuboso con tormenta y lluvia escasa": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Cubierto con tormenta y lluvia escasa": { ruta: "./img/darksky/tormenta.svg", ancho: anchoImagen, alto: altoImagen },
        "Niebla": { ruta: "./img/darksky/niebla.svg", ancho: anchoImagen, alto: altoImagen },
        "Bruma": { ruta: "./img/darksky/niebla.svg", ancho: anchoImagen, alto: altoImagen },
        "Calima": { ruta: "./img/darksky/niebla.svg", ancho: anchoImagen, alto: altoImagen },
    };

    // Verifico si el elemento existe antes de agregar el evento, para evitar el error (is possibly 'null')
    if (mostraTempsSal) {
        let mensaje: string = "";
        mensaje += `<p>${resultado.fecha}</p>`;

        // Obtengo la información de la imagen usando el mapeo
        const infoImagenEstadoCielo = mapeoEstadoCielo[resultado.stateSky.description] || { ruta: "./img/darksky/default.svg" };
        const { ruta, ancho, alto } = infoImagenEstadoCielo;

        // Construyo la etiqueta de la imagen con las dimensiones
        mensaje += `<img src="${ruta}" alt="${resultado.stateSky.description}" style="width: ${ancho}; height: ${alto};">`;

        mensaje += `<p>${resultado.temperatura_actual} °C</p>`;
        mensaje += `<p>${resultado.humedad} % humitat</p>`;
        mensaje += `<p><a href="https://www.el-tiempo.net/" target="_blank">&nbsp;&nbsp;&nbsp;&nbsp;elTiempo.net | Barcelona</a></p>`;

        mostraTempsSal.innerHTML = mensaje;
    }
}


// Llamo a obtenirtemps al cargar la página para obtener y mostrar el tiempo al inicio
obtenirTemps().catch(error => console.error(error));



//Esto funciona

