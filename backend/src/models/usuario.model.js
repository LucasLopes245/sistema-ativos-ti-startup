const pool = require('../config/db');

const findByEmail = async (email) => {
  const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
  return result.rows[0];
};

const create = async (email, senha) => {
  const result = await pool.query(
    'INSERT INTO usuarios (email, senha) VALUES ($1, $2) RETURNING id, email',
    [email, senha]
  );
  return result.rows[0];
};

module.exports = { findByEmail, create };