import React, { useState } from 'react';
import { Calendar, momentLocalizer} from 'react-big-calendar';
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
    emocion: 'Triste',
    },
    {   
    id: 2,
    title: 'Prueba 2',
    emocion: 'Feliz',
    start: moment('2024-09-18 07:00').toDate(),
    end: moment('2024-09-20 09:00').toDate(),
    desc: 'Prueba de eventos de historia',
    color: 'purple',
    tipo: 'Prueba',
},
{
    id: 3,
    start: moment('2024-09-17').toDate(),
    end: moment('2024-09-18').toDate(),
    desc: 'Parcial1',
    color: 'green',
    tipo: 'Prueba',
    title: 'Prueba 3',
    emocion: 'Aburrido',
    },
{
    id: 4,
    start: moment('2024-09-21').toDate(),
    end: moment('2024-09-23 7:00' ).toDate(),
    desc: 'Parcial1',
    color: 'green',
    tipo: 'Prueba',
    title: 'Prueba 3',
    emocion: 'Motivado',
},
{
    id: 1,
    start: moment('2024-09-17').toDate(),
    end: moment('2024-09-18').toDate(),
    desc: 'Prueba de eventos de matemáticas',
    color: 'green',
    tipo: 'Prueba',
    title: 'Prueba 4',
    emocion: 'Triste',
    },
    {
        id: 3,
        start: moment('2024-09-17').toDate(),
        end: moment('2024-09-18').toDate(),
        desc: 'Prueba de eventos de matemáticas',
        color: 'green',
        tipo: 'Prueba',
        title: 'Prueba 5',
        emocion: 'Enojado',
        },
]);

const handleEventClick = (event) => {
    SeteventoSelecionado(event);
};

const handleEventClose = () => {
    SeteventoSelecionado(null);
};

const estilosevento = (eventos) => {
    let color;
    switch (eventos.emocion) {
        case 'Triste':
            color = 'blue';
            break;
        case 'Aburrido':
            color = 'purple';
            break;
        case 'Enojado':
            color = '#d9534f';
            break;
        case 'Feliz':
            color = '#f4d35e';
            break;
        case 'Motivado':
            color = '#88c399';
            break;
        case 'Ancioso':
            color = '#e9967a';
            break;
        default:
            color = eventos.color;  
            break;
    }
    return {
        style: {
            backgroundColor: color,
            color: 'black'
        }
    };
};
const EventModal = ({evento, onClose }) => {
    return (
    <div className="modal">
        <div className="modal-content">
        <h2>{evento.title}</h2>
        <p>Descripción: {evento.desc}</p>
        <p>Emocion: {evento.emocion}</p>
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