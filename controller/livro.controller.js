const livroDAO = require("../model/livroModel/livro.dao");
const autorDAO = require("../model/autorModel/autor.dao");
const autorRN = require("../model/autorModel/autor.rn");
const categoriaDAO = require("../model/categoriaModel/categoria.dao");

const cadastrarLivro = async function (livro, autores, categorias) {
  let idLivro = await livroDAO.cadastrarLivro(livro);
  for (let autor of autores) {
    let idAutor = autorRN.buscarAutorExistente(autor);
    if (idAutor === -1) {
      idAutor = autorDAO.adicionarAutor(autor);
    }
    livroDAO.cadastrarAutorEmLivro(idLivro, idAutor)
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

module.exports = { cadastrarLivro, listarLivros };
