"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = buildSchedule;

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var CSV_NAME = 'horario20191.csv';
/**
 * Lê um arquivo .csv e o retorna como uma promise que possui a string com o conteudo do csv não formatado
 * @param {string} path Caminho para o arquivo .csv
 */

var readFile = function readFile(path) {
  var fileContent;
  return new Promise(function (resolve) {
    fileContent = _fs["default"].readFileSync(path, {
      encoding: 'utf8'
    });
    resolve(fileContent);
  });
};

var dias = {
  s: 'segunda',
  t: 'terca',
  q: 'quarta',
  i: 'quinta',
  x: 'sexta'
  /**
   * Converte uma linha não formatada de um arquivo .csv em um objeto especifico (horario)
   * @param {string} line Uma linha de um arquivo csv 
   */

};

var convertToObject = function convertToObject(line) {
  var _line$split = line.split(","),
      _line$split2 = _slicedToArray(_line$split, 6),
      sala = _line$split2[0],
      disciplina_turma = _line$split2[1],
      professor = _line$split2[2],
      categoria = _line$split2[3],
      periodo_composto = _line$split2[4],
      horario = _line$split2[5];

  var turma = disciplina_turma.split('-').pop();
  var disciplina = disciplina_turma.slice(0, -3);

  var _periodo_composto$spl = periodo_composto.split(';'),
      _periodo_composto$spl2 = _slicedToArray(_periodo_composto$spl, 2),
      periodo_ppc_antigo = _periodo_composto$spl2[0],
      periodo_ppc_novo = _periodo_composto$spl2[1];

  var dia = horario[0];
  var hora = horario.substring(1);
  return {
    sala: sala,
    disciplina: disciplina,
    turma: turma,
    professor: professor,
    categoria: categoria,
    periodo_ppc_antigo: periodo_ppc_antigo,
    periodo_ppc_novo: periodo_ppc_novo,
    horario: {
      dia: dias[dia],
      hora: hora
    }
  };
};
/**
 * Carrega todos os horários a partir do .csv com nome especificado em CSV_NAME
 * Retorna uma promise, contendo os horarios.
 */


function buildSchedule() {
  return _buildSchedule.apply(this, arguments);
}

function _buildSchedule() {
  _buildSchedule = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee() {
    var horarios;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return readFile("csv/".concat(CSV_NAME)).then(function (content) {
              var contentAsStringArray = content.split('\r\n');
              contentAsStringArray.shift(); // Remove header (first element)

              horarios = contentAsStringArray.map(convertToObject);
            });

          case 2:
            return _context.abrupt("return", horarios);

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _buildSchedule.apply(this, arguments);
}
//# sourceMappingURL=buildSchedule.js.map