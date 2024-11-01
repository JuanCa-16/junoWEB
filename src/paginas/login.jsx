import React, { useState } from 'react';
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast'; // Importamos toast y Toaster
import '../estilos/inicioU.scss';
import { useNavigate } from 'react-router-dom';
const genderOptions = [
  { value: 'Masculino', label: 'Masculino' },
  { value: 'Femenino', label: 'Femenino' },
];

const Login = () => {

  const navigate = useNavigate()

  const [signUpMode, setsignUpMode] = useState(false); // Estado para controlar el modo
  const [showPassword, setShowPassword] = useState(false); // Visibilidad de contra
  const [email, setEmail] = useState(''); // Estado para el email
  const [password, setPassword] = useState(''); // Estado para la contraseña

  const [registerName, setRegisterName] = useState(''); // Estado para el nombre
  const [registerApellido, setRegisterApellido] = useState(''); // Estado para el Apellido
  const [registerUser, setRegisterUser] = useState(''); // Estado para el Usuario
  const [registerEmail, setRegisterEmail] = useState(''); // Estado para el email de registro
  const [registerPassword, setRegisterPassword] = useState(''); // Estado para la contraseña de registro
  const [registerDate, setRegisterDate] = useState(''); // Estado para la fecha de nacimiento
  const [registerPhone, setRegisterPhone] = useState(''); // Estado para el teléfono
  const [registerGender, setRegisterGender] = useState(null); // Estado para el género
  const [registerCity, setRegisterCity] = useState(''); // Estado para la ciudad

  const handleSignUpClick = () => {
    setsignUpMode(true); // Activa modo Sign Up
  };

  const handleSignInClick = () => {
    setsignUpMode(false); // Vuelve a modo Sign In
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Función para mostrar alerta con Toaster
  const showToast = (message) => {
    toast.error(message, {
      duration: 4000, // Tiempo que dura el toast
      style: {
        border: '1px solid #ff4d4d',
        padding: '16px',
        color: '#b30000',
        background: '#ffe6e6',
      },
    });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Por favor, completa todos los campos antes de iniciar sesión.');
    } else {
      const usuario = { // Crear usuario aquí
        correo_electronico: email,
        contraseña: password
      };

      const res = await fetch(`http://localhost:5000/usuarios/login`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: { 'Content-Type': "application/json" }
      });

      const data = await res.json();

      if (data.llave) {
        toast.success("Inicio Exitoso")
        localStorage.setItem("token", data.llave);
        setTimeout(() => {
          navigate('/principal');
        }, 500);

      } else {
        toast.error(data.error);
        console.log(data.error);
      }
    }
  };


  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerName || !registerApellido || !registerUser || !registerEmail || !registerPassword || !registerDate || !registerPhone || !registerGender || !registerCity) {
      showToast('Por favor, completa todos los campos antes de registrarte.');
    } else {
      const usuario = { // Crear usuario aquí
        correo_electronico: registerEmail,
        nombre_usuario: registerUser,
        nombre_real: registerName,
        apellidos: registerApellido,
        fecha_nacimiento: registerDate,
        telefono: registerPhone,
        ciudad: registerCity,
        contraseña: registerPassword,
        sexo: registerGender,
        hora_alerta: "09:00:00"
      };
      console.log('Registrarse:', registerName, registerApellido, registerUser, registerEmail, registerPassword, registerDate, registerPhone, registerGender, registerCity);

      const res = await fetch(`http://localhost:5000/usuarios`, {
        method: 'POST',
        body: JSON.stringify(usuario),
        headers: { 'Content-Type': "application/json" }
      });

      const data = await res.json();

      if (data.llave) {
        toast.success("Registro Exitoso, Bienvenido")
        localStorage.setItem("token", data.llave);
        setTimeout(() => {
          navigate('/principal');
        }, 500);

      } else {
        toast.error(data.error);
        console.log(data.error);
      }
    }
  };

  return (
    <div className={`containerLoginUsuario ${signUpMode ? 'sign-up-mode' : ''}`}>

      <Toaster position="bottom-center" reverseOrder={false} />

      <div className="forms-container">
        <div className="signin-signup">
          {/* Formulario de inicio de sesión */}
          <form onSubmit={handleLoginSubmit} className="sign-in-form">
            <h2 className="title">¡Bienvenido de nuevo!</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-field" style={{ position: 'relative' }}>
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i
                className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <input type="submit" value="Inicia sesión" className="btn solid" />

            <div className="text-center mt-3">
              <a href="/usuario/forgot-password" className="forgot-password-link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </form>

          {/* Formulario de registro */}
          <form onSubmit={handleRegisterSubmit} className="sign-up-form">
            <h2 className="title">¡Bienvenido a JUNO!</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombre"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
              />

            </div>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Apellido"
                value={registerApellido}
                onChange={(e) => setRegisterApellido(e.target.value)}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Nombre Usuario"
                value={registerUser}
                onChange={(e) => setRegisterUser(e.target.value)}
              />

            </div>

            <div className="input-field">
              <i className="fas fa-calendar"></i>
              <input
                type="date"
                placeholder="Fecha de nacimiento"
                value={registerDate}
                onChange={(e) => setRegisterDate(e.target.value)}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-phone"></i>
              <input
                type="tel"
                placeholder="Teléfono"
                value={registerPhone}
                onChange={(e) => setRegisterPhone(e.target.value)}
              />
            </div>

            {/* Campo personalizado para género */}
            <div className="input-field">
              <i className="fas fa-venus-mars"></i>
              <Select
                options={genderOptions}
                placeholder="Selecciona tu género"
                value={genderOptions.find(option => option.value === registerGender)} // para que muestre el valor seleccionado
                onChange={(option) => setRegisterGender(option.value)} // guarda solo el valor
                classNamePrefix="custom-select"
              />
            </div>

            <div className="input-field">
              <i className="fas fa-city"></i>
              <input
                type="text"
                placeholder="Ciudad, País"
                value={registerCity}
                onChange={(e) => setRegisterCity(e.target.value)}
              />
            </div>

            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Correo electrónico"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
              />
            </div>

            <div className="input-field" style={{ position: 'relative' }}>
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Contraseña"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
              />
              <i
                className={showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'}
                style={{
                  position: 'absolute',
                  right: '15px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
                onClick={togglePasswordVisibility}
              ></i>
            </div>

            <input type="submit" value="Registrarme" className="btn solid" />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Eres nuevo en JUNO?</h3>
            <p>
              JUNO es un diario en línea diseñado para registrar emociones y
              promover el bienestar mental, ofreciendo un espacio personal para
              la reflexión y el crecimiento emocional.
            </p>
            <button
              className="btn transparent"
              id="sign-up-button"
              onClick={handleSignUpClick}
            >
              Regístrate
            </button>
          </div>
          <img src="/pandaoto.png" className="image" alt="" />
        </div>

        <div className="panel right-panel">
          <div className="content">
            <h3>¿Ya eres parte de JUNO?</h3>
            <p>
              Inicia sesión para acceder a tu diario emocional y continuar tu
              viaje hacia el bienestar mental
            </p>
            <button
              className="btn transparent"
              id="sign-in-button"
              onClick={handleSignInClick}
            >
              Inicia sesión
            </button>
          </div>
          <img src="/panda2.png" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;