// Librerías importadas
require('dotenv').config();
const express = require('express'); /* INICIAR EXPRESS */
const logger = require('morgan'); // console.log(process.env);
const cors = require('cors');
const mongoSanitize = require('express-mongo-sanitize');

// componentes "mios" que voy a usar
const HTTPSTATUSCODE = require('./utils/httpStatusCode');
const connectMongo = require('./utils/db');
// imports de routes
const movieRouter = require('./src/routes/movie.routes');
const userRouter = require('./src/routes/user.routes');
const studioRouter = require('./src/routes/studio.routes')

connectMongo();
const app = express();
app.use(mongoSanitize());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
// app.use(cors({
//     origin: ['http://localhost:3000', 'http://localhost:4200'],
//     credentials: true,
// }));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.set("secretKey", "nodeRestApi");


/* ROUTES */
app.use('/api/movies', movieRouter);
app.use('/api/users', userRouter);
app.use('/api/studios', studioRouter);


// ruta de bienvenida
app.get('/', (request, response) => {
    response.status(200).json({
        message: 'Welcome to my server',
        app: 'Movie App'
    });
});

/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
app.listen(process.env.PORT, () => {
    console.log(`app running in port ${process.env.PORT}`);
})
