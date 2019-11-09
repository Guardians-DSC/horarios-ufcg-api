import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/horarios', routes);

/**
 * Confirmação de inicialização do servidor.
 */
app.listen(PORT, () => console.log('Servidor Iniciado'));