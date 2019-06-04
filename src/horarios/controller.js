import express from 'express';
import loadHorarios from './data';

const router = express.Router();
const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

let horarios;
loadHorarios().then(response => horarios = response);

router.get('/', (req, res) => {
    res.status(200).send(horarios);
});

router.get('/:dia', (req, res) => {
    const dia = req.params.dia;

    if (dia && dias.includes(dia)) {
        res.status(200).send(horarios.filter(horario => horario.horario.dia === dia));
    } else {
        res.status(404).send([]);
    }
});

export default router;