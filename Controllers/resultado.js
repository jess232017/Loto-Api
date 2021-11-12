
import axios from 'axios';
import NodeCache from 'node-cache';
import checkTime from '../utils/checkTime.js';
import HtmlTableToJson from 'html-table-to-json';

const resultCache = new NodeCache();

const resultado = async () => {
    const isOnline = checkTime(11, 0, 11, 10) || checkTime(15, 0, 15, 10) || checkTime(21, 0, 20, 10);

    if( isOnline === true || resultCache.has('resultado') === false){
        console.log("fetched")
        return await fetchRemote();
    }

    console.log("localed");
    return fetchLocal();
}

const fetchLocal = () =>{
    try {
        if(resultCache.has('resultado')){
            return resultCache.get('resultado');
        }
    } catch (error) {
        console.log(error)
    }
}

const fetchRemote = async() =>{
    try {
        const respuesta = await axios({
            method: 'get', url : 'https://nuevaya.com.ni/loto-diaria-de-nicaragua/'
        });

        let resultado = HtmlTableToJson.parse(respuesta.data).results;
        resultado[0].pop();
        resultado[1].pop();
        resultado[2].pop();
        resultado[3].pop();

        resultCache.set('resultado', resultado);
        return resultado;

    } catch (error) {
        console.log(error);
    }
}
 
export default resultado;