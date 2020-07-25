const express = require('express');
const bodyParser = require('body-parser');
const { join } = require('path');
const server = express();
const port = 8000;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

server.use('*', (req, res, next) => {
  let time = new Date();
  console.log(
    `${req.method} to ${
      req.originalUrl
    } at ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
  );
  next();
});

server.get('/build.js', (req, res) => {
  if (req.header('accept-encoding')?.includes('br')) {
    console.log('Calling brotli');
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(join(__dirname, 'dist', 'build.js.br'));
  } else if (req.header('accept-encoding')?.includes('gz')) {
    console.log('Calling gzip');
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript');
    res.sendFile(join(__dirname, 'dist', 'build.js.gz'));
  } else {
    console.log('Calling uncompressed');
    res.sendFile(join(__dirname, 'dist', 'build.js'));
  }
});

server.use((req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});

server.listen(port, '0.0.0.0', (req, res) => {
  console.log(`listening on localhost:${port}`);
});
