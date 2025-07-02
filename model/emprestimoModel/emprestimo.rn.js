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
  const dataEmprestimo = new Date(emprestimo.data_hora_emprestimo);

  let diasPermitidos = 7;
  if (cargo === "professor") {
    diasPermitidos = 30;
  }

  const dataLimite = new Date(dataEmprestimo);
  dataLimite.setDate(dataLimite.getDate() + diasPermitidos);

  let diasAtraso = 0;
  let multa = 0;
  let situacao = "";

  if (emprestimo.data_hora_devolucao) {
    const dataDevolucao = new Date(emprestimo.data_hora_devolucao);

    if (dataDevolucao > dataLimite) {
      const diffMs = dataDevolucao - dataLimite;
      diasAtraso = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      multa = diasAtraso * 1; // 1 real por dia
      situacao = "Devolvido com atraso";
    } else {
      situacao = "Devolvido no prazo";
    }

    return {
      titulo: emprestimo.titulo,
      dataEmprestimo,
      dataDevolucao: new Date(emprestimo.data_hora_devolucao),
      situacao,
      diasAtraso,
      multa
    };
  }

  const hoje = new Date();
  const atrasado = hoje > dataLimite;

  if (atrasado) {
    const diffMs = hoje - dataLimite;
    diasAtraso = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    multa = diasAtraso * 1;
  }

  situacao = atrasado ? "Atrasado" : "Em posse";

  return {
    titulo: emprestimo.titulo,
    dataEmprestimo,
    dataDevolucao: null,
    situacao,
    diasAtraso,
    multa
  };
};


module.exports = {
  verificarQuantidadeLivrosLocatario,
  verificarSituacaoEmprestimo,
};
