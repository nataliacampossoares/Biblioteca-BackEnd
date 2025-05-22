const { Pool } = require("../../config/database");

const listarCursos = async function () {
  try{
    const { rows } = await Pool.query("SELECT * FROM cursos");
    return rows;
  }catch(error){
    console.error('Erro na function listarCursos()', error);
    throw error;
  };
};

const cadastrarCurso = async function (curso) {
  const atributosCurso = curso.convertToArray();
  const query = "INSERT INTO cursos(nome_curso) values ($1)";
  try{
     await Pool.query(query, atributosCurso);
     return;
  }catch(error){
    console.error('Erro na function cadastrarCurso()', error);
    throw error;
  }
};

module.exports = {cadastrarCurso, listarCursos};