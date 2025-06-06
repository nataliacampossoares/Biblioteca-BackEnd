class Locatario {
    constructor(id_curso, nome, data_de_nascimento, telefone) {
      this.id_curso = id_curso;
      this.nome = nome;
      this.data_de_nascimento = data_de_nascimento;
      this.telefone = telefone;
    }
  
    convertToArray() {
      return [this.id_curso, this.nome, this.data_de_nascimento, this.telefone];
    }
  }
  
  module.exports = Locatario;