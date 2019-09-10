import express from 'express';
import HorarioController from './controllers/HorarioController';

const router = express.Router();

router.get('/', HorarioController.indexAll);
router.get('/:dia', HorarioController.indexByDay);

module.exports = router;