//App.js é onde iremos fazer todas as configurações da aplicação e também configurar o express

import express from 'express'; //para fazer as importações dessa maneira é necessário instalar o sucrase
import mongoose, { mongo } from 'mongoose';
import routes from './routes';

// const express = require('express');
// const routes = require('./routes')

class App {
    constructor() {
        this.server = express();

        mongoose.connect(
            'mongodb+srv://root:root@devhouse.kdfrc.mongodb.net/devhouse?retryWrites=true&w=majority',
            {
                useNewUrlParser: true, //configurar para usar o novo formato de url
                useUnifiedTopology: true, //mongo pede para usar este outro cara
            }
        );

        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json()); //falar que vamos usar o JSON
    }

    routes() {
        this.server.use(routes);
    }
}

//só vou exportar o Server pois é a unica coisa que será usada em outro lugar
// module.exports = new App().server;
export default new App().server;
