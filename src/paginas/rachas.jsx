import React, { useState,useEffect } from 'react';
import rachaImg from '../imagenes/racha.png';
import '../estilos/rachas.scss';
import axios from 'axios';




function Rachas() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalHoraOpen, setIsModalHoraOpen] = useState(false);
    const [correoUsuario, setCorreoUsuario] = useState('');
    const [eventData, setEventData] = useState({
        title: '',
        desc: '',
        emocion: '',
        start: new Date(),
    });
    const [emocionHoy, setEmocionHoy] = useState('Feliz');
    const [horaAlerta, setHoraAlerta] = useState('07:00');
    const [isEditable, setIsEditable] = useState(true); // Estado para controlar si los modales son editables
    const [rachaFelizCount, setRachaFelizCount] = useState(0);

    const coloresEmociones = {
        Triste: '#7289da',
        Aburrido: '#495057',
        Enojado: '#d9534f',
        Feliz: '#f4d35e',
        Motivado: '#88c399',
        Ansioso: '#e9967a',
    };

    // Función para abrir y cerrar el modal de emoción
    const toggleModal = () => {
        if (isEditable) setIsModalOpen(!isModalOpen);
    };

    // Función para abrir y cerrar el modal de hora de alerta
    const toggleModalHora = () => {
        if (isEditable) setIsModalHoraOpen(!isModalHoraOpen);
    };

    // Función para guardar la emoción seleccionada
    const handleSaveEmocion = () => {
        setEmocionHoy(eventData.emocion);
        toggleModal();
    };

    // Función para guardar la hora seleccionada
    const handleSaveHora = () => {
        const [hours, minutes] = horaAlerta.split(':');
        const newStartDate = new Date(eventData.start);
        newStartDate.setHours(hours, minutes);
        setEventData({
            ...eventData,
            start: newStartDate,
        });
        toggleModalHora();
    };
    // Función para contar los eventos felices
    const contarEventosFeliz = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/calendario/eventos/${correoUsuario}`);
            
            // Verifica si la respuesta es la esperada (un array de eventos)
            if (Array.isArray(response.data)) {
                const eventos = response.data;
                
                // Filtra solo los eventos que son de 'Racha Diaria' y con 'emocion' igual a 'Feliz'
                const rachasFelices = eventos.filter(evento => 
                    evento.title && evento.title.includes('Racha Diaria') && evento.emocion && evento.emocion.toLowerCase() === 'feliz'
                );
    
                setRachaFelizCount(rachasFelices.length); // Establece el contador de días felices
            } else {
                console.error('La respuesta no es un arreglo de eventos', response.data);
            }
        } catch (error) {
            console.error('Error al contar los eventos:', error);
        }
    };
    
    useEffect(() => {
        const fechaHoy = new Date().toISOString().split('T')[0]; // Solo la fecha (sin hora)
        const fechaUltimaRacha = localStorage.getItem('fechaUltimaRacha');

        // Si la fecha guardada en localStorage es la misma que hoy, desactiva la edición de los modales
        if (fechaUltimaRacha === fechaHoy) {
            setIsEditable(false);
        } else {
            setIsEditable(true);
        }
    }, []);

    useEffect(() => {
        // Recuperar los valores de localStorage si existen
        const savedEmocion = localStorage.getItem('emocionHoy');
        const savedHoraAlerta = localStorage.getItem('horaAlerta');
    
        if (savedEmocion) {
            setEmocionHoy(savedEmocion);
        }
    
        if (savedHoraAlerta) {
            setHoraAlerta(savedHoraAlerta);
        }
    
    
    
        const fetchUsuario = async () => {
            try {
                const response = await fetch('http://localhost:5000/usuarios/estalogin', {
                    method: 'GET',
                    headers: { token: localStorage.getItem('token') }
                });
                const data = await response.json();
                if (response.status === 200) {
                    setCorreoUsuario(data.correo);
                } else {
                    console.error('No se pudo obtener los datos del usuario');
                }
            } catch (error) {
                console.error('Error al obtener los datos del usuario:', error);
            }
        };
        fetchUsuario();
    }, []);
    
    useEffect(() => {
        if (correoUsuario) {
            contarEventosFeliz();
        }
    }, [correoUsuario]);

    const handleCrearEvento = async () => {
        if (!correoUsuario) {
            alert('No se pudo obtener el correo del usuario. Intenta nuevamente.');
            return;
        }
    
        // Obtener la fecha y hora exacta del momento en que se hace clic
        const fechaAhora = new Date();
    
        const evento = {
            title: `Racha Diaria ${emocionHoy}`, // Título dinámico
            desc: `Emoción del día: ${emocionHoy}`,
            emocion: emocionHoy,
            start: fechaAhora, // Usar la fecha y hora actuales como inicio
            end: new Date(fechaAhora.getTime() + 60 * 60 * 1000), // +1 hora a la hora actual
            correo_usuario: correoUsuario, // Asocia el evento al correo del usuario
        };
    
        try {
            // Intentar crear el evento
            const response = await axios.post('http://localhost:5000/calendario/eventos', evento);
    
            // Si la respuesta es exitosa, mostramos el mensaje del backend (mensaje de éxito)
            alert(response.data.message);
    
            // Actualiza el contador de días felices
            contarEventosFeliz();
    
        } catch (error) {
            // Si el error es 400, significa que ya se registró la racha diaria
            if (error.response && error.response.status === 400) {
                alert(error.response.data.message); // Mostrar el mensaje del backend sobre la racha ya registrada
            } else {
                console.error('Error al crear el evento:', error);
                alert('Hubo un problema al crear el evento. Intenta nuevamente.');
            }
        }
    };
    
    
    
    // Modifica el botón "Enviar" para que llame a esta función
    const handleEnviar = () => {
        setIsEditable(false); // Bloquea la edición de los modales
        handleCrearEvento();  // Crea el evento
    
        // Guardar la emoción y hora en localStorage
        localStorage.setItem('emocionHoy', emocionHoy);
        localStorage.setItem('horaAlerta', horaAlerta);
        const fechaHoy = new Date().toISOString().split('T')[0]; // Solo la fecha (sin hora)
        localStorage.setItem('fechaUltimaRacha', fechaHoy);
    };

    return (
        <div className="container-rachas-pag">
            <div className="racha">
                <div className="icono-racha">
                    <img src={rachaImg} alt="Fuego" />
                </div>
                <div className="texto-racha">
                    <h2>{rachaFelizCount} Días</h2>
                    <span>FELIZ</span>
                </div>
            </div>

            <div className="emocion-hoy">
                <div className="emocion">
                    <div className="txt-emocion">Hoy me siento</div>
                    <div
                        className="etiqueta-feliz"
                        style={{
                            backgroundColor: coloresEmociones[emocionHoy],
                            color: 'black',
                        }}
                        onClick={toggleModal}
                    >
                        {emocionHoy}
                    </div>
                </div>

                <div className="hora-alerta">
                    <div className="alerta">Hora de tu recordatorio</div>
                    <div className="hora-container">
                        <div
                            className="hora"
                            onClick={toggleModalHora}
                        >
                            {horaAlerta}
                        </div>
                        {/* Botón "Enviar" al lado de la hora */}
                        <button className="btn btn-success" onClick={handleEnviar}>
                            Enviar
                        </button>
                    </div>
                </div>
            </div>

            <div className="txt-av-desbloquear">Avatares a desbloquear</div>
            <div className="avatares-desbloquear">
                {/* Avatares aquí */}
                <div className="txt-av-desbloquear">Avatares a desbloquear</div>
            <div className="avatares-desbloquear">
                {/* Avatar de 7 días */}
                <div className="avatar-container">
                    <div className="avatar-content">
                        <div className="avatar desbloqueado">
                            <div className="icono-racha">
                                <img src="/avatar7.png" className="image" alt="Avatar 7" />
                            </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 7 días</h3>
                            <p>¡Una semana de sonrisas! Cada pequeño paso cuenta. ¡Sigue brillando! 🌟</p>
                        </div>
                    </div>
                    {/* Avatar de 14 días */}
                    <div className="avatar-content">
                        <div className="avatar desbloqueado">
                            <div className="icono-racha">
                                <img src="/avatar14.png" className="image" alt="Avatar 14" />
                            </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 14 días</h3>
                            <p>Dos semanas de alegría acumulada. ¡Estás creando un hábito positivo y poderoso! 😊</p>
                        </div>
                    </div>
                </div>
                {/* Avatar de 21 días */}
                <div className="avatar-container">
                    <div className="avatar-content">
                        <div className="avatar desbloqueado">
                            <div className="icono-racha">
                                <img src="/avatar21.png" className="image" alt="Avatar 21" />
                            </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 21 días</h3>
                            <p>¡21 días de felicidad! Estás en el camino correcto para transformar tus días. 🌈</p>
                        </div>
                    </div>
                    {/* Avatar de 28 días */}
                    <div className="avatar-content">
                        <div className="avatar desbloqueado">
                            <div className="icono-racha">
                                <img src="/avatar28.png" className="image" alt="Avatar 28" />
                            </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 28 días</h3>
                            <p>¡Un mes de momentos felices! La constancia te lleva más lejos de lo que imaginas. 💪✨</p>
                        </div>
                    </div>
                </div>
                {/* Avatar de 35 días */}
                <div className="avatar-container">
                    <div className="avatar-content">
                        <div className="avatar desbloqueado">
                            <div className="icono-racha">
                                <img src="/avatar35.png" className="image" alt="Avatar 35" />
                            </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 35 días</h3>
                            <p>Más de un mes de felicidad. ¡Sigue alimentando tu alma con buenas vibras! 🌻</p>
                        </div>
                    </div>
                    {/* Avatar de 42 días */}
                    <div className="avatar-content">
                        <div className="avatar desbloqueado">
                            <div className="icono-racha">
                                <img src="/avatar42.png" className="image" alt="Avatar 42" />
                            </div>
                        </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 42 días</h3>
                            <p>¡42 días de alegría ininterrumpida! Cada día cuenta y tu energía positiva crece. 🌟</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>

            {/* Modal para seleccionar la emoción */}
            {isModalOpen && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                        <h2>Selecciona tu emoción</h2>
                        <form>
                            <div className="form-group">
                                <label>Emoción:</label>
                                <select
                                    className="form-control"
                                    value={eventData.emocion}
                                    onChange={(e) => setEventData({ ...eventData, emocion: e.target.value })}
                                    disabled={!isEditable} // Deshabilita si no es editable
                                >
                                    <option value="">Seleccionar emoción</option>
                                    <option value="Feliz">Feliz</option>
                                    <option value="Triste">Triste</option>
                                    <option value="Aburrido">Aburrido</option>
                                    <option value="Ansioso">Ansioso</option>
                                    <option value="Enojado">Enojado</option>
                                    <option value="Motivado">Motivado</option>
                                </select>
                            </div>
                        </form>
                        <button className="btn btn-primary mt-3" onClick={handleSaveEmocion} disabled={!isEditable}>
                            Guardar Cambios
                        </button>
                        <button className="btn btn-secondary mt-3" onClick={toggleModal}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}

            {/* Modal para seleccionar la hora de alerta */}
            {isModalHoraOpen && (
                <div className="modal" style={{ display: 'block' }}>
                    <div className="modal-content" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                        <h2>Selecciona la hora de tu recordatorio</h2>
                        <form>
                            <div className="form-group">
                                <label>Hora:</label>
                                <input
                                    type="time"
                                    className="form-control"
                                    value={horaAlerta}
                                    onChange={(e) => setHoraAlerta(e.target.value)}
                                    disabled={!isEditable} // Deshabilita si no es editable
                                />
                            </div>
                        </form>
                        <button className="btn btn-primary mt-3" onClick={handleSaveHora} disabled={!isEditable}>
                            Guardar Cambios
                        </button>
                        <button className="btn btn-secondary mt-3" onClick={toggleModalHora}>
                            Cerrar
                        </button>
                    </div>
                </div>
            )}
        </div>    
    );
}

export default Rachas;