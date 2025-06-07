const { Pool } = require("../../config/database");

const cadastrarLocatario = async function (locatario) {
  const query = `
    INSERT INTO locatarios (id_curso, nome, data_de_nascimento, telefone)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  try {
    const result = await Pool.query(query, locatario.convertToArray());
    return result.rows[0].id; 
  } catch (error) {
    console.error("Erro no DAO: cadastrarLocatario()", error);
    throw error;
  }
};

const listarLocatarios = async function () {
  const query = `SELECT * FROM locatarios`;
  try {
    const result = await Pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Erro no DAO: listarLocatarios()", error);
    throw error;
  }
};

const desativarLocatario = async function (id) {
  try {
    const query = `UPDATE locatarios SET isAtivo = false WHERE id = $1`;
    const values = [id];

    const { rows } = await Pool.query(query, values);

    return rows[0];
  } catch (error) {
    console.error("Erro na function desativarLocatario()", error);
    throw error;
  }
};

const atualizarLocatario = async function (locatario) {
  console.log(locatario.id_curso);
  try {
    const query = `
      UPDATE locatarios
      SET id_curso = $1,
      nome = $2,
      data_de_nascimento = $3,
      telefone = $4
      WHERE id = $5
      RETURNING *;
    `;
    const values = [
      locatario.id_curso,
      locatario.nome,
      locatario.data_de_nascimento,
      locatario.telefone,
      locatario.id,
    ];

    const result = await Pool.query(query, locatario.convertToArray());
    return result.rows[0].id;
  } catch (error) {
    console.error("Erro na function atualizarLocatario()", error);
    throw error;
  }
};

module.exports = {
  cadastrarLocatario,
  listarLocatarios,
  desativarLocatario,
  atualizarLocatario,
};
