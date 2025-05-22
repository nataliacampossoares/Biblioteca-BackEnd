class Curso {
    constructor(nome) {
        this.nome = nome;
    }

    convertToArray(){
        return [this.nome];
    }  
}

module.exports = Curso;