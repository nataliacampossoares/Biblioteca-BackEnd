const { Pool } = require("../../config/database");

const cadastrarAluno = async function ({ id_locatario, ra }) {
  console.log("ola model");
  const query = `
      INSERT INTO alunos (id_locatario, ra)
      VALUES ($1, $2)
    `;
  try {
    const result = await Pool.query(query, [id_locatario, ra]);
    return result.rows[0];
  } catch (error) {
    console.error("Erro no DAO: cadastrarAluno()", error);
    throw error;
  }
};

module.exports = { cadastrarAluno };
