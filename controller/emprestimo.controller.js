const emprestimoDAO = require("../model/emprestimoModel/emprestimo.dao");
const emprestimoRN = require("../model/emprestimoModel/emprestimo.rn")
const locatarioDAO = require("../model/locatarioModel/locatario.dao")

const cadastrarEmprestimo = async function (emprestimo) {
  return await emprestimoDAO.cadastrarEmprestimo(emprestimo);
};

const atualizarQuantidadeLivro = async function (id_livro, id_locatario) {
  const valido = await emprestimoRN.verificarQuantidadeLivrosLocatario(id_locatario);
  if (!valido) {
    console.log("Quantidade máxima já emprestada")
    return
  }
  await locatarioDAO.atualizarQuantidadeLivroLocatario(id_locatario);
  await emprestimoDAO.atualizarQuantidadeLivro(id_livro);
  return
};

const registrarDevolucao = async function (id_locatario, id_livro) {
  return await emprestimoDAO.registrarDevolucao(id_locatario, id_livro);
};

const atualizarQuantidadeLivroDevolucao = async function (id_livro) {
  return await emprestimoDAO.atualizarQuantidadeLivroDevolucao(id_livro);
};

const buscarEmprestimosPorUsuario = async function (id_locatario) {
  return await emprestimoDAO.buscarEmprestimosPorUsuario(id_locatario);
};

module.exports = {
  cadastrarEmprestimo,
  atualizarQuantidadeLivro,
  registrarDevolucao,
  atualizarQuantidadeLivroDevolucao,
  buscarEmprestimosPorUsuario
};
