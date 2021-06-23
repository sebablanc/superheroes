const express = require('express');
const logger = require('morgan');
const http = require('http');
const cors = require('cors');

// creando la app
const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cors());

// Logueo de peticiones
app.use(logger('dev'));

// Parseando la data entrante
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// rutas
require('./routes/superhero-routes')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;