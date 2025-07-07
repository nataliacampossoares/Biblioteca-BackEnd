const emprestimoDAO = require("../model/emprestimoModel/emprestimo.dao");
const emprestimoRN = require("../model/emprestimoModel/emprestimo.rn");
const locatarioDAO = require("../model/locatarioModel/locatario.dao");
const locatarioRN = require("../model/locatarioModel/locatario.rn");
const livroDAO = require("../model/livroModel/livro.dao");
const email = require("../config/email");

const cadastrarEmprestimo = async function (emprestimo) {
  return await emprestimoDAO.cadastrarEmprestimo(emprestimo);
};

const atualizarQuantidadeLivro = async function (id_livro, id_locatario) {
  const valido = await emprestimoRN.verificarQuantidadeLivrosLocatario(
    id_locatario
  );
  if (!valido) {
    console.log("Quantidade máxima já emprestada");
    return;
  }
  await locatarioDAO.atualizarQuantidadeLivroLocatario(id_locatario);
  await emprestimoDAO.atualizarQuantidadeLivro(id_livro);
  return;
};

const registrarDevolucao = async function (emprestimo) {
  return await emprestimoDAO.registrarDevolucao(emprestimo);
};

const atualizarQuantidadeLivroDevolucao = async function (id_livro) {
  return await emprestimoDAO.atualizarQuantidadeLivroDevolucao(id_livro);
};

const processarEmprestimo = async function (emprestimo) {
  const resultado = await emprestimoRN.podeFazerEmprestimo(
    emprestimo.id_locatario
  );

  if (!resultado.permitido) {
    console.log("Empréstimo bloqueado:", resultado.motivo);
    throw new Error(`emprestimo bloqueado: ${resultado.motivo}`);
  }

  console.log("ID do livro no empréstimo:", emprestimo.id_livro);
  await cadastrarEmprestimo(emprestimo);
  await atualizarQuantidadeLivro(emprestimo.id_livro, emprestimo.id_locatario);

  const locatario = await locatarioDAO.buscarLocatarioPorId(
    emprestimo.id_locatario
  );
  const livro = await livroDAO.buscarLivroPorId(emprestimo.id_livro);
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

  const locatario = await locatarioDAO.buscarLocatarioPorId(
    devolucao.id_locatario
  );
  const livro = await livroDAO.buscarLivroPorId(devolucao.id_livro);

  if (locatario && locatario.email) {
    email(
      locatario.email,
      "Devolução de Livro",
      `Olá ${locatario.nome}, sua devolução do livro "${livro.titulo}" foi registrada com sucesso em ${devolucao.data_hora_devolucao}.`
    );
  }
};

const buscarEmprestimosPorUsuario = async function (id_locatario) {
  const emprestimos = await emprestimoDAO.buscarEmprestimosPorUsuario(
    id_locatario
  );
  console.log("Emprestimos encontradosSSOSSOSOSO:", emprestimos);
  const locatario = await locatarioDAO.buscarLocatarioPorId(id_locatario);
  const cargo = locatario.cargo;

  return emprestimos.map((e) =>
    emprestimoRN.verificarSituacaoEmprestimo(e, cargo)
  );
};

const buscarEmprestimosAtuaisPorUsuario = async function (id_locatario) {
  const emprestimos = await emprestimoDAO.buscarEmprestimosAtuaisPorUsuario(
    id_locatario
  );
  const locatario = await locatarioDAO.buscarLocatarioPorId(id_locatario);
  const cargo = locatario.cargo;

  return emprestimos.map((e) => {
    const situacao = emprestimoRN.verificarSituacaoEmprestimo(e, cargo);
    return situacao;
  });
};

module.exports = {
  cadastrarEmprestimo,
  atualizarQuantidadeLivro,
  registrarDevolucao,
  atualizarQuantidadeLivroDevolucao,
  buscarEmprestimosPorUsuario,
  processarEmprestimo,
  processarDevolucao,
  buscarEmprestimosAtuaisPorUsuario,
};
