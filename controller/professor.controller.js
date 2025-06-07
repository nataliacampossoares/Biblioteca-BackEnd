const professorDAO = require("../model/professorModel/professor.dao");

const cadastrarProfessor = async function ({ id_locatario, ra }) {
  try {
    await professorDAO.cadastrarProfessor({ id_locatario, ra });
    return;
  } catch (error) {
    console.log("Erro no controller: adicionarProfessor()", error);
  }
};

module.exports = { cadastrarProfessor };
