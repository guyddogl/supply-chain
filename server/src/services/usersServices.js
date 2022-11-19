const usersModels = require('../models/usersModels');

const getUserByUsername = async (username) => {
  const result = await usersModels.getUserByUsername(username);
  if (!result) {
    return { status: 404, message: "Credenciais inválidas. Tente novamente." }
  }
  const { password, ...user } = result;
  return { status: 200, user };
};

module.exports = {
  getUserByUsername,
};
