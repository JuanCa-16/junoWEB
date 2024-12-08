import React, { useState, useEffect } from 'react';
import '../estilos/fotoPerfil.scss'
import avatar1 from '/ava1.png';
import avatar2 from "/logos.png"
import avatar3 from '/gatoFeliz.png';
import avatar4 from '/perroFeliz.png';
import avatar5 from '/conejoFeliz.png';
import avatar6 from '/vacaFeliz.png';
import { toast, Toaster } from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
const fotoPerfil = () => {
    const navigate = useNavigate();
    const [rachaMaxima, setRachaMaxima] = useState(0); // Estado para guardar la racha máxima
    const [habilitarFotos, setHabilitarFotos] = useState([true, true, false, false, false]); // Habilitar las fotos según la racha
    const [fotoPerfil, setFotoPerfil] = useState(null); // Estado para guardar la referencia de la foto

    const obtenerRachaMaxima = async () => {
        try {

             // Traer el id del usuario que está logueado
            const traerCorreo = await fetch('http://localhost:5000/usuarios/estalogin', {
                method: 'GET',
                headers: { token: localStorage.getItem('token') }
            });

            const info = await traerCorreo.json();
            if (traerCorreo.status !== 200) {
                console.log('No se pudo obtener los datos del usuario');
                return; // Salir si hay un error
            }

            const userEmail = info.correo; // Guardar el email

            const response = await fetch(`http://localhost:5000/perfil/idfoto/${userEmail}`);
            const data = await response.json();
            if (response.ok) {
                setFotoPerfil(data.referencia_foto); // Asignamos la referencia de la foto
                console.log(data.racha_max)
                    setRachaMaxima(data.racha_max); // Asignar la racha máxima recibida
                    // Asignar habilitación de fotos según la racha
                    if (data.racha_max >= 10) {
                        setHabilitarFotos([true, true, true, true, true, true, true, true, true, true]);
                    } else if (data.racha_max  >= 7) {
                        setHabilitarFotos([true, true, true, true, true]);
                    } else if (data.racha_max  >= 5) {
                        setHabilitarFotos([true, true, true, true, false]);
                    } else if (data.racha_max  >= 3) {
                        setHabilitarFotos([true, true, true, false, false]);
                    }
                
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error al obtener la foto de perfil:', error);
        }
    };

    useEffect(() => {
        obtenerRachaMaxima(); // Llamada al backend al montar el componente
    }, []);

    const actualizarPerfil = async (avatarSeleccionado) => {
        try {
            // Obtener el correo del usuario logueado
            const traerCorreo = await fetch('http://localhost:5000/usuarios/estalogin', {
                method: 'GET',
                headers: { token: localStorage.getItem('token') }
            });
    
            const info = await traerCorreo.json();
            if (traerCorreo.status !== 200) {
                console.log('No se pudo obtener los datos del usuario');
                return; // Salir si hay un error
            }
    
            const userEmail = info.correo; // Guardar el email
    
            // Actualizar la foto de perfil en el backend
            const response = await fetch(`http://localhost:5000/perfil/actualizarfoto/${userEmail}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    token: localStorage.getItem('token') // Usar el token para autenticar la solicitud
                },
                body: JSON.stringify({
                    id: avatarSeleccionado // Referencia a la nueva foto
                })
            });
    
            const data = await response.json();
            if (response.ok) {
                // Actualizar el estado de la foto de perfil si la respuesta es exitosa
                setFotoPerfil(avatarSeleccionado);
                // alert('Foto de perfil actualizada exitosamente');
                // window.location.reload();
                toast.success("Foto de perfil actualizada");
                navigate('/perfil')
                
            } else {
                console.error('Error al actualizar la foto de perfil:', data.error);
            }
        } catch (error) {
            console.error('Error al actualizar la foto de perfil:', error);
        }
    };
    

    return (
        <div className="container-fotos">
            <h1 className="titulo">Editar Foto de Perfil</h1>
            <button onClick={() => navigate('/perfil')}>Regresar</button>
            <div className="seccion-fotos">
                {/* Foto 1 */}
                <div className={`profileContainer ${habilitarFotos[0] ? 'activo' : 'deshabilitado'}`}>
                    <img src={avatar1} alt="Avatar" />
                    <div className="profileContents">
                        <h3 className="name">Zorro</h3>
                        <button  className="cambiarImg" disabled={!habilitarFotos[0]} onClick={() => habilitarFotos[0] && actualizarPerfil(1)}>{habilitarFotos[0] ? 'Elegir' : 'Con rachas'}</button>
                    </div>
                </div>

                {/* Foto 2 */}
                <div className={`profileContainer ${habilitarFotos[1] ? 'activo' : 'deshabilitado'}`}>
                    <img src={avatar2} alt="Avatar" />
                    <div className="profileContents">
                        <h3 className="name">Juno</h3>
                        <button  className="cambiarImg" disabled={!habilitarFotos[1]} onClick={() => habilitarFotos[1] && actualizarPerfil(2)}>{habilitarFotos[1] ? 'Elegir' : 'Con rachas'}</button> </div>
                </div>

                {/* Foto 3 */}
                <div className={`profileContainer ${habilitarFotos[2] ? 'activo' : 'deshabilitado'}`}>
                    <img src={avatar3} alt="Avatar" />
                    <div className="profileContents">
                        <h3 className="name">Gato Feliz</h3>
                        <button  className="cambiarImg" disabled={!habilitarFotos[2]} onClick={() => habilitarFotos[2] && actualizarPerfil(3)}>{habilitarFotos[2] ? 'Elegir' : '3 de rachas'}</button>
                    </div>
                </div>

                {/* Foto 4 */}
                <div className={`profileContainer ${habilitarFotos[3] ? 'activo' : 'deshabilitado'}`}>
                    <img src={avatar4} alt="Avatar" />
                    <div className="profileContents">
                        <h3 className="name">Perro Feliz</h3>
                        <button  className="cambiarImg" disabled={!habilitarFotos[3]} onClick={() => habilitarFotos[3] && actualizarPerfil(4)}>{habilitarFotos[3] ? 'Elegir' : '5 rachas'}</button>
                    </div>
                </div>

                {/* Foto 5 */}
                <div className={`profileContainer ${habilitarFotos[4] ? 'activo' : 'deshabilitado'}`}>
                    <img src={avatar5} alt="Avatar" />
                    <div className="profileContents">
                        <h3 className="name">Conejo Feliz</h3>
                        <button  className="cambiarImg" disabled={!habilitarFotos[4]} onClick={() => habilitarFotos[4] && actualizarPerfil(5)}>{habilitarFotos[4] ? 'Elegir' : '5 rachas'}</button>
                    </div>
                </div>

                {/* Foto 6 */}
                <div className={`profileContainer ${habilitarFotos[5] ? 'activo' : 'deshabilitado'}`}>
                    <img src={avatar6} alt="Avatar" />
                    <div className="profileContents">
                        <h3 className="name">Vaca Feliz</h3>
                        <button  className="cambiarImg" disabled={!habilitarFotos[5]} onClick={() => habilitarFotos[5] && actualizarPerfil(6)}>{habilitarFotos[5] ? 'Elegir' : '10 rachas'}</button>
                    </div>
                </div>

            </div>
        </div>
    );
}


export default fotoPerfil
