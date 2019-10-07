import { readSheet } from '.';
import path from 'path';
import  fastCsv  from 'fast-csv';

import fs from 'fs';

const CSV_NAME = 'horario20191.csv';
const CSV_PATH = path.resolve('.','src', 'csv', CSV_NAME);
const doc = '1qvjWCOGm64BJByRmrIQADkGyc0mhxdiAsAUDrLFRQ7k';

/**
* Formata os dados de um linha da planilha online para o padrao: [[sala], [disicplina], [professor], [categoria], [periodoantigonovo], [horario]]
* @param {Object} row dados brutos recebidos da planilha
*/
const formatData = (row) => {
    const {sala, disciplina, professor, categoria, periodoantigonovo, horario} = row;

    return [ [`${sala}`], [`${disciplina}`], [`${professor}`], [`${categoria}`], [`${periodoantigonovo}`], [`${horario}`]];
};

/**
* Atualiza os dados do arquivo horario20191.csv com base nos dados, formatados, que recebe.
* @param {[[[String]]]} data array, com array, com array de dados formatados para atualizacao o arquivo horario20191.csv 
*/
const writeCsv = async (data) => {
    const ws = fs.createWriteStream(CSV_PATH);

    await fastCsv
        .write(
            data,
            { rowDelimiter: '\r\n'}
        )
        .pipe(ws);
};
/**
* Atualiza o arquivo csv usado como bando de dados da aplicação, com base na planilha google spreadsheet online.
*/
export default async function updateCsv() {
    const sheet = await readSheet(doc);
    const data = sheet.map(formatData);
    writeCsv(data);
}