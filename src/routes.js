import express from 'express';
import HorarioController from './controllers/HorarioController';

/**
 * Module Router
 * @module router
 */

 /**
 * Express router to mount user related functions on.
 * @type {object}
 * @const
 */
const router = express.Router();
/**
 * Rota para listagem de todos os horarios
 * @name get/
 * @param {string} path  
 * @param {function}  HorarioController.indexAll
 */
router.get('/', HorarioController.indexAll);
/**
 * Rota para listagem dos horarios filtrados pelo dia da semana
 * @name get/:dia
 * @param {string} path  
 * @param {function}  HorarioController.indexByDay
 */
router.get('/:dia', HorarioController.indexByDay);
/**
 * Rota para listagem dos horarios filtrados por dia da semana e por hora do dia
 * @name get/:dia/:hora
 * @param {string} path  
 * @param {function}  HorarioController.indexByDayAndHour
 */
router.get('/:dia/:hora', HorarioController.indexByDayAndHour);

module.exports = router;