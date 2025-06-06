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

const removerCategoria = async function (id_categoria) {
  try {
    await categoriaDAO.removerCategoria(id_categoria);
    return true;
  } catch (error) {
    console.log("Erro no controller: removerCategoria()", error);
    throw error;
  }
}

const atualizarCategoria = async function(categoria){
  try {
    const resposta = await categoriaDAO.atualizarCategoria(categoria);
    return resposta;
  } catch (error) {
    console.error("Erro no controller: atualizarCategoria()", error);
    throw error;
  }
}

module.exports = { cadastrarCategoria, listarCategorias, removerCategoria, atualizarCategoria };
