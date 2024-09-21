import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es'; 
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../estilos/calendario.css'; 

moment.locale('es'); 

const Calendario = () => {
const localizer = momentLocalizer(moment); 
const [eventoSelecionado, SeteventoSelecionado] = useState(null);
const [eventos] = useState([
    {
    id: 1,
    start: moment('2024-09-17').toDate(),
    end: moment('2024-09-18').toDate(),
    desc: 'Prueba de eventos de matemáticas',
    color: 'green',
    tipo: 'Prueba',
    title: 'Prueba 1',
    },
    {   
    id: 2,
    title: 'Prueba 2',
    start: moment('2024-09-18 07:00').toDate(),
    end: moment('2024-09-20 09:00').toDate(),
    desc: 'Prueba de eventos de historia',
    color: 'purple',
    tipo: 'Prueba',
    }
]);
const estilosevento = (eventos) => ({
    style:{
        backgroundColor:eventos.color    
}
})

const handleEventClick = (event) => {
    SeteventoSelecionado(event);
};

const handleEventClose = () => {
    SeteventoSelecionado(null);
};

const EventModal = ({evento, onClose }) => {
    return (
    <div className="modal">
        <div className="modal-content">
        <h2>{evento.title}</h2>
        <p>Descripción: {evento.desc}</p>
        <p>Inicio: {evento.start.toLocaleString()}</p>
        <p>Fin: {evento.end.toLocaleString()}</p>
        <button onClick={onClose}>Cerrar</button>
        </div>
    </div>
    );
};

return (
    <div className='tela'>
        <div className="toolbar">
        </div>
        <div className="calendar-container">
    <Calendar
        localizer={localizer}
        events={eventos}
        onSelectEvent={handleEventClick}
        defaultDate={moment().toDate()}
        defaultView='month'
        eventPropGetter={estilosevento}
        style={{ height: '100%', width: '100%' }}
        formats={{
        dayHeaderFormat: (date) => {
            return moment(date).format('dddd - DD/MM/YY');
        },
        }}
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
    {eventoSelecionado && (
    <EventModal
        evento={eventoSelecionado}
        onClose={handleEventClose}
    />
    )}
    </div>

    </div>
    
);
};

export default Calendario;