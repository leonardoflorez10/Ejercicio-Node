# CREAR UN PROYECTO EN NODE
 
1. instalar node (https://nodejs.org/en/download/current)
2. Ejecutar en consola, dentro de la carpeta del proyecto
```bash
npm init
```
rellenar los campos que solicite
 
3. modificar el campo "scripts" del archivo package.json
 
```json
  "scripts": {
    "dev": "nodemon index.js",
    "start": "node index.js"
  },
```
 
4. instalar las librerías necesarias:
 
```bash
npm i express
npm i nodemon
npm i mongoose
...
```
 
 
 
 
 
# API BÁSICA
 
Este es el contenido básico que debe figurar en index.js
 
```javascript
/* INICIAR EXPRESS */
const express = require('express');
const app = express();
 
/* ROUTES */
app.get('/', (request, response) => {
    response.status(200).json({
        message: 'Welcome to server',
        app: 'My App'
    });
});
 
/* DEFINIR EL PUERTO E INICIAR LA ESCUCHA */
const port = 3000;
app.listen(port, () => {
    console.log(`app running in port ${port}`)
});
```

- Crear un archivo que se llame .env y dentro poner MONGO_URI= pegar la uri de mongo y poner PORT=3000.
- llamar en index.js a la variables de entorno require('dotenv').config(); y hacemos console.log(process.env); E iniciamos nuestro servidor con npm run dev.
- Creamos el controlador de nuesta base de datos. Cramos una carpeta con nombre utils y dentro un archivo que se llame db.js. En db.js llamamos a la libreriía mongoose const mongoose = require('mongoose'); Tenemos que crear una función que nos sirva para conectarnos a mongoose desde nuestra app principal, la función tiene que ser asyn y solo recibe la orden de conectarse y al ser una conexión indirecta hacemos un trycatch,  declaramos una variable  y le decimos que con un await utilice la librería mongoose con el método connect.   const connectMongo = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('INFO: Conexión a BBDD correcta', conn.connection.name);
    } catch (error) {
        console.log('ERROR: (f connectMongo) ->', error.message);
    }}

- Seguimos en db.js y ahora exportamos. module.exports = connectMongo;
- En index.js vamos a llamar a nuestro archivo de conexióny ejecutamos la función. 
const connectMongo = require('./utils/db');
connectMongo();

- En index debajo de const app = express() ponemos debajo justo app.use(express.json());
- Creamos una carpeta que se llame src y dentro ponemos nombre del archivo que queramos en mi caso movie.model.js, hacemos otra dos con .controller.js y .routes.js, hacemos primero el esquema en el archivo  .mode.js escribimos const mongoose = require('mongoose'); y creamos una constante que se llame Shema const movieSchema = new mongoose.Schema y ahora seguimos en la  carpeta model.js llamo a una constante nueva donde se almacena ese modelo const Movie = mongoose.model('Movie', movieSchema); y exportamos module.exports = Movie;

- Nos vamos a .controller.js llamamos a nuestro modelo const Movie = require('./movie.model'); nos fijamos bien en está carpeta porque crearemos un get, find, un trycatch con su formato json y buscamos el error que queremos colocar y al final tenemos que exportarlos todos.

- Nos vamos a .routes y llamamos a express y creamos router y tengo que a llamar a todos los metodos que he creado en mi controlador, y empezamos con las rutas por ultimo exportamos.

- Volvemos a nuestro index.js y el apartado routes creamos const movieRouter = require('./src/routes/movie.routes');
app.use('/api/movies', movieRouter);

- Creamos 4 carpetas para organizarlo todo: controllers, middleware, models, routes. 
- Importamos morgan, cors  y se instala todo lo siguiente npm i jsonwebtoken cors morgan luego importamos en index.js

- Este apartado los copiamos y pegamos entero en index.js app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4200'],
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));
app.set("secretKey", "nodeRestApi");

- Pegamos tambien en index.js const HTTPSTATUSCODE = require('./utils/httpStatusCode');
- Instalamos la librería npm i express-mongo-sanitize, bcrypt
**CON NPM ES DONDE EXPORTAMOS LOS DISTINTOS PACKAGES**
**CON STACKOVERFLOW CONSULTAMOS POSIBLES PROBLEMAS DE NEUSTRO CODIGO**
  
- Los siguientes archivos se copian tal cual salvo que queramos añadir cambios : user.controller.js; user.model.js; user.routes.js; auth.middleware.js
 
# PRINCIPIOS BÁSICOS
 
- Dividir la api en recursos lógicos: para una API de viajes podemos usar usuarios, destinos y valoraciones.
- Usar métodos http para definir el comportamiento de nuestra API: saveUser, getUser, updateUser, deleteUser
- Generar rutas basadas en las entidades: /users; /destinies; /reviews
- Enviar status y json (en general).
- Usar el paradigma Statelees: la API no debe guardar información del cliente, ni recordar peticiones previas.