const emprestimoDAO = require("../model/emprestimoModel/emprestimo.dao")

const cadastrarEmprestimo = async function(emprestimo){
    return await emprestimoDAO.cadastrarEmprestimo(emprestimo)
}

const atualizarQuantidadeLivro = async function(id_livro){
    return await emprestimoDAO.atualizarQuantidadeLivro(id_livro)
}

module.exports = {cadastrarEmprestimo, atualizarQuantidadeLivro}