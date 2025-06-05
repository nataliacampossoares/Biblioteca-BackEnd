const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
app.use(express.json())
app.use(cors())


const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const livroController = require('./controller/livro.controller');
const livro = require('./entidades/livro');
const Livro = require('./entidades/livro');

const autorController = require('./controller/autor.controller');
const autor = require('./entidades/autor');
const Autor = require('./entidades/autor');

const cursoController = require('./controller/curso.controller');
const curso = require('./entidades/curso');
const Curso = require('./entidades/curso');

const editoraController = require('./controller/editora.controller');
const editora = require('./entidades/editora');
const Editora = require('./entidades/editora');

const categoriaController = require('./controller/categoria.controller');
const categoria = require('./entidades/categoria');
const Categoria = require('./entidades/categoria');



//Configuração do Handlebars
//Informa ao express qual template engine será usado
app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('views', './views');

//Configuração do body-parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 

app.get('/listarLivros', function(req, res){
    const resultado = livroController.listarLivros();
    resultado.then(resp => {res.render('listagemLivros', {resp})});
  });

app.get('/listarAutores', function(req, res){
  const resultado = autorController.listarAutores();
    
  resultado.then(resp => {return res.send(resp)});
  });

app.get('/cadastrarAutor', function(req, res){
  //colocar pra retornar a pagina de cadastro
  return true
})

app.post('/cadastrarAutor', async function(req, res) {
  try {
    const novo_autor = new Autor(req.body.nome_autor);

    await autorController.cadastrarAutor(novo_autor);

    res.status(201).send("Autor cadastrado com sucesso.");
  } catch (error) {
    console.error("Erro ao cadastrar autor:", error);
    res.status(500).send("Erro ao cadastrar autor.");
  }
});

app.get('/removerAutor/:id', async function(req, res) {
  try {
    await autorController.removerAutor(req.params.id);
    res.status(200).send("Autor removido com sucesso.");
  } catch (error) {
    console.error("Erro ao remover autor:", error);
    res.status(500).send("Erro ao remover autor.");
  }
});

app.get('/alterarAutor/:id', function(req, res) {
  //nao sei oq vai ter aqui
})

app.post('/alterarAutor/:id', async function(req, res) {
  const edicao_autor = {
    id: req.params.id,
    nome: req.body.nome_autor
  };

  try {
    await autorController.atualizarAutor(edicao_autor);
    res.status(200).send("Autor atualizado com sucesso.");
  } catch (error) {
    console.error("Erro ao atualizar autor:", error);
    res.status(500).send("Erro ao atualizar autor.");
  }
});



  app.get('/listarCursos', function(req, res){
    const resultado = cursoController.listarCursos();
    resultado.then(resp => {return res.send(resp)});
  });

  app.get('/cadastrarCurso', function(req, res){
    res.render('formularioCursos')
  })

  app.post('/cadastrarCurso', async function(req, res){
    try {
      const novo_curso = new Curso(req.body.nome);
  
      await cursoController.cadastrarCurso(novo_curso);
  
      res.status(201).send("Curso cadastrado com sucesso.");
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
      res.status(500).send("Erro ao cadastrar curso.");
    }
  });

  app.get('/listarEditoras', function(req, res){
    const resultado = editoraController.listarEditoras();
    resultado.then(resp => {return res.send(resp)});
  });

  app.get('/cadastrarEditora', function(req, res){
    res.render('formularioEditoras')
  })

  app.post('/cadastrarEditora', async function(req, res){
    try {
      const nova_editora = new Editora(req.body.nome_autor);
  
      await editoraController.cadastrarEditora(nova_editora);
  
      res.status(201).send("Editora cadastrada com sucesso.");
    } catch (error) {
      console.error("Erro ao cadastrar editora:", error);
      res.status(500).send("Erro ao cadastrar editora.");
    }
  });


  app.get('/listarCategorias', function(req, res){
    const resultado = categoriaController.listarCategorias();
    resultado.then(resp => {res.render('listagemLivros', {resp})});
  });

  app.get('/cadastrarCategoria', function(req, res){
    res.render('formularioCategorias')
  })

  app.post('/cadastrarCategoria', async function(req, res){
    try {
      let idPai = req.body.id_categoria_pai;
      if (!idPai || idPai === '') {
        idPai = null;
      } else {
        idPai = parseInt(idPai);
      }
  
        const nova_categoria = new Categoria(req.body.nome, idPai);
    
        await categoriaController.cadastrarCategoria(nova_categoria);
    
        res.status(201).send("Categoria cadastrada com sucesso.");
      } catch (error) {
        console.error("Erro ao cadastrar categoria:", error);
        res.status(500).send("Erro ao cadastrar categoria.");
      }
    }
  );

app.get('/', (req, res)=>{
    res.send("OLAAAAAAAAAA TESTE")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`)
})