-- DROP DAS TABELAS COM CASCADE
DROP TABLE IF EXISTS
    autor_livro,
    livro_categoria,
	categorias,
    editora_livro,
    emprestimos,
    dividas,
    alunos,
    professores,
    bibliotecarios,
    locatarios,
    livros,
    autores,
    editoras,
    cursos
CASCADE;

-- AUTORES
CREATE TABLE autores (
    id SERIAL PRIMARY KEY,
    nome_autor VARCHAR(60)
);

-- EDITORAS
CREATE TABLE editoras (
    id SERIAL PRIMARY KEY,
    nome_editora VARCHAR(20)
);

-- CATEGORIAS COM HIERARQUIA (categoria pai/filha)
CREATE TABLE categorias (
    id_categoria SERIAL PRIMARY KEY,
    nome_categoria VARCHAR(50) NOT NULL,
    id_pai INT,
    FOREIGN KEY (id_pai) REFERENCES categorias (id_categoria)
);

-- LIVROS
CREATE TABLE livros (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(30) NOT NULL,
    qtd_disponivel INT NOT NULL,
    edicao INT NOT NULL,
    caminho_imagens TEXT,
    sinopse TEXT,
    isbn VARCHAR(13) UNIQUE NOT NULL,
    isAtivo BOOLEAN DEFAULT true,
    id_editora INT,
    FOREIGN KEY(id_editora) REFERENCES editoras(id)
);

-- RELAÇÃO N:N AUTORES ↔ LIVROS
CREATE TABLE autor_livro (
    id_autor INT,
    id_livro INT,
    PRIMARY KEY(id_autor, id_livro),
    FOREIGN KEY(id_autor) REFERENCES autores(id),
    FOREIGN KEY(id_livro) REFERENCES livros(id)
);

-- RELAÇÃO N:N LIVROS ↔ CATEGORIAS
CREATE TABLE livro_categoria (
    id_livro INT,
    id_categoria INT,
    PRIMARY KEY (id_livro, id_categoria),
    FOREIGN KEY (id_livro) REFERENCES livros(id),
    FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria)
);

-- CURSOS
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    nome_curso VARCHAR(50)
);

-- LOCATÁRIOS
CREATE TABLE locatarios (
    id SERIAL PRIMARY KEY,
    id_curso INT,
    nome VARCHAR(50),
    data_de_nascimento DATE,
    telefone VARCHAR(20),
    isAtivo BOOLEAN DEFAULT true,
    email VARCHAR(50),
    qtde_livros INT DEFAULT 0, 
    FOREIGN KEY(id_curso) REFERENCES cursos(id)
);

-- ALUNOS
CREATE TABLE alunos (
    id_locatario INT PRIMARY KEY REFERENCES locatarios(id),
    RA VARCHAR(10)
);

-- PROFESSORES
CREATE TABLE professores (
    id_locatario INT PRIMARY KEY REFERENCES locatarios(id),
    RA VARCHAR(10)
);

-- BIBLIOTECÁRIOS
CREATE TABLE bibliotecarios (
    id_locatario INT PRIMARY KEY REFERENCES locatarios(id),
    senha VARCHAR(20),
    imagem VARCHAR(20)
);

-- EMPRÉSTIMOS
CREATE TABLE emprestimos (
    id_locatario INT,
    id_livro INT,
    data_hora_emprestimo TIMESTAMP,
    data_hora_devolucao TIMESTAMP,
    status BOOLEAN DEFAULT false,
    PRIMARY KEY (id_locatario, id_livro, data_hora_emprestimo),
    FOREIGN KEY (id_locatario) REFERENCES locatarios(id),
    FOREIGN KEY (id_livro) REFERENCES livros(id)
);

-- DÍVIDAS
CREATE TABLE dividas (
    id_divida SERIAL PRIMARY KEY,
    id_locatario INT,
    id_livro INT,
    data_hora_emprestimo TIMESTAMP,
    FOREIGN KEY (id_locatario, id_livro, data_hora_emprestimo) 
    REFERENCES emprestimos (id_locatario, id_livro, data_hora_emprestimo)
);


