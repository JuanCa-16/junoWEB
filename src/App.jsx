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
import Foto from './paginas/fotoPerfil'

import { useEffect, useState } from 'react';
import toast, { Toaster } from "react-hot-toast"; // Importa react-hot-toast
import axios from "axios"; // Puedes usar fetch o axios

// Layout para las páginas principales con Sidebar
function MainLayout({ closeMenu, setCloseMenu, info, infoFoto }) {
  // Función para obtener la hora de alerta y mostrar notificaciones
  const verificarAlerta = async () => {
    try {
        const correo = info.correo; // Asegúrate de que info contiene el correo del usuario
        if (!correo) return;


        const respuesta = await axios.get(`http://localhost:5000/alertas/${correo}`);
        const { mostrarAlerta, frase, emocion } = respuesta.data;
        console.log(respuesta.data);

        if (mostrarAlerta) {
          toast((t) => (
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                {/* Icono de campana a la izquierda */}
                <span style={{ fontSize: "30px", marginRight: 10 }}>🔔</span>
        
                {/* Contenedor vertical para la imagen, título y frase */}
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                    {/* Imagen */}
                    <img
                        src="/logos.png"
                        alt="Logo Juno"
                        style={{ width: 90, height: 90, marginBottom: 10 }}
                    />
                    
                    {/* Título */}
                    <p style={{ fontWeight: "bold", margin: 0 }}>¡Alerta diaria!</p>
        
                    {/* Frase */}
                    <p style={{ margin: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>{frase}</p>
                </div>
        
                {/* Botón de cierre centrado */}
                <button 
                    onClick={() => toast.dismiss(t.id)} 
                    style={{
                        marginLeft: 10, 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        height: '50px', 
                        width: '70px', 
                        borderRadius: '40%',
                        border: 'none',
                        background: '#d9534f', 
                        fontWeight: 'bold',
                        fontSize: '12px'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#ee2d27'} // Color de fondo al pasar el ratón
                    onMouseLeave={(e) => e.target.style.background = '#d9534f'} // Color de fondo cuando se quita el ratón
                >
                    Cerrar
                </button>
              </div>
          ), {
              style: {
                  backgroundColor: emocion === "Feliz" ? "#F4D35E" : "#e0a854",
                  color: "#333",
                  padding: "20px 30px",   // Aumenta el tamaño de la alerta
                  fontSize: "21px",        // Ajusta el tamaño del texto
                  maxWidth: "600px",       // Limita el ancho máximo
                  borderRadius: "15px",    // Redondeo de bordes
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)", // Agrega sombra
              },

              duration: Infinity,
          });
      }
    } catch (error) {
        console.error("Error al verificar la alerta:", error);
    }
};


  // Hook para verificar alertas periódicamente
  useEffect(() => {
    const intervalo = setInterval(verificarAlerta, 60000); // Verifica cada 60 segundos
    return () => clearInterval(intervalo); // Limpia el intervalo al desmontar el componente
  }, []);
  
  return (
    <div className="App principal grid-container">
      <Sidebar closeMenu={closeMenu} setCloseMenu={setCloseMenu} infoU = {info} infoF = {infoFoto}/>
      <div className={closeMenu === false ? "info" : "info active"}>
        <Routes>
          <Route path="/principal" element={<Principal />} />
          <Route path="/amigos" element={<Amigos />} />
          <Route path="/calendario" element={<Calendario />} />
          <Route path="/analisis" element={<Analisis />} />
          <Route path="/perfil" element={<PerfilPer/>} />
          <Route path="/editar-perfil" element={<Editar/>} />
          <Route path="/rachas" element={<Rachas/>} />
          <Route path="/editarFoto" element={<Foto/>} />
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

const ProtectedRoute = ({ setInfoU, setInfoUfoto, children }) => {
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

        const userEmail = data.correo;

        const response = await fetch(`http://localhost:5000/perfil//idfoto/${userEmail}`);
            const data2 = await response.json();
            if (response.ok) {
                setInfoUfoto(data2.referencia_foto); 
            } else {
                console.error('Error:', data2.error);
            }
      } else {
        setIsAuth(false);
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    estaAutenticado();
  }, [tokenJWT, setInfoU, setInfoUfoto]); // Asegúrate de incluir setInfoU como dependencia

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
  const [infoFoto, setInfoFoto] = useState(null);

  const setInfoU = (i) => {
    setInfo(i);
  };
  const setInfoUfoto = (i) => {
    setInfoFoto(i);
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
          <ProtectedRoute setInfoU={setInfoU} setInfoUfoto={setInfoUfoto}>
            <MainLayout closeMenu={closeMenu} setCloseMenu={setCloseMenu} info={info} infoFoto={infoFoto}/>
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster position="top-center" />
    </Router>
  );
}

export default App;
