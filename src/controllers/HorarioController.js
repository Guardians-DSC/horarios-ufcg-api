import loadHorarios, { sortBy } from '../utils/data';

const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
const horas = [8, 10, 14, 16, 18];

let horarios;
loadHorarios().then(response => (horarios = response));
/**
 * Possiveis filtros para filtragrem dos horarios
 */
const supportedSortFilters = [
    'professor',
    'categoria',
    'disciplina',
    'sala',
    'turma',
    'periodo_ppc_antigo',
    'periodo_ppc_novo'
];

/**
 * Funcao que analisa e retorna o tipo de ordenacao na filtragem de horarios
 * @param {*} orderParam tipo de ordenacao (asc ou desc)
 * Retorna um inteiro referente ao tipo de ordenacao 1 (asc) -1 (desc)
 */
function getOrderNum(orderParam) {
    return orderParam === 'asc' ? 1 : orderParam === 'desc' ? -1 : 1;
}

/**
 * Funcao que verifica se a query nao e nula ou undefined
 * @param {*} query query a ser analisada
 * Retorna um boolean. True caso a query nao seja undefined ou nula. False caso a query seja undefined ou nula 
 */
function containsQuery(query) {
    return query !== undefined && query !== null;
}

/**
 * Funcao que aplica os filtros query.
 * @param {*} queries query string a ser aplicada
 * Retorna os horarios filtrados com base nos query
 */
function applyQueryFilters(queries) {
    let horariosAndQueryFilters = [...horarios];

    if (containsQuery(queries.professor)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => horario.professor === queries.professor
        );
    }

    if (containsQuery(queries.categoria)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => horario.categoria === queries.categoria
        );
    }

    if (containsQuery(queries.turma)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => horario.turma === queries.turma
        );
    }

    if (containsQuery(queries.disciplina)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => horario.disciplina === queries.disciplina
        );
    }

    if (containsQuery(queries.sala)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => horario.sala === queries.sala
        );
    }

    if (containsQuery(queries.periodo_ppc_antigo)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => horario.periodo_ppc_antigo === queries.periodo_ppc_antigo
        );
    }

    if (containsQuery(queries.periodo_ppc_novo)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => horario.periodo_ppc_novo === queries.periodo_ppc_novo
        );
    }

    if (containsQuery(queries.dia)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => horario.horario.dia === queries.dia
        );
    }

    if (containsQuery(queries.hora)) {
        horariosAndQueryFilters = horariosAndQueryFilters.filter(
            horario => parseInt(horario.horario.hora) === parseInt(queries.hora)
        );
    }

    if (
        containsQuery(queries.sort_by) && supportedSortFilters.includes(queries.sort_by)
    ) {
        const orderNum = getOrderNum(queries.order); // by default is ascending -> 1

        horariosAndQueryFilters = horariosAndQueryFilters.sort(
            sortBy(queries.sort_by, orderNum)
        );
    }

    return horariosAndQueryFilters;
}


module.exports = {
    /**
     * Funcao que retorna todos os horarios 
     */
    indexAll(req, res) {
        const horariosAndQueryFilters = applyQueryFilters(req.query);

        res.send(horariosAndQueryFilters);
    },

    /**
     * Funcao que retorna todos os horarios filtrados pelo dia 
     */
    indexByDay(req, res) {
        const {dia} = req.query;

        (dia && dias.includes(dia))
            ? res.send(horarios.filter(horario => horario.horario.dia === dia))
            : res.status(404).send({ error: 'Error: indexByDay' });
    },

    /**
     * Funcao que retorna todos os horarios filtrados por dia da semana e hora do dia 
     */
    indexByDayAndHour(req, res) {
        let {dia, hora} = req.query;
        hora = parseInt(hora);

        if (dia && dias.includes(dia) && (hora && horas.includes(hora))) {
            res.send(
                horarios.filter(
                    horario =>
                        horario.horario.dia === dia &&
            parseInt(horario.horario.hora) === hora
                )
            );
        } else {
            res.status(404).send({ error: 'Error: indexByDayAndHour' });
        }
    }
};
