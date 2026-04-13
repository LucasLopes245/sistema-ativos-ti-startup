import { useState } from 'react';
import api from '../services/api';

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
    } catch (err) {
      setErro('Erro ao cadastrar. Verifique os dados e tente novamente.');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1>Cadastrar Equipamento</h1>

      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      {sucesso && <p style={{ color: 'green' }}>{sucesso}</p>}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          name="nome"
          placeholder="Nome do equipamento *"
          value={form.nome}
          onChange={handleChange}
          style={{ padding: '0.5rem' }}
        />

        <select name="tipo" value={form.tipo} onChange={handleChange} style={{ padding: '0.5rem' }}>
          <option value="">Selecione o tipo *</option>
          <option value="Monitor">Monitor</option>
          <option value="CPU">CPU</option>
          <option value="Teclado">Teclado</option>
        </select>

        <input
          name="data_aquisicao"
          type="date"
          value={form.data_aquisicao}
          onChange={handleChange}
          style={{ padding: '0.5rem' }}
        />

        <select name="status" value={form.status} onChange={handleChange} style={{ padding: '0.5rem' }}>
          <option value="">Selecione o status *</option>
          <option value="Ativo">Ativo</option>
          <option value="Manutenção">Manutenção</option>
        </select>

        <button
          onClick={handleSubmit}
          style={{ padding: '0.75rem', background: '#0070f3', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem' }}
        >
          Cadastrar
        </button>

        <a href="/" style={{ textAlign: 'center', color: '#0070f3' }}>← Voltar para o Dashboard</a>
      </div>
    </div>
  );
}