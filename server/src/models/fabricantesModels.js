const connection = require('../database/connection');

const getAllFabricantes = async (_req, res) => {
  const query = 'SELECT * FROM fabricantes ORDER BY nome ASC';
  const [fabricantes] = await connection.execute(query);
  return fabricantes;
};

const addNewFabricante = async (nome, criado_por, atualizado_por) => {
  const query = 'INSERT INTO fabricantes (nome, criado_por, atualizado_por) VALUES (?, ?, ?)';
  const [result] = await connection.execute(query, [nome, criado_por, atualizado_por]);
  return result;
};

module.exports = {
  getAllFabricantes,
  addNewFabricante,
};