import express from 'express';
import AnterioresApi from './Controllers/anteriores.js';
import resultadoApi from './Controllers/resultado.js';

const app = express();

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 4001;

app.get('/obtener-todos', async (_, res) => {
    let resultado = await resultadoApi();
    res.json({ resultado, mensaje: "operacion exitosa" });
});

app.get('/obtener-diaria', async (_, res) => {
    let resultado = await resultadoApi();
    res.json({ resultado: resultado[0], mensaje: "operacion exitosa" });
});

app.get('/obtener-fecha', async (_, res) => {
    let resultado = await resultadoApi();
    res.json({ resultado: resultado[1], mensaje: "operacion exitosa" });
});

app.get('/obtener-juga', async (_, res) => {
    let resultado = await resultadoApi();
    res.json({ resultado: resultado[2], mensaje: "operacion exitosa" });
});

app.get('/obtener-premia', async (_, res) => {
    let resultado = await resultadoApi();
    res.json({ resultado: resultado[3], mensaje: "operacion exitosa" });
});

app.get('/results/diaria', async (_, res) => {
    let resultado = await AnterioresApi('diaria');
    res.json({ resultado: resultado, mensaje: "operacion exitosa" });
});

app.get('/results/fechas', async (_, res) => {
    let resultado = await AnterioresApi('fechas');
    res.json({ resultado: resultado, mensaje: "operacion exitosa" });
});

app.get('/results/juga-tres', async (_, res) => {
    let resultado = await AnterioresApi('juga-tres');
    res.json({ resultado: resultado, mensaje: "operacion exitosa" });
});

app.get('/results/premia-dos', async (_, res) => {
    let resultado = await AnterioresApi('premia-dos');
    res.json({ resultado: resultado, mensaje: "operacion exitosa" });
});


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});