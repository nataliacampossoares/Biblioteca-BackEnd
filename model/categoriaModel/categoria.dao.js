const { Pool } = require("../../config/database");

const listarCategorias = async function () {
  try{
    const { rows } = await Pool.query("SELECT * FROM categorias");
    return rows;
  }catch(error){
    console.error('Erro na function listarCategorias()', error);
    throw error;
  };
};

const cadastrarCategoria = async function (categoria) {
  const atributosCategoria = categoria.convertToArray();
  const query = "INSERT INTO categorias(nome, id_categoria_pai) values ($1, $2)";
  try{
     await Pool.query(query, atributosCategoria);
     return;
  }catch(error){
    console.error('Erro na function cadastrarCategoria()', error);
    throw error;
  }
};

module.exports = {cadastrarCategoria, listarCategorias};