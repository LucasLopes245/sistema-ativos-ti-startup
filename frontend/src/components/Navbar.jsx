import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="36" height="36" rx="8" fill="white" fillOpacity="0.15" />
          <path d="M18 6L6 12V24L18 30L30 24V12L18 6Z" fill="white" fillOpacity="0.9" />
          <path d="M18 11L10 15V21L18 25L26 21V15L18 11Z" fill="#1a6b3a" />
          <text x="14" y="22" fontSize="9" fontWeight="bold" fill="white">TI</text>
        </svg>
        <div>
          <div className="navbar-title">Ativos de TI</div>
          <div className="navbar-subtitle">UNICEPLAC — Gestão de Laboratórios</div>
        </div>
      </Link>

      <div style={{ marginLeft: 'auto' }}>
        <button
          onClick={handleLogout}
          style={{
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.4)',
            color: '#fff',
            padding: '0.4rem 1rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: 600,
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => e.target.style.background = 'rgba(255,255,255,0.25)'}
          onMouseOut={(e) => e.target.style.background = 'rgba(255,255,255,0.15)'}
        >
          Sair
        </button>
      </div>
    </nav>
  );
}