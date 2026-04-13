const model = require('../models/equipamento.model');

const listar = (filtros) => model.getAll(filtros);
const buscarPorId = async (id) => {
  const eq = await model.getById(id);
  if (!eq) throw { status: 404, message: 'Equipamento não encontrado' };
  return eq;
};
const criar = (dados) => model.create(dados);
const atualizar = async (id, dados) => {
  await buscarPorId(id);
  return model.update(id, dados);
};
const deletar = async (id) => {
  await buscarPorId(id);
  return model.remove(id);
};

module.exports = { listar, buscarPorId, criar, atualizar, deletar };