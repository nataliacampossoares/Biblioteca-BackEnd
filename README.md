# 📚 Sistema de Biblioteca – Backend

Este é o backend do sistema de biblioteca, desenvolvido com **Node.js** e **Express**, utilizando **PostgreSQL** como banco de dados relacional.

---

## ⚙️ Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [nodemailer](https://nodemailer.com/) (envio de emails)
- [express-fileupload](https://www.npmjs.com/package/express-fileupload)
- [cors](https://www.npmjs.com/package/cors)

---

## 📁 Estrutura Geral

O projeto está dividido em:

- `/controller`: lógica das rotas e operações de entidades
- `/entidades`: classes das entidades (Livro, Locatário, etc.)
- `/config`: configurações de banco de dados e envio de email
- `/imagensLivro`, `/imagensBibliotecario`: pastas públicas para armazenamento de imagens

---


## 🔐 Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

CONNECTION_STRING=postgres://postgres:postgres@localhost:5432/Biblioteca

EMAIL_ADDRESS=seu_email@gmail.com

EMAIL_PASS=sua_senha_de_app

⚠️ A senha do email deve ser uma senha de app (não a senha da conta Google). Você pode gerar essa senha em: https://myaccount.google.com/apppasswords

---

## 🔌 Como Rodar o Projeto
1. Clone o repositório:
git clone https://github.com/nataliacampossoares/backend-biblioteca.git
cd backend-biblioteca

2. Instale as dependênicias:
npm install

3. Crie e configure o banco de dados PostgreSQL:
O banco utilizado se chama Biblioteca.
Utilize o arquivo database.sql (ou equivalente) com os comandos de criação das tabelas.

4. Inicie o servidor:
node app.js
O servidor será iniciado na porta 3000.

## 🤝 Frontend
O frontend deste projeto está disponível em:

👉 https://github.com/nataliacampossoares/Biblioteca
