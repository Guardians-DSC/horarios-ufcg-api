import express from 'express';
import HorarioController from './controllers/HorarioController';

const router = express.Router();
/**
 * Rota para listagem de todos os horarios
 */
router.get('/', HorarioController.indexAll);
/**
 * Rota para listagem dos horarios filtrados pelo dia da semana
 */
router.get('/:dia', HorarioController.indexByDay);
/**
 * Rota para listagem dos horarios filtrados por dia da semana e por hora do dia
 */
router.get('/:dia/:hora', HorarioController.indexByDayAndHour);

module.exports = router;