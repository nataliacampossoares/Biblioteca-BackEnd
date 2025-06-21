const locatarioDAO = require("../model/locatarioModel/locatario.dao");
const locatarioRN = require("../model/locatarioModel/locatario.rn");

const cadastrarLocatario = async function (locatario) {
  try {
    let cursoCadastrado = null;

    if (locatario.novo_curso && locatario.novo_curso.trim() !== "") {
      // Cadastrar novo curso
      const novoCurso = { nome_curso: locatario.novo_curso.trim() };
      await cursoController.cadastrarCurso(novoCurso);

      // Buscar o curso recém cadastrado para pegar o id
      cursoCadastrado = await cursoController.listarCursos().then(cursos => 
        cursos.find(c => c.nome_curso === novoCurso.nome_curso)
      );

      if (!cursoCadastrado) {
        throw new Error("Curso não cadastrado corretamente.");
      }
      locatario.id_curso = cursoCadastrado.id;
    } else if (locatario.id_curso) {
      // Verificar se curso já existe pelo id
      cursoCadastrado = await locatarioRN.verificarCurso(locatario.id_curso);
      if (!cursoCadastrado) {
        throw new Error("Curso inválido.");
      }
    } else {
      throw new Error("Curso inválido.");
    }

    // Agora cadastrar locatário com o id_curso certo
    const locatario_id = await locatarioDAO.cadastrarLocatario(locatario);
    return locatario_id;
  } catch (error) {
    console.log("Erro no controller: cadastrarLocatario()", error);
    throw error;
  }
};





const listarLocatarios = async function () {
  try {
    return await locatarioDAO.listarLocatarios();
  } catch (error) {
    console.error("Erro no controller: listarLocatarios()", error);
    throw error;
  }
};

const desativarLocatario = async function (id) {
  try {
    return await locatarioDAO.desativarLocatario(id);
  } catch (error) {
    console.error("Erro no controller: desativarLocatario()", error);
    throw error;
  }
};

const atualizarLocatario = async function (locatario) {
  try {
    return await locatarioDAO.atualizarLocatario(locatario);
  } catch (error) {
    console.error("Erro no controller: atualizarLocatario()", error);
    throw error;
  }
};

module.exports = {
  cadastrarLocatario,
  listarLocatarios,
  desativarLocatario,
  atualizarLocatario,
};
