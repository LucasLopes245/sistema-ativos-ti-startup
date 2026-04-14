import { Link } from 'react-router-dom';

export default function Navbar() {
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
    </nav>
  );
}