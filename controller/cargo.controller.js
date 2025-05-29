const cargoDAO = require("../model/cargoModel/cargo.dao");

const listarCargos = async function () {
  try {
    const result = await cargoDAO.listarCargos();
    return result;
  } catch (error) {
    console.log("Erro no controller: listarAutores()", error);
    throw error;
  }
};

module.exports = { listarCargos };
