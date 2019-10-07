import '@babel/polyfill';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { CronJob } from 'cron';
import updateCsv from './utils/config';

const job = new CronJob('* */2 * * *', () => {
    updateCsv();
    console.log('Atualizando a planilha');
});

job.start();


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/horarios', routes);
app.listen(PORT);