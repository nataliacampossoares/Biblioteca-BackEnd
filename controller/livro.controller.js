const livroDAO = require("../model/livroModel/livro.dao");
const autorDAO = require("../model/autorModel/autor.dao");
const autorRN = require("../model/autorModel/autor.rn");
const categoriaDAO = require("../model/categoriaModel/categoria.dao");
const categoriaRN = require("../model/categoriaModel/categoria.rn");
const path = require("path");

const cadastrarLivro = async function (livro, autores, categorias, imagem) {
  try {
    if (imagem) {
      const caminhoImagem = await livroDAO.salvarImagemLivro(
        imagem,
        livro.titulo
      );
      livro.caminho_imagens = caminhoImagem;
    } else {
      console.log("Livro sem imagem");
    }

    const idLivro = await livroDAO.cadastrarLivro(livro);

    for (let autor of autores) {
      let idAutor = await autorRN.buscarAutorExistente(autor);
      if (idAutor === -1) {
        idAutor = await autorDAO.adicionarAutor(autor);
      }
      await livroDAO.cadastrarAutorEmLivro(idLivro, idAutor);
    }

    for (let categoria of categorias) {
      let idCategoria = await categoriaRN.buscarCategoriaExistente(categoria);
      if (idCategoria === -1) {
        idCategoria = await categoriaDAO.cadastrarCategoria(categoria);
      }
      await livroDAO.cadastrarCategoriaEmLivro(idLivro, idCategoria);
    }

    return idLivro;
  } catch (error) {
    console.error("Erro no controller: cadastrarLivro()", error);
    throw error;
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

const listarLivroPorId = async function (id_livro) {
  console.log("ID do livro recebido no controller:", id_livro);
  try {
    const livro = await livroDAO.buscarLivroPorId(id_livro);

    return livro;
  } catch (error) {
    console.log("Erro no controller: listarLivroPorId()", error);
    throw error;
  }
};

const desativarLivro = async function (id_livro) {
  try {
    await livroDAO.desativarLivro(id_livro);
  } catch (error) {
    console.log("Erro no controller: listarLivros()", error);
    throw error;
  }
};

const atualizarLivro = async function (
  id_livro,
  livroAtualizado,
  autores,
  categorias,
  imagem
) {
  try {
    let caminhoImagem = null;
    if (imagem) {
      caminhoImagem = await livroDAO.salvarImagemLivro(
        imagem,
        livroAtualizado.titulo
      );
      livroAtualizado.caminho_imagens = caminhoImagem;
    }

    await livroDAO.atualizarLivro(id_livro, livroAtualizado, caminhoImagem);

    await livroDAO.removerAutoresDoLivro(id_livro);
    for (let autor of autores) {
      let idAutor = await autorRN.buscarAutorExistente(autor);
      console.log("ID autor buscado:", idAutor);
      if (idAutor === -1) {
        idAutor = await autorDAO.adicionarAutor(autor);
        console.log("ID autor criado:", idAutor);
      }
      await livroDAO.cadastrarAutorEmLivro(id_livro, idAutor);
    }

    await livroDAO.removerCategoriasDoLivro(id_livro);

    for (let categoria of categorias) {
      let idCategoria = await categoriaRN.buscarCategoriaExistente(categoria);
      if (idCategoria === -1) {
        idCategoria = await categoriaDAO.cadastrarCategoria(categoria);
      }
      await livroDAO.cadastrarCategoriaEmLivro(id_livro, idCategoria);
    }
  } catch (error) {
    console.error("Erro no controller: atualizarLivro() ", error);
    throw error;
  }
};

const buscarPorISBN = async (isbn) => {
  return await livroDAO.buscarLivroPorISBN(isbn);
};

const pesquisarPorTitulo = async (titulo) => {
  return await livroDAO.pesquisarPorTitulo(titulo);
};

const pesquisarPorAutor = async (autor) => {
  return await livroDAO.pesquisarPorAutor(autor);
};

const pesquisarPorCategoria = async (categoria) => {
  return await livroDAO.pesquisarPorCategoria(categoria);
};

const pesquisarPorEditora = async (editora) => {
  return await livroDAO.pesquisarPorEditora(editora);
};

module.exports = {
  cadastrarLivro,
  listarLivros,
  desativarLivro,
  pesquisarPorTitulo,
  pesquisarPorAutor,
  pesquisarPorCategoria,
  pesquisarPorEditora,
  atualizarLivro,
  listarLivroPorId,
  buscarPorISBN,
};
