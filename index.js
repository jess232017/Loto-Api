import express from 'express';
import axios from 'axios';
import qs from 'qs';
import { resultToJson } from './utils/parser.js'

const app = express();

app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 4001;


async function getFactura() {
    const url = "https://nuevaya.com.ni/loto-diaria-de-nicaragua/";
    try {
        const respuesta = await axios({
            method: 'get', url
        });
        
        return resultToJson(respuesta.data);
    } catch (error) {
        console.log(error);
    }
}

app.get('/obtener-todos', async(req, res) => {
    const objCalcular = req.body;
    let resultado = await getFactura(objCalcular);

    res.json({
        resultado,
        mensaje: "operacion exitosa"
    });
});


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
})