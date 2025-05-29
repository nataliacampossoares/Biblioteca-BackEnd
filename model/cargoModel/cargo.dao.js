const { Pool } = require("../../config/database");

const listarCargos = async function () {
  try{
    const { rows } = await Pool.query("SELECT * FROM cargos");
    return rows;
  }catch(error){
    console.error('Erro na function listarCargos()', error);
    throw error;
  };
};

module.exports = {listarCargos};