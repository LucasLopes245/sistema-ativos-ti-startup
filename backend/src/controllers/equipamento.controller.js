const service = require('../services/equipamento.service');
const { equipamentoSchema } = require('../middlewares/validate');

const listar = async (req, res, next) => {
  try {
    const { tipo, status } = req.query;
    const dados = await service.listar({ tipo, status });
    res.json(dados);
  } catch (err) { next(err); }
};

const buscarPorId = async (req, res, next) => {
  try {
    const dado = await service.buscarPorId(req.params.id);
    res.json(dado);
  } catch (err) { next(err); }
};

const criar = async (req, res, next) => {
  try {
    const parsed = equipamentoSchema.parse(req.body);
    const novo = await service.criar(parsed);
    res.status(201).json(novo);
  } catch (err) { next(err); }
};

const atualizar = async (req, res, next) => {
  try {
    const parsed = equipamentoSchema.parse(req.body);
    const atualizado = await service.atualizar(req.params.id, parsed);
    res.json(atualizado);
  } catch (err) { next(err); }
};

const deletar = async (req, res, next) => {
  try {
    await service.deletar(req.params.id);
    res.status(204).send();
  } catch (err) { next(err); }
};

module.exports = { listar, buscarPorId, criar, atualizar, deletar };