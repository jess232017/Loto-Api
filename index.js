import express from 'express';
import axios from 'axios';
import qs from 'qs';
import { resultToJson } from './utils/parser.js'
import HtmlTableToJson from 'html-table-to-json';

const app = express();

app.use(express.urlencoded({ extended: true }))

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 4001;

async function getResultado() {
    const url = "https://nuevaya.com.ni/loto-diaria-de-nicaragua/";
    try {
        const respuesta = await axios({
            method: 'get', url
        });

        let resultado = HtmlTableToJson.parse(respuesta.data).results;
        resultado[0].push();
        resultado[1].push();
        resultado[2].push();
        resultado[3].push();
        
        return resultado;
        
    } catch (error) {
        console.log(error);
    }
}

app.get('/obtener-todos', async(_, res) => {
    let resultado = await getResultado();

    res.json({
        resultado,
        mensaje: "operacion exitosa"
    });
});


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});