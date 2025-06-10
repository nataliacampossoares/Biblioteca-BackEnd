const alunoRN = require("../model/alunoModel/aluno.rn");
const alunoDAO = require("../model/alunoModel/aluno.dao")

const cadastrarAluno = async function ({ id_locatario, ra }) {
  try {
    await alunoRN.verificarAluno({ ra });
    await alunoDAO.cadastrarAluno({ id_locatario, ra });
  } catch (error) {
    console.error("Erro no controller: cadastrarAluno()", error);
    throw error;  
  }
};

module.exports = { cadastrarAluno };
