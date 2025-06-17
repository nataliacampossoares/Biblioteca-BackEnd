const { Pool } = require("../../config/database");

const cadastrarEmprestimo = async function (emprestimo) {
  const atributosEmprestimo = emprestimo.convertToArray();
  const query =
    "INSERT INTO emprestimos(id_locatario, id_livro, data_hora_emprestimo, data_hora_devolucao) VALUES ($1, $2, NOW(), $3)";
  try {
    await Pool.query(query, atributosEmprestimo);
    return;
  } catch (error) {
    console.error("Erro na function cadastrarEmprestimo()", error);
    throw error;
  }
};

const atualizarQuantidadeLivro = async function (id_livro) {
  const query = `
        UPDATE livros
        SET qtd_disponivel = qtd_disponivel - 1
        WHERE id = $1 AND qtd_disponivel > 0
    `;

  try {
    const result = await Pool.query(query, [id_livro]);
    if (result.rowCount === 0) {
      throw new Error("livro indisponivel");
    }
  } catch (error) {
    console.error("Erro ao atualizar quantidade do livro:", error);
    throw error;
  }
};

module.exports = { cadastrarEmprestimo, atualizarQuantidadeLivro };
