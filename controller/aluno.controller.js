const alunoRN = require("../model/alunoModel/aluno.rn");

const cadastrarAluno = async function ({ id_locatario, ra }) {
  try {
    await alunoRN.cadastrarAluno({ id_locatario, ra });
  } catch (error) {
    console.error("Erro no controller: cadastrarAluno()", error);
    throw error;  
  }
};

module.exports = { cadastrarAluno };
