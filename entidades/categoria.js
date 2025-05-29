class Categoria {
    constructor(categoria, id_categoria_pai = null) {
        this.categoria = categoria;
        this.id_categoria_pai = id_categoria_pai;
    }

    convertToArray(){
        return [this.categoria, this.id_categoria_pai];
    }  
}

module.exports = Categoria;