import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Principal from './paginas/principal';
import Amigos from './paginas/amigos';
import Calendario from './paginas/calendario';
import Analisis from './paginas/analisis';
import Perfil from './paginas/perfil';
import Login from './paginas/login';
import Sidebar from './componentes/sidebar';
import Registro from './paginas/registro';
import { useState } from 'react';

// Layout para las páginas principales con Sidebar
function MainLayout({ closeMenu, setCloseMenu }) {
  return (
    <div className="App principal grid-container">
      <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu} />
      <div className={closeMenu === false ? "info" : "info active"}>
        <Routes>
          <Route path="/" element={<Principal />} />
          <Route path="/amigos" element={<Amigos />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </div>
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
        {/* Rutas de autenticación sin Sidebar */}
        <Route path="/login" element={<div className="auth-container"><Login /></div>} />
        <Route path="/registro" element={<div className="auth-container"><Registro/></div>} />

        {/* Rutas principales con Sidebar */}
        <Route path="/*" element={<MainLayout closeMenu={closeMenu} setCloseMenu={setCloseMenu} />} />
      </Routes>
    </Router>
  );
}

export default App;
