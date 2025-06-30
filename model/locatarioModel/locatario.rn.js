const locatarioDAO = require("./locatario.dao");
const cursoDAO = require("../cursoModel/curso.dao");

const verificarCurso = async function (locatario) {
  console.log("oi")
  try {
    if (!locatario) {
      return null;
    }
    console.log("OLA VERIFICARCURSOO");
    console.log(locatario);
    const cursoExiste = await cursoDAO.buscarCursoPorId(locatario);
    console.log("CURSO EXISTE AQUI Ó");
    console.log(cursoExiste);
    if (!cursoExiste) {
      throw new Error("Curso informado não existe.");
    }
    return cursoExiste;
  } catch (error) {
    console.error("Erro na regra de negócio: verificarCurso()", error);
    throw error;
  }
};

const verificarEmailBibliotecario = async function ({ email }) {
  try {
    const emailExistente = await locatarioDAO.buscarBibliotecarioPorEmail(
      email
    );
    if (emailExistente) {
      throw new Error("Email já cadastrado");
    }
  } catch (error) {
    console.error("Erro na regra de negócio: verificarEmailLocatario()", error);
    throw error;
  }
};

function verificarSituacaoEmprestimo(emprestimo, cargo) {
  const dataEmprestimo = new Date(emprestimo.data_hora_emprestimo);
  const hoje = new Date();

  let diasPermitidos = 7;

  if (cargo === "professor") {
    diasPermitidos = 30;
  }

  const dataLimite = new Date(dataEmprestimo);
  dataLimite.setDate(dataEmprestimo.getDate() + diasPermitidos);

  const atrasado = hoje > dataLimite;

  return {
    titulo: emprestimo.titulo,
    situacao: atrasado ? "Atrasado" : "Em dia"
  };
}


module.exports = { verificarCurso, verificarEmailBibliotecario, verificarSituacaoEmprestimo };
