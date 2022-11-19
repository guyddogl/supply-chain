const usersServices = require('../services/usersServices');

const getUserByUsername = async (req, res) => {
  const { username } = req.params;
  const { password } = req.body;
  const { status, message, user } = await usersServices.getUserByUsername(username, password);
  if (message) {
    return res.status(status).json(message);
  }
  return res.status(status).json(user);
};

module.exports = {
  getUserByUsername,
};