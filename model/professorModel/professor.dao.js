const { Pool } = require("../../config/database");

const cadastrarProfessor = async function ({ id_locatario, ra }) {
  const query = `
      INSERT INTO professores (id_locatario, ra)
      VALUES ($1, $2)
    `;
  try {
    const result = await Pool.query(query, [id_locatario, ra]);
    return result.rows[0];
  } catch (error) {
    console.error("Erro no DAO: cadastrarProfessor()", error);
    throw error;
  }
};

const buscarProfessorPorRa = async function (ra) {
  const query = `SELECT * FROM professores WHERE ra = $1`;
  const values = [ra];

  try {
    const result = await Pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro no DAO: buscarProfessorPorRa()", error);
    throw error;
  }
};

module.exports = { cadastrarProfessor, buscarProfessorPorRa };
