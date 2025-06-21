const cursoDAO = require("../model/cursoModel/curso.dao");

const cadastrarCurso = async function (nomeCurso) {
  try {
    const idCurso = await cursoDAO.cadastrarCurso(nomeCurso); 
    return idCurso; 
  } catch (error) {
    console.log("Erro no controller: cadastrarCurso()", error);
    throw error;
  }
};

const listarCursos = async function () {
  try {
    const result = await cursoDAO.listarCursos();
    return result;
  } catch (error) {
    console.log("Erro no controller: listarCursos()", error);
    throw error;
  }
};

const removerCurso = async function (id) {
  try {
    await cursoDAO.removerCurso(id);
    return true;
  } catch (error) {
    console.log("Erro no controller: removerCurso()", error);
    throw error;
  }
}

const atualizarCurso = async function(curso){
  try {
    const resposta = await cursoDAO.atualizarCurso(curso);
    return resposta;
  } catch (error) {
    console.error("Erro no controller: atualizarCurso()", error);
    throw error;
  }
}

module.exports = { cadastrarCurso, listarCursos, removerCurso, atualizarCurso };
