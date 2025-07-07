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

const emprestimoAtrasado = async function (id_locatario, id_livro) {
  const query = `
    UPDATE emprestimos
    SET status = true
    WHERE id_locatario = $1 AND id_livro = $2 AND data_hora_devolucao IS NULL
  `;

  try {
    await Pool.query(query, [id_locatario, id_livro]);
  } catch (error) {
    console.error("Erro ao marcar empréstimo como atrasado:", error);
    throw error;
  }
};

const quitarMulta = async function (id_locatario, id_livro) {
  const query = `
  UPDATE emprestimos
  SET status = false
  WHERE id_locatario = $1 AND id_livro = $2 AND status = true
  RETURNING *;
`;

  try {
    const result = await Pool.query(query, [id_locatario, id_livro]);
    console.log("Resultado da quitação de multa:", result.rows);
    console.log("IDS", id_locatario, id_livro);
    return result.rows[0];
  } catch (error) {
    console.error("Erro ao quitar multa", error);
    throw error;
  }
};

const registrarDevolucao = async function (emprestimo) {
  const query = `
      UPDATE emprestimos
      SET data_hora_devolucao = NOW()
      WHERE id_locatario = $1 AND id_livro = $2 AND data_hora_devolucao IS NULL
    `;

  try {
    const result = await Pool.query(query, [
      emprestimo.id_locatario,
      emprestimo.id_livro,
    ]);
    if (result.rowCount === 0) {
      throw new Error("livro no banco");
    }
  } catch (error) {
    console.error("Erro ao registrar devolução:", error);
    throw error;
  }
};

const atualizarQuantidadeLivroDevolucao = async function (id_livro) {
  const query = `
      UPDATE livros
      SET qtd_disponivel = qtd_disponivel + 1
      WHERE id = $1
    `;

  try {
    await Pool.query(query, [id_livro]);
  } catch (error) {
    console.error("Erro ao atualizar quantidade na devolução:", error);
    throw error;
  }
};

const buscarEmprestimosPorUsuario = async function (id_locatario) {
  const query = `
      SELECT 
        e.id_locatario,
        e.id_livro,
        e.data_hora_emprestimo,
        e.data_hora_devolucao,
        l.titulo
    FROM emprestimos e
    JOIN livros l ON e.id_livro = l.id
    WHERE e.id_locatario = $1;
    `;

  try {
    const result = await Pool.query(query, [id_locatario]);
    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar empréstimos por usuário:", error);
    throw error;
  }
};

const buscarEmprestimosAtuaisPorUsuario = async function (id_locatario) {
  const query = `
      SELECT 
        e.id_locatario,
        e.id_livro,
        e.data_hora_emprestimo,
        l.titulo        
        FROM emprestimos e
        JOIN livros l ON e.id_livro = l.id
        WHERE e.id_locatario = $1 AND e.data_hora_devolucao IS NULL;
    `;

  try {
    const result = await Pool.query(query, [id_locatario]);
    return result.rows;
  } catch (error) {
    console.error("Erro ao buscar empréstimos por usuário:", error);
    throw error;
  }
};

module.exports = {
  cadastrarEmprestimo,
  atualizarQuantidadeLivro,
  registrarDevolucao,
  atualizarQuantidadeLivroDevolucao,
  buscarEmprestimosPorUsuario,
  buscarEmprestimosAtuaisPorUsuario,
  emprestimoAtrasado,
  quitarMulta
};
