import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import {Link} from 'react-router-dom';
import '../estilos/loginUsuario.css';
import '../estilos/loginUsuario.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [alertField, setAlertField] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email.includes('@')) {
      setAlertField('email');
      setTimeout(() => setAlertField(''), 3000); // Elimina alerta después de 3 segundos
      return;
    }

    if (!password) {
      setAlertField('password');
      setTimeout(() => setAlertField(''), 3000); // Elimina alerta después de 3 segundos
      return;
    }

    setAlertField('');
    alert(`Correo: ${email}\nContraseña: ${password}`);
  };
  console.log('login');
  return (

    <div className="d-flex justify-content-center align-items-center vh-100 background">
      <div className="container d-flex shadow-lg" style={{ borderRadius: '20px', overflow: 'hidden' }}>
        <div className="p-5" style={{ backgroundColor: '#fff', width: '50%' }}>
          <h3 className="text-center mb-4" style={{ fontFamily: 'Mukta', color: '#D04B24' }}>¡Bienvenido a JUNO!</h3>

          <form onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center mb-3" style={{ fontFamily: 'Mukta', color: '#D04B24' }}>
                <span>¿Aún no tienes una cuenta?&nbsp;</span> 
                <Link to="/usuario/nuevo" style={{ color: '#D04B24', textDecoration: 'underline' }}>
                  Regístrate
                </Link>
            </div>

            <div className="mb-3 ">
              <label htmlFor="email" className="form-label" style={{ color: '#D04B24', fontWeight: 'bold', fontFamily: 'Mukta'}}>
                Correo electrónico
              </label>
              <div className="input-group">
                <input
                  type="email"
                  className={`form-control ${alertField === 'email' ? 'border-danger' : ''}`}
                  id="email"
                  placeholder="nombre@ejemplo.com"
                  style={{ borderRadius: '15px 0 0 15px', backgroundColor: '#F3E1D3', fontFamily: 'Mukta' }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <span className="input-group-text" style={{ borderRadius: '0 15px 15px 0', backgroundColor: '#F3E1D3' }}>
                  <i className="bi bi-envelope-fill"></i>
                </span>
              </div>
              {alertField === 'email' && (
                <div className="alert alert-danger p-1 mt-3 position-relative" role="alert" style={{ fontSize: '0.875rem' }}>
                  Por favor, ingresa tu correo.
                </div>
              )}
            </div>

            <div className="mb-4 position-relative">
              <label htmlFor="password" className="form-label" style={{ color: '#D04B24', fontWeight: 'bold', fontFamily: 'Mukta' }}>
                Contraseña
              </label>
              <div className="input-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${alertField === 'password' ? 'border-danger' : ''}`}
                  id="password"
                  placeholder="Contraseña"
                  style={{ borderRadius: '15px 0 0 15px', backgroundColor: '#F3E1D3', fontFamily: 'Mukta'}}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="input-group-text"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ borderRadius: '0 15px 15px 0', backgroundColor: '#F3E1D3', borderColor: '#F3E1D3', color: '#D04B24' }}
                >
                  <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                </button>
              </div>

              {alertField === 'password' && (
                <div className="alert alert-danger p-1 mt-3 position-relative" role="alert" style={{ fontSize: '0.875rem' }}>
                  Por favor, ingresa tu contraseña.
                </div>
              )}
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-primary d-flex align-items-center justify-content-center"
                style={{ backgroundColor: '#D04B24', border: 'none', borderRadius: '15px', fontFamily: 'Mukta' }}
              >
                <i className="bi bi-box-arrow-in-right me-2"></i>Iniciar sesión
              </button>
            </div>
          </form>
          <div className="text-center mt-3">
            <a href="/" style={{ color: '#D04B24', textDecoration: 'underline', fontFamily: 'Mukta' }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        {/* parte carrusel derecha */}
        

        
        <div className="d-flex justify-content-center align-items-center carousel-container">
          <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src="/gato.png" className="d-block w-100" alt="Slide 1" />
              </div>
              <div className="carousel-item">
                <img src="/junologo.png" className="d-block w-100" alt="Slide 2" />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div> 
        </div>
      </div>
    </div>
    
  );
}

export default login;