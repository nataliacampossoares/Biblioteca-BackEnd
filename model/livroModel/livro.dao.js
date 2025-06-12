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
  const extensao_arquivo = livro.imagem?.name?.split(".").pop() || null;
  const atributosLivro = livro.convertToArray();
  const query =
    "INSERT INTO livros(titulo, qtd_disponivel, edicao, caminho_imagens, descricao, isbn) values ($1, $2, $3, $4, $5, $6) RETURNING id";
  try {
    await Pool.query(query, [
      livro.titulo,
      livro.qtde_disponivel,
      livro.edicao,
      extensao_arquivo,
      livro.descricao,
      livro.isbn,
    ]);
    let result = await Pool.query(query, atributosLivro);
    return result.rows[0].id;
  } catch (error) {
    console.error("Erro na function adicionarLivro()", error);
    throw error;
  }
};

const cadastrarAutorEmLivro = async function (id_livro, id_autor) {
  const query = "INSERT INTO autor_livro(id_livro, id_autor) values ($1, $2)";
  let values = [id_livro, id_autor];
  try {
    await Pool.query(query, values);
    return;
  } catch (e) {
    console.error("Erro na function cadastrarAutorEmLivro", e);
    throw error;
  }
};

module.exports = { cadastrarLivro, listarLivros, cadastrarAutorEmLivro };
