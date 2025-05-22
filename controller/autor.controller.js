const autorDAO = require("../model/autorModel/autor.dao");

const adicionarAutor = async function (autor) {
  try {
    autorDAO.adicionarAutor(autor);
    return;
  } catch (error) {
    console.log("Erro no controller: adicionarAutor()", error);
  }
};

const listarAutores = async function () {
  try {
    const result = await autorDAO.listarAutores();
    return result;
  } catch (error) {
    console.log("Erro no controller: listarAutores()", error);
    throw error;
  }
};

module.exports = { adicionarAutor, listarAutores };
