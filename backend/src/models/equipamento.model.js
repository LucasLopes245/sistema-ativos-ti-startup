const pool = require('../config/db');

const getAll = async ({ tipo, status }) => {
  let query = 'SELECT * FROM equipamentos WHERE 1=1';
  const values = [];

  if (tipo) {
    values.push(tipo);
    query += ` AND tipo = $${values.length}`;
  }
  if (status) {
    values.push(status);
    query += ` AND status = $${values.length}`;
  }

  query += ' ORDER BY id ASC';
  const result = await pool.query(query, values);
  return result.rows;
};

const getById = async (id) => {
  const result = await pool.query('SELECT * FROM equipamentos WHERE id = $1', [id]);
  return result.rows[0];
};

const create = async ({ nome, tipo, data_aquisicao, status }) => {
  const result = await pool.query(
    'INSERT INTO equipamentos (nome, tipo, data_aquisicao, status) VALUES ($1, $2, $3, $4) RETURNING *',
    [nome, tipo, data_aquisicao, status]
  );
  return result.rows[0];
};

const update = async (id, { nome, tipo, data_aquisicao, status }) => {
  const result = await pool.query(
    'UPDATE equipamentos SET nome=$1, tipo=$2, data_aquisicao=$3, status=$4 WHERE id=$5 RETURNING *',
    [nome, tipo, data_aquisicao, status, id]
  );
  return result.rows[0];
};

const remove = async (id) => {
  await pool.query('DELETE FROM equipamentos WHERE id = $1', [id]);
};

module.exports = { getAll, getById, create, update, remove };