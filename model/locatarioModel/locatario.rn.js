const locatarioDAO = require("./locatario.dao");
const cursoDAO = require("../cursoModel/curso.dao");

const cadastrarLocatario = async function (locatario) {
  try {
    const cursoExiste = await cursoDAO.buscarCursoPorId(locatario.id_curso);

    if (!cursoExiste) {
      throw new Error("Curso informado não existe.");
    }
    const id_locatario = await locatarioDAO.cadastrarLocatario(locatario);

    return id_locatario; 
  } catch (error) {
    console.error("Erro na regra de negócio: cadastrarLocatario()", error);
    throw error;
  }
};

module.exports = { cadastrarLocatario };
