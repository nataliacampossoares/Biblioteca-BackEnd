class Categoria {
    constructor(nome_categoria, id_pai = null) {
        this.nome_categoria = nome_categoria;
        this.id_pai = id_pai;
    }

    convertToArray(){
        return [this.nome_categoria, this.id_pai];
    }  
}

module.exports = Categoria;