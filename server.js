const express = require('express'); // Servidor Express 
const morgan = require('morgan'); // Solicitud de mensajes con las solicitudes
const wagner = require('wagner-core');

// MODELS
require('./models/models')(wagner);

let app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

// ROUTERS
// path ue van a ser atendidas. 
const uri = `/api/`;

module.exports = app;
