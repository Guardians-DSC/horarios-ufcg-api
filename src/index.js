import '@babel/polyfill';
import 'dotenv/config';
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;
const server = express();

server.use(cors());
server.use('/horarios', routes);
server.listen(PORT);