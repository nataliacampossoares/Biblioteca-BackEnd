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

const adicionarEditora = async function (editora) {
  const atributosEditora = editora.convertToArray();
  const query = "INSERT INTO editoras(nome_editora) values ($1)";
  try{
     await Pool.query(query, atributosEditora);
     return;
  }catch(error){
    console.error('Erro na function adicionarEditora()', error);
    throw error;
  }
};

module.exports = {adicionarEditora, listarEditoras};