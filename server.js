const express = require('express'); // Servidor Express 
const morgan = require('morgan'); // Solicitud de mensajes con las solicitudes
const wagner = require('wagner-core');

// MODELS
require('./models/models')(wagner);
const user = require('./router/user.router.js')(wagner);
const timer = require('./router/timer.router.js')(wagner);

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
const uri = `/api/v1/`;

app.use(uri, user);
app.use(uri + 'timer/', timer);

module.exports = app;
