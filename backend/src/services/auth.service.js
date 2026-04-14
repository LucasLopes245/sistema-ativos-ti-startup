const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const usuarioModel = require('../models/usuario.model');

const registrar = async (email, senha) => {
  const existe = await usuarioModel.findByEmail(email);
  if (existe) throw { status: 400, message: 'Email já cadastrado' };

  const hash = await bcrypt.hash(senha, 10);
  const usuario = await usuarioModel.create(email, hash);
  return usuario;
};

const login = async (email, senha) => {
  const usuario = await usuarioModel.findByEmail(email);
  if (!usuario) throw { status: 401, message: 'Email ou senha inválidos' };

  const senhaValida = await bcrypt.compare(senha, usuario.senha);
  if (!senhaValida) throw { status: 401, message: 'Email ou senha inválidos' };

  const token = jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '8h' }
  );

  return { token };
};

module.exports = { registrar, login };