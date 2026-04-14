import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const [equipamentos, setEquipamentos] = useState([]);
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [modalId, setModalId] = useState(null);

  const carregarEquipamentos = async () => {
    setLoading(true);
    try {
      const params = {};
      if (filtroTipo) params.tipo = filtroTipo;
      if (filtroStatus) params.status = filtroStatus;
      const res = await api.get('/equipamentos', { params });
      setEquipamentos(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarEquipamentos();
  }, [filtroTipo, filtroStatus]);

  const equipamentosFiltrados = equipamentos.filter((e) =>
    e.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const confirmarDeletar = (id) => setModalId(id);

  const deletar = async () => {
    await api.delete(`/equipamentos/${modalId}`);
    setModalId(null);
    carregarEquipamentos();
  };

  const exportarJSON = () => {
    const blob = new Blob([JSON.stringify(equipamentos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipamentos.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportarCSV = () => {
    const header = 'id,nome,tipo,data_aquisicao,status';
    const linhas = equipamentos.map(
      (e) => `${e.id},"${e.nome}","${e.tipo}","${new Date(e.data_aquisicao).toLocaleDateString('pt-BR')}","${e.status}"`
    );
    const csv = [header, ...linhas].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equipamentos.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <h1 className="page-title" style={{ margin: 0 }}>
            Equipamentos de TI
            <span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#666', marginLeft: '0.75rem' }}>
              {equipamentosFiltrados.length} equipamento{equipamentosFiltrados.length !== 1 ? 's' : ''}
            </span>
          </h1>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button onClick={exportarJSON} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
              ⬇ JSON
            </button>
            <button onClick={exportarCSV} className="btn btn-outline" style={{ fontSize: '0.85rem' }}>
              ⬇ CSV
            </button>
          </div>
        </div>

        <div className="card">
          <div className="filtros">
            <input
              className="form-control"
              placeholder="Buscar por nome..."
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              style={{ flex: 1, minWidth: '200px' }}
            />
            <select className="form-control" value={filtroTipo} onChange={(e) => setFiltroTipo(e.target.value)}>
              <option value="">Todos os tipos</option>
              <option value="Monitor">Monitor</option>
              <option value="CPU">CPU</option>
              <option value="Teclado">Teclado</option>
            </select>
            <select className="form-control" value={filtroStatus} onChange={(e) => setFiltroStatus(e.target.value)}>
              <option value="">Todos os status</option>
              <option value="Ativo">Ativo</option>
              <option value="Manutenção">Manutenção</option>
            </select>
            <Link to="/cadastro" className="btn btn-primary">
              + Novo Equipamento
            </Link>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '4px solid #e8f5ee',
                borderTop: '4px solid #1a6b3a',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                margin: '0 auto 1rem',
              }} />
              <p style={{ color: '#666' }}>Carregando equipamentos...</p>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          ) : (
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
                        <button onClick={() => confirmarDeletar(e.id)} className="btn btn-danger">Deletar</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {modalId && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '2rem',
            maxWidth: '400px',
            width: '90%',
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🗑️</div>
            <h2 style={{ color: '#134d2a', marginBottom: '0.5rem' }}>Confirmar exclusão</h2>
            <p style={{ color: '#666', marginBottom: '1.5rem' }}>
              Tem certeza que deseja deletar este equipamento? Esta ação não pode ser desfeita.
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button
                onClick={() => setModalId(null)}
                className="btn btn-outline"
                style={{ flex: 1 }}
              >
                Cancelar
              </button>
              <button
                onClick={deletar}
                className="btn btn-danger"
                style={{ flex: 1 }}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}