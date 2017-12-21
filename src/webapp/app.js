const http = require('http')
const express = require('express')
const app = express()

app.set('port', 8081)
app.use('/', express.static(__dirname + '/public'));

const server = http.createServer(app).listen(app.get('port'), () => {
  console.info(`[Prueba Carengo] webapp running on ${app.get('port')}`);
});
