const locatarioRN = require("../model/locatarioModel/locatario.rn");
const livroDAO = require("../model/livroModel/livro.dao");
const path = require("path");
const bibliotecarioDAO = require("../model/bibliotecarioModel/bibliotecario.dao");
const locatarioDAO = require("../model/locatarioModel/locatario.dao");

const cadastrarBibliotecario = async function ({
  id_locatario,
  senha,
  imagem,
  email,
}) {
  try {
    console.log("ARE WE HERE? PT 2");
    await locatarioRN.verificarEmailBibliotecario(email);

    if (imagem) {
      const extensao = imagem.name.split(".").pop();
      const nomeArquivo = `${email}.${extensao}`; 
      const caminhoCompleto = path.join(
        __dirname,
        "..",
        "imagensBibliotecario",
        nomeArquivo
      );

      await bibliotecarioDAO.cadastrarBibliotecario({
        id_locatario,
        senha,
        imagem: nomeArquivo,
      });

      await new Promise((resolve, reject) => {
        imagem.mv(caminhoCompleto, (err) => {
          if (err) {
            console.error("Erro ao mover a imagem:", err);
            reject(err);
          } else {
            console.log("Bibliotecário com imagem cadastrada");
            resolve();
          }
        });
      });
    } else {
      console.log("Bibliotecário sem imagem");
      await bibliotecarioDAO.cadastrarBibliotecario({
        id_locatario,
        senha,
        imagem: null,
      })
    }
    return;
  } catch (error) {
    console.error("Erro no controller: cadastrarBibliotecario()", error);
    throw error;
  }
};

const buscarPorIdLocatario = async function (id_locatario) {
  try {
    const bibliotecario = await locatarioDAO.buscarLocatarioPorId(id_locatario);
    return bibliotecario;
  } catch (error) {
    console.error("Erro no controller: buscarPorIdLocatario()", error);
    throw error;
  }
};

const loginBibliotecario = async function (email, senha) {
  console.log("OLAARR");
  console.log(email);

  try {
    const bibliotecario = await locatarioDAO.buscarBibliotecarioLogin(email);
    console.log("biblitoecario", bibliotecario);
    if (!bibliotecario) {
      console.log("OI AMOROOOREESS");
      console.log("Usuário não encontrado");
      return;
    }

    if (bibliotecario.senha !== senha) {
      console.log("Senha incorreta");
      return;
    }

    console.log("Login realizado com sucesso");
    return bibliotecario;
  } catch (error) {
    console.error("Erro no controller: loginBibliotecario()", error);
    return;
  }
};

module.exports = {
  cadastrarBibliotecario,
  loginBibliotecario,
  buscarPorIdLocatario,
};
