const emprestimoDAO = require("../model/emprestimoModel/emprestimo.dao");
const emprestimoRN = require("../model/emprestimoModel/emprestimo.rn");
const locatarioDAO = require("../model/locatarioModel/locatario.dao");
const livroDAO = require("../model/livroModel/livro.dao")
const email = require("../config/email")

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

const registrarDevolucao = async function (emprestimo) {
  return await emprestimoDAO.registrarDevolucao(emprestimo);
};

const atualizarQuantidadeLivroDevolucao = async function (id_livro) {
  return await emprestimoDAO.atualizarQuantidadeLivroDevolucao(id_livro);
};

const processarEmprestimo = async function (emprestimo) {
  console.log("ID do livro no empréstimo:", emprestimo.id_livro);
  await cadastrarEmprestimo(emprestimo);
  await atualizarQuantidadeLivro(emprestimo.id_livro, emprestimo.id_locatario);
  
  const locatario = await locatarioDAO.buscarLocatarioPorId(emprestimo.id_locatario);
  const livro = await livroDAO.buscarLivroPorId(emprestimo.id_livro)
  console.log("Livro encontrado:", livro);
  if (locatario && locatario.email) {
    email(
      locatario.email,
      "Empréstimo de Livro",
      `Olá ${locatario.nome}, seu empréstimo do livro "${livro.titulo}" foi registrado com sucesso em ${emprestimo.data_hora_emprestimo}.`
    );
  }
};

const processarDevolucao = async function (devolucao) {
  await registrarDevolucao(devolucao);
  await atualizarQuantidadeLivroDevolucao(devolucao.id_livro);

  const locatario = await locatarioDAO.buscarLocatarioPorId(devolucao.id_locatario);
  const livro = await livroDAO.buscarLivroPorId(devolucao.id_livro)

  if (locatario && locatario.email) {
    email(
      locatario.email,
      "Devolução de Livro",
      `Olá ${locatario.nome}, sua devolução do livro "${livro.titulo}" foi registrada com sucesso em ${devolucao.data_hora_devolucao}.`
    );
  }
}

const buscarEmprestimosPorUsuario = async function (id_locatario) {
  return await emprestimoDAO.buscarEmprestimosPorUsuario(id_locatario);
};

module.exports = {
  cadastrarEmprestimo,
  atualizarQuantidadeLivro,
  registrarDevolucao,
  atualizarQuantidadeLivroDevolucao,
  buscarEmprestimosPorUsuario,
  processarEmprestimo,
  processarDevolucao
};
