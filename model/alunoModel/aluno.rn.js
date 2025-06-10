const alunoDAO = require("./aluno.dao");

const verificarAluno = async function ({ ra }) {
  try {
    const alunoExistente = await alunoDAO.buscarAlunoPorRa(ra);

    if (alunoExistente) {
      throw new Error("RA aluno");
    }
  } catch (error) {
    throw error; 
  }
};

module.exports = { verificarAluno };
