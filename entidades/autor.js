class Autor {
    constructor(nome) {
        this.nome = nome;
    }

    convertToArray(){
        return [this.nome];
    }  
}

module.exports = Autor;