const locatarioDAO = require("./locatario.dao");
const cursoDAO = require("../cursoModel/curso.dao");

const verificarCurso = async function (locatario) {
  try {
    const cursoExiste = await cursoDAO.buscarCursoPorId(locatario.id_curso);

    if (!cursoExiste) {
      throw new Error("Curso informado não existe.");
    }
  } catch (error) {
    console.error("Erro na regra de negócio: verificarLocatario()", error);
    throw error;
  }
};

const verificarEmailBibliotecario = async function ({email}) {
  try {
    const emailExistente = await locatarioDAO.buscarBibliotecarioPorEmail(email);
    if (emailExistente) {
      throw new Error("Email já cadastrado");
    } 
  } catch (error) {
    console.error("Erro na regra de negócio: verificarEmailLocatario()", error);
    throw error;
  }
};

module.exports = { verificarCurso, verificarEmailBibliotecario };
