const locatarioDAO = require("../model/locatarioModel/locatario.dao");

const cadastrarLocatario = async function (locatario) {
  try {
    const id = await locatarioDAO.cadastrarLocatario(locatario);
    return id;
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

const desativarLocatario = async function (id) {
  try {
    return await locatarioDAO.desativarLocatario(id);
  } catch (error) {
    console.error("Erro no controller: desativarLocatario()", error);
    throw error;
  }
};

const atualizarLocatario = async function (locatario) {
  try {
    return await locatarioDAO.atualizarLocatario(locatario);
  } catch (error) {
    console.error("Erro no controller: atualizarLocatario()", error);
    throw error;
  }
};

module.exports = {
  cadastrarLocatario,
  listarLocatarios,
  desativarLocatario,
  atualizarLocatario,
};
