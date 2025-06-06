const { Pool } = require("../../config/database");

const cadastrarLocatario = async function (locatario) {
  const query = `
    INSERT INTO locatarios (id_curso, nome, data_de_nascimento, telefone)
    VALUES ($1, $2, $3, $4)
  `;
  try {
    await Pool.query(query, locatario.convertToArray());
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


module.exports = { cadastrarLocatario, listarLocatarios };
