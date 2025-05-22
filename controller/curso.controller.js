const cursoDAO = require("../model/cursoModel/curso.dao");

const cadastrarCurso = async function (curso) {
  try {
    await cursoDAO.cadastrarCurso(curso); 
    return;
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

module.exports = { cadastrarCurso, listarCursos };
