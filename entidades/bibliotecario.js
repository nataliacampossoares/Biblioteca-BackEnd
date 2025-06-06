class Bibliotecario {
    constructor(login, senha) {
        this.login = login;
        this.senha = senha;
    }

    convertToArray(){
        return [this.login, this.senha];
    }  
}

module.exports = Bibliotecario;