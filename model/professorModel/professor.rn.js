const professorDAO = require("./professor.dao");

const cadastrarProfessor = async function ({ id_locatario, ra }) {
  try {
    const professorExistente = await professorDAO.buscarProfessorPorRa(ra);

    if (professorExistente) {
      throw new Error("RA professor");
    }

    await professorDAO.cadastrarProfessor({ id_locatario, ra });
  } catch (error) {
    throw error;
  }
};

module.exports = { cadastrarProfessor };
