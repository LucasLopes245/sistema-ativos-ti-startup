const errorHandler = (err, req, res, next) => {
  if (err.errors) {
    // Erro de validação Zod
    return res.status(400).json({ erro: err.errors });
  }
  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';
  res.status(status).json({ erro: message });
};

module.exports = errorHandler;