class Livro {
    constructor(id_editora, titulo, qtd_disponivel, edicao, caminho, descricao, isbn) {
        this.id_editora = id_editora
        this.titulo = titulo;
        this.qtd_disponivel = qtd_disponivel;
        this.edicao = edicao;
        this.caminho = caminho;
        this.descricao = descricao;
        this.isbn = isbn;
    }

    convertToArray(){
        return [this.id_editora, this.titulo, this.qtd_disponivel, this.edicao, this.caminho, this.descricao, this.isbn];
    }

}

module.exports = Livro;