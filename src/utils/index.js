import fs from 'fs';

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
};

export {
    readFile,
};