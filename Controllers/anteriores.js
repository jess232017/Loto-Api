
import axios from 'axios';
import NodeCache from 'node-cache';
import checkTime from '../utils/checkTime.js';
import HtmlTableToJson from 'html-table-to-json';

const lastCache = new NodeCache();

const anteriores = async (name) => {
    const isOnline = checkTime(11, 0, 11, 10) || checkTime(15, 0, 15, 10) || checkTime(21, 0, 20, 10);

    if (isOnline === true || lastCache.has(name) === false) {
        console.log("fetched")
        return await fetchRemote(name);
    }

    console.log("localed");
    return fetchLocal(name);
}

const fetchLocal = (name) => {
    try {
        if (lastCache.has(name)) {
            return lastCache.get(name);
        }
    } catch (error) {
        console.log(error)
    }
}

const fetchRemote = async (name) => {
    try {
        const respuesta = await axios({
            method: 'get', url: 'https://www.yelu.com.ni/lottery/results/' + name
        });

        let anteriores = HtmlTableToJson.parse(respuesta.data)._results[0];
        anteriores = anteriores.map(value => {
            let fechaAux = value["Fecha del Sorteo"];
            let numAux = value["Números Ganadores"];
            let horaAux = value["Juega"];

            //Formatear fecha
            fechaAux = fechaAux.replace(" 2021", "").replace(" - ", "*");
            fechaAux = fechaAux.split("*");
            const fecha = `${fechaAux[1]} ${fechaAux[0]}`;

            //Formatear Numero
            let numero;
            if (horaAux.includes("Loto Diaria ")) {
                numAux = numAux.match(/.{1,2}/g);
                numero = `${numAux[0]} (${numAux[1]})`;
                horaAux = horaAux.replace("Loto Diaria ", "");
            }

            if (horaAux.includes("Fechas ")) {
                numero = numAux;
                horaAux = horaAux.replace("Fechas ", "");
            }

            if (horaAux.includes("Premia")) {
                numAux = numAux.match(/.{1,2}/g);
                numero = `${numAux[0]} - ${numAux[1]}`;
                horaAux = horaAux.replace("Premia", "");
            }

            if (horaAux.includes("Juga")) {
                numero = numAux;
                horaAux = horaAux.replace("Juga", "");
            }

            horaAux = horaAux.replace(",", "");

            const hora = `${('00' + horaAux.match(/\d+/g)).slice(-2)}:00 ${horaAux.replace(/\d+/g, '')}`;

            return { fecha, hora, numero }
        })
        lastCache.set('anteriores', anteriores);
        return anteriores;

    } catch (error) {
        console.log(error);
    }
}

export default anteriores;