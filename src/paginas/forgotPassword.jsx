import React, { useState } from 'react';
import toast from 'react-hot-toast';
import '../estilos/inicioU.scss'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3002/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      toast.error('Error al enviar solicitud');
    }
  };

  return (
    <div className="containerLoginUsuario"> {/* Reutilizo misma clase login */}
      <div className="forms-container">
        <div className="signin-signup">

          {/* Formulario de recuperación de contraseña */}
          <form onSubmit={handleSubmit} className="sign-in-form"> {/* Usa las clases del login */}
            <h2 className="title">¡Recupera tu contraseña!</h2>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input
                type="email"
                placeholder="Ingresa tu correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn solid">
              Enviar correo de verificación
            </button>
          </form>
        </div>
        <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>¿Olvidaste tu contraseña?</h3>
            <p>
            ¡No te preocupes!, recuperarla es fácil. 
            Solo ingresa tu correo electrónico registrado y te ayudaremos a 
            restablecerla en unos sencillos pasos.
            </p>
            
          </div>
          <img src="/pandapassword.png" className="imagepassword" alt="" />
        </div>
        </div>
      </div>
    </div>
    
  );
};

export default ForgotPassword;