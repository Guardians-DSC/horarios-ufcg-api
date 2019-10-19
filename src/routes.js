import express from 'express';
import HorarioController from './controllers/HorarioController';

const router = express.Router();

router.get('/', (req, res) => {
    if(req.query.dia)
        (req.query.hora)
            ? HorarioController.indexByDayAndHour(req, res)
            : HorarioController.indexByDay(req, res)
    else
        HorarioController.indexAll(req, res)
})


module.exports = router;