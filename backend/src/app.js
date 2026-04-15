const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const equipamentoRoutes = require('./routes/equipamento.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');
const autenticar = require('./middlewares/auth.middleware');

const app = express();

app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Muitas requisições. Tente novamente mais tarde.' },
});
app.use(limiter);

app.use(cors({
  origin: ['http://localhost', 'http://localhost:5173'],
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'ok',
    message: 'API em execução'
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/equipamentos', autenticar, equipamentoRoutes);

app.use(errorHandler);

module.exports = app;