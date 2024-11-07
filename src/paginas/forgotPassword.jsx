import React, { useState } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import '../estilos/inicioU.scss'; 

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false); // Estado para controlar el estado de carga

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);  // Activar el estado de carga

    try {
      const response = await fetch('http://localhost:5000/usuarios/forget-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"correo_electronico": email }),
      });

      const data = await response.json();
      console.log(data);
      if (data) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error('Error al enviar solicitud:', error);
      toast.error('Error al enviar solicitud');
    } finally {
      setLoading(false);  // Desactivar el estado de carga después de la respuesta
    }
  };

  return (
    <div className="containerLoginUsuario">
      <Toaster /> 
      <div className="forms-container">
        <div className="signin-signup">

          {/* Formulario de recuperación de contraseña */}
          <form onSubmit={handleSubmit} className="sign-in-form">
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
            <button 
              type="submit" 
              className="btn solid" 
              disabled={loading}  // Deshabilita el botón mientras carga
            >
              {loading ? 'Enviando...' : 'Enviar correo de verificación'} {/* Cambiar texto cuando está cargando */}
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
