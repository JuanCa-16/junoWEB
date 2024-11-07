import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../estilos/inicioU.scss'; 
import { useParams } from 'react-router-dom';
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const { token } = useParams();  // Capturamos el token de la URL
  console.log(token)

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Verificar que las contraseñas coincidan
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden', {
        duration: 4000,
        style: {
          border: '1px solid #ff4d4d',
          padding: '16px',
          color: '#b30000',
          background: '#ffe6e6',
        },
      });
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/usuarios/reset-password/${token}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"contraseña": password }),
      });

      const data = await response.json();
      console.log(data);
      if (data) {
        toast.success(data.message);
        setTimeout(() => {
          navigate('/usarios/login');
        }, 500);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      toast.error('Error al enviar solicitud');
    } 
  };

  return (
    <div className="containerLoginUsuario">
      <Toaster position="bottom-center" reverseOrder={false} />
      <div className="forms-container">
        <div className="signin-signup">
          <form onSubmit={handleSubmit} className="sign-in-form">
            <h2 className="title">Restablecer Contraseña</h2>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Ingresa tu nueva contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirma tu nueva contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn solid">
              Restablecer Contraseña
            </button>
          </form>
        </div>
        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>¿Nueva Contraseña?</h3>
              <p>
                Establece tu nueva contraseña, asegúrate de crear una contraseña segura que puedas recordar fácilmente. Una vez completado, podrás acceder a tu cuenta nuevamente.
              </p>
            </div>
            <img src="/pandareset.png" className="imagepassword" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
