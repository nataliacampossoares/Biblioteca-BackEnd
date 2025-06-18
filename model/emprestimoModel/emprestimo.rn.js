const alunoDAO = require("../alunoModel/aluno.dao");
const professorDAO = require("../professorModel/professor.dao");
const locatarioDAO = require("../locatarioModel/locatario.dao");

const verificarQuantidadeLivrosLocatario = async function (id_locatario) {
  const aluno = await alunoDAO.buscarAlunoPorId(id_locatario);
  const professor = await professorDAO.buscarProfessorPorId(id_locatario);
  const quantidade = await locatarioDAO.verificarQuantidadeLivrosLocatario(id_locatario);

  if (aluno) {
    if (quantidade === 3) {
      return false;
    } else {
      return true;
    }
  } else if (professor) {
    if (quantidade === 5) {
      return false;
    } else {
      return true;
    }
  } else {
    if (quantidade === 5) {
        return false;
    } else {
        return true;
    }
  }
};

module.exports = {verificarQuantidadeLivrosLocatario}