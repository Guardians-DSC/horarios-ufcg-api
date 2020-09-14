import express from 'express';
import HorarioController from './controllers/HorarioController';

const router = express.Router();
/**
 * Rota para listagem de todos os horarios
 */
router.get('/', HorarioController.indexAll);

router.get('/horas/', HorarioController.getHours);

module.exports = router;
