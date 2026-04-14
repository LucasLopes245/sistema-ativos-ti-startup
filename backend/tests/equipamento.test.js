const { equipamentoSchema } = require('../src/middlewares/validate');

describe('Validação de Equipamento', () => {
  test('deve aceitar um equipamento válido', () => {
    const resultado = equipamentoSchema.safeParse({
      nome: 'Monitor Dell 24',
      tipo: 'Monitor',
      data_aquisicao: '2024-01-10',
      status: 'Ativo',
    });
    expect(resultado.success).toBe(true);
  });

  test('deve rejeitar quando o nome estiver vazio', () => {
    const resultado = equipamentoSchema.safeParse({
      nome: '',
      tipo: 'Monitor',
      data_aquisicao: '2024-01-10',
      status: 'Ativo',
    });
    expect(resultado.success).toBe(false);
  });

  test('deve rejeitar tipo inválido', () => {
    const resultado = equipamentoSchema.safeParse({
      nome: 'Monitor Dell',
      tipo: 'Impressora',
      data_aquisicao: '2024-01-10',
      status: 'Ativo',
    });
    expect(resultado.success).toBe(false);
  });

  test('deve rejeitar status inválido', () => {
    const resultado = equipamentoSchema.safeParse({
      nome: 'Monitor Dell',
      tipo: 'Monitor',
      data_aquisicao: '2024-01-10',
      status: 'Quebrado',
    });
    expect(resultado.success).toBe(false);
  });
});