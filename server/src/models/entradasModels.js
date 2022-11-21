const connection = require('../database/connection');

const getAllEntradas = async (_req, _res) => {
  const query = `SELECT entradas.id, mercadorias.nome AS mercadoria, entradas.quantidade, entradas.local, entradas.data_hora
  FROM entradas, mercadorias 
  WHERE entradas.mercadoria = mercadorias.id
  ORDER BY data_hora DESC`;
  const [entradas] = await connection.execute(query);
  return entradas;
};

const addNewEntrada = async (mercadoria, quantidade, local, data, criado_por, atualizado_por) => {
  const query = 'INSERT INTO entradas (mercadoria, quantidade, local, data_hora, criado_por, atualizado_por) VALUES (?, ?, ?, ?, ?, ?)';
  const [result] = await connection.execute(query, [mercadoria, quantidade, local, data, criado_por, atualizado_por]);
  return result;
};

module.exports = {
  getAllEntradas,
  addNewEntrada,
};