import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import buildSchedule from './buildSchedule';

const PORT = process.env.PORT || 3000;

var app = express();
app.use(cors());

const dias = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

var horarios;
buildSchedule().then(response => horarios = response);

app.get('/horarios', (req, res) => {
  res.status(200).send(horarios);
})

app.get('/horarios/:dia', (req, res) => {
  var dia = req.params.dia;

  if (dia && dias.includes(dia.toLowerCase())) {
    var horariosFiltrados = horarios.filter((horario) => {
      if (horario.horario[0] === dias[dia]) return horario;
    })
    res.status(200).send(horariosFiltrados);
  } else {
    res.status(400).send([]);
  }
})

app.listen(PORT, () => {
  console.log(`[...] Server running at http://localhost:${PORT}`);
});