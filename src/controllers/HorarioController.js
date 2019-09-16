import loadHorarios from '../utils/data';

let horarios;
loadHorarios().then(response => horarios = response);

module.exports = {
    indexAll(req, res) {
        res.send(horarios);
    },

    indexByDay(req, res) {
        const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

        const dia = req.params.dia;

        if (dia && dias.includes(dia)) {
            res.send(horarios.filter(horario => horario.horario.dia === dia));
        } else {
            res.status(404).send({ error: 'Error' });
        }
    },

    indexByDayAndHour(req, res) {
        const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
        const horas = [8, 10, 14, 16, 18];
        
        const dia = req.params.dia;
        const hora = parseInt(req.params.hora);

        if ((dia && dias.includes(dia)) && (hora && horas.includes(hora))) {
            res.send(horarios.filter(horario => (horario.horario.dia === dia) && (parseInt(horario.horario.hora) === hora)));
        } else {
            res.status(404).send({ error: 'Error' });
        }

    }
};