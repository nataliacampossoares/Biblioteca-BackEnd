const emprestimoDAO = require("../model/emprestimoModel/emprestimo.dao")

const cadastrarEmprestimo = async function(emprestimo){
    return await emprestimoDAO.cadastrarEmprestimo(emprestimo)
}

module.exports = {cadastrarEmprestimo}