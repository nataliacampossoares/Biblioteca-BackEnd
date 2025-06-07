const bibliotecarioDAO = require("./bibliotecario.dao");

const cadastrarBibliotecario = async function ({ id_locatario, login, senha }) {
  try {
    const bibliotecarioExistente =
      await bibliotecarioDAO.buscarBibliotecarioPorLogin(login);

    if (bibliotecarioExistente) {
      throw new Error("Login bibliotecario");
    }

    await bibliotecarioDAO.cadastrarBibliotecario({
      id_locatario,
      login,
      senha,
    });
  } catch (error) {
    throw error;
  }
};

module.exports = { cadastrarBibliotecario };
