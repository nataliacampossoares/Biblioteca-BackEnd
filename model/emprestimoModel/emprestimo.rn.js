const alunoDAO = require("../alunoModel/aluno.dao");
const professorDAO = require("../professorModel/professor.dao");
const locatarioDAO = require("../locatarioModel/locatario.dao");
const emprestimoDAO = require("./emprestimo.dao");

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

const verificarSituacaoEmprestimo = function (emprestimo, cargo) {
  const dataEmprestimo = new Date(emprestimo.data_hora_emprestimo);

  console.log("VERIFICAR EMPRESTIMO CARGO", cargo)

  let diasPermitidos = 7;
  if (cargo === "Professor") {
    diasPermitidos = 30;
  }
  
  const dataLimite = new Date(dataEmprestimo);
  dataLimite.setDate(dataLimite.getDate() + diasPermitidos);
  
  let multa = 0;
  let situacao = "";
  
  if (emprestimo.data_hora_devolucao) {
    const dataDevolucao = new Date(emprestimo.data_hora_devolucao);
    
    if (dataDevolucao > dataLimite) {
      const diffMs = dataDevolucao - dataLimite;
      multa = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      situacao = "Devolvido com atraso";
    } else {
      situacao = "Devolvido no prazo";
    }
    
    return {
      titulo: emprestimo.titulo,
      dataEmprestimo,
      dataDevolucao: new Date(emprestimo.data_hora_devolucao),
      situacao,
      multa
    };
  }

  const hoje = new Date();
  const atrasado = hoje > dataLimite;
  
  if (atrasado) {
    const diffMs = hoje - dataLimite;
    multa = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    
  }
  
  situacao = atrasado ? "Atrasado" : "Em posse";

  return {
    titulo: emprestimo.titulo,
    dataEmprestimo,
    dataDevolucao: null,
    situacao,
    multa,
    multa
  };
};


const podeFazerEmprestimo = async function (id_locatario) {
  const aluno = await alunoDAO.buscarAlunoPorId(id_locatario);
  const professor = await professorDAO.buscarProfessorPorId(id_locatario);
  const quantidade = await locatarioDAO.verificarQuantidadeLivrosLocatario(id_locatario);
  const emprestimos = await emprestimoDAO.buscarEmprestimosAtuaisPorUsuario(id_locatario);

  const cargo = professor ? "Professor" : aluno ? "Aluno" : "Outro";

  for (const emprestimo of emprestimos) {
    const resultado = verificarSituacaoEmprestimo(emprestimo, cargo);
    if (resultado.situacao === "Atrasado") {
      return {
        permitido: false,
        motivo: "Você possui livros em atraso.",
      };
    }
  }

  const limite = aluno ? 3 : 5;
  if (quantidade >= limite) {
    return {
      permitido: false,
      motivo: "Você já atingiu o limite de livros emprestados.",
    };
  }

  return {
    permitido: true,
  };
};

module.exports = {
  verificarQuantidadeLivrosLocatario,
  verificarSituacaoEmprestimo,
  podeFazerEmprestimo 
};
