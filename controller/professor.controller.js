const professorRN = require("../model/professorModel/professor.rn");

const cadastrarProfessor = async function ({ id_locatario, ra }) {
  try {
    await professorRN.cadastrarProfessor({ id_locatario, ra });
  } catch (error) {
    console.error("Erro no controller: cadastrarProfessor()", error);
    throw error;
  }
};

module.exports = { cadastrarProfessor };
