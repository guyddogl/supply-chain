const mercadoriasServices = require('../services/mercadoriasServices');

const getAllMercadorias = async (_req, res) => {
  const { status, mercadorias } = await mercadoriasServices.getAllMercadorias();
  res.status(status).json(mercadorias);
};

const addNewMercadoria = async (req, res) => {
  const { nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por } = req.body;
  const { status, message, result } = await mercadoriasServices.addNewMercadoria(nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por);
  if (message) {
    return res.status(status).json(message);
  }
  return res.status(status).json(result);
};

module.exports = {
  getAllMercadorias,
  addNewMercadoria,
};