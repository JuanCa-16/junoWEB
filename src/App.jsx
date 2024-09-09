import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Principal from './paginas/principal';
import Amigos from './paginas/amigos';
import Calendario from './paginas/calendario';
import Analisis from './paginas/analisis';
import Perfil from './paginas/perfil';
import Login from './paginas/login';
import Sidebar from './componentes/sidebar';
import Registro from './paginas/registro';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
function App() {

  const [closeMenu, setCloseMenu] = useState(() => {
    const savedState = localStorage.getItem('sidebarClosed');
    return savedState === 'true';
  });

  return (
    <Router>
      <div className="App principal grid-container">
      
        <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu}/>
        <div className={closeMenu == false? "info" : "info active"}>
          <Routes>
              <Route path="/" element={<Principal />}></Route>
              <Route path="/amigos" element={<Amigos />}></Route>
              <Route path="/calendario" element={<Calendario />}></Route>
              <Route path="/analisis" element={<Analisis />}></Route>
              <Route path="/perfil" element={<Perfil />}></Route>
              <Route path="/registro" element={<Registro />}></Route>
              <Route path="/login" element={<Login />}></Route>
        
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
