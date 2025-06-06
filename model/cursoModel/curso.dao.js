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

const removerCurso = async function (id) {
  try{
    const { rows } = await Pool.query(`DELETE FROM cursos WHERE id = $1`, [id]);
    return rows;
  }catch(error){
    console.error('Erro na function removerCurso()', error);
    throw error;
  };
}

const atualizarCurso = async function(curso){
  try {
    const query = `
      UPDATE cursos
      SET nome_curso = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [curso.nome_curso, curso.id];

    const { rows } = await Pool.query(query, values);

    return rows[0]; 
  } catch (error) {
    console.error('Erro na function atualizarCurso()', error);
    throw error;
  }
}


const buscarCursoPorId = async function (id) {
  const query = "SELECT * FROM cursos WHERE id = $1";
  console.log("Buscando curso com ID:", id);
  const { rows } = await Pool.query(query, [id]);
  console.log("Resultado da busca:", rows);
  return rows[0];
};



module.exports = {cadastrarCurso, listarCursos, atualizarCurso, removerCurso, buscarCursoPorId};