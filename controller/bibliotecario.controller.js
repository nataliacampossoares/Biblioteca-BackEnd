const locatarioRN = require("../model/locatarioModel/locatario.rn");
const bibliotecarioDAO = require("../model/bibliotecarioModel/bibliotecario.dao");
const path = require("path");

const cadastrarBibliotecario = async function ({
  id_locatario,
  senha,
  imagem,
  email
}) {
  try {
    await locatarioRN.verificarEmailBibliotecario(email);
    await bibliotecarioDAO.cadastrarBibliotecario({
      id_locatario,
      senha,
      imagem,
    });
    

    if (imagem) {
      const extensao = imagem.name.split(".").pop();
      const caminho = path.join(
        __dirname,
        "..",
        "imagens",
        `${id_locatario}.${extensao}`
      );


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
