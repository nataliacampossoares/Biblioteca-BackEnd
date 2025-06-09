const bibliotecarioRN = require("../model/bibliotecarioModel/bibliotecario.rn");
const path = require("path");

const cadastrarBibliotecario = async function (req, res) {
  try {
    console.log("req.body:", req.body);
    console.log("req.files:", req.files);

    const { id_locatario, email, senha } = req.body;
    const imagem = req.files?.imagem;

    const id = await bibliotecarioRN.cadastrarBibliotecario({
      id_locatario,
      email,
      senha,
      imagem,
    });

    if (imagem) {
      const extensao = imagem.name.split(".").pop();
      const caminho = path.join(__dirname, '..', 'imagens', `${id}.${extensao}`);

      imagem.mv(caminho, (err) => {
        if (err) {
          console.error("Erro ao mover a imagem:", err);
          return res.status(500).send("Erro ao salvar imagem.");
        } else {
          return res.status(201).send("Bibliotecário cadastrado com imagem.");
        }
      });
    } else {
      return res.status(201).send("Bibliotecário cadastrado sem imagem.");
    }
  } catch (error) {
    console.error("Erro no controller: cadastrarBibliotecario()", error);
    return res.status(500).send("Erro ao cadastrar bibliotecário.");
  }
};

module.exports = { cadastrarBibliotecario };
