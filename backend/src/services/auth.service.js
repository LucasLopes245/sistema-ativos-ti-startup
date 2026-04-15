const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

const normalizarEmail = (email) => {
  return email.trim().toLowerCase();
};

const registrar = async (email, senha) => {
  email = normalizarEmail(email);

  const existe = await usuarioModel.findByEmail(email);

  if (existe) {
    const error = new Error('Email já cadastrado');
    error.status = 400;
    throw error;
  }

  const hash = await bcrypt.hash(senha, 12);

  try {
    const usuario = await usuarioModel.create(email, hash);
    return { id: usuario.id, email: usuario.email };
  } catch (err) {
    // fallback para erro de UNIQUE no banco
    if (err.code === '23505') {
      const error = new Error('Email já cadastrado');
      error.status = 400;
      throw error;
    }
    throw err;
  }
};

const login = async (email, senha) => {
  email = normalizarEmail(email);

  const usuario = await usuarioModel.findByEmail(email);

  if (!usuario) {
    const error = new Error('Email ou senha inválidos');
    error.status = 401;
    throw error;
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    const error = new Error('Email ou senha inválidos');
    error.status = 401;
    throw error;
  }

  if (!process.env.JWT_SECRET) {
    const error = new Error('JWT_SECRET não definido');
    error.status = 500;
    throw error;
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return { token };
};

module.exports = { registrar, login };