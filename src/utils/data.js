import { readFile } from '.';
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
 * Mapa para associar sigla da disciplina ao nome dela de fato.
 * Com a chave sendo a sigla e o valor o nome da disciplina.
 */
const nomesDasDisciplinas = {
    "ingles": "Inglês",
    "eda" : "Estrutura de Dados e Algoritmos",
    "bd1" : "Banco de Dados 1",
    "intro-prob" : "Introdução à Probabilidade",
    "psoft" : "Projeto de Software",
    "plp" : "Paradigmas de Linguagens de Programação",
    "oac" : "Organização e Arquitetura de Computadores",
    "loac" : "Laboratório de Organização e Arquitetura de Computadores",
    "economia" : "Economia",
    "prog1" : "Programação 1",
    "prog2" : "Programação 2",
    "labprog1" : "Laboratório de Programação 1",
    "labprog2" : "Laboratório de Programação 2"
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
    if (!nome) nome = "desconhecido";

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
 * Carrega todos os horários a partir do .csv com nome especificado em CSV_NAME
 * Retorna uma promise, contendo os horarios.
 */
export default async function buildSchedule() {
    var horarios;

    await readFile(`src/csv/${CSV_NAME}`).then(content => {
        var contentAsStringArray = content.split('\r\n');
        contentAsStringArray.shift(); // Remove header (first element)
        horarios = contentAsStringArray.map(convertToObject);
    });

    return horarios.sort(sortByDisciplina);
}
