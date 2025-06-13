const { Pool } = require("../../config/database");

const listarCategorias = async function () {
  try {
    const { rows } = await Pool.query("SELECT * FROM categorias");
    return rows;
  } catch (error) {
    console.error("Erro na function listarCategorias()", error);
    throw error;
  }
};

const buscarPorCategoria = async function (nome_categoria) {
  try {
    const { rows } = await Pool.query(
      "SELECT * FROM categorias WHERE nome_categoria = $1",
      [nome_categoria]
    );
    return rows;
  } catch (error) {
    console.error("Erro na function buscarPorCategoria()", error);
    throw error;
  }
};

const cadastrarCategoria = async function (categoria) {
  const atributosCategoria = categoria.convertToArray();
  console.log("Valores para insert:", atributosCategoria);
  const query =
    "INSERT INTO categorias(nome_categoria, id_pai) values ($1, $2) RETURNING id_categoria";
  try {
    const resp = await Pool.query(query, atributosCategoria);
    return resp.rows[0].id_categoria;
  } catch (error) {
    console.error("Erro na function cadastrarCategoria()", error);
    throw error;
  }
};

const removerCategoria = async function (id_categoria) {
  try {
    const { rows } = await Pool.query(
      `DELETE FROM categorias WHERE id_categoria = $1`,
      [id_categoria]
    );
    return rows;
  } catch (error) {
    console.error("Erro na function removerCategoria()", error);
    throw error;
  }
};

const atualizarCategoria = async function (categoria) {
  try {
    const query = `
      UPDATE categorias
      SET nome_categoria = $1
      WHERE id_categoria = $2
      RETURNING *;
    `;
    const values = [categoria.nome_categoria, categoria.id_categoria];

    const { rows } = await Pool.query(query, values);

    return rows[0];
  } catch (error) {
    console.error("Erro na function atualizarCategoria()", error);
    throw error;
  }
};

module.exports = {
  cadastrarCategoria,
  listarCategorias,
  removerCategoria,
  atualizarCategoria,
  buscarPorCategoria
};
