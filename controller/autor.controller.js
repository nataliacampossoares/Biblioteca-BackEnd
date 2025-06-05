const autorDAO = require("../model/autorModel/autor.dao");

const cadastrarAutor = async function (autor) {
  try {
    await autorDAO.adicionarAutor(autor);
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

const removerAutor = async function (id) {
  try {
    await autorDAO.removerAutor(id);
    return true;
  } catch (error) {
    console.log("Erro no controller: removerAutor()", error);
    throw error;
  }
}

const atualizarAutor = async function(autor){
  try {
    const resposta = await autorDAO.atualizarAutor(autor);
    return resposta;
  } catch (error) {
    console.error("Erro no controller: atualizarAutor()", error);
    throw error;
  }
}

module.exports = { cadastrarAutor, listarAutores, removerAutor, atualizarAutor };
