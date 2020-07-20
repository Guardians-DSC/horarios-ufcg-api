import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';

/**
 * Module Index
 * @module index
 */

 /**
  * Constante que especifica porta usada
  * @const
  * @type {number}
  */
const PORT = process.env.PORT || 3000;

/**
 * @const
 * @type {function}
 */
const app = express();

/**
 * @param  {function} cors(
 */
app.use(cors());
/**
 * @param  {string} path
 * @param  {function} routes
 */
app.use('/horarios', routes);

/**
 * Confirmação de inicialização do servidor.
 */
/**
 * @param  {const} PORT
 * @param  {function} console.log('ServidorIniciado')
 */
app.listen(PORT, () => console.log('Servidor Iniciado'));