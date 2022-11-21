const mercadoriasModels = require('../models/mercadoriasModels');

const getAllMercadorias = async (_req, res) => {
  const mercadorias = await mercadoriasModels.getAllMercadorias();
  return { status: 200, mercadorias };
};

const addNewMercadoria = async (nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por) => {
  const result = await mercadoriasModels.addNewMercadoria(nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por);
  if (result.affectedRows === 0) {
    return { status: 400, message: "Ocorreu um erro. Tente novamente." }
  }
  return { status: 200, result };
};

module.exports = {
  getAllMercadorias,
  addNewMercadoria,
};
