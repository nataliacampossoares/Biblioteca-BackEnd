const locatarioDAO = require("../model/locatarioModel/locatario.dao");
const locatarioRN = require("../model/locatarioModel/locatario.rn");
const cursoController = require("./curso.controller");

const cadastrarLocatario = async function (locatario) {
  try {
    console.log(locatario);
    console.log("OIA AQUI VAO CONSOLAR O LOCAARIO.ID_CURSO");
    console.log(locatario.id_curso);
  
    let cursoCadastrado = true; 
  
    if (locatario.id_curso) {
      cursoCadastrado = await locatarioRN.verificarCurso(locatario.id_curso);
      if (!cursoCadastrado) {
        throw new Error("Curso inválido.");
      }
    }
  
    console.log("CURSO CADASTRADO AQUI Ó");
    console.log(cursoCadastrado);
  
    const locatario_id = await locatarioDAO.cadastrarLocatario(locatario);
    return locatario_id;
  } catch (error) {
    throw new Error("Curso inválido.");
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
