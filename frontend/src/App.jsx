import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Dashboard from './pages/Dashboard';
import Cadastro from './pages/Cadastro';
import Editar from './pages/Editar';
import Login from './pages/Login';
import Registro from './pages/Registro';

const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

const AnimacaoRota = ({ children }) => {
  const location = useLocation();
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    setVisivel(false);
    const timer = setTimeout(() => setVisivel(true), 50);
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <div style={{
      opacity: visivel ? 1 : 0,
      transition: 'opacity 0.3s ease',
    }}>
      {children}
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AnimacaoRota>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
          <Route path="/cadastro" element={<RotaProtegida><Cadastro /></RotaProtegida>} />
          <Route path="/editar/:id" element={<RotaProtegida><Editar /></RotaProtegida>} />
        </Routes>
      </AnimacaoRota>
    </BrowserRouter>
  );
}

export default App;