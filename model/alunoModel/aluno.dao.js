const { Pool } = require("../../config/database");

const cadastrarAluno = async function ({ id_locatario, ra }) {
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

const buscarAlunoPorRa = async function (ra) {
  const query = `SELECT * FROM alunos WHERE ra = $1`;
  const values = [ra];

  try {
    const result = await Pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Erro no DAO: buscarAlunoPorRa()" , error);
    throw error;
  }
};

const buscarAlunoPorId = async function(id_locatario){
  const query = `SELECT * FROM alunos WHERE id_locatario = $1`
  const values = [id_locatario]

  try {
    const result = await Pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.log("Erro no DAO: buscarAlunoPorId" , error)
    throw error
  }
}

module.exports = { cadastrarAluno, buscarAlunoPorRa, buscarAlunoPorId };
