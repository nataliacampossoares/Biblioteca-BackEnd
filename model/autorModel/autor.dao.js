const { Pool } = require("../../config/database");

const listarAutores = async function () {
  try{
    const { rows } = await Pool.query("SELECT * FROM autores");
    return rows;
  }catch(error){
    console.error('Erro na function listarAutores()', error);
    throw error;
  };
};

const adicionarAutor = async function (autor) {
  const atributosAutor = autor.convertToArray();
  const query = "INSERT INTO autores(nome_autor) values ($1)";
  try{
     await Pool.query(query, atributosAutor);
     return;
  }catch(error){
    console.error('Erro na function adicionarAutor()', error);
    throw error;
  }
};

module.exports = {adicionarAutor, listarAutores};