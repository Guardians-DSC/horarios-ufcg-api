import fs from 'fs';
import GoogleSpreadsheet from 'google-spreadsheet';
import googleCredentials from '../crendentials/horariosufcg.json';
import { promisify } from 'util';


module.exports = {
    /**
     * Lê um arquivo .csv e o retorna como uma promise que possui a string com o conteudo do csv não formatado
     * @param {string} path Caminho para o arquivo .csv
     */
    async readFile(path) {
        var fileContent;
        return new Promise(function(resolve) {
            fileContent = fs.readFileSync(path, {encoding: 'utf8'});
            resolve(fileContent);
        });
    },

    /**
     * Autentica, interpreta e retorna como promise que possui array com objetos, não formatados, com todos as rows da planilha online.
     * @param {string} sheet identificação da planilha a ser processada.
     */
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

