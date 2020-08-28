import data from "../../data/horarios.json";
import disciplinasSiglasMap from "./disciplinas.siglas";

const UNKNOWN_VALUE = "desconhecido";

const dias = {
  2: "segunda",
  3: "terca",
  4: "quarta",
  5: "quinta",
  6: "sexta",
};

const categorias = {
  "Obrigatória": "obrigatoria",
  "Optativa": "optativa",
  "Complementar": "complementar",
};

const formatCategoria = (categoria) => categorias[categoria];
const formatTurma = (turma) => "t" + parseInt(turma);
const formatSala = (salas) => salas.split(" / ")[0];
const formatHorario = (horario) => {
  let dia = dias[horario.dia];
  let hora = getHoraInicio(horario.horario);
  return { dia, hora };
};

const getSigla = (nome) => disciplinasSiglasMap[nome];

const getHoraInicio = (horario) => {
  let horarios = horario.split("-");
  let [inicio, fim] = horarios;
  let [hora, minutos] = inicio.split(":");
  return hora;
};

const normalize = (horario) => {
  let normalized = {};
  Object.keys(horario).forEach((property) => {
    let value = horario[property];
    if (!value) value = UNKNOWN_VALUE;
    normalized[property] = value;
  });
  return normalized;
};

const buildDisciplina = (horario) => {
  const nome = horario.disciplina;
  const periodo = horario.periodo;
  const categoria = formatCategoria(horario.tipo);
  const sala = formatSala(horario.sala);
  const turma = formatTurma(horario.turma);
  const sigla = getSigla(nome);
  const professor = undefined;
  const periodo_ppc_antigo = undefined;

  let newHorario = {
    nome,
    sala,
    disciplina: sigla,
    turma,
    professor,
    categoria,
    periodo_ppc_antigo,
    periodo_ppc_novo: periodo,
  };

  return normalize(newHorario);
};

export default () => {
  const disciplinas = [];

  data.forEach((element) => {
    element.horarios.forEach((horario) => {
      let disciplina = buildDisciplina(element);
      disciplina.horario = formatHorario(horario);
      disciplinas.push(disciplina);
    });
  });

  return disciplinas;
};
