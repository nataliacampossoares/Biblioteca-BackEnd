const { Pool } = require("../../config/database");

const cadastrarEmprestimo = async function(emprestimo){
    const atributosEmprestimo = emprestimo.convertToArray();
    const query = "INSERT INTO emprestimos(id_locatario, id_livro, data_hora_emprestimo, data_hora_devolucao) VALUES ($1, $2, $3, $4)";
    try{
       await Pool.query(query, atributosEmprestimo);
       return;
    }catch(error){
      console.error('Erro na function cadastrarEmprestimo()', error);
      throw error;
    }
}

module.exports = {cadastrarEmprestimo}