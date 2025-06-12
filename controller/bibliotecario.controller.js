const locatarioRN = require("../model/locatarioModel/locatario.rn");
const livroDAO = require("../model/livroModel/livro.dao");
const path = require("path");

const cadastrarLivro = async function (livro) {
  try {
    await livroDAO.cadastrarLivro(livro);

    if (livro.imagem) {
      const extensao = imagem.name.split(".").pop();
      const caminho = path.join(
        __dirname,
        "..",
        "imagensLivro",
        `${id_livro}.${extensao}`
      );

      imagem.mv(caminho, (err) => {
        if (err) {
          console.error("Erro ao mover a imagem:", err);
          return;
        } else {
          console.log("livro com imagem");
          return;
        }
      });
    } else {
      console.log("livro sem imagem");
      return;
    }
  } catch (error) {
    console.error("Erro no controller: cadastrarLivro()", error);
    return;
  }
};

module.exports = { cadastrarLivro };
