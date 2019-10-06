import fs from 'fs';
import GoogleSpreadsheet from 'google-spreadsheet';
import googleCredentials from '../crendentials/horariosufcg.json'
import { promisify } from 'util';

/**
 * Lê um arquivo .csv e o retorna como uma promise que possui a string com o conteudo do csv não formatado
 * @param {string} path Caminho para o arquivo .csv
 */

module.exports = {
    async readFile(path) {
        var fileContent;
        return new Promise(function(resolve) {
            fileContent = fs.readFileSync(path, {encoding: 'utf8'});
            resolve(fileContent);
        });
    },

    async readSheet(sheet) {
        const doc = new GoogleSpreadsheet(sheet);
        await promisify(doc.useServiceAccountAuth)(googleCredentials);
        const info = await promisify(doc.getInfo)();
        const worksheet = info.worksheets[1];
        
        return new Promise(async function(resolve) {
            const rows = await promisify(worksheet.getRows)();

            resolve(rows);
        });
    }
};

