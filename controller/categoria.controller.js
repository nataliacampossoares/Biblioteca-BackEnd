const categoriaDAO = require("../model/categoriaModel/categoria.dao");

const cadastrarCategoria = async function (categoria) {
  try {
    await categoriaDAO.cadastrarCategoria(categoria); 
    return;
  } catch (error) {
    console.log("Erro no controller: cadastrarCategoria()", error);
    throw error;
  }
};

const listarCategorias = async function () {
  try {
    const result = await categoriaDAO.listarCategorias();
    return result;
  } catch (error) {
    console.log("Erro no controller: listarcategorias()", error);
    throw error;
  }
};

module.exports = { cadastrarCategoria, listarCategorias };
