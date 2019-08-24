const http = require('http');
const express = require('express');

const app = express();

// middleware
app.use((req, res, next) => {
  console.log('log');
});

const server = http.createServer(app);

server.listen(3000);
