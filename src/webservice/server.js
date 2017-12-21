const http = require('http')
const express = require('express')
const app = express()

app.set('port', 8080)
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET')
  next();
});

require('./routes/feed')(app)

const server = http.createServer(app).listen(app.get('port'), () => {
  console.info(`[Prueba Carengo] webservice running on ${app.get('port')}`);
});
