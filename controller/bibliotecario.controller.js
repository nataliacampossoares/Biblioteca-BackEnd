const locatarioRN = require("../model/locatarioModel/locatario.rn");
const livroDAO = require("../model/livroModel/livro.dao");
const path = require("path");

const cadastrarBibliotecario = async function ({
  id_locatario,
  senha,
  imagem,
  email,
}) {
  try {
    await locatarioRN.verificarEmailBibliotecario(email);

    if (imagem) {
      const extensao = imagem.name.split(".").pop();
      const caminho = path.join(
        __dirname,
        "..",
        "imagensBibliotecario",
        `${id_locatario}.${extensao}`
      );

      await bibliotecarioDAO.cadastrarBibliotecario({
        id_locatario,
        senha,
        caminho,
      });
      imagem.mv(caminho, (err) => {
        if (err) {
          console.error("Erro ao mover a imagem:", err);
          return;
        } else {
          console.log("bibliotecario com imagem");
          return;
        }
      });
    } else {
      console.log("bibliotecario sem imagem");
      return;
    }
  } catch (error) {
    console.error("Erro no controller: cadastrarBibliotecario()", error);
    return;
  }
};

module.exports = { cadastrarBibliotecario };
