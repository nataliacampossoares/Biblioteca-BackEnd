class Emprestimo {
    constructor (id_locatario, id_livro, data_hora_emprestimo, data_hora_devolucao, status) {
        this.id_locatario = id_locatario;
        this.id_livro = id_livro;
        this.data_hora_emprestimo = data_hora_emprestimo;
        this.data_hora_devolucao = data_hora_devolucao;
        this.status = status
    }

    convertToArray(){
        return [this.id_locatario, this.id_livro, this.data_hora_emprestimo, this.data_hora_devolucao];
    }
}

module.exports = Emprestimo