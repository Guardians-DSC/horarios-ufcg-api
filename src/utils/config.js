import { readSheet } from '.';
import path from 'path';
import  fastCsv  from 'fast-csv';

import fs from 'fs';

const CSV_NAME = 'horario20191.csv';
const CSV_PATH = path.resolve('.','src', 'csv', CSV_NAME);
const doc = '1qvjWCOGm64BJByRmrIQADkGyc0mhxdiAsAUDrLFRQ7k';

const formatData = (row) => {
    const {sala, disciplina, professor, categoria, periodoantigonovo, horario} = row;

    return [ [`${sala}`], [`${disciplina}`], [`${professor}`], [`${categoria}`], [`${periodoantigonovo}`], [`${horario}`]];
};

const writeCsv = async (data) => {
    const ws = fs.createWriteStream(CSV_PATH);

    await fastCsv
        .write(
            data,
            { rowDelimiter: '\r\n'}
        )
        .pipe(ws);
};


export default async function updateCsv() {
    const sheet = await readSheet(doc);
    const data = sheet.map(formatData);
    writeCsv(data);
}