import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../estilos/calendario.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios';

moment.locale('es');

const EventModal = ({ evento, onClose, onSave }) => {
    const [eventData, setEventData] = useState({
        title: '',
        desc: '',
        emocion: '',
        start: new Date(),
        end: new Date(),
    });

    // useEffect para actualizar el estado cuando cambie el evento
    useEffect(() => {
        if (evento) {
            setEventData({
                title: evento.title || '',
                desc: evento.descripcion || '', // Asegúrate de que esta propiedad sea la correcta
                emocion: evento.emocion || '',
                start: new Date(evento.start), // Asegúrate de que sea un objeto Date
                end: new Date(evento.end),     // Asegúrate de que sea un objeto Date
            });
        }
    }, [evento]);

    const handleSave = () => {
        if (onSave) {
            onSave(eventData);
        }
    };

    return (
        <div className="modal" style={{ display: 'block' }}>
            <div className="modal-content" style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
                <h2>{evento.title ? 'Editar Evento' : 'Agregar Evento'}</h2>
                <form>
                    <div className="form-group">
                        <label>Título:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={eventData.title}
                            onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción:</label>
                        <input
                            className="form-control"
                            type="text"
                            value={eventData.desc}
                            onChange={(e) => setEventData({ ...eventData, desc: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Emoción:</label>
                        <select
                            className="form-control"
                            value={eventData.emocion}
                            onChange={(e) => setEventData({ ...eventData, emocion: e.target.value })}
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
                    <div className="form-group">
                        <label>Inicio:</label>
                        <DatePicker
                            className="form-control"
                            selected={eventData.start}
                            onChange={(date) => setEventData({ ...eventData, start: date })}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </div>
                    <div className="form-group">
                        <label>Fin:</label>
                        <DatePicker
                            className="form-control"
                            selected={eventData.end}
                            onChange={(date) => setEventData({ ...eventData, end: date })}
                            showTimeSelect
                            dateFormat="Pp"
                        />
                    </div>
                </form>
                <button className="btn btn-primary mt-3" onClick={handleSave}>
                    {evento.title ? 'Guardar Cambios' : 'Agregar Evento'}
                </button>
                <button className="btn btn-secondary mt-3" onClick={onClose}>Cerrar</button>
            </div>
        </div>
    );
};

const Calendario = () => {
    const localizer = momentLocalizer(moment);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);
    const [eventos, setEventos] = useState([]);
    const [correoUsuario, setCorreoUsuario] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [currentView, setCurrentView] = useState('month'); // Estado de vista actual
    const [currentDate, setCurrentDate] = useState(moment().toDate()); // Estado de fecha actual

    useEffect(() => {
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

    const fetchEventos = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/calendario/eventos/${correoUsuario}`);
            setEventos(response.data);
        } catch (error) {
            console.error('Error al cargar los eventos:', error);
        }
    };

    useEffect(() => {
        if (correoUsuario) {
            fetchEventos();
        }
    }, [correoUsuario]);

    const handleEventClick = (event) => {
        if (event.title.includes('Racha Diaria')) {
            alert('No puedes editar la Racha Diaria.');
            return;  // Evita que el evento sea editable
        }
        setEventoSelecionado(event);
        setModalVisible(true);
        
    };

    const handleEventClose = () => {
        setEventoSelecionado(null);
        setModalVisible(false);
    };

    const handleSelectSlot = ({ start, end }) => {
        setEventoSelecionado({ title: '', desc: '', emocion: '', start, end });
        setModalVisible(true);
    };

    const handleDrillDown = (date) => {
        setCurrentView('agenda'); // Cambia manualmente a la vista de agenda
        setCurrentDate(date); // Cambia a la fecha seleccionada
    };
    

    const handleAddOrUpdateEvent = async (eventData) => {
        const eventoConCorreo = { ...eventData, correo_usuario: correoUsuario };
    
        if (!eventoConCorreo.title || !eventoConCorreo.emocion || !eventoConCorreo.desc) {
            alert('Por favor, completa todos los campos obligatorios.');
            return;
        }
    
        try {
            if (eventoSelecionado?.id) {
                // Si hay un evento seleccionado, actualiza el evento
                const response = await axios.put(`http://localhost:5000/calendario/${eventoSelecionado.id}`, eventoConCorreo);
                setEventos(eventos.map((event) => (event.id === eventoSelecionado.id ? response.data : event)));
            } else {
                // Si no hay un evento seleccionado, crea uno nuevo
                const response = await axios.post('http://localhost:5000/calendario/eventos', eventoConCorreo);
                
                // Si el backend devuelve un error de "racha ya registrada", muestra un mensaje
                if (response.status === 400) {
                    alert(response.data.message);
                    return;
                }
    
                setEventos([...eventos, response.data]); // Añadir el nuevo evento
            }
        } catch (error) {
            console.error('Error al procesar el evento:', error);
            alert('Hubo un problema al guardar el evento. Intenta nuevamente.');
        } finally {
            fetchEventos();  // Actualizar lista completa de eventos
            setModalVisible(false);
            setEventoSelecionado(null);
        }
    };
    

    const estiloEvento = (evento) => {
        const colorMap = {
            Triste: '#7289da',
            Aburrido: '#495057',
            Enojado: '#d9534f',
            Feliz: '#f4d35e',
            Motivado: '#88c399',
            Ansioso: '#e9967a'
        };
        return {
            style: {
                backgroundColor: colorMap[evento.emocion] || 'grey',
                color: 'black'
            }
        };
    };

    return (
        <div className="calendar-container">
            <Calendar
                localizer={localizer}
                events={eventos}
                date={currentDate}
                view={currentView}
                onNavigate={(date) => setCurrentDate(date)}
                onView={(view) => setCurrentView(view)}
                onDrillDown={handleDrillDown}
                key={eventos.length}
                onSelectEvent={handleEventClick}
                onSelectSlot={handleSelectSlot}
                eventPropGetter={estiloEvento}
                selectable
                defaultDate={moment().toDate()}
                components={{
                    toolbar: CustomToolbar,
                }}
                defaultView="month"
                style={{ height: '100%', width: '100%' }}
                messages={{
                    next: 'Siguiente',
                    previous: 'Anterior',
                    today: 'Hoy',
                    month: 'Mes',
                    week: 'Semana',
                    day: 'Día',
                    agenda: 'Agenda',
                    date: 'Fecha',
                    time: 'Hora',
                    event: 'Evento',
                    allDay: 'Todo el día',
                    noEventsInRange: 'No hay eventos en este rango de fechas.',
                    showMore: (total) => `+ Ver más (${total})`,
                }}
            />
            {modalVisible && (
                <EventModal
                    evento={eventoSelecionado}
                    onClose={handleEventClose}
                    onSave={handleAddOrUpdateEvent}
                />
            )}
        </div>
    );
};

const CustomToolbar = ({ label, onView, onNavigate, views }) => {
    const [itemText, setItemText] = useState('Mes');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleViewChange = (view) => {
        onView(view);
        switch (view) {
            case 'month':
                setItemText('Mes');
                break;
            case 'week':
                setItemText('Semana');
                break;
            case 'day':
                setItemText('Día');
                break;
            default:
                setItemText('Mes');
        }
    };

    const handleDateChange = (date) => {
        setSelectedDate(date);
        onNavigate('DATE', date); // Navega a la fecha seleccionada
        setIsDatePickerOpen(false); // Cierra el DatePicker después de seleccionar la fecha
    };

    return (
        <div className="toolbar-container">
            <h1 className='mesAno'>{label}</h1>

            <div className="dirtop">
                <div className="dropdown" style={{ position: 'relative' }}>
                    <button
                        className='btn btn-secondary dropdown-toggle'
                        type='button'
                        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} // Alterna la apertura del DatePicker
                    >
                        Seleccionar Fecha
                    </button>
                    {isDatePickerOpen && (
                        <div style={{ position: 'absolute', zIndex: 999, background: 'white' }}> {/* Ajusta el zIndex aquí */}
                            <DatePicker
                                selected={selectedDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                inline // Muestra el calendario en línea
                                
                            />
                        </div>
                    )}
                </div>

                <div className="dropdown" style={{ marginLeft: '15px' }}>
                    <button
                        className='btn btn-secondary dropdown-toggle'
                        type='button'
                        id='dropdownMenuButton'
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                    >
                        {itemText}
                    </button>
                    <ul className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
                        {views.map((view, index) => (
                            <div key={index}>
                                <li>
                                    <button
                                        className='dropdown-item'
                                        onClick={() => handleViewChange(view)}
                                    >
                                        {view === 'month' ? 'Mes' : view === 'week' ? 'Semana' : view === 'day' ? 'Día' : 'Agenda'}
                                    </button>
                                </li>
                                {index === 2 && <hr className='dropdown-divider'></hr>}
                            </div>
                        ))}
                    </ul>
                </div>

                <div className="toolbar-navegation" style={{ marginLeft: '15px' }}>
                    <button className='btn btn-secondary btn-ls mr-2 border-0' onClick={() => onNavigate('TODAY')}>Hoy</button>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('PREV')} style={{ marginLeft: '15px' }}><i className="bi bi-caret-left"></i></button>
                    <button className='btn btn-sm mr-2 text-secondary' onClick={() => onNavigate('NEXT')}><i className="bi bi-caret-right"></i></button>
                </div>
            </div>
        </div>
    );
};

export default Calendario;
