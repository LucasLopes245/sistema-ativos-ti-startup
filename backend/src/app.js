const express = require('express');
const cors = require('cors');
const equipamentoRoutes = require('./routes/equipamento.routes');
const authRoutes = require('./routes/auth.routes');
const errorHandler = require('./middlewares/errorHandler');
const autenticar = require('./middlewares/auth.middleware');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/equipamentos', autenticar, equipamentoRoutes);

app.use(errorHandler);

module.exports = app;