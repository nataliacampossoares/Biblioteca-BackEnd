const { Pool } = require("../../config/database");
const path = require("path");

const listarLivros = async function () {
  try {
    const { rows } = await Pool.query(
      `SELECT l.*, a.nome_autor, c.nome_categoria
      FROM livros l
      LEFT JOIN livro_categoria lc ON l.id = lc.id_livro
      LEFT JOIN categorias c ON lc.id_categoria = c.id_categoria
      LEFT JOIN autor_livro al ON l.id = al.id_livro    
      LEFT JOIN autores a ON al.id_autor = a.id
      WHERE l.isAtivo = true`
    );
    return rows;
  } catch (error) {
    console.error("Erro na function listarLivros()", error);
    throw error;
  }
};

const desativarLivro = async function (id_livro) {
  const query = `
  UPDATE livros SET isAtivo = false WHERE id = $1
  `;
  try {
    await Pool.query(query, [id_livro]);
  } catch (error) {
    console.error("Erro na function desativarLivro()", error);
    throw error;
  }
};

const cadastrarLivro = async function (livro) {
  const query = `
    INSERT INTO livros (titulo, qtd_disponivel, edicao, caminho_imagens, sinopse, isbn, id_editora)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING id
  `;
  try {
    const result = await Pool.query(query, [
      livro.titulo,
      Number(livro.qtd_disponivel),
      livro.edicao,
      livro.caminho_imagens,
      livro.descricao,
      livro.isbn,
      livro.id_editora,
    ]);
    return result.rows[0].id;
  } catch (error) {
    console.error("Erro na function cadastrarLivro()", error);
    throw error;
  }
};

const atualizarLivro = async function (id_livro, livro, imagem) {
  const query = `
    UPDATE livros
    SET titulo = $1, 
        qtd_disponivel = $2,
        edicao = $3, 
        caminho_imagens = $4,
        sinopse = $5, 
        isbn = $6, 
        id_editora = $7
    WHERE id = $8
  `;
  const values = [
    livro.titulo,
    Number(livro.qtd_disponivel),
    livro.edicao,
    imagem,
    livro.descricao,
    livro.isbn,
    livro.id_editora,
    id_livro
  ];
  await Pool.query(query, values);
};

const removerCategoriasDoLivro = async function (id_livro) {
  const query = "DELETE FROM livro_categoria WHERE id_livro = $1";
  await Pool.query(query, [id_livro]);
};

const removerAutoresDoLivro = async function (id_livro) {
  const query = "DELETE FROM autor_livro WHERE id_livro = $1";
  await Pool.query(query, [id_livro]);
};

const salvarImagemLivro = async function (imagem, titulo) {
  try {
    const extensao = path.extname(imagem.name);
    const caminho = path.join(__dirname, "..", "..", "imagensLivro", `${titulo}.${extensao}`);

    await imagem.mv(caminho);

    const caminhoImagem = `/imagensLivro/${titulo}.${extensao}`;
    console.log("Imagem salva em:", caminhoImagem);

    return caminhoImagem;
  } catch (err) {
    console.error("Erro ao salvar imagem no DAO:", err);
    throw err;
  }
};

const cadastrarAutorEmLivro = async function (id_livro, id_autor) {
  const query = "INSERT INTO autor_livro(id_livro, id_autor) values ($1, $2)";
  let values = [id_livro, id_autor];
  try {
    await Pool.query(query, values);
    return;
  } catch (error) {
    console.error("Erro na function cadastrarAutorEmLivro", error);
    throw error;
  }
};

const cadastrarCategoriaEmLivro = async function (id_livro, id_categoria) {
  const query =
    "INSERT INTO livro_categoria(id_livro, id_categoria) values ($1, $2)";
  let values = [id_livro, id_categoria];
  try {
    await Pool.query(query, values);
    return;
  } catch (error) {
    console.error("Erro na function cadastrarCategoriaEmLivro", error);
    throw error;
  }
};

const buscarLivroPorId = async function(id_livro){
  const query =  `SELECT l.*, a.nome_autor, c.nome_categoria, e.nome_editora
  FROM livros l
  LEFT JOIN livro_categoria lc ON l.id = lc.id_livro
  LEFT JOIN categorias c ON lc.id_categoria = c.id_categoria
  LEFT JOIN autor_livro al ON l.id = al.id_livro    
  LEFT JOIN autores a ON al.id_autor = a.id
  LEFT JOIN editoras e ON l.id_editora = e.id
  WHERE l.id = $1 AND l.isAtivo = true`;
  const values = [id_livro];

  try {
    console.log("ID do livro recebido no DAO:", id_livro);
    const result = await Pool.query(query, values);
    if (result.rows.length === 0) {
      return; 
    }
    return result.rows[0];
  } catch (error) {
    console.error("Erro no DAO: buscarLivroPorId()", error);
    throw error;
  }
}

//PESQUISAS DO LIVRO ------------------------------------------------
const pesquisarPorTitulo = async function (titulo) {
  const query = "SELECT * FROM livros WHERE titulo ILIKE $1";
  const values = [`%${titulo}%`];
  const result = await Pool.query(query, values);
  return result.rows;
};

const pesquisarPorAutor = async function (autor) {
  const query = `
    SELECT l.*
    FROM livros l
    JOIN autor_livro al ON l.id = al.id_livro
    JOIN autores a ON al.id_autor = a.id
    WHERE a.nome_autor ILIKE $1
  `;
  const values = [`%${autor}%`];
  const result = await Pool.query(query, values);
  return result.rows;
};

const pesquisarPorCategoria = async function (categoria) {
  const query = `
    SELECT l.*
    FROM livros l
    JOIN livro_categoria lc ON l.id = lc.id_livro
    JOIN categorias c ON lc.id_categoria = c.id_categoria
    WHERE c.nome_categoria ILIKE $1
  `;
  const values = [`%${categoria}%`];
  const result = await Pool.query(query, values);
  return result.rows;
};

const pesquisarPorEditora = async function (editora) {
  const query = `
    SELECT l.*
    FROM livros l
    JOIN editoras e ON l.id_editora = e.id
    WHERE e.nome_editora ILIKE $1
  `;
  const values = [`%${editora}%`];
  const result = await Pool.query(query, values);
  return result.rows;
};

const buscarLivroPorISBN = async function (isbn) {
  const query = `
    SELECT *
    FROM livros
    WHERE isbn = $1
  `;
  const values = [isbn];

  try {
    const result = await Pool.query(query, values);
    if (result.rows.length === 0) {
      return; 
    }
    return result.rows[0];
  } catch (error) {
    console.error("Erro no DAO: buscarLivroPorISBN()", error);
    throw error;
  }
};    

module.exports = {
  cadastrarLivro,
  listarLivros,
  desativarLivro,
  atualizarLivro,
  cadastrarAutorEmLivro,
  cadastrarCategoriaEmLivro,
  pesquisarPorTitulo,
  pesquisarPorAutor,
  pesquisarPorCategoria,
  pesquisarPorEditora,
  salvarImagemLivro,
  removerAutoresDoLivro,
  removerCategoriasDoLivro,
  buscarLivroPorId,
  buscarLivroPorISBN
};
