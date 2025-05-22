const express = require('express')
const app = express()
const port = 3000


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
    resultado.then(resp => {res.render('listagemAutores', {resp})});
  });

  app.get('/listarCursos', function(req, res){
    const resultado = cursoController.listarCursos();
    resultado.then(resp => {res.render('listagemCursos', {resp})});
  });

  app.get('/cadastrarCurso', function(req, res){
    res.render('formularioCursos')
  })

  app.post('/cadastrarCurso', async function(req, res){
    try {
      const novo_curso = new Curso(req.body.nome); 
      await cursoController.cadastrarCurso(novo_curso);
      res.render('formularioCursos', { curso: novo_curso });
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
      res.status(500).send("Erro ao cadastrar curso.");
    }
  });

  app.get('/listarEditoras', function(req, res){
    const resultado = editoraController.listarEditoras();
    resultado.then(resp => {res.render('listagemEditoras', {resp})});
  });

app.get('/', (req, res)=>{
    res.send("OLAAAAAAAAAA TESTE")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`)
})