import fs from 'fs';

const CSV_NAME = 'horario20191.csv';

/**
 * Lê um arquivo .csv e o retorna como uma promise que possui a string com o conteudo do csv não formatado
 * @param {string} path Caminho para o arquivo .csv
 */
const readFile = function(path) {
    var fileContent;
    return new Promise(function(resolve) {
        fileContent = fs.readFileSync(path, {encoding: 'utf8'});
        resolve(fileContent);
    });
}

const dias = {
  s: 'segunda',
  t: 'terca',
  q: 'quarta',
  i: 'quinta',
  x: 'sexta'
}

/**
 * Converte uma linha não formatada de um arquivo .csv em um objeto especifico (horario)
 * @param {string} line Uma linha de um arquivo csv 
 */
const convertToObject = (line) => {
  var [ sala, disciplina_turma, professor, categoria, periodo_composto, horario ] = line.split(",");
  var turma = disciplina_turma.split('-').pop();
  var disciplina = disciplina_turma.slice(0, -3);
  var [ periodo_ppc_antigo, periodo_ppc_novo ] = periodo_composto.split(';');
  var dia = horario[0];
  var hora = horario.substring(1);
  
  return {
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
  }
}

/**
 * Carrega todos os horários a partir do .csv com nome especificado em CSV_NAME
 * Retorna uma promise, contendo os horarios.
 */
export default async function buildSchedule() {
  var horarios;

  await readFile(`csv/${CSV_NAME}`).then(content => {
    var contentAsStringArray = content.split('\r\n');
    contentAsStringArray.shift(); // Remove header (first element)
    horarios = contentAsStringArray.map(convertToObject);
  })

  return horarios;
}
