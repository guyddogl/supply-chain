const entradasModels = require('../models/entradasModels');

const getAllEntradas = async (_req, res) => {
  const entradas = await entradasModels.getAllEntradas();
  return { status: 200, entradas };
};

const addNewEntrada = async (mercadoria, quantidade, local, data, criado_por, atualizado_por) => {
  const result = await entradasModels.addNewEntrada(mercadoria, quantidade, local, data, criado_por, atualizado_por);
  if (result.affectedRows === 0) {
    return { status: 400, message: "Ocorreu um erro. Tente novamente." }
  }
  return { status: 200, result };
};

module.exports = {
  getAllEntradas,
  addNewEntrada,
};
