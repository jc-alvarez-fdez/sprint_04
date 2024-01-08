
function obtenirTemps() {

    return new Promise(function(resolve, reject) {

        const url = "https://www.el-tiempo.net/api/json/v2/provincias/08/municipios/08019";

        fetch(url)

        .then(respuesta => {
            if (!respuesta.ok) {
                throw new Error(`Error a la sol·licitud: ${respuesta.status}`);
            }
            return respuesta.json();
        })
        
        .then(resultado => {
            console.log(resultado);
            mostrarTemps(resultado);
            resolve(resultado);
        })

        .catch(error => {
            console.error(error);
        })
        
        .then(() => {
            borrarValoracio();
        });

    });
    

    
}

function mostrarTemps(resultado: any) {

    const mostraTempsSal: HTMLElement | null = document.querySelector("#mostraTemps");

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

    if (mostraTempsSal) {
        let mensaje: string = "";
        mensaje += `<p>${resultado.fecha}</p>`;

        const infoImagenEstadoCielo = mapeoEstadoCielo[resultado.stateSky.description] || { ruta: "./img/darksky/default.svg" };
        const { ruta, ancho, alto } = infoImagenEstadoCielo;

        mensaje += `<img src="${ruta}" alt="${resultado.stateSky.description}" style="width: ${ancho}; height: ${alto};">`;

        mensaje += `<p>${resultado.temperatura_actual} °C</p>`;
        mensaje += `<p>${resultado.humedad} % humitat</p>`;
        mensaje += `<p><a href="https://www.el-tiempo.net/" target="_blank">&nbsp;&nbsp;&nbsp;&nbsp;elTiempo.net | Barcelona</a></p>`;

        mostraTempsSal.innerHTML = mensaje;
    }
}


// Llamo a obtenirtemps al cargar la página para obtener y mostrar el tiempo al inicio
obtenirTemps().catch(error => console.error(error));


