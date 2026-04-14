import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cadastro from './pages/Cadastro';
import Editar from './pages/Editar';
import Login from './pages/Login';

const RotaProtegida = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<RotaProtegida><Dashboard /></RotaProtegida>} />
        <Route path="/cadastro" element={<RotaProtegida><Cadastro /></RotaProtegida>} />
        <Route path="/editar/:id" element={<RotaProtegida><Editar /></RotaProtegida>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;