import { useEffect, useState } from 'react';
import api from '../services/api';

export default function Dashboard() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  const carregarEquipamentos = async () => {
    const params = {};
    if (filtroTipo) params.tipo = filtroTipo;
    if (filtroStatus) params.status = filtroStatus;
    const res = await api.get('/equipamentos', { params });
    setEquipamentos(res.data);
  };

  useEffect(() => {
    carregarEquipamentos();
  }, [filtroTipo, filtroStatus]);

  const equipamentosFiltrados = equipamentos.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const deletar = async (id) => {
    if (confirm('Deseja deletar este equipamento?')) {
      await api.delete(`/equipamentos/${id}`);
      carregarEquipamentos();
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Equipamentos de TI</h1>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <input
          placeholder="Buscar por nome..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          style={{ padding: '0.5rem', flex: 1 }}
        />
        <select value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="">Todos os tipos</option>
          <option value="Monitor">Monitor</option>
          <option value="CPU">CPU</option>
          <option value="Teclado">Teclado</option>
        </select>
        <select value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="">Todos os status</option>
          <option value="Ativo">Ativo</option>
          <option value="Manutenção">Manutenção</option>
        </select>
        <a href="/cadastro" style={{ padding: '0.5rem 1rem', background: '#0070f3', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>
          + Novo Equipamento
        </a>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f0f0f0' }}>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Nome</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Tipo</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Data Aquisição</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Status</th>
            <th style={{ padding: '0.75rem', textAlign: 'left', border: '1px solid #ddd' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {equipamentosFiltrados.map((e) => (
            <tr key={e.id}>
              <td data-label="Nome" style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{e.nome}</td>
              <td data-label="Tipo" style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{e.tipo}</td>
              <td data-label="Data Aquisição" style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{new Date(e.data_aquisicao).toLocaleDateString('pt-BR')}</td>
              <td data-label="Status" style={{ padding: '0.75rem', border: '1px solid #ddd' }}>{e.status}</td>
              <td data-label="Ações" style={{ padding: '0.75rem', border: '1px solid #ddd', display: 'flex', gap: '0.5rem' }}>
                <a href={`/editar/${e.id}`} style={{ padding: '0.25rem 0.75rem', background: '#f5a623', color: '#fff', textDecoration: 'none', borderRadius: '4px' }}>Editar</a>
                <button onClick={() => deletar(e.id)} style={{ padding: '0.25rem 0.75rem', background: '#e00', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}