import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { CronJob } from 'cron';
import updateCsv from './utils/config';

/**
* Define a rotina de atualização do arquivo CSV.
* Rotina definida para rodar de 2 em 2 horas.
*/
const job = new CronJob('* * */2 * *', () => {
    updateCsv();
});

job.start();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/horarios', routes);
app.listen(PORT);