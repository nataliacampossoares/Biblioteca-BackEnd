const livroDAO = require("../model/livroModel/livro.dao");

const adicionarLivro = async function (livro) {
  try {
    livroDAO.adicionarLivro(livro);
    return;
  } catch (error) {
    console.log("Erro no controller: adicionarLivro()", error);
  }
};

const listarLivros = async function () {
  try {
    const result = await livroDAO.listarLivros();
    return result;
  } catch (error) {
    console.log("Erro no controller: listarLivros()", error);
    throw error;
  }
};

module.exports = { adicionarLivro, listarLivros };
