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

const removerEditora = async function (id) {
  try {
    await editoraDAO.removerEditora(id);
    return true;
  } catch (error) {
    console.log("Erro no controller: removerEditora()", error);
    throw error;
  }
}

const atualizarEditora = async function(editora){
  try {
    const resposta = await editoraDAO.atualizarEditora(editora);
    return resposta;
  } catch (error) {
    console.error("Erro no controller: atualizarEditora()", error);
    throw error;
  }
}


module.exports = { cadastrarEditora, listarEditoras, removerEditora, atualizarEditora }
