const saidasServices = require('../services/saidasServices');

const getAllSaidas = async (_req, res) => {
  const { status, saidas } = await saidasServices.getAllSaidas();
  res.status(status).json(saidas);
};

const addNewSaida = async (req, res) => {
  const { mercadoria, quantidade, local, data, criado_por, atualizado_por } = req.body;
  const { status, message, result } = await saidasServices.addNewSaida(mercadoria, quantidade, local, data, criado_por, atualizado_por);
  if (message) {
    return res.status(status).json(message);
  }
  return res.status(status).json(result);
};

module.exports = {
  getAllSaidas,
  addNewSaida,
};