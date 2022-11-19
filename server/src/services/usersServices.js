const usersModels = require('../models/usersModels');

const getAllUsers = async () => {
  const users = await usersModels.getAllUsers();
  return { status: 200, users };
};

module.exports = {
  getAllUsers,
};
