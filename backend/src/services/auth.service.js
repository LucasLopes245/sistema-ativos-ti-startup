const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

const registrar = async (email, senha) => {
  const existe = await usuarioModel.findByEmail(email);

  if (existe) {
    return { error: 'Email já cadastrado', status: 400 };
  }

  const hash = await bcrypt.hash(senha, 12);

  const usuario = await usuarioModel.create(email, hash);

  return { id: usuario.id, email: usuario.email };
};

const login = async (email, senha) => {
  const usuario = await usuarioModel.findByEmail(email);

  if (!usuario) {
    return { error: 'Email ou senha inválidos', status: 401 };
  }

  const senhaValida = await bcrypt.compare(senha, usuario.senha);

  if (!senhaValida) {
    return { error: 'Email ou senha inválidos', status: 401 };
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET não definido');
  }

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return { token };
};

module.exports = { registrar, login };