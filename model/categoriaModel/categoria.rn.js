const categoriaDAO = require("./categoria.dao");

async function buscarCategoriaExistente(categoria) {
  let categorias = await categoriaDAO.buscarPorCategoria(
    categoria.nome_categoria
  );
  if (categorias.length === 0) {
    return -1;
  }
  return categorias[0].id_categoria;
}

module.exports = { buscarCategoriaExistente };
