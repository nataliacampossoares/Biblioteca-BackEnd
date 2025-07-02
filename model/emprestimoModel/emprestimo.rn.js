const alunoDAO = require("../alunoModel/aluno.dao");
const professorDAO = require("../professorModel/professor.dao");
const locatarioDAO = require("../locatarioModel/locatario.dao");

const verificarQuantidadeLivrosLocatario = async function (id_locatario) {
  const aluno = await alunoDAO.buscarAlunoPorId(id_locatario);
  const professor = await professorDAO.buscarProfessorPorId(id_locatario);
  const quantidade = await locatarioDAO.verificarQuantidadeLivrosLocatario(
    id_locatario
  );

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

const verificarSituacaoEmprestimo = function (emprestimo, cargo) {
  if (emprestimo.data_hora_devolucao) {
    return {
      titulo: emprestimo.titulo,
      dataEmprestimo: emprestimo.data_hora_emprestimo,
      dataDevolucao: emprestimo.data_hora_devolucao,
      situacao: "Devolvido",
    };
  }
  const dataEmprestimo = new Date(emprestimo.data_hora_emprestimo);
  const hoje = new Date();

  let diasPermitidos = 7;
  if (cargo === "professor") {
    diasPermitidos = 30;
  }

  const dataLimite = new Date(emprestimo.data_hora_emprestimo);
  dataLimite.setDate(dataLimite.getDate() + diasPermitidos);

  const atrasado = hoje > dataLimite;

  return {
    titulo: emprestimo.titulo,
    dataEmprestimo,
    dataDevolucao: null,
    situacao: atrasado ? "Atrasado" : "Em posse",
  };
};

module.exports = {
  verificarQuantidadeLivrosLocatario,
  verificarSituacaoEmprestimo,
};
