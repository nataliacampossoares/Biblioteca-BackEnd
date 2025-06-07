const { Pool } = require("../../config/database");

const cadastrarBibliotecario = async function ({ id_locatario, login, senha }) {
  const query = `
      INSERT INTO bibliotecarios (id_locatario, login, senha)
      VALUES ($1, $2, $3)
    `;
  try {
    const result = await Pool.query(query, [id_locatario, login, senha]);
    return result.rows[0];
  } catch (error) {
    console.error("Erro no DAO: cadastrarBibliotecario()", error);
    throw error;
  }
};

module.exports = { cadastrarBibliotecario };
