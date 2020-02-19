import { readFile } from '.';
import nomesDasDisciplinas from './disciplinas.json'
import subjects from './csv/subjects.json';
const CSV_NAME = 'horario20191.csv';
const data_filename = 'subjects.json';

/**
 * Uma funcao de comparacao de horarios.
 * @param {*} criteria criterio que quer que ordene os horarios
 * @param {*} order ordem crescente (1) ou decrescente (-1)
 */
export function sortBy(criteria, order) {
    return function(a, b) {
        if (a[criteria] < b[criteria]) {
            return -1 * order;
        }
        if (a[criteria] > b[criteria]) {
            return 1 * order;
        }
        return 0;
    };
}

/**
 * Funcao que compara horarios por disciplina em ordem crescente
 */
const sortByDisciplina = sortBy('disciplina', 1);

const dias = {
    s: 'segunda',
    t: 'terca',
    q: 'quarta',
    i: 'quinta',
    x: 'sexta'
};

const campo_desconhecido = "-";

const getHoras = data => {
    let splitted = data.split("-");
    let inicio = splitted[0];
    inicio = inicio.split(":")[0];
    return inicio;
}

const getSala = data => data.substring(1, -1);

const formatObject = obj => {
    let { horarios, periodo, turma, codigo, disciplina } = obj;
    turma = "t" + parseInt(turma);
    let sala;
    horarios = horarios.map(horario => {
        let parts = horario.split(" ");
        let dia = dias[parts[0]];
        let hora = getHoras(parts[1]);
        sala = getSala(parts[2]);
        return {
            horario: {dia,hora}
        }
    });

    let base = {
        nome: disciplina,
        sala,
        disciplina: campo_desconhecido,
        turma,
        professor: campo_desconhecido,
        categoria: campo_desconhecido,
        periodo_ppc_novo: periodo,
        sala,
        horarios
    };

    return base;
}

const duplicaHorarios = dados => {
    const novosHorarios = [];
    dados.forEach(item => {
        item.horarios.map(horario => ({
            ...item,
            horario
        }));
        delete item["horarios"];
        novosHorarios.push(item);
    });
    return novosHorarios;
}

/**
 * Carrega todos os horários a partir do .csv com nome especificado em CSV_NAME
 * Retorna uma promise, contendo os horarios.
 */
export default async function buildSchedule() {
    // const response = await fetch("./csv/subjects.json");
    let horarios = subjects.map(formatObject);
    horarios = duplicaHorarios(horarios);
    return horarios.sort(sortByDisciplina);
}
