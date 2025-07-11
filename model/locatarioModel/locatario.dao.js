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
      console.log("ola estamos no dao p cadastrar bibliotecario");
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
  const query = `SELECT * FROM locatarios WHERE isAtivo = true`;
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
  const queryLocatario = `
    UPDATE locatarios
    SET id_curso = $1,
    nome = $2,
    data_de_nascimento = $3,
    telefone = $4,
    email = $5
    WHERE id = $6
    RETURNING *;
  `;

  const queryVerificaAluno = `
  SELECT 1 FROM alunos WHERE id_locatario = $1;
`;

  const queryVerificaProfessor = `
SELECT 1 FROM professores WHERE id_locatario = $1;
`;

  const queryAtualizaRaAluno = `
    UPDATE alunos SET ra = $1 WHERE id_locatario = $2;
  `;

  const queryAtualizaRaProfessor = `
  UPDATE professores SET ra = $1 WHERE id_locatario = $2;
`;
  try {
    const values = [
      locatario.id_curso,
      locatario.nome,
      locatario.data_de_nascimento,
      locatario.telefone,
      locatario.email,
      locatario.id,
    ];

    await Pool.query(queryLocatario, values);

    const resultAluno = await Pool.query(queryVerificaAluno, [locatario.id]);
    if (resultAluno.rowCount > 0) {
      await Pool.query(queryAtualizaRaAluno, [locatario.ra, locatario.id]);
    }

    const resultProfessor = await Pool.query(queryVerificaProfessor, [
      locatario.id,
    ]);
    if (resultProfessor.rowCount > 0) {
      await Pool.query(queryAtualizaRaProfessor, [locatario.ra, locatario.id]);
    }

    return;
  } catch (error) {
    console.error("Erro na function atualizarLocatario()", error);
    throw error;
  }
};

const buscarLocatarioPorId = async function (id) {
  const query = `SELECT 
  l.id,
  l.nome,
  l.email,
  l.telefone,
  l.data_de_nascimento,
  l.id_curso,
  c.nome_curso AS curso,
  CASE 
    WHEN a.id_locatario IS NOT NULL THEN 'Aluno'
    WHEN p.id_locatario IS NOT NULL THEN 'Professor'
    WHEN b.id_locatario IS NOT NULL THEN 'Bibliotecário'
  END AS cargo,
  COALESCE(a.ra, p.ra) AS ra
FROM locatarios l
LEFT JOIN cursos c ON l.id_curso = c.id
LEFT JOIN alunos a ON a.id_locatario = l.id
LEFT JOIN professores p ON p.id_locatario = l.id
LEFT JOIN bibliotecarios b ON b.id_locatario = l.id
WHERE l.id = $1
`;
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
     SELECT b.id_locatario, b.senha, b.imagem, l.nome, l.email
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

const listarLocatariosComTipoEcurso = async function () {
  const query = `
   SELECT 
  l.id,
  l.nome, 
  c.nome_curso AS curso,
  CASE 
    WHEN p.id_locatario IS NOT NULL THEN 'Professor'
    WHEN a.id_locatario IS NOT NULL THEN 'Aluno'
    WHEN b.id_locatario IS NOT NULL THEN 'Bibliotecário'
    ELSE 'Locatário'
  END AS cargo
FROM locatarios l
LEFT JOIN professores p ON p.id_locatario = l.id
LEFT JOIN alunos a ON a.id_locatario = l.id
LEFT JOIN bibliotecarios b ON b.id_locatario = l.id
LEFT JOIN cursos c ON l.id_curso = c.id
WHERE l.isAtivo = true;
  `;

  try {
    const result = await Pool.query(query);
    return result.rows;
  } catch (error) {
    console.error("Erro no DAO: listarLocatariosComTipoEcurso()", error);
    throw error;
  }
};

const buscarPorRaOuEmail = async (identificador) => {
  console.log('buscar emaisl dao')
  const query = `
   SELECT l.id
FROM locatarios l
WHERE l.email = $1

UNION

SELECT a.id_locatario
FROM alunos a
WHERE a.ra = $1

UNION

SELECT p.id_locatario
FROM professores p
WHERE p.ra = $1
LIMIT 1;

  `;
  const values = [identificador];
  const result = await Pool.query(query, values);
  console.log("OIOIOIOIOIOIOIO")
  console.log("Resultado da busca por RA ou email:", result.rows);
  return result.rows[0];
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
  buscarBibliotecarioLogin,
  listarLocatariosComTipoEcurso,
  buscarPorRaOuEmail
};
