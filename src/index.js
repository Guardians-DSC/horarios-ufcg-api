import "@babel/polyfill";
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import horariosRouter from './horarios/controller';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/horarios', horariosRouter);
app.listen(PORT);