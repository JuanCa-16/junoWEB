import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Principal from './paginas/principal';
import Amigos from './paginas/amigos';
import Calendario from './paginas/calendario';
import Analisis from './paginas/analisis';
import PerfilPer from './paginas/perfilPersonal';
import Perfil from './paginas/perfil';
import Login from './paginas/login';
import Sidebar from './componentes/sidebar';
import Editar from './paginas/editarPerfil';
import Rachas from './paginas/rachas'
import ForgotPassword from './paginas/forgotPassword';
import ResetPassword from './paginas/resetPassword';

import { useState } from 'react';

// Layout para las páginas principales con Sidebar
function MainLayout({ closeMenu, setCloseMenu }) {
  return (
    <div className="App principal grid-container">
      <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
      <div className={closeMenu === false ? "info" : "info active"}>
        <Routes>
          <Route path="/principal" element={<Principal />} />
          <Route path="/amigos" element={<Amigos />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/perfil" element={<PerfilPer/>} />
          <Route path="/editar-perfil" element={<Editar/>} />
          <Route path="/rachas" element={<Rachas/>} />
        </Routes>
      </div>
    </div>
  );
}
function AuthLayout() {
  return (
    <div className="auth-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}


function App() {
  const [closeMenu, setCloseMenu] = useState(() => {
    const savedState = localStorage.getItem('sidebarClosed');
    return savedState === 'true';
  });

  return (
    <Router>
      <Routes>

        {/* Redirige a /login al cargar la página */}
        <Route path="/" element={<Navigate to="/usuario/login" replace />} />

        {/* Rutas de autenticación sin Sidebar */}
        <Route path="/usuario/*" element={<AuthLayout/>} />

        {/* Rutas principales con Sidebar */}
        <Route path="/*" element={<MainLayout closeMenu={closeMenu} setCloseMenu={setCloseMenu} />} />
      </Routes>
    </Router>
  );
}

export default App;