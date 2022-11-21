const connection = require('../database/connection');

const getAllMercadorias = async (_req, res) => {
  const query = `SELECT mercadorias.id, mercadorias.nome, mercadorias.registro, fabricantes.nome AS fabricante, mercadorias.tipo,  mercadorias.descricao
  FROM mercadorias, fabricantes 
  WHERE mercadorias.fabricante = fabricantes.id`;
  const [mercadorias] = await connection.execute(query);
  return mercadorias;
};

const addNewMercadoria = async (nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por) => {
  const query = 'INSERT INTO mercadorias (nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por) VALUES (?, ?, ?, ?, ?, ?, ?)';
  const [result] = await connection.execute(query, [nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por]);
  return result;
};

module.exports = {
  getAllMercadorias,
  addNewMercadoria,
};