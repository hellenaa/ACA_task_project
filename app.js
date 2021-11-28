const express = require('express');

const app = express();
const http = require('http');

const server = http.createServer(app);
const { Server } = require('socket.io');

const io = new Server(server);
require('dotenv').config();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');
const routes = require('./routes/routers');
const ErrorHandler = require('./helpers/errorHandler');
const PermissionHandler = require('./middlewares/permissionHandler');

app.use(cors(config.whiteList));

app.use(PermissionHandler.checkDomain);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', routes);

app.use(ErrorHandler.errorLogger);

app.use(ErrorHandler.errorResponder);

server.listen(3001, () => {
  console.log('listening on *:3001');
});

app.io = io;
module.exports = { app };
