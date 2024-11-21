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
import ForgotPassword from './paginas/forgotPassword';
import ResetPassword from './paginas/resetPassword';
import Rachas from './paginas/rachas'

import { useEffect, useState } from 'react';

// Layout para las páginas principales con Sidebar
function MainLayout({ closeMenu, setCloseMenu, info }) {
  
  return (
    <div className="App principal grid-container">
      <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu} infoU = {info}/>
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

// Layout para las páginas de autenticación
function AuthLayout() {
  const [isAuth, setIsAuth] = useState(null);
  const tokenJWT = localStorage.getItem('token');

  // Función para verificar autenticación
  const checkAuth = async () => {
    try {
      const response = await fetch(`http://localhost:5000/usuarios/estalogin`, {
        method: 'GET',
        headers: { token: tokenJWT }
      });
      const data = await response.json();
      return data.token === true; // Retorna true si el token es válido
    } catch (err) {
      console.error(err.message);
      return false; // Retorna false en caso de error
    }
  };

  useEffect(() => {
    const validateAuth = async () => {
      const authenticated = await checkAuth();
      setIsAuth(authenticated);
    };
    validateAuth();
  }, [tokenJWT]);

  // Mostrar loader mientras se verifica la autenticación
  if (isAuth === null) {
     // Personaliza el loader si deseas
  }

  if (isAuth) {
    return <Navigate to="/principal" replace />; // Redirigir a la página principal si está autenticado
  }

  return (
    <div className="auth-container">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
      </Routes>
    </div>
  );
}

const ProtectedRoute = ({ setInfoU, children }) => {
  const [isAuth, setIsAuth] = useState(null);
  
  const tokenJWT = localStorage.getItem('token');

  const setAuth = (boolean) => {
    setIsAuth(boolean);
  };

  const estaAutenticado = async () => {
    try {
      const respuesta = await fetch(`http://localhost:5000/usuarios/estalogin`, {
        method: 'GET',
        headers: { token: tokenJWT }
      });

      const data = await respuesta.json();
      if (data.token) {
        setInfoU(data); // Aquí se utiliza setInfoU correctamente
        setIsAuth(true);
      } else {
        setIsAuth(false);
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    estaAutenticado();
  }, [tokenJWT, setInfoU]); // Asegúrate de incluir setInfoU como dependencia

  // Mostrar loader mientras se verifica la autenticación
  if (isAuth === null) {
    return ; // Puedes personalizar este loader
  }

  if (!isAuth) {
    return <Navigate to="/usuario/login" replace />; // Redirigir si no autenticado
  }

  return children; // Renderizar hijos si está autenticado
};

function App() {
  const [closeMenu, setCloseMenu] = useState(() => {
    const savedState = localStorage.getItem('sidebarClosed');
    return savedState === 'true';
  });

  const [info, setInfo] = useState(null);

  const setInfoU = (i) => {
    setInfo(i);
  };

  return (
    <Router>
      <Routes>

        {/* Redirige a /login al cargar la página */}
        <Route path="/" element={<Navigate to="/usuario/login" replace />} />

        {/* Rutas de autenticación sin Sidebar */}
        <Route path="/usuario/*" element={<AuthLayout />} />

        {/* Rutas principales con Sidebar */}
        <Route path="/*" element={
          <ProtectedRoute setInfoU={setInfoU}>
            <MainLayout closeMenu={closeMenu} setCloseMenu={setCloseMenu} info={info} />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
