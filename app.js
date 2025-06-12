const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const port = 3000;
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/imagens", express.static("./imagens"));

const livroController = require("./controller/livro.controller");
const livro = require("./entidades/livro");
const Livro = require("./entidades/livro");

const autorController = require("./controller/autor.controller");
const Autor = require("./entidades/autor");

const cursoController = require("./controller/curso.controller");
const Curso = require("./entidades/curso");

const editoraController = require("./controller/editora.controller");
const Editora = require("./entidades/editora");

const categoriaController = require("./controller/categoria.controller");
const Categoria = require("./entidades/categoria");

const locatarioController = require("./controller/locatario.controller");
const Locatario = require("./entidades/locatario");
const locatarioRN = require("./model/locatarioModel/locatario.rn");

const alunoController = require("./controller/aluno.controller");

const professorController = require("./controller/professor.controller");

const bibliotecarioController = require("./controller/bibliotecario.controller");

//LIVROS------------------------------------------------------------------

app.get("/listarLivros", function (req, res) {
  const resultado = livroController.listarLivros();
  resultado.then((resp) => {
    return res.send(resp);
  });
});

app.post("/cadastrarLivro", async function (req, res) {
  const {
    autores,
    categorias,
    id_editora,
    titulo,
    qtde,
    edicao,
    descricao,
    isbn,
  } = req.body;
  const imagem = req.files ? req.files.imagem : null;
  const livro = new Livro(
    id_editora,
    titulo,
    qtde,
    edicao,
    imagem,
    descricao,
    isbn
  );
  let autoresModels = [];
  for (let autor of autores) {
    autoresModels.push(new Autor(autor.nome_autor));
  }
  let categoriasModels = [];
  for (let categoria of categorias) {
    categoriasModels.push(new Categoria(categoria.nome_categoria));
  }

  await livroController.cadastrarLivro(livro, autoresModels, categoriasModels);
});

//AUTORES -------------------------------------------------------------------

app.get("/listarAutores", function (req, res) {
  const resultado = autorController.listarAutores();

  resultado.then((resp) => {
    return res.send(resp);
  });
});

app.get("/cadastrarAutor", function (req, res) {
  //colocar pra retornar a pagina de cadastro
  return true;
});

app.post("/cadastrarAutor", async function (req, res) {
  try {
    const novo_autor = new Autor(req.body.nome_autor);

    await autorController.cadastrarAutor(novo_autor);

    res.status(201).send("Autor cadastrado com sucesso.");
  } catch (error) {
    console.error("Erro ao cadastrar autor:", error);
    res.status(500).send("Erro ao cadastrar autor.");
  }
});

app.get("/removerAutor/:id", async function (req, res) {
  try {
    await autorController.removerAutor(req.params.id);
    res.status(200).send("Autor removido com sucesso.");
  } catch (error) {
    console.error("Erro ao remover autor:", error);
    res.status(500).send("Erro ao remover autor.");
  }
});

app.get("/alterarAutor/:id", function (req, res) {
  //nao sei oq vai ter aqui
});

app.post("/alterarAutor/:id", async function (req, res) {
  const edicao_autor = {
    id: req.params.id,
    nome: req.body.nome_autor,
  };

  try {
    await autorController.atualizarAutor(edicao_autor);
    res.status(200).send("Autor atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar autor:", error);
    res.status(500).send("Erro ao atualizar autor.");
  }
});

//CURSOS --------------------------------------------------------------------------------

app.get("/listarCursos", function (req, res) {
  const resultado = cursoController.listarCursos();
  resultado.then((resp) => {
    return res.send(resp);
  });
});

app.get("/cadastrarCurso", function (req, res) {
  res.render("formularioCursos");
});

app.post("/cadastrarCurso", async function (req, res) {
  try {
    const novo_curso = new Curso(req.body.nome_curso);

    await cursoController.cadastrarCurso(novo_curso);

    res.status(201).send("Curso cadastrado com sucesso.");
  } catch (error) {
    console.error("Erro ao cadastrar curso:", error);
    res.status(500).send("Erro ao cadastrar curso.");
  }
});

app.get("/removerCurso/:id", async function (req, res) {
  try {
    await cursoController.removerCurso(req.params.id);
    res.status(200).send("Curso removido com sucesso.");
  } catch (error) {
    console.error("Erro ao remover curso:", error);
    res.status(500).send("Erro ao remover curso.");
  }
});

app.get("/alterarCurso/:id", function (req, res) {
  //nao sei oq vai ter aqui
});

app.post("/alterarCurso/:id", async function (req, res) {
  const edicao_curso = {
    id: req.params.id,
    nome_curso: req.body.nome_curso,
  };

  try {
    await cursoController.atualizarCurso(edicao_curso);
    res.status(200).send("Curso atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar curso:", error);
    res.status(500).send("Erro ao atualizar curso.");
  }
});

//EDITORAS ---------------------------------------------------------------------

app.get("/listarEditoras", function (req, res) {
  const resultado = editoraController.listarEditoras();
  resultado.then((resp) => {
    return res.send(resp);
  });
});

app.get("/cadastrarEditora", function (req, res) {
  res.render("formularioEditoras");
});

app.post("/cadastrarEditora", async function (req, res) {
  try {
    const nova_editora = new Editora(req.body.nome_editora);

    await editoraController.cadastrarEditora(nova_editora);

    res.status(201).send("Editora cadastrada com sucesso.");
  } catch (error) {
    console.error("Erro ao cadastrar editora:", error);
    res.status(500).send("Erro ao cadastrar editora.");
  }
});

app.get("/removerEditora/:id", async function (req, res) {
  try {
    await editoraController.removerEditora(req.params.id);
    res.status(200).send("Editora removida com sucesso.");
  } catch (error) {
    console.error("Erro ao remover editora:", error);
    res.status(500).send("Erro ao remover curso.");
  }
});

app.get("/alterarEditora/:id", function (req, res) {
  //nao sei oq vai ter aqui
});

app.post("/alterarEditora/:id", async function (req, res) {
  const edicao_editora = {
    id: req.params.id,
    nome_editora: req.body.nome_editora,
  };

  try {
    await editoraController.atualizarEditora(edicao_editora);
    res.status(200).send("Editora atualizada com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar editora:", error);
    res.status(500).send("Erro ao atualizar editora.");
  }
});

//CATEGORIAS ------------------------------------------------------------------------

app.get("/listarCategorias", function (req, res) {
  const resultado = categoriaController.listarCategorias();
  resultado.then((resp) => {
    return res.send(resp);
  });
});

app.get("/cadastrarCategoria", function (req, res) {
  //
});

app.post("/cadastrarCategoria", async function (req, res) {
  try {
    let idPai = req.body.id_pai;
    if (!idPai || idPai === "") {
      idPai = null;
    } else {
      idPai = parseInt(idPai);
    }

    const nova_categoria = new Categoria(req.body.nome_categoria, idPai);

    await categoriaController.cadastrarCategoria(nova_categoria);

    res.status(201).send("Categoria cadastrada com sucesso.");
  } catch (error) {
    console.error("Erro ao cadastrar categoria:", error);
    res.status(500).send("Erro ao cadastrar categoria.");
  }
});

app.get("/removerCategoria/:id", async function (req, res) {
  try {
    await categoriaController.removerCategoria(req.params.id);
    res.status(200).send("Categoria removida com sucesso.");
  } catch (error) {
    console.error("Erro ao remover categoria:", error);
    res.status(500).send("Erro ao remover categoria.");
  }
});

app.post("/alterarCategoria/:id", async function (req, res) {
  const categoriaAtualizada = {
    id_categoria: req.params.id,
    nome_categoria: req.body.nome_categoria,
    id_pai: req.body.id_pai || null,
  };

  try {
    await categoriaController.atualizarCategoria(categoriaAtualizada);
    res.status(200).send("Categoria atualizada com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar categoria:", error);
    res.status(500).send("Erro ao atualizar categoria.");
  }
});

//LOCATARIO ------------------------------------------------------------------------------

app.post("/cadastrarLocatario", async (req, res) => {
  try {
    const {
      id_curso = null,
      nome,
      data_de_nascimento,
      telefone,
      tipo,
      ra = null,
      email,
      senha = null,
    } = req.body;

    const imagem = req.files ? req.files.imagem : null;
    const novo = new Locatario(
      id_curso,
      nome,
      data_de_nascimento,
      telefone,
      email
    );
    const id_locatario = await locatarioController.cadastrarLocatario(novo);

    if (tipo === "aluno") {
      await alunoController.cadastrarAluno({ id_locatario, ra });
    } else if (tipo === "professor") {
      await professorController.cadastrarProfessor({ id_locatario, ra });
    } else if (tipo === "bibliotecario") {
      await bibliotecarioController.cadastrarBibliotecario({
        id_locatario,
        senha,
        imagem,
        email,
      });
    }

    res.status(201).send("Locatário cadastrado com sucesso.");
  } catch (error) {
    if (error.message === "RA aluno") {
      return res.status(400).send("RA já cadastrado");
    }

    if (error.message === "RA professor") {
      return res.status(400).send("RA já cadastrado");
    }

    if (error.message === "Email bibliotecario") {
      return res.status(400).send("Email já cadastrado");
    }

    if (error.message === "Curso informado não existe.") {
      return res.status(400).send("Curso inexistente");
    }
  }
});

app.get("/listarLocatarios", async function (req, res) {
  try {
    const locatarios = await locatarioController.listarLocatarios();
    res.status(200).json(locatarios);
  } catch (error) {
    console.error("Erro ao listar locatários:", error);
    res.status(500).send("Erro ao listar locatários.");
  }
});

app.get("/desativarLocatario/:id", async function (req, res) {
  try {
    await locatarioController.desativarLocatario(req.params.id);
    res.status(200).send("Locatário desativado.");
  } catch (error) {
    console.error("Erro ao desativar usuário:", error);
    res.status(500).send("Erro ao desativar usuário.");
  }
});

app.post("/alterarLocatario/:id", async function (req, res) {
  const locatarioAtualizado = {
    id: req.params.id,
    id_curso: req.body.id_curso,
    nome: req.body.nome,
    data_de_nascimento: req.body.data_de_nascimento,
    telefone: req.body.telefone,
  };

  try {
    await locatarioController.atualizarLocatario(locatarioAtualizado);
    res.status(200).send("Locatário atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar locatário:", error);
    res.status(500).send("Erro ao atualizar locatário.");
  }
});

//-------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("OLAAAAAAAAAA TESTE");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});
