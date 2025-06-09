class Locatario {
    constructor(id_curso, nome, data_de_nascimento, telefone, email) {
      this.id_curso = id_curso;
      this.nome = nome;
      this.data_de_nascimento = data_de_nascimento;
      this.telefone = telefone;
      this.email = email;
    }
  
    convertToArray() {
      return [this.id_curso, this.nome, this.data_de_nascimento, this.telefone, this.email];
    }
  }
  
  module.exports = Locatario;