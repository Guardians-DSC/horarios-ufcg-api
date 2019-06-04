'use strict';

require('@babel/polyfill');

require('dotenv/config');

var _express = _interopRequireDefault(require('express'));

var _cors = _interopRequireDefault(require('cors'));

var _buildSchedule = _interopRequireDefault(require('./buildSchedule'));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var PORT = process.env.PORT || 3000;
var app = (0, _express['default'])();
app.use((0, _cors['default'])());
var dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
var horarios;
(0, _buildSchedule['default'])().then(function (response) {
    return horarios = response;
});
app.get('/horarios', function (req, res) {
    res.status(200).send(horarios);
});
app.get('/horarios/:dia', function (req, res) {
    var dia = req.params.dia;

    if (dia && dias.includes(dia.toLowerCase())) {
        var horariosFiltrados = horarios.filter(function (horario) {
            if (horario.horario.dia === dia) return horario;
        });
        res.status(200).send(horariosFiltrados);
    } else {
        res.status(400).send([]);
    }
});
app.listen(PORT, function () {
    console.log('[...] Server running at http://localhost:'.concat(PORT));
});
//# sourceMappingURL=index.js.map