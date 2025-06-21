const locatarioDAO = require("./locatario.dao");
const cursoDAO = require("../cursoModel/curso.dao");

const verificarCurso = async function (locatario) {
  try {
    if (!id_curso) {
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

module.exports = { verificarCurso, verificarEmailBibliotecario };
