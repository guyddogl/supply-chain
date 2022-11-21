const entradasServices = require('../services/entradasServices');

const getAllEntradas = async (_req, res) => {
  const { status, entradas } = await entradasServices.getAllEntradas();
  res.status(status).json(entradas);
};

const addNewEntrada = async (req, res) => {
  const { mercadoria, quantidade, local, data, criado_por, atualizado_por } = req.body;
  const { status, message, result } = await entradasServices.addNewEntrada(mercadoria, quantidade, local, data, criado_por, atualizado_por);
  if (message) {
    return res.status(status).json(message);
  }
  return res.status(status).json(result);
};

module.exports = {
  getAllEntradas,
  addNewEntrada,
};