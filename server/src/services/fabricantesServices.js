const fabricantesModels = require('../models/fabricantesModels');

const getAllFabricantes = async (_req, res) => {
  const fabricantes = await fabricantesModels.getAllFabricantes();
  return { status: 200, fabricantes };
};

const addNewFabricante = async (nome, criado_por, atualizado_por) => {
  const result = await fabricantesModels.addNewFabricante(nome, criado_por, atualizado_por);
  if (result.affectedRows === 0) {
    return { status: 400, message: "Ocorreu um erro. Tente novamente." }
  }
  return { status: 200, result };
};

module.exports = {
  getAllFabricantes,
  addNewFabricante,
};
