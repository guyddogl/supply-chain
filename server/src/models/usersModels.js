const connection = require('../database/connection');

const getUserByUsername = async (username) => {
  const query = 'SELECT * FROM usuarios WHERE username = ?';
  const [[user]] = await connection.execute(query, [username]);
  return user;
};

module.exports = {
  getUserByUsername,
};