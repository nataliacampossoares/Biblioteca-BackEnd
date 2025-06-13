const livroDAO = require("../model/livroModel/livro.dao");
const autorDAO = require("../model/autorModel/autor.dao");
const autorRN = require("../model/autorModel/autor.rn");
const categoriaDAO = require("../model/categoriaModel/categoria.dao");
const categoriaRN = require("../model/categoriaModel/categoria.rn");
const path = require("path");

const cadastrarLivro = async function (livro, autores, categorias, imagem) {
  try {
    let caminhoImagem = null;

    if (imagem) {
      const extensao = path.extname(imagem.name);
      const nomeImagem = `${livro.titulo}${extensao}`;
      const caminho = path.join(__dirname, "..", "imagensLivro", nomeImagem);

      try {
        await imagem.mv(caminho);
        caminhoImagem = `/imagensLivro/${nomeImagem}`;
        console.log("Imagem salva em:", caminhoImagem);
      } catch (err) {
        console.error("Erro ao salvar a imagem:", err);
        throw err;
      }

      livro.caminho_imagens = caminhoImagem;

      let idLivro = await livroDAO.cadastrarLivro(livro);

      for (let autor of autores) {
        let idAutor = await autorRN.buscarAutorExistente(autor);
        if (idAutor === -1) {
          idAutor = await autorDAO.adicionarAutor(autor);
        }

        livroDAO.cadastrarAutorEmLivro(idLivro, idAutor);
      }

      for (let categoria of categorias) {
        console.log(categoria);
        let idCategoria = await categoriaRN.buscarCategoriaExistente(categoria);
        if (idCategoria === -1) {
          idCategoria = await categoriaDAO.cadastrarCategoria(categoria);
        }
        console.log(idCategoria)
        livroDAO.cadastrarCategoriaEmLivro(idLivro, idCategoria);
      }
    } else {
      console.log("livro sem imagem");
      return;
    }
  } catch (error) {
    console.error("Erro no controller: cadastrarLivro()", error);
    return;
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
