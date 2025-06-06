const locatarioDAO = require("../model/locatarioModel/locatario.dao");

const cadastrarLocatario = async function (locatario) {
  try {
    await locatarioDAO.cadastrarLocatario(locatario);
  } catch (error) {
    console.error("Erro no controller: cadastrarLocatario()", error);
    throw error;
  }
};

const listarLocatarios = async function () {
  try {
    return await locatarioDAO.listarLocatarios();
  } catch (error) {
    console.error("Erro no controller: listarLocatarios()", error);
    throw error;
  }
};

module.exports = { cadastrarLocatario, listarLocatarios };
