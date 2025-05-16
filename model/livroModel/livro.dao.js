const { Pool } = require("../../config/database");

const listarLivros = async function () {
  try{
    const { rows } = await Pool.query("SELECT * FROM livros");
    return rows;
  }catch(error){
    console.error('Erro na function listarLivros()', error);
    throw error;
  };
};

const adicionarLivro = async function (livro) {
  const atributosLivro = livro.convertToArray();
  const query = "INSERT INTO livros(titulo, qtd_disponivel, edicao, caminho_imagens, descricao, isbn) values ($1, $2, $3, $4, $5, $6)";
  try{
     await Pool.query(query, atributosLivro);
     return;
  }catch(error){
    console.error('Erro na function adicionarLivro()', error);
    throw error;
  }
};

module.exports = {adicionarLivro, listarLivros};