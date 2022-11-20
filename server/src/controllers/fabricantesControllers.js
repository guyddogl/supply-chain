const fabricantesServices = require('../services/fabricantesServices');

const getAllFabricantes = async (_req, res) => {
  const { status, fabricantes } = await fabricantesServices.getAllFabricantes();
  res.status(status).json(fabricantes);
};

const addNewFabricante = async (req, res) => {
  const { nome, criado_por, atualizado_por } = req.body;
  const { status, message, result } = await fabricantesServices.addNewFabricante(nome, criado_por, atualizado_por);
  if (message) {
    return res.status(status).json(message);
  }
  return res.status(status).json(result);
};

module.exports = {
  getAllFabricantes,
  addNewFabricante,
};