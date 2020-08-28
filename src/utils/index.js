import fs from "fs";

/**
 * Uma funcao de comparacao de horarios.
 * @param {*} criteria criterio que quer que ordene os horarios
 * @param {*} order ordem crescente (1) ou decrescente (-1)
 */
const sortBy = (criteria, order) => {
  return function (a, b) {
    if (a[criteria] < b[criteria]) {
      return -1 * order;
    }
    if (a[criteria] > b[criteria]) {
      return 1 * order;
    }
    return 0;
  };
};

/**
 * Lê um arquivo .csv e o retorna como uma promise que possui a string com o conteudo do csv não formatado
 * @param {string} path Caminho para o arquivo .csv
 */
const readFile = function (path) {
  var fileContent;
  return new Promise(function (resolve) {
    fileContent = fs.readFileSync(path, { encoding: "utf8" });
    resolve(fileContent);
  });
};

export { readFile, sortBy };
