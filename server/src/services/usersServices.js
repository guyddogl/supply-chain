const usersModels = require('../models/usersModels');

const getUserByUsername = async (name) => {
  const result = await usersModels.getUserByUsername(name);
  if (!result) {
    return { status: 404, message: "Credenciais inválidas. Tente novamente." }
  }
  const { password, ...user } = result;
  return { status: 200, user };
};

module.exports = {
  getUserByUsername,
};
