const { Pool } = require("../../config/database");

const cadastrarBibliotecario = async function ({ id_locatario, senha, imagem }) {

  console.log("Caminho da imagem que será salvo no banco:", imagem);
  const query = `
    INSERT INTO bibliotecarios (id_locatario, senha, imagem)
    VALUES ($1, $2, $3)
    RETURNING id_locatario
  `;
  try {
    const result = await Pool.query(query, [
      id_locatario,
      senha,
      imagem, 
    ]);
    return result.rows[0].id_locatario;
  } catch (error) {
    console.error("Erro no DAO: cadastrarBibliotecario()", error);
    throw error;
  }
};

module.exports = { cadastrarBibliotecario };
