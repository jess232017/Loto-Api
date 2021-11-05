import HtmlTableToJson from 'html-table-to-json';
import HTML from 'html-parse-stringify';


export function resultToJson(entrada) {

    //Eliminar elementos que no son del resultado
    let posicion = entrada.indexOf('<table>');
    entrada = entrada.substring(posicion);

    let posicion3 = entrada.indexOf("</table>") + 8;
    entrada = entrada.substring(0, posicion3);

    //Obtener un Json a partir del Table HTML
    let resultado = HtmlTableToJson.parse(entrada).results;

    //Retornar JSON
    return resultado;
}