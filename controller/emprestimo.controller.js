const emprestimoDAO = require("../model/emprestimoModel/emprestimo.dao");

const cadastrarEmprestimo = async function (emprestimo) {
  return await emprestimoDAO.cadastrarEmprestimo(emprestimo);
};

const atualizarQuantidadeLivro = async function (id_livro) {
  return await emprestimoDAO.atualizarQuantidadeLivro(id_livro);
};

const registrarDevolucao = async function (id_locatario, id_livro) {
  return await emprestimoDAO.registrarDevolucao(id_locatario, id_livro);
};

const atualizarQuantidadeLivroDevolucao = async function (id_livro) {
  return await emprestimoDAO.atualizarQuantidadeLivroDevolucao(id_livro);
};

module.exports = { cadastrarEmprestimo, atualizarQuantidadeLivro, registrarDevolucao, atualizarQuantidadeLivroDevolucao };
