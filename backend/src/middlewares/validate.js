const { z } = require('zod');

const equipamentoSchema = z.object({
  nome: z.string().min(1, 'Nome obrigatório'),
  tipo: z.enum(['Monitor', 'CPU', 'Teclado'], { message: 'Tipo inválido' }),
  data_aquisicao: z.string().min(1, 'Data obrigatória'),
  status: z.enum(['Ativo', 'Manutenção'], { message: 'Status inválido' }),
});

module.exports = { equipamentoSchema };
