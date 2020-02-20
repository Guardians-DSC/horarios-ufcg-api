import { readFile } from '.';
import nomesDasDisciplinas from './disciplinas.json';
import siglas from './disciplinas-para-siglas.json';
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
    2: 'segunda',
    3: 'terca',
    4: 'quarta',
    5: 'quinta',
    6: 'sexta'
};

const campo_desconhecido = "desconhecido";
const bloqueado_para_matricula = "(Bloqueada para matrícula)";

const getDia = dia => dias[dia];
const getSala = data => data.substring(1, data.length - 1);
const getHora = data => {
    let [horarioInicio, horarioFim] = data.split("-");
    let [hora, minutos] = horarioInicio.split(":");
    return hora;
}

const formatObject = obj => {
    let { horarios, periodo, turma, disciplina } = obj;
    let sala = campo_desconhecido;
    horarios = horarios.map(horario => {
        let [_dia, _hora, _sala] = horario.split(" ");
        let dia = getDia(_dia);
        let hora = getHora(_hora);
        sala = getSala(_sala);
        return { dia, hora };
    });
    
    let sigla = siglas[disciplina] || campo_desconhecido;
    let nome = sigla == campo_desconhecido ? disciplina : nomesDasDisciplinas[sigla];
    turma = "t" + parseInt(turma);
    
    return {
        nome: sigla,
        sala,
        disciplina: nome,
        turma,
        professor: campo_desconhecido,
        categoria: campo_desconhecido,
        periodo_ppc_novo: periodo,
        periodo_ppc_antigo: "*",
        sala,
        horarios
    };
}

const duplicaDisciplinasPorHorarios = dados => {
    let disciplinas = [];
    dados.forEach(item => {
        let { horarios } = item;
        delete item["horarios"];
        horarios.forEach(horario => disciplinas.push({ ...item, horario}) );
    });
    return disciplinas;
}

/**
 * Carrega todos os horários a partir do .csv com nome especificado em CSV_NAME
 * Retorna uma promise, contendo os horarios.
 */
export default async function buildSchedule() {
    const response = await readFile("src/csv/subjects.json");
    let disciplinas = JSON.parse(response);
    
    // Remove disciplinas que estão bloqueadas para matrícula
    disciplinas = disciplinas.filter(disciplina => !disciplina.horarios.includes(bloqueado_para_matricula));

    // Remove horarios vazios (isso ocorre pois as disciplinas costumam ter dois horários mas algumas não tem)
    // Exemplo: didática I
    disciplinas.forEach(disciplina => {
        if (disciplina.horarios.includes("")) disciplina.horarios = disciplina.horarios.filter(horario => horario !== "");
    });

    disciplinas = disciplinas.map(formatObject);
    disciplinas = duplicaDisciplinasPorHorarios(disciplinas);
    return disciplinas.sort(sortByDisciplina);
}
