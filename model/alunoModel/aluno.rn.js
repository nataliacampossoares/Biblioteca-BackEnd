const alunoDAO = require("./aluno.dao");

const cadastrarAluno = async function ({ id_locatario, ra }) {
  try {
    const alunoExistente = await alunoDAO.buscarAlunoPorRa(ra);

    if (alunoExistente) {
      throw new Error("RA aluno");
    }

    await alunoDAO.cadastrarAluno({ id_locatario, ra });
  } catch (error) {
    throw error; 
  }
};

module.exports = { cadastrarAluno };
