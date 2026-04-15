const errorHandler = (err, req, res, next) => {

  if (err.issues) {
    return res.status(400).json({
      error: 'Erro de validação',
      details: err.issues
    });
  }

  const status = err.status || 500;
  const message = err.message || 'Erro interno do servidor';

  res.status(status).json({
    error: message
  });
};

module.exports = errorHandler;