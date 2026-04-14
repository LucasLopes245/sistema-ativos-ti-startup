const authService = require('../services/auth.service');

const registrar = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) throw { status: 400, message: 'Email e senha obrigatórios' };
    const usuario = await authService.registrar(email, senha);
    res.status(201).json(usuario);
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;
    if (!email || !senha) throw { status: 400, message: 'Email e senha obrigatórios' };
    const resultado = await authService.login(email, senha);
    res.json(resultado);
  } catch (err) { next(err); }
};

module.exports = { registrar, login };