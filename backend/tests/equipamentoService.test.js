const service = require('../src/services/equipamento.service');
const model = require('../src/models/equipamento.model');

jest.mock('../src/models/equipamento.model');

describe('equipamento.service', () => {

  afterEach(() => jest.clearAllMocks());

  test('listar deve chamar model.getAll com os filtros', async () => {
    model.getAll.mockResolvedValue([]);
    const resultado = await service.listar({ tipo: 'Monitor', status: 'Ativo' });
    expect(model.getAll).toHaveBeenCalledWith({ tipo: 'Monitor', status: 'Ativo' });
    expect(resultado).toEqual([]);
  });

  test('buscarPorId deve retornar equipamento quando encontrado', async () => {
    const equipamento = { id: 1, nome: 'Monitor Dell', tipo: 'Monitor' };
    model.getById.mockResolvedValue(equipamento);
    const resultado = await service.buscarPorId(1);
    expect(resultado).toEqual(equipamento);
  });

  test('buscarPorId deve lançar erro 404 quando não encontrado', async () => {
    model.getById.mockResolvedValue(null);
    await expect(service.buscarPorId(999)).rejects.toMatchObject({
      status: 404,
      message: 'Equipamento não encontrado',
    });
  });

  test('criar deve chamar model.create com os dados corretos', async () => {
    const dados = {
      nome: 'Teclado Logitech',
      tipo: 'Teclado',
      data_aquisicao: '2024-01-01',
      status: 'Ativo',
    };
    model.create.mockResolvedValue({ id: 1, ...dados });
    const resultado = await service.criar(dados);
    expect(model.create).toHaveBeenCalledWith(dados);
    expect(resultado.id).toBe(1);
  });

  test('atualizar deve lançar 404 se equipamento não existir', async () => {
    model.getById.mockResolvedValue(null);
    await expect(service.atualizar(999, {})).rejects.toMatchObject({ status: 404 });
  });

  test('atualizar deve chamar model.update se equipamento existir', async () => {
    const equipamento = { id: 1, nome: 'CPU Antiga', tipo: 'CPU' };
    const dadosNovos = { nome: 'CPU Nova', tipo: 'CPU', data_aquisicao: '2024-06-01', status: 'Ativo' };
    model.getById.mockResolvedValue(equipamento);
    model.update.mockResolvedValue({ id: 1, ...dadosNovos });
    const resultado = await service.atualizar(1, dadosNovos);
    expect(model.update).toHaveBeenCalledWith(1, dadosNovos);
    expect(resultado.nome).toBe('CPU Nova');
  });

  test('deletar deve lançar 404 se equipamento não existir', async () => {
    model.getById.mockResolvedValue(null);
    await expect(service.deletar(999)).rejects.toMatchObject({ status: 404 });
  });

  test('deletar deve chamar model.remove se equipamento existir', async () => {
    model.getById.mockResolvedValue({ id: 1 });
    model.remove.mockResolvedValue(true);
    await service.deletar(1);
    expect(model.remove).toHaveBeenCalledWith(1);
  });
});