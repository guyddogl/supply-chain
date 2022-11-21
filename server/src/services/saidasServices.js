const saidasModels = require('../models/saidasModels');

const getAllSaidas = async (_req, _res) => {
  const saidas = await saidasModels.getAllSaidas();
  return { status: 200, saidas };
};

const addNewSaida = async (mercadoria, quantidade, local, data, criado_por, atualizado_por) => {
  const result = await saidasModels.addNewSaida(mercadoria, quantidade, local, data, criado_por, atualizado_por);
  if (result.affectedRows === 0) {
    return { status: 400, message: "Ocorreu um erro. Tente novamente." }
  }
  return { status: 200, result };
};

module.exports = {
  getAllSaidas,
  addNewSaida,
};
