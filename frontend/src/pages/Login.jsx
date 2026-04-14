import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setErro('');
    if (!form.email || !form.senha) {
      setErro('Preencha todos os campos.');
      return;
    }
    try {
      const res = await api.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      setErro('Email ou senha inválidos.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #134d2a 0%, #1a6b3a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        background: '#fff',
        borderRadius: '12px',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '400px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 56, height: 56 }}>
            <rect width="36" height="36" rx="8" fill="#1a6b3a" />
            <path d="M18 6L6 12V24L18 30L30 24V12L18 6Z" fill="white" fillOpacity="0.9" />
            <path d="M18 11L10 15V21L18 25L26 21V15L18 11Z" fill="#1a6b3a" />
            <text x="14" y="22" fontSize="9" fontWeight="bold" fill="white">TI</text>
          </svg>
          <h1 style={{ color: '#134d2a', fontSize: '1.4rem', fontWeight: 700, marginTop: '0.75rem' }}>
            Ativos de TI
          </h1>
          <p style={{ color: '#666', fontSize: '0.85rem' }}>UNICEPLAC — Gestão de Laboratórios</p>
        </div>

        {erro && <div className="alert alert-error">{erro}</div>}

        <div className="form-group">
          <label>Email</label>
          <input
            className="form-control"
            name="email"
            type="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Senha</label>
          <input
            className="form-control"
            name="senha"
            type="password"
            placeholder="••••••••"
            value={form.senha}
            onChange={handleChange}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="btn btn-primary"
          style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem', fontSize: '1rem' }}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}