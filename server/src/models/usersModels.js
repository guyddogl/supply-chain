const connection = require('../database/connection');

const getAllUsers = async () => {
  const query = 'SELECT * FROM usuarios';
  const [users] = await connection.execute(query);
  return users;
};

module.exports = {
  getAllUsers,
};