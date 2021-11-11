import express from 'express';
import resultadoApi from './Controllers/resultado.js';

const app = express();

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

const port = process.env.PORT || 4001;



app.get('/obtener-todos', async(_, res) => {
    let resultado = await resultadoApi();

    res.json({
        resultado,
        mensaje: "operacion exitosa"
    });
});


app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`)
});