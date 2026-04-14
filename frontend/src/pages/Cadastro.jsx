import { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: '',
    tipo: '',
    data_aquisicao: '',
    status: '',
  });
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErro('');
    setSucesso('');

    if (!form.nome || !form.tipo || !form.data_aquisicao || !form.status) {
      setErro('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await api.post('/equipamentos', form);
      setSucesso('Equipamento cadastrado com sucesso!');
      setForm({ nome: '', tipo: '', data_aquisicao: '', status: '' });
    } catch  {
      setErro('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1 className="page-title">Cadastrar Equipamento</h1>

        <div className="card" style={{ maxWidth: '540px' }}>
          {erro && <div className="alert alert-error">{erro}</div>}
          {sucesso && <div className="alert alert-success">{sucesso}</div>}

          <div className="form-group">
            <label>Nome do equipamento *</label>
            <input
              className="form-control"
              name="nome"
              placeholder="Ex: Monitor Dell 24"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Tipo *</label>
            <select className="form-control" name="tipo" value={form.tipo} onChange={handleChange}>
              <option value="">Selecione o tipo</option>
              <option value="Monitor">Monitor</option>
              <option value="CPU">CPU</option>
              <option value="Teclado">Teclado</option>
            </select>
          </div>

          <div className="form-group">
            <label>Data de Aquisição *</label>
            <input
              className="form-control"
              name="data_aquisicao"
              type="date"
              value={form.data_aquisicao}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select className="form-control" name="status" value={form.status} onChange={handleChange}>
              <option value="">Selecione o status</option>
              <option value="Ativo">Ativo</option>
              <option value="Manutenção">Manutenção</option>
            </select>
          </div>

          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <button onClick={handleSubmit} className="btn btn-primary" style={{ flex: 1 }}>
              Cadastrar
            </button>
            <Link to="/" className="btn btn-outline" style={{ flex: 1, textAlign: 'center' }}>
              ← Voltar
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}