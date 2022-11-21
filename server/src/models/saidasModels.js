const connection = require('../database/connection');

const getAllSaidas = async (_req, _res) => {
  const query = `SELECT saidas.id, mercadorias.nome AS mercadoria, saidas.quantidade, saidas.local, saidas.data_hora
  FROM saidas, mercadorias 
  WHERE saidas.mercadoria = mercadorias.id
  ORDER BY data_hora DESC`;
  const [saidas] = await connection.execute(query);
  return saidas;
};

const addNewSaida = async (mercadoria, quantidade, local, data, criado_por, atualizado_por) => {
  const query = 'INSERT INTO saidas (mercadoria, quantidade, local, data_hora, criado_por, atualizado_por) VALUES (?, ?, ?, ?, ?, ?)';
  const [result] = await connection.execute(query, [mercadoria, quantidade, local, data, criado_por, atualizado_por]);
  return result;
};

module.exports = {
  getAllSaidas,
  addNewSaida,
};