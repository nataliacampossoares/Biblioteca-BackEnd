const { Pool } = require("../../config/database");

const cadastrarLocatario = async function (locatario) {
  const query = `
    INSERT INTO locatarios (id_curso, nome, data_de_nascimento, telefone, email)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id
  `;

  const queryBibliotecario = `
    INSERT INTO locatarios (nome, data_de_nascimento, telefone, email)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `;
  console.log("id_curso recebido:", locatario.id_curso);
  try {
    if (locatario.id_curso) {
      const result = await Pool.query(query, locatario.convertToArray());
      return result.rows[0].id;
    } else {
      console.log("ola estamos no dao p cadastrar bibliotecario")
      const result = await Pool.query(queryBibliotecario, [
        locatario.nome,
        locatario.data_de_nascimento,
        locatario.telefone,
        locatario.email,
      ]);
      return result.rows[0].id;
    }
  } catch (error) {
    console.error("Erro no DAO: cadastrarLocatario()", error);
    throw error;
  }
};

const listarLocatarios = async function () {
  const query = `SELECT * FROM locatarios`;
  try {
    const result = await Pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Erro no DAO: listarLocatarios()", error);
    throw error;
  }
};

const desativarLocatario = async function (id) {
  try {
    const query = `UPDATE locatarios SET isAtivo = false WHERE id = $1`;
    const values = [id];

    const { rows } = await Pool.query(query, values);

    return rows[0];
  } catch (error) {
    console.error("Erro na function desativarLocatario()", error);
    throw error;
  }
};

const atualizarLocatario = async function (locatario) {
  try {
    const query = `
      UPDATE locatarios
      SET id_curso = $1,
      nome = $2,
      data_de_nascimento = $3,
      telefone = $4,
      email = $5
      WHERE id = $6
      RETURNING *;
    `;
    const values = [
      locatario.id_curso,
      locatario.nome,
      locatario.data_de_nascimento,
      locatario.telefone,
      locatario.email,
      locatario.id,
    ];

    const result = await Pool.query(query, values);
    return result.rows[0].id;
  } catch (error) {
    console.error("Erro na function atualizarLocatario()", error);
    throw error;
  }
};

const buscarLocatarioPorId = async function (id) {
  const query = `SELECT * FROM locatarios WHERE id = $1`;
  const values = [id];

  try {
    const result = await Pool.query(query, values);
    if (result.rows.length === 0) {
      return; 
    }
    return result.rows[0];
  } catch (error) {
    console.error("Erro no DAO: buscarPorId()", error);
    throw error;
  }
};


const buscarBibliotecarioPorEmail = async function (email) {
  const query = `SELECT * FROM locatarios WHERE email = $1`;
  const values = [email];

  try {
    const result = await Pool.query(query, values);
    if (result.rows.length === 0) {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.error("Erro no DAO: buscarBibliotecarioPorEmail()", error);
    throw error;
  }
};

const buscarBibliotecarioLogin = async function (email) {
  const query = `
    SELECT b.id_locatario, b.senha, b.imagem, l.email
    FROM bibliotecarios b
    JOIN locatarios l ON b.id_locatario = l.id
    WHERE l.email = $1
  `;
  try {
    const result = await Pool.query(query, [email]);
    return result.rows[0] || null; 
  } catch (error) {
    console.error("Erro no DAO: buscarBibliotecarioPorEmail()", error);
    throw error;
  }
};

const atualizarQuantidadeLivroLocatario = async function (id_locatario) {
  const query = `
    UPDATE locatarios
    SET qtde_livros = qtde_livros + 1
    WHERE id = $1
  `;

  try {
    await Pool.query(query, [id_locatario]);
  } catch (error) {
    console.log("Erro ao atualizar quantidade de livros do locatário: ", error);
  }
};

const atualizarQuantidadeLivroLocatarioDevolucao = async function (
  id_locatario
) {
  const query = `
    UPDATE locatarios
    SET qtde_livros = qtde_livros - 1
    WHERE id = $1
  `;

  try {
    await Pool.query(query, [id_locatario]);
  } catch (error) {
    console.log("Erro ao atualizar quantidade de livros do locatário: ", error);
  }
};

const verificarQuantidadeLivrosLocatario = async function (id_locatario) {
  const query = `SELECT qtde_livros FROM locatarios WHERE id = $1`;

  try {
    const result = await Pool.query(query, [id_locatario]);
    return result.rows[0].id;
  } catch (error) {
    console.log(
      "Erro na funcçaõ verificarQuantidadeLivrosLocatario no locatario.dao"
    );
  }
};

module.exports = {
  cadastrarLocatario,
  listarLocatarios,
  desativarLocatario,
  atualizarLocatario,
  buscarBibliotecarioPorEmail,
  atualizarQuantidadeLivroLocatario,
  atualizarQuantidadeLivroLocatarioDevolucao,
  verificarQuantidadeLivrosLocatario,
  buscarLocatarioPorId,
  buscarBibliotecarioLogin
};
