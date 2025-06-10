const professorDAO = require("./professor.dao");

const verificarProfessor = async function ({ ra }) {
  try {
    const professorExistente = await professorDAO.buscarProfessorPorRa(ra);

    if (professorExistente) {
      throw new Error("RA professor");
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { verificarProfessor };
