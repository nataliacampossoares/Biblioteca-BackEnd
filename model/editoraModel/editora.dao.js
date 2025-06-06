const { Pool } = require("../../config/database");

const listarEditoras = async function () {
  try{
    const { rows } = await Pool.query("SELECT * FROM editoras");
    return rows;
  }catch(error){
    console.error('Erro na function listarEditoras()', error);
    throw error;
  };
};

const cadastrarEditora = async function (editora) {
  const atributosEditora = editora.convertToArray();
  const query = "INSERT INTO editoras(nome_editora) values ($1)";
  try{
     await Pool.query(query, atributosEditora);
     return;
  }catch(error){
    console.error('Erro na function cadastrarEditora()', error);
    throw error;
  }
};

const removerEditora = async function (id) {
  try{
    const { rows } = await Pool.query(`DELETE FROM editoras WHERE id = $1`, [id]);
    return rows;
  }catch(error){
    console.error('Erro na function removerEditora()', error);
    throw error;
  };
}

const atualizarEditora = async function(editora){
  try {
    const query = `
      UPDATE editoras
      SET nome_editora = $1
      WHERE id = $2
      RETURNING *;
    `;
    const values = [editora.nome_editora, editora.id];

    const { rows } = await Pool.query(query, values);

    return rows[0]; 
  } catch (error) {
    console.error('Erro na function atualizarEditora()', error);
    throw error;
  }
}

module.exports = {cadastrarEditora, listarEditoras, atualizarEditora, removerEditora};