class Locatario {
    constructor(id_curso, nome, data_de_nascimento, telefone, email, qtde_livros) {
      this.id_curso = id_curso;
      this.nome = nome;
      this.data_de_nascimento = data_de_nascimento;
      this.telefone = telefone;
      this.email = email;
      this.qtde_livros = qtde_livros
    }
  
    convertToArray() {
      return [this.id_curso, this.nome, this.data_de_nascimento, this.telefone, this.email];
    }
  }
  
  module.exports = Locatario;