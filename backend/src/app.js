const express = require('express');
const cors = require('cors');
const equipamentoRoutes = require('./routes/equipamento.routes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/equipamentos', equipamentoRoutes);

app.use(errorHandler);

module.exports = app;