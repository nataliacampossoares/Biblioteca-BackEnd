const bibliotecarioDAO = require("../model/bibliotecarioModel/bibliotecario.dao");

const cadastrarBibliotecario = async function ({ id_locatario, login, senha }) {
  try {
    await bibliotecarioDAO.cadastrarBibliotecario({ id_locatario, login, senha });
    return;
  } catch (error) {
    console.log("Erro no controller: adicionarBibliotecario()", error);
  }
};

module.exports = { cadastrarBibliotecario };
