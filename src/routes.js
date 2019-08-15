const express = require('express');
const HorarioController = require('./controllers/HorarioController');

const router = express.Router();

router.get('/', HorarioController.indexAll);

router.get('/:dia', HorarioController.indexByDay);

module.exports = router;