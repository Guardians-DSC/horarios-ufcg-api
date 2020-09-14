import express from 'express';
import HorarioController from './controllers/HorarioController';

const horariosRouter = express.Router();
/**
 * Rota para listagem de todos os horarios
 */
horariosRouter.get('/', HorarioController.indexAll);

horariosRouter.get('/horas/', HorarioController.getHours);

export default horariosRouter;
