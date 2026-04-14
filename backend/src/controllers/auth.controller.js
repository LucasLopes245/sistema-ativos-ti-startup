const authService = require('../services/auth.service');

const registrar = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha obrigatórios' });
    }

    if (typeof email !== 'string' || typeof senha !== 'string') {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    if (senha.length < 8) {
      return res.status(400).json({ error: 'Senha deve ter no mínimo 8 caracteres' });
    }

    const usuario = await authService.registrar(email, senha);

    res.status(201).json(usuario);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ error: 'Email e senha obrigatórios' });
    }

    if (typeof email !== 'string' || typeof senha !== 'string') {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    const resultado = await authService.login(email, senha);

    res.json(resultado);
  } catch (err) {
    next(err);
  }
};

module.exports = { registrar, login };