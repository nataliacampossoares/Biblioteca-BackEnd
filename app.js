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
    
    resultado.then(resp => {
      return res.send(resp)

    });
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

  app.get('/cadastrarEditora', function(req, res){
    res.render('formularioEditoras')
  })

  app.post('/cadastrarEditora', async function(req, res){
    try {
      const nova_editora = new Editora(req.body.nome); 
      await editoraController.cadastrarEditora(nova_editora);
      res.render('formularioEditoras', { editora: nova_editora });
    } catch (error) {
      console.error("Erro ao cadastrar editora:", error);
      res.status(500).send("Erro ao cadastrar editora.");
    }
  });


  app.get('/listarCategorias', function(req, res){
    const resultado = categoriaController.listarCategorias();
    resultado.then(resp => {res.render('listagemCategorias', {resp})});
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
      res.render('formularioCategorias', { categoria: nova_categoria }); // <-- ajuste a variável também
    } catch (error) {
      console.error("Erro ao cadastrar categoria:", error);
      res.status(500).send("Erro ao cadastrar categoria.");
    }
  });

app.get('/', (req, res)=>{
    res.send("OLAAAAAAAAAA TESTE")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`)
})