const express = require('express')
const app = express()
const port = 8000


const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const livroController = require('./controller/livro.controller');
const livro = require('./entidades/livro');
const Livro = require('./entidades/livro');

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

app.get('/', (req, res)=>{
    res.send("OLAAAAAAAAAA TESTE")
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}...`)
})