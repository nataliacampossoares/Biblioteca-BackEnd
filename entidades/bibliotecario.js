class Bibliotecario {
    constructor(email, senha, imagem) {
        this.email = email;
        this.senha = senha;
        this.imagem = imagem
    }

    convertToArray(){
        return [this.senha, this.imagem, this.email];
    }  
}

module.exports = Bibliotecario;