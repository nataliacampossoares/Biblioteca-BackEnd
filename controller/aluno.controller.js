const alunoDAO = require("../model/alunoModel/aluno.dao");

const cadastrarAluno = async function ({ id_locatario, ra }) {
  console.log("ola controller");
  try {
    await alunoDAO.cadastrarAluno({ id_locatario, ra });
    return;
  } catch (error) {
    console.log("Erro no controller: adicionarAluno()", error);
  }
};

module.exports = { cadastrarAluno };
