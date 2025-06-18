const autorDAO = require("../autorModel/autor.dao");

async function buscarAutorExistente(autor) {
  console.log("AQUI NO RN: ",autor)
  let autores = await autorDAO.buscarPorNome(autor);
  console.log(autores)
  if (autores.length === 0) {
    return -1;
  }
  return autores[0].id;
}

module.exports = { buscarAutorExistente };
