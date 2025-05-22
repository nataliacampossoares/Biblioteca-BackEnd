class Livro {
    constructor(titulo, qtde, edicao, caminho, descricao, isbn) {
        this.titulo = titulo;
        this.qtde = qtde;
        this.edicao = edicao;
        this.caminho = caminho;
        this.descricao = descricao;
        this.isbn = isbn;
    }

    convertToArray(){
        return [this.titulo, this.qtde, this.edicao, this.caminho, this.descricao, this.isbn];
    }

    
    
}

module.exports = Livro;