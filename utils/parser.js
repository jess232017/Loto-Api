import HtmlTableToJson from 'html-table-to-json';

export function resultToJson(entrada) {

    let resultado = HtmlTableToJson.parse(entrada).results;
    resultado;

    //Retornar JSON
    return resultado;
}