import React, { useState,useEffect } from 'react';
import rachaImg from '../imagenes/racha.png';
import '../estilos/rachas.scss';
import axios from 'axios';
import toast from "react-hot-toast";

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
    const [rachaMaxima, setRachaMaxima] = useState(0);  // Racha máxima de días consecutivos
    const [rachaActual, setRachaActual] = useState(0);  // Racha actual de días consecutivos

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
        localStorage.setItem('emocionHoy', eventData.emocion);
        
        setEmocionHoy(eventData.emocion);
        toggleModal();
    };

    // Función para guardar la hora seleccionada
    const handleSaveHora = async () => {
        try {
            // Envía la solicitud para actualizar la hora
            const response = await axios.put(
                `http://localhost:5000/usuarios/${correoUsuario}/hora-alerta`,
                { hora_alerta: horaAlerta }
            );
    
            // Si la respuesta es exitosa
            if (response.status === 200) {
                toast.success("Hora de alerta actualizada correctamente", {
                    position: "top-center",
                    duration: 5000,
                    style: {
                        padding: "20px",
                        fontSize: "18px",
                        borderRadius: "10px",
                        background: "#4caf50",
                        color: "#fff",
                    },
                });
            } else {
                toast.error("No se pudo actualizar la hora de alerta", {
                    position: "top-center",
                    duration: 5000,
                    style: {
                        padding: "20px",
                        fontSize: "18px",
                        borderRadius: "10px",
                        background: "#f44336",
                        color: "#fff",
                    },
                });
            }
    
            // Cierra el modal después de actualizar
            toggleModalHora();
    
            // Guarda la hora en el localStorage
            localStorage.setItem("horaAlerta", horaAlerta);
        } catch (error) {
            console.error("Error al actualizar la hora de alerta:", error);
    
            // Muestra un mensaje de error al usuario
            toast.error("Hubo un error al guardar la hora de alerta", {
                position: "top-center",
                duration: 5000,
                style: {
                    padding: "20px",
                    fontSize: "18px",
                    borderRadius: "10px",
                    background: "#f44336",
                    color: "#fff",
                },
            });
    
            // Opcional: Cierra el modal incluso si hubo un error
            toggleModalHora();
        }
    };
    
    // Función para contar los eventos felices
    const contarEventosFeliz = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/calendario/eventos/${correoUsuario}`);
            
            if (Array.isArray(response.data)) {
                const eventos = response.data;
    
                const rachasFelices = eventos.filter(evento => 
                    evento.title && evento.title.includes('Racha Diaria') && evento.emocion && evento.emocion.toLowerCase() === 'feliz'
                );
                
                // Ordenar los eventos por fecha (de más reciente a más antiguo)
                rachasFelices.sort((a, b) => new Date(a.start) - new Date(b.start));
    
                let maxConsecutiveDays = 0;
                let currentStreak = 0;
                for (let i = 1; i < rachasFelices.length; i++) {
                    const prevDate = new Date(rachasFelices[i - 1].start).setHours(0, 0, 0, 0); // Solo fecha
                    const currentDate = new Date(rachasFelices[i].start).setHours(0, 0, 0, 0); // Solo fecha
    
                    if (currentDate - prevDate === 24 * 60 * 60 * 1000) {
                        currentStreak++;
                    } else {
                        maxConsecutiveDays = Math.max(maxConsecutiveDays, currentStreak);
                        currentStreak = 1;
                    }
                }
    
                maxConsecutiveDays = Math.max(maxConsecutiveDays, currentStreak);
    
                // Actualiza el estado con el valor de la racha
                setRachaFelizCount(maxConsecutiveDays); 
            } else {
                console.error('La respuesta no es un arreglo de eventos', response.data);
            }
        } catch (error) {
            console.error('Error al contar los eventos:', error);
        }
    };

    const contarRachas = (eventos) => {
        // Filtrar solo los eventos con 'Racha Diaria' y emoción 'Feliz'
        const eventosFelices = eventos.filter(evento => 
            evento.title.includes('Racha Diaria') && evento.emocion.toLowerCase() === 'feliz'
        );
    
        if (eventosFelices.length === 0) return;
    
        // Ordenar los eventos por fecha (sin tener en cuenta la hora)
        eventosFelices.sort((a, b) => new Date(a.start) - new Date(b.start));
    
        let maxRacha = 0;
        let rachaActual = 1; // Comienza con el primer evento contando como un día de racha
        let ultimaFecha = new Date(eventosFelices[0].start).setHours(0, 0, 0, 0); // Solo la fecha, sin hora
    
        // Recorrer los eventos
        eventosFelices.forEach((evento) => {
            const fechaEvento = new Date(evento.start).setHours(0, 0, 0, 0); // Solo la fecha, sin hora
            const diferenciaDias = (fechaEvento - ultimaFecha) / (1000 * 3600 * 24); // Diferencia en días
    
            // Si la diferencia es de un día, se considera como consecutivo
            if (diferenciaDias === 1) {
                rachaActual++; // Incrementa la racha actual
            } else {
                maxRacha = Math.max(maxRacha, rachaActual); // Actualiza la racha máxima
                rachaActual = 1; // Reinicia la racha
            }
    
            // Actualiza la fecha de la última racha
            ultimaFecha = fechaEvento;
        });
    
        // Verifica la última racha después de recorrer todos los eventos
        maxRacha = Math.max(maxRacha, rachaActual);
    
        // Actualiza los estados o valores según sea necesario
        setRachaMaxima(maxRacha);
        setRachaActual(rachaActual);
    };

    // Obtener los eventos del usuario y contar las rachas
    useEffect(() => {
        const fetchEventos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/calendario/eventos/${correoUsuario}`);
                if (Array.isArray(response.data)) {
                    contarRachas(response.data);
                }
            } catch (error) {
                console.error('Error al obtener los eventos:', error);
            }
        };

        if (correoUsuario) {
            fetchEventos();
        }
    }, [correoUsuario]);
    
    useEffect(() => {
        const fechaHoy = new Date().toISOString().split('T')[0]; // Solo la fecha (sin hora)
        
        const fetchRachaDiaria = async () => {
            try {
                // Realiza una solicitud para obtener los eventos del usuario
                const response = await axios.get(`http://localhost:5000/calendario/eventos/${correoUsuario}`);
                
                // Verifica si hay algún evento de "Racha Diaria" para hoy
                const eventosRachaHoy = response.data.filter(evento => 
                    evento.title.includes('Racha Diaria') && 
                    new Date(evento.start).toISOString().split('T')[0] === fechaHoy
                );
                
                if (eventosRachaHoy.length > 0) {
                    // Si ya existe un evento para hoy, deshabilita la edición
                    setIsEditable(false);
                } else {
                    // Si no existe evento de "Racha Diaria" para hoy, permite la edición
                    setIsEditable(true);
                }
            } catch (error) {
                console.error('Error al verificar los eventos de Racha Diaria:', error);
            }
        };
    
        if (correoUsuario) {
            fetchRachaDiaria();
        }
    }, [correoUsuario]);

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
            await axios.post('http://localhost:5000/calendario/eventos', evento);
    
            // Actualiza el contador de días felices
            contarEventosFeliz();
            setIsEditable(false); // Bloquea la edición del modal
    
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
    const handleEnviar = async () => {
        if (!correoUsuario) {
            // Si correoUsuario no está definido, muestra un error
            toast.error("No se pudo obtener la información del usuario. Intenta nuevamente.", {
                position: "top-center",
                duration: 5000,
                style: {
                    padding: "20px",
                    fontSize: "18px",
                    borderRadius: "10px",
                    background: "#f44336",
                    color: "#fff",
                },
            });
            return;
        }
    
        const fechaHoy = new Date().toISOString().split('T')[0]; // Solo la fecha sin hora
    
        try {
            // Consultar al backend para verificar si ya existe un evento de Racha Diaria para hoy
            const response = await axios.get(`http://localhost:5000/calendario/eventos/${correoUsuario}`);
            const eventos = response.data;
    
            // Filtrar para ver si ya existe un evento de "Racha Diaria" para hoy
            const eventoExistente = eventos.some(evento => 
                evento.title.includes('Racha Diaria') && 
                evento.emocion.toLowerCase() === 'feliz' &&
                new Date(evento.start).toISOString().split('T')[0] === fechaHoy
            );
    
            if (eventoExistente) {
                // Si ya existe el evento, mostramos una notificación y detenemos el flujo
                toast.error("Ya has registrado tu racha diaria para hoy.", {
                    position: "top-center",
                    duration: 5000,
                    style: {
                        padding: "20px",
                        fontSize: "18px",
                        borderRadius: "10px",
                        background: "#d17328",
                        color: "#fff",
                    },
                });
                return;
            }
    
            // Si no existe, permitimos la creación del evento
            handleCrearEvento();
    
            // Guardar la emoción en localStorage
            localStorage.setItem('emocionHoy', emocionHoy);
            localStorage.setItem('fechaUltimaRacha', fechaHoy);
    
            // Mostrar notificación de éxito
            toast.success("¡Racha diaria registrada con éxito!", {
                position: "top-center",
                duration: 5000,
                style: {
                    padding: "20px",
                    fontSize: "18px",
                    borderRadius: "10px",
                    background: "#4caf50",
                    color: "#fff",
                },
            });
        } catch (error) {
            console.error('Error al verificar eventos:', error);
    
            // Mostrar una notificación de error
            toast.error("Hubo un problema al verificar los eventos. Intenta nuevamente.", {
                position: "top-center",
                duration: 5000,
                style: {
                    padding: "20px",
                    fontSize: "18px",
                    borderRadius: "10px",
                    background: "#f44336",
                    color: "#fff",
                },
            });
        }
    };


    return (
        <div className="container-rachas-pag">
        <div className="rachas-contenedor">
    <div className="racha">
        <div className="icono-racha">
            <img src={rachaImg} alt="Fuego" />
        </div>
        <div className="texto-racha">
            <h2>{rachaActual} Días</h2> {/* Contador para la racha actual */}
            <span>Racha Actual</span>
        </div>
    </div>

    <div className="racha-maxima">
        <div className="icono-racha">
            <img src={rachaImg} alt="Fuego" />
        </div>
        <div className="texto-racha">
            <h2>{rachaMaxima} Días</h2> {/* Contador para la racha máxima */}
            <span>Racha Máxima</span>
        </div>
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
            <div className="alerta">Hora de Alerta</div>
            <div className="hora-container">
                <div className="hora" onClick={toggleModalHora}>
                    {horaAlerta}
                </div>
            </div>
        </div>

        {/* Botón "Enviar" en un contenedor separado */}
        <div className="btn-container">
            <button className="btn btn-success" onClick={handleEnviar}>
                Enviar
            </button>
        </div>
    </div>

            <div className="txt-av-desbloquear">Avatares a desbloquear</div>
            <div className="avatares-desbloquear">
                
                {/* Avatar de 7 días */}
                <div className="avatar-container">
                    <div className="avatar-content">
                            <div className="icono-racha">
                                <img src="/gatoFeliz.png" className="image" alt="Avatar 7" />
                            </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 3 días</h3>
                            <h5>¡3 días de sonrisas! Cada pequeño paso cuenta. ¡Sigue brillando! 🌟</h5>
                        </div>
                    </div>
                    {/* Avatar de 14 días */}
                    <div className="avatar-content">
                            <div className="icono-racha">
                                <img src="/perroFeliz.png" className="image" alt="Avatar 14" />
                            </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 5 días</h3>
                            <h5>casi una semana de alegría acumulada. ¡Estás creando un hábito positivo y poderoso! 😊</h5>
                        </div>
                    </div>
                </div>
                {/* Avatar de 21 días */}
                <div className="avatar-container">
                    <div className="avatar-content">
                            <div className="icono-racha">
                                <img src="/conejoFeliz.png" className="image" alt="Avatar 21" />
                            </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 5 días</h3>
                            <h5>¡Cinco días de felicidad! Estás en el camino correcto para transformar tus días. 🌈</h5>
                        </div>
                    </div>
                    {/* Avatar de 28 días */}
                    <div className="avatar-content">
                            <div className="icono-racha">
                                <img src="/vacaFeliz.png" className="image" alt="Avatar 28" />
                            </div>
                        <div className="texto-avatar">
                            <h3>Desbloquea este avatar cuando hayas alcanzado una racha de felicidad de 10 días</h3>
                            <h5>¡10 días felices! La constancia te lleva más lejos de lo que imaginas. 💪✨</h5>
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