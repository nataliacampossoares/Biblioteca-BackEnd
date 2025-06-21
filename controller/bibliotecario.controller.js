const locatarioRN = require("../model/locatarioModel/locatario.rn");
const livroDAO = require("../model/livroModel/livro.dao");
const path = require("path");
const bibliotecarioDAO = require("../model/bibliotecarioModel/bibliotecario.dao")

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
      const caminho = path.join(
        __dirname,
        "..",
        "imagensBibliotecario",
        `${email}.${extensao}`
      );

      await bibliotecarioDAO.cadastrarBibliotecario({
        id_locatario,
        senha,
        imagem: caminho, 
      });

      await new Promise((resolve, reject) => {
        imagem.mv(caminho, (err) => {
          if (err) {
            console.error("Erro ao mover a imagem:", err);
            reject(err);
          } else {
            console.log("bibliotecario com imagem");
            resolve();
          }
        });
      });

      return;
    } else {
      console.log("bibliotecario sem imagem");
      await bibliotecarioDAO.cadastrarBibliotecario({
        id_locatario,
        senha,
        imagem: null,
      });
      return;
    }
  } catch (error) {
    console.error("Erro no controller: cadastrarBibliotecario()", error);
    throw error;
  }
};

module.exports = { cadastrarBibliotecario }