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
    "eda": "Estrutura de Dados e Algoritmos",
    "plp": "Paradigmas de Linguagem de Programação",
    "icc": "Introdução à Ciência da Computação",
    "infosoc": "Informática e Sociedade",
    "administracao": "Administração",
    "leda": "Laboratório de Estrutura de Dados e Algorítmos",
    "calculo1": "Cálculo 1",
    "calculo2": "Cálculo 2",
    "compiladores": "Compiladores",
    "bd2": "Banco de Dados 2",
    "ia": "Inteligência Artificial",
    "fmcc2": "Fundamentos da Matemática para Ciência da Computação 2",
    "so": "Sistemas Operacionais",
    "ic": "Introdução à Ciência da Computação",
    "redes": "Redes de Computadores",
    "prog1": "Programação 1",
    "bd1": "Banco de Dados 1",
    "so": "Sistemas Operacionais",
    "labprog1": "Laboratório de Programação 1",
    "prog2": "Programação 2",
    "labprog2": "Laboratório de Programação 2",
    "atal": "Análise e Técnicas de Algoritmos",
    "fmcc1": "Fundamentos Matemáticos para Ciência da Computação 1",
    "ic": "Introdução a Ciência da Computação",
    "metodologia": "Metodologia Científica",
    "adm-empreendedorismo": "Administração e Empreendedorismo",
    "daca": "Desenvolvimento de Aplicações Corporativas Avançadas",
    "prog-concorrente": "Programação Concorrente",
    "aa3": "Algoritmos Avançados",
    "economia": "Economia",
    "tcc": "Trabalho de Conclusão de Curso",
    "proj-tcc": "Projeto de Trabalho de Conclusão de Curso",
    "grafos": "Teoria dos Grafos",
    "tcomp": "Teoria da Computação",
    "percepcao-comp": "Percepção Computacional",
    "direito-e-cidadania": "Direito e Cidadania",
    "lingua-portuguesa": "Lingua Portuguesa",
    "es": "Engenharia de Software",
    "linear": "Álgebra Linear",
    "irc/lirc": "Interconexão de Redes de Computadores/Laboratório de Interconexão de Redes de Computadores",
    "prog-funcional": "Programação Funcional",
    "adm-si": "Administração de Sistemas",
    "estatistica-aplicada": "Estatística Aplicada",
    "adsd": "Avaliação de Desempenho de Sistemas Discretos",
    "msn": "Métodos e Softwares Númericos",
    "rec-informacao": "Recuperação da Informação e Busca na Web",
    "intro-prob": "Introdução à Probabilidade",
    "empsoft": "Empreendedorismo em Software",
    "atal": "Análise e Técnicas de Algoritmos",
    "analise-sistemas": "Análise de Sistemas",
    "logica": "Lógica para computação",
    "v&v-testes": "Verificação e Validação de Software",
    "cnum": "Cálculo Numérico",
    "tecnicas-prog": "Técnicas de Programação",
    "eti": "Economia de Tecnologia da Informação",
    "proj2": "Projeto em Computação 2",
    "empreendedorismo": "Empreendedorismo em Software",
    "ciencia-dados-descritiva": "Ciência de Dados Preditiva",
    "gestao-ti": "Gestão de Tecnologia da Informação",
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
