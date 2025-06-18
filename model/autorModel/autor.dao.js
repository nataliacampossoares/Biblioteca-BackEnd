const { Pool } = require("../../config/database");

const listarAutores = async function () {
  try {
    const { rows } = await Pool.query("SELECT * FROM autores");
    return rows;
  } catch (error) {
    console.error("Erro na function listarAutores()", error);
    throw error;
  }
};

const buscarPorNome = async function (autor) {
  try {
    console.log("Buscando autor com nome:", autor.nome);
    const { rows } = await Pool.query(
      "SELECT * FROM autores WHERE nome_autor = $1", [autor.nome]
    );
    console.log("Rows aq",rows)
    return rows;
  } catch (error) {
    console.error("Erro na function buscarPorNome()", error);
    throw error;
  }
};

const adicionarAutor = async function (autor) {
  const atributosAutor = autor.convertToArray();
  const query = "INSERT INTO autores(nome_autor) values ($1) RETURNING id";
  try {
    const resp = await Pool.query(query, atributosAutor);
    return resp.rows[0].id;
  } catch (error) {
    console.error("Erro na function adicionarAutor()", error);
    throw error;
  }
};

const removerAutor = async function (id) {
  try {
    const { rows } = await Pool.query(`DELETE FROM autores WHERE id = $1`, [
      id,
    ]);
    return rows;
  } catch (error) {
    console.error("Erro na function removerAutor()", error);
    throw error;
  }
};

const atualizarAutor = async function (autor) {
  try {
    const query = `
      UPDATE autores
      SET nome_autor = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [autor.nome, autor.id];

    const { rows } = await Pool.query(query, values);

    return rows[0]; // retorna o autor atualizado (ou undefined se não achou)
  } catch (error) {
    console.error("Erro na function atualizarAutor()", error);
    throw error;
  }
};

module.exports = {
  adicionarAutor,
  listarAutores,
  removerAutor,
  atualizarAutor,
  buscarPorNome,
};
