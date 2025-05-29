const editoraDAO = require("../model/editoraModel/editora.dao");

const cadastrarEditora = async function (editora) {
  try {
    editoraDAO.cadastrarEditora(editora);
    return;
  } catch (error) {
    console.log("Erro no controller: cadastrarEditora()", error);
  }
};

const listarEditoras = async function () {
  try {
    const result = await editoraDAO.listarEditoras();
    return result;
  } catch (error) {
    console.log("Erro no controller: listarEditoras()", error);
    throw error;
  }
};

module.exports = { cadastrarEditora, listarEditoras }
