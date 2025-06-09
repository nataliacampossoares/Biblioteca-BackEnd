const bibliotecarioRN = require("../model/bibliotecarioModel/bibliotecario.rn");
const path = require("path");

const cadastrarBibliotecario = async function ({id_locatario, senha, imagem}) {
  try {
    const id = await bibliotecarioRN.cadastrarBibliotecario({
      id_locatario,
      senha,
      imagem,
    });

    if (imagem) {
      const extensao = imagem.name.split(".").pop();
      const caminho = path.join(__dirname, '..', 'imagens', `${id}.${extensao}`);

      imagem.mv(caminho, (err) => {
        if (err) {
          console.error("Erro ao mover a imagem:", err);
          return 
        } else {
          console.log("bibliotecario sem imagem")
          return
        }
      });
    } else {
      console.log("bibliotecario com imagem")
      return 
    }
  } catch (error) {
    console.error("Erro no controller: cadastrarBibliotecario()", error);
    return 
  }
};

module.exports = { cadastrarBibliotecario };
