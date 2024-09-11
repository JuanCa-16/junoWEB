import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';
import '../estilos/registro.css'; 
import '../estilos/registro.scss'; 

const RegistroU = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [alertField, setAlertField] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name) {
            setAlertField('name');
            setTimeout(() => setAlertField(''), 3000);
            return;
        }

        if (!email) {
            setAlertField('email');
            setTimeout(() => setAlertField(''), 3000);
            return;
        }

        if (!password) {
            setAlertField('password');
            setTimeout(() => setAlertField(''), 3000);
            return;
        }

        if (password !== confirmPassword) {
            setAlertField('confirmPassword');
            setTimeout(() => setAlertField(''), 3000);
            return;
        }

        setAlertField('');
        alert(`Registro completado: \nNombre: ${name}\nCorreo: ${email}`);
    };

    return (
        <div className="registro-container">
            <div className="row w-100 justify-content-center">
                <div className="col-lg-6 col-md-8 col-sm-10">
                    <div className="card shadow-lg">
                        <div className="card-body">
                            <h3 className="text-center mb-4" style={{ fontFamily: 'Mukta', color: '#D04B24' }}>¡Regístrate en JUNO!</h3>
                            <form onSubmit={handleSubmit}>

                                <div className="mb-3 position-relative">
                                    <label htmlFor="name" className="form-label" style={{ color: '#D04B24', fontWeight: 'bold', fontFamily: 'Mukta' }}>
                                        Nombre completo
                                    </label>
                                    <input
                                        type="text"
                                        className={`form-control ${alertField === 'name' ? 'border-danger' : ''}`}
                                        id="name"
                                        placeholder="Nombre completo"
                                        style={{ borderRadius: '15px', backgroundColor: '#F3E1D3', fontFamily: 'Mukta' }}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                    {alertField === 'name' && (
                                        <div className="alert alert-danger p-1 mt-3 position-relative" role="alert" style={{ fontSize: '0.875rem' }}>
                                            Por favor, ingresa tu nombre completo.
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="email" className="form-label" style={{ color: '#D04B24', fontWeight: 'bold', fontFamily: 'Mukta' }}>
                                        Correo electrónico
                                    </label>
                                    <input
                                        type="email"
                                        className={`form-control ${alertField === 'email' ? 'border-danger' : ''}`}
                                        id="email"
                                        placeholder="nombre@ejemplo.com"
                                        style={{ borderRadius: '15px', backgroundColor: '#F3E1D3', fontFamily: 'Mukta' }}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    {alertField === 'email' && (
                                        <div className="alert alert-danger p-1 mt-3 position-relative" role="alert" style={{ fontSize: '0.875rem' }}>
                                            Por favor, ingresa tu correo.
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3 position-relative">
                                    <label htmlFor="password" className="form-label" style={{ color: '#D04B24', fontWeight: 'bold', fontFamily: 'Mukta' }}>
                                        Contraseña
                                    </label>
                                    
                                    <input
                                        type="password"
                                        className={`form-control ${alertField === 'password' ? 'border-danger' : ''}`}
                                        id="password"
                                        placeholder="Contraseña"
                                        style={{ borderRadius: '15px', backgroundColor: '#F3E1D3', fontFamily: 'Mukta' }}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    {alertField === 'password' && (
                                        <div className="alert alert-danger p-1 mt-3 position-relative" role="alert" style={{ fontSize: '0.875rem' }}>
                                            Por favor, ingresa tu contraseña.
                                        </div>
                                    )}
                                </div>
                                <div className="mb-4 position-relative">
                                    <label htmlFor="confirmPassword" className="form-label" style={{ color: '#D04B24', fontWeight: 'bold', fontFamily: 'Mukta' }}>
                                        Confirmar Contraseña
                                    </label>
                                    <input
                                        type="password"
                                        className={`form-control ${alertField === 'confirmPassword' ? 'border-danger' : ''}`}
                                        id="confirmPassword"
                                        placeholder="Confirmar Contraseña"
                                        style={{ borderRadius: '15px', backgroundColor: '#F3E1D3', fontFamily: 'Mukta' }}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    {alertField === 'confirmPassword' && (
                                        <div className="alert alert-danger p-1 mt-3 position-relative" role="alert" style={{ fontSize: '0.875rem' }}>
                                            Las contraseñas no coinciden.
                                        </div>
                                    )}
                                </div>
                                <div className="d-grid">
                                    <button
                                        type="submit"
                                        className="btn btn-primary d-flex align-items-center justify-content-center"
                                        style={{ backgroundColor: '#D04B24', border: 'none', borderRadius: '15px', fontFamily: 'Mukta' }}
                                    >
                                        <i className="bi bi-box-arrow-in-right me-2"></i>Registrarse
                                    </button>
                                </div>
                            </form >
                 
                            
                            <div className="text-center mt-3">
                            <div className="d-flex justify-content-center mb-3" style={{ fontFamily: 'Mukta', color: '#D04B24' }}>
                            <span>¿Ya tienes una cuenta?&nbsp;</span> 
                                <Link to="/usuario/login" style={{ color: '#D04B24', textDecoration: 'underline', fontFamily: 'Mukta' }}>
                                     Inicia sesión
                                </Link>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegistroU;
