import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../estilos/inicioU.scss'; 

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

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
      const response = await axios.post('http://localhost:3002/api/reset-password', { password });
      
      // Mostrar mensaje de éxito
      toast.success(response.data.message, {
        duration: 4000,
        style: {
          border: '1px solid #4CAF50',
          padding: '16px',
          color: '#006400',
          background: '#dff2d8',
        },
      });

      // Si la contraseña se restablece correctamente, redirige al login
      if (response.data.message === 'Contraseña restablecida correctamente') {
        setTimeout(() => {
          navigate('/usuario/login');
        }, 2000); // Redirigir después de 2 segundos
      }
    } catch (error) {
      console.error(error);
      toast.error('Error al restablecer la contraseña', {
        duration: 4000,
        style: {
          border: '1px solid #ff4d4d',
          padding: '16px',
          color: '#b30000',
          background: '#ffe6e6',
        },
      });
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
