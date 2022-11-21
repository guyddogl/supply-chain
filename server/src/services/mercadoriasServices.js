const mercadoriaModels = require('../models/mercadoriaModels');

const getAllMercadorias = async (_req, res) => {
  const mercadorias = await mercadoriaModels.getAllMercadorias();
  return { status: 200, mercadorias };
};

const addNewMercadoria = async (nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por) => {
  const result = await mercadoriaModels.addNewMercadoria(nome, registro, fabricante, tipo, descricao, criado_por, atualizado_por);
  if (result.affectedRows === 0) {
    return { status: 400, message: "Ocorreu um erro. Tente novamente." }
  }
  return { status: 200, result };
};

module.exports = {
  getAllMercadorias,
  addNewMercadoria,
};
