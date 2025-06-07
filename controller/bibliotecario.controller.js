const bibliotecarioRN = require("../model/bibliotecarioModel/bibliotecario.rn");

const cadastrarBibliotecario = async function ({ id_locatario, login, senha }) {
  try {
    await bibliotecarioRN.cadastrarBibliotecario({
      id_locatario,
      login,
      senha,
    });
  } catch (error) {
    console.error("Erro no controller: cadastrarBibliotecario()", error);
    throw error;
  }
};

module.exports = { cadastrarBibliotecario };
