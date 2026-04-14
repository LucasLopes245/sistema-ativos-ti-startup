import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

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
    <>
      <Navbar />
      <div className="container">
        <h1 className="page-title">Equipamentos de TI</h1>
        <div className="card">
          <div className="filtros">
            <input
              className="form-control"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ flex: 1, minWidth: '200px' }}
            />
            <select
              className="form-control"
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
            >
              <option value="">Todos os tipos</option>
              <option value="Monitor">Monitor</option>
              <option value="CPU">CPU</option>
              <option value="Teclado">Teclado</option>
            </select>
            <select
              className="form-control"
              value={filtroStatus}
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <option value="">Todos os status</option>
              <option value="Ativo">Ativo</option>
              <option value="Manutenção">Manutenção</option>
            </select>
            <Link to="/cadastro" className="btn btn-primary">
              + Novo Equipamento
            </Link>
          </div>
          <table>
            <thead>
              <tr>
                <th>Nome</th>
                <th>Tipo</th>
                <th>Data Aquisição</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {equipamentosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
                    Nenhum equipamento encontrado.
                  </td>
                </tr>
              ) : (
                equipamentosFiltrados.map((e) => (
                  <tr key={e.id}>
                    <td data-label="Nome">{e.nome}</td>
                    <td data-label="Tipo">{e.tipo}</td>
                    <td data-label="Data Aquisição">
                      {new Date(e.data_aquisicao).toLocaleDateString('pt-BR')}
                    </td>
                    <td data-label="Status">
                      <span className={`badge ${e.status === 'Ativo' ? 'badge-ativo' : 'badge-manutencao'}`}>
                        {e.status}
                      </span>
                    </td>
                    <td data-label="Ações" style={{ display: 'flex', gap: '0.5rem' }}>
                      <Link to={`/editar/${e.id}`} className="btn btn-warning">Editar</Link>
                      <button onClick={() => deletar(e.id)} className="btn btn-danger">Deletar</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}