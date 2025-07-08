const express = require("express");
const { Pool } = require("./config/database");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const port = 3000;
app.use(cors());
app.use(fileUpload());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/imagensBibliotecario", express.static("./imagensBibliotecario"));
app.use("/imagensLivro", express.static("./imagensLivro"));
const email = require("./config/email");

const livroController = require("./controller/livro.controller");
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

const alunoController = require("./controller/aluno.controller");

const professorController = require("./controller/professor.controller");

const bibliotecarioController = require("./controller/bibliotecario.controller");

const emprestimoController = require("./controller/emprestimo.controller");
const Emprestimo = require("./entidades/emprestimo");

//LIVROS------------------------------------------------------------------

app.get("/listarLivros", async function (req, res) {
  const resultado = await livroController.listarLivros();
  console.log("Resultado da listagem de livros:", resultado);
  res.json(resultado);
});

app.get("/desativarLivro/:id", async function (req, res) {
  try {
    await livroController.desativarLivro(req.params.id);
    res.status(200).send("Livro desativado com sucesso.");
  } catch (error) {
    console.error("Erro ao desativar livro:", error);
    res.status(500).send("Erro ao desativar livro.");
  }
});

app.post("/cadastrarLivro", async function (req, res) {
  try {
    const {
      autores,
      categorias,
      id_editora,
      titulo,
      qtd_disponivel,
      edicao,
      descricao,
      isbn,
    } = req.body;
    const imagem = req.files ? req.files.imagem : null;
    const livro = new Livro(
      id_editora,
      titulo,
      qtd_disponivel,
      edicao,
      null,
      descricao,
      isbn
    );

  
    let autoresModels = [];
    let autoresArray = [];
    if (typeof autores == "string") {
      autoresArray = JSON.parse(autores);
    } else {
      autoresArray = autores;
    }

    for (let autor of autoresArray) {
      autoresModels.push(new Autor(autor));
    }

    let categoriasModels = [];
    let categoriasArray = [];
    if (typeof categorias == "string") {
      categoriasArray = JSON.parse(categorias);
    } else {
      categoriasArray = categorias;
    }

    for (let categoria of categoriasArray) {
      categoriasModels.push(new Categoria(categoria));
    }

    await livroController.cadastrarLivro(
      livro,
      autoresModels,
      categoriasModels,
      imagem
    );
    res.status(201).send("Livro cadastrado com sucesso.");
    console.log("Dados recebidos:", {
      autores,
      categorias,
      id_editora,
      titulo,
      qtd_disponivel,
      edicao,
      descricao,
      isbn,
    });
  } catch (error) {
    console.error("Erro ao cadastrar livro:", error);
    res.status(500).send("Erro ao cadastrar livro.");
  }
});

app.get("/listarLivro/:id", async function (req, res) {
  try {
    console.log("ID recebido:", req.params.id);
    const livro = await livroController.listarLivroPorId(req.params.id);
    res.json(livro);
  } catch (error) {
    console.error("Erro ao listar livro:", error);
    res.status(500).send("Erro ao listar livro.");
  }
});

app.post("/alterarLivro/:id", async function (req, res) {
  try {
    const {
      autores,
      categorias,
      id_editora,
      titulo,
      qtd_disponivel,
      edicao,
      sinopse,
      isbn,
    } = req.body;

    const imagem = req.files ? req.files.imagem : null;

    const livroAtualizado = new Livro(
      id_editora,
      titulo,
      qtd_disponivel,
      edicao,
      null,
      sinopse,
      isbn
    );

    // Tratamento seguro para autores
    let autoresModels = [];
    let autoresArray = [];

    try {
      autoresArray =
        typeof autores === "string" && autores.trim() !== ""
          ? JSON.parse(autores)
          : Array.isArray(autores)
          ? autores
          : [];
    } catch (e) {
      console.warn("Erro ao fazer parse dos autores:", e);
      autoresArray = [];
    }

    for (let autor of autoresArray) {
      autoresModels.push(new Autor(autor));
    }

    // Tratamento seguro para categorias
    let categoriasModels = [];
    let categoriasArray = [];

    try {
      categoriasArray =
        typeof categorias === "string" && categorias.trim() !== ""
          ? JSON.parse(categorias)
          : Array.isArray(categorias)
          ? categorias
          : [];
    } catch (e) {
      console.warn("Erro ao fazer parse das categorias:", e);
      categoriasArray = [];
    }

    for (let categoria of categoriasArray) {
      categoriasModels.push(new Categoria(categoria));
    }

    await livroController.atualizarLivro(
      req.params.id,
      livroAtualizado,
      autoresModels,
      categoriasModels,
      imagem
    );

    res.status(200).send("Livro atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar livro:", error);
    res.status(500).send("Erro ao atualizar livro.");
  }
});

app.get("/pesquisarPorTitulo/:titulo", async function (req, res) {
  try {
    const { titulo } = req.params;
    console.log("Título recebido:", titulo);
    const livros = await livroController.pesquisarPorTitulo(titulo);
    res.json(livros);
  } catch (err) {
    res.status(500).send("Erro ao pesquisar por título.");
  }
});

app.get("/pesquisarPorAutor/:autor", async function (req, res) {
  try {
    const { autor } = req.params;
    const livros = await livroController.pesquisarPorAutor(autor);
    res.json(livros);
  } catch (err) {
    res.status(500).send("Erro ao pesquisar por autor.");
  }
});

app.get("/pesquisarPorCategoria/:categoria", async function (req, res) {
  try {
    const { categoria } = req.params;
    const livros = await livroController.pesquisarPorCategoria(categoria);
    res.json(livros);
  } catch (err) {
    res.status(500).send("Erro ao pesquisar por categoria.");
  }
});

app.get("/pesquisarPorSubcategoria/:subcategoria", async function (req, res) {
  try {
    const subcategoria = parseInt(req.params.subcategoria);
    const livros = await livroController.pesquisarPorSubcategoria(subcategoria);
    console.log("Livros encontrados por subcategoria:", livros);
    res.json(livros);
  } catch (err) {
    console.error("Erro ao pesquisar por Subcategoria:", err);
    res.status(500).send("Erro ao pesquisar por Subcategoria.");
  }
});

app.get("/pesquisarPorEditora/:editora", async function (req, res) {
  try {
    const { editora } = req.params;
    const livros = await livroController.pesquisarPorEditora(editora);
    res.json(livros);
  } catch (err) {
    res.status(500).send("Erro ao pesquisar por editora.");
  }
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

app.get("/listarCategorias", async function (req, res) {
  const resultado = await categoriaController.listarCategorias();
  console.log("Resultado da listagem de categorias:", resultado);
  res.json(resultado);
});

app.get("/listarSubcategorias/:id", async function (req, res) {
  console.log("ID recebido:", req.params.id);
  const resultado = await categoriaController.listarSubcategorias(
    req.params.id
  );
  console.log("OIIIIIIIIIIIIII", resultado);
  res.json(resultado);
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

    const id_nova_categoria = await categoriaController.cadastrarCategoria(
      nova_categoria
    );

    console.log(id_nova_categoria);

    res.status(201).json(id_nova_categoria);
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
    console.log("DADOS RECEBIDOS:", req.body);
    console.log("req.files:", req.files);
    const {
      id_curso = null,
      novo_curso = null,
      nome,
      data_de_nascimento,
      telefone,
      tipo,
      ra = null,
      email,
      senha = null,
    } = req.body;

    let idCursoFinal = id_curso;

    const imagem = req.files?.imagem;

    if (novo_curso) {
      console.log("AAAAAAAAAAAAAAAAAAAA");
      console.log(">> Vai cadastrar novo curso:", novo_curso);
      idCursoFinal = await cursoController.cadastrarCurso(novo_curso);
      console.log(">> ID do curso cadastrado:", idCursoFinal);
    }

    console.log(">> ID do curso que será usado no Locatario:", idCursoFinal);

    const novo = new Locatario(
      idCursoFinal,
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

app.post("/loginBibliotecario", async (req, res) => {
  const { email, senha } = req.body;
  try {
    const bibliotecario = await bibliotecarioController.loginBibliotecario(
      email,
      senha
    );
    console.log("OLAARRR");

    if (!bibliotecario) {
      return res.status(401).send("Email ou senha incorretos");
    }

    res.status(200).json(res.status(200).json(bibliotecario));
  } catch (error) {
    console.error("Erro na rota /loginBibliotecario:", error);
    res.status(500).send("Erro interno no servidor");
  }
});

app.get("/listarLocatarios", async function (req, res) {
  try {
    const locatarios =
      await locatarioController.listarLocatariosComTipoEcurso();
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
  console.log("OLAAAAAAAAARR ALTERAAAR");
  try {
    const { id } = req.params;
    const {
      id_curso = null,
      novo_curso = null,
      nome,
      data_de_nascimento,
      telefone,
      ra = null,
      email,
    } = req.body;

    let idCursoFinal = id_curso;

    if (novo_curso) {
      console.log("Vai cadastrar novo curso na alteração:", novo_curso);
      idCursoFinal = await cursoController.cadastrarCurso(novo_curso);
      console.log("ID do curso cadastrado:", idCursoFinal);
    }

    const locatarioAtualizado = new Locatario(
      idCursoFinal,
      nome,
      data_de_nascimento,
      telefone,
      email,
      ra
    );
    locatarioAtualizado.id = id;

    await locatarioController.atualizarLocatario(locatarioAtualizado);
    res.status(200).send("Locatário atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar locatário:", error);
    res.status(500).send("Erro ao atualizar locatário.");
  }
});

app.get("/locatario/:id", async (req, res) => {
  try {
    const locatario = await locatarioController.buscarLocatarioPorId(
      req.params.id
    );
    if (!locatario) return res.status(404).send("Locatário não encontrado");
    res.json(locatario);
  } catch (err) {
    console.error("Erro ao buscar locatário:", err);
    res.status(500).send("Erro ao buscar locatário");
  }
});

//EMPRÉSTIMO ----------------------------------------------------------------
app.post("/cadastrarEmprestimo", async function (req, res) {
  try {
    const { id_locatario, id_livro } = req.body;

    const agora = new Date();

    const novo_emprestimo = new Emprestimo(id_locatario, id_livro, agora, null);

    await emprestimoController.processarEmprestimo(novo_emprestimo);

    res.status(201).send("Empréstimo cadastrado com sucesso.");
  } catch (error) {
    if (error.message === "livro indisponivel") {
      return res.status(400).send("Livro indisponível para empréstimo.");
    } else if (error.message.startsWith("emprestimo bloqueado:")) {
      const motivo = error.message.replace("emprestimo bloqueado: ", "");
      return res.status(400).json({ erro: "Empréstimo bloqueado", motivo });
    }

    console.error("Erro ao cadastrar empréstimo:", error);
    res.status(500).send("Erro ao cadastrar empréstimo.");
  }
});

app.post("/cadastrarDevolucao", async function (req, res) {
  try {
    const { id_locatario, id_livro } = req.body;
    const data_hora_devolucao = new Date();

    const devolucao = {
      id_locatario,
      id_livro,
      data_hora_devolucao,
    };

    await emprestimoController.processarDevolucao(devolucao);

    res.status(200).send("Devolução registrada com sucesso.");
  } catch (error) {
    if (error.message === "livro no banco") {
      return res.status(400).send("Livro já devolvido ou não emprestado.");
    }
    console.error("Erro ao registrar devolução:", error);
    res.status(500).send("Erro ao registrar devolução.");
  }
});

app.get("/emprestimos/:id_locatario", async (req, res) => {
  try {
    const id_locatario = req.params.id_locatario;
    const emprestimos = await emprestimoController.buscarEmprestimosPorUsuario(
      id_locatario
    );
    console.log("Emprestimos encontrados:", emprestimos);
    res.json(emprestimos);
  } catch (error) {
    console.error("Erro ao buscar empréstimos do usuário:", error);
    res.status(500).send("Erro ao buscar empréstimos do usuário.");
  }
});

app.get("/emprestimosAtuais/:id_locatario", async (req, res) => {
  try {
    const id_locatario = req.params.id_locatario;
    const emprestimos =
      await emprestimoController.buscarEmprestimosAtuaisPorUsuario(
        id_locatario
      );
    res.json(emprestimos);
  } catch (error) {
    console.error("Erro ao buscar empréstimos atuais do usuário:", error);
    res.status(500).send("Erro ao buscar empréstimos atuais do usuário.");
  }
});

app.get("/buscarLivroPorISBN/:isbn", async (req, res) => {
  try {
    const { isbn } = req.params;
    const livro = await livroController.buscarPorISBN(isbn);
    if (!livro) return res.status(404).send("Livro não encontrado.");
    res.json(livro);
  } catch (err) {
    res.status(500).send("Erro ao buscar livro.");
  }
});

app.get("/buscarLocatario/:id", async (req, res) => {
  console.log("Id recebido no endpoint buscarLocatario:", req.params.id);
  try {
    const { id } = req.params;
    const locatario = await locatarioController.buscarPorRaOuEmail(id);
    if (!locatario) return res.status(404).send("Locatário não encontrado.");
    res.json(locatario);
  } catch (err) {
    res.status(500).send("Erro ao buscar locatário.");
  }
});

app.post("/quitarMulta", async (req, res) => {
  try {
    const { id_locatario, id_livro } = req.body;
   
    const resultado = await emprestimoController.quitarMulta(id_locatario, id_livro);

    res.status(200).json({ mensagem: "Multa quitada com sucesso.", resultado });
  }catch (error){
    res.status(500).send("Erro ao buscar quitar multa.");
   }
})

//-------------------------------------------------------------------------

app.get("/", (req, res) => {
  res.send("OLAAAAAAAAAA TESTE");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}...`);
});
