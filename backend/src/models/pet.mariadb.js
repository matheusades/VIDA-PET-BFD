const pool = require('../config/mariadb'); // Certifique-se de que o arquivo se chama mariadb.js

async function listarPets() {
  const [rows] = await pool.query('SELECT * FROM pets');
  return rows;
}

module.exports = { listarPets };
