const autorDAO = require("../autorModel/autor.dao");

async function buscarAutorExistente(autor) {
  let autores = await autorDAO.buscarPorNome(autor.nome_autor);
  if (autores.length === 0) {
    return -1;
  }
  return autores[0].id;
}

module.exports = { buscarAutorExistente };
