class Livro {
    constructor(id_editora, titulo, qtde, edicao, caminho, descricao, isbn) {
        this.id_editora = id_editora
        this.titulo = titulo;
        this.qtde = qtde;
        this.edicao = edicao;
        this.caminho = caminho;
        this.descricao = descricao;
        this.isbn = isbn;
    }

    convertToArray(){
        return [this.id_editora, this.titulo, this.qtde, this.edicao, this.caminho, this.descricao, this.isbn];
    }

}

module.exports = Livro;