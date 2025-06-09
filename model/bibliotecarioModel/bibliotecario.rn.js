const locatarioDAO = require("../locatarioModel/locatario.dao");
const bibliotecarioDAO = require("./bibliotecario.dao");

const cadastrarBibliotecario = async function ({
  id_locatario,
  email,
  senha,
  imagem,
}) {

  try {
    const bibliotecarioExistente =
      await locatarioDAO.buscarBibliotecarioPorEmail(email);

    if (bibliotecarioExistente) {
      throw new Error("Email bibliotecario");
    }

    const id_bibliotecario = await bibliotecarioDAO.cadastrarBibliotecario({
      id_locatario,
      senha,
      imagem,
    });

    return id_bibliotecario;
  } catch (error) {
    throw error;
  }
};

module.exports = { cadastrarBibliotecario };
