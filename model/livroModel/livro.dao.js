const { Pool } = require("../../config/database");

const listarLivros = async function () {
  try {
    const { rows } = await Pool.query("SELECT * FROM livros");
    return rows;
  } catch (error) {
    console.error("Erro na function listarLivros()", error);
    throw error;
  }
};

const cadastrarLivro = async function (livro) {
  const query = `
    INSERT INTO livros (titulo, qtd_disponivel, edicao, caminho_imagens, sinopse, isbn, id_editora)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;
  try {
    const result = await Pool.query(query, [
      livro.titulo,
      Number(livro.qtd_disponivel),
      livro.edicao,
      livro.caminho_imagens,
      livro.descricao,
      livro.isbn,
      livro.id_editora,
    ]);
    return result.rows[0].id;
  } catch (error) {
    console.error("Erro na function cadastrarLivro()", error);
    throw error;
  }
};

const cadastrarAutorEmLivro = async function (id_livro, id_autor) {
  const query = "INSERT INTO autor_livro(id_livro, id_autor) values ($1, $2)";
  let values = [id_livro, id_autor];
  try {
    await Pool.query(query, values);
    return;
  } catch (error) {
    console.error("Erro na function cadastrarAutorEmLivro", error);
    throw error;
  }
};

const cadastrarCategoriaEmLivro = async function (id_livro, id_categoria) {
  const query =
    "INSERT INTO livro_categoria(id_livro, id_categoria) values ($1, $2)";
  let values = [id_livro, id_categoria];
  try {
    await Pool.query(query, values);
    return;
  } catch (error) {
    console.error("Erro na function cadastrarCategoriaEmLivro", error);
    throw error;
  }
};

module.exports = {
  cadastrarLivro,
  listarLivros,
  cadastrarAutorEmLivro,
  cadastrarCategoriaEmLivro,
};
