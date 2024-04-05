const express = require('express');
const { resolve } = require('path');
const { promisify } = require('util');
const bodyParser = require('body-parser');
const cors = require('cors');
const initControllers = require('./controllers');
const initMiddlewares = require('./middlewares');

const server = express();
const port = parseInt(process.env.PORT || '9000');
const publicDir = resolve('public');

async function bootstrap() {
    server.use(cors({
        origin:['http://localhost:5173'],
        methods:['GET','POST'],
    }));
    server.use(bodyParser.json());
    // parse application/x-www-form-urlencoded
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(await initMiddlewares());
    server.use(express.static(publicDir));
    server.use(await initControllers());
    await promisify(server.listen.bind(server, port))();
    console.log(`> Started on http://localhost:${port}`);
}

bootstrap();