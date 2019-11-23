import { readFile } from '.';
import nomesDasDisciplinas from './disciplinas.json'
const CSV_NAME = 'horario20191.csv';
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

/**
 * Converte uma linha não formatada de um arquivo .csv em um objeto especifico (horario)
 * @param {string} line Uma linha de um arquivo csv
 */
const convertToObject = line => {
    var [
        sala,
        disciplina_turma,
        professor,
        categoria,
        periodo_composto,
        horario
    ] = line.split(',');
    var turma = disciplina_turma.split('-').pop();
    var disciplina = disciplina_turma.slice(0, -3);
    var [periodo_ppc_antigo, periodo_ppc_novo] = periodo_composto.split(';');
    var dia = horario[0];
    var hora = horario.substring(1);
    var nome = nomesDasDisciplinas[disciplina];
    if (!nome) nome = 'desconhecido';

    return {
        nome,
        sala,
        disciplina,
        turma,
        professor,
        categoria,
        periodo_ppc_antigo,
        periodo_ppc_novo,
        horario: {
            dia: dias[dia],
            hora
        }
    };
};

/**
 * Remove horários duplicados.
 * 
 * Um horário é duplicado quando possui a mesma disciplina, turma, hora e dia.
 * Em caso da lista possuir horários duplicados e algum deles for na sala "pre",
 * esse será removido pois essa sala é apenas um placeholder para as turmas sem sala
 * definida. Se houver duplicatas mas nenhum for na sala pre apenas o primeiro encontrado
 * será mantido.
 * 
 * @param {[Object]} array lista de horarios ja formatados porém com duplicatas
 * @returns lista de horários sem duplicatas
 */
const removeHorariosDuplicados = (array) => {
    const horarios = {};
    var key;
    
    array.forEach(element => {
        key = element.disciplina + '-' + element.turma + '-' + element.horario.dia + '-' + element.horario.hora;
        if ( (horarios[key] && horarios[key].sala == "pre") || !horarios[key]) {
            horarios[key] = element;
        }
    });

    return Object.values(horarios);
};

/**
 * Carrega todos os horários a partir do .csv com nome especificado em CSV_NAME
 * Retorna uma promise, contendo os horarios.
 */
export default async function buildSchedule() {
    var horarios;

    await readFile(`src/csv/${CSV_NAME}`).then(content => {
        var contentAsStringArray = content.split('\r\n');
        contentAsStringArray.shift(); // Remove header (first element)
        const horariosArray = contentAsStringArray.map(convertToObject);
        horarios = removeHorariosDuplicados(horariosArray);
    });

    return horarios.sort(sortByDisciplina);
}
