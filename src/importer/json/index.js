import data from '../../data/horarios.json';
import disciplinasSiglasMap from './disciplinas.siglas';

const UNKNOWN_VALUE = 'desconhecido';

const dias = {
    2: 'segunda',
    3: 'terca',
    4: 'quarta',
    5: 'quinta',
    6: 'sexta',
};

const categorias = {
    'Obrigatória': 'obrigatoria',
    'Optativa': 'optativa',
    'Complementar': 'complementar',
};

const formatCategoria = (categoria) => categorias[categoria];
const formatTurma = (turma) => 't' + parseInt(turma);
const formatSala = (salas) => salas.split(' / ')[0];
const formatHorario = (horario) => {
    let dia = dias[horario.dia];
    let hora = getHoraInicio(horario.horario);
    return { dia, hora };
};

const getSigla = (nome) => disciplinasSiglasMap[nome];

const getHoraInicio = (horario) => {
    let horarios = horario.split('-');
    let [inicio, ] = horarios;
    let [hora, ] = inicio.split(':');
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

    let newHorario = {
        nome,
        sala,
        disciplina: sigla,
        turma,
        categoria,
        periodo,
    };

    return normalize(newHorario);
};

export default () => {
    const disciplinas = [];

    let known = data.map(({ disciplina }) => disciplina);
    let mapped = Object.keys(disciplinasSiglasMap);
    let unmapped = known.filter((d) => !mapped.includes(d));

    if (unmapped.length > 0)
        console.error(
            '[WARNING] Ainda há disciplinas não mapeadas. Verifique src/importer/json/disciplinas.siglas.js'
        );

    data.forEach((element) => {
        element.horarios.forEach((horario) => {
            let disciplina = buildDisciplina(element);
            disciplina.horario = formatHorario(horario);
            disciplinas.push(disciplina);
        });
    });

    return disciplinas;
};
