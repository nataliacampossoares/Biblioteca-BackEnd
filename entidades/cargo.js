class Cargo {
    constructor(descricao, qtd_livros) {
        this.descricao = descricao;
        this.qtd_livros = qtd_livros;
    }

    convertToArray(){
        return [this.descricao, this.qtd_livros];
    }  
}

module.exports = Cargo;