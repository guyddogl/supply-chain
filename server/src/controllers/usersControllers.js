const usersServices = require('../services/usersServices');

const getAllUsers = async (_req, res) => {
  const { status, users } = await usersServices.getAllUsers();
  res.status(status).json(users);
};

module.exports = {
  getAllUsers,
};