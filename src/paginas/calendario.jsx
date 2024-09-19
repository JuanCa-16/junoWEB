import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../estilos/calendario.css';

moment.locale('es');

const Calendario = () => {
const localizer = momentLocalizer(moment);
const events = [
    {
    start: moment('2024-09-16').toDate(),
    end: moment('2024-09-18').toDate(),
    title: 'Evento 1',
    },
    {
    start: moment('2024-09-18 18:30').toDate(),
    end: moment('2024-09-18 19:45').toDate(),
    title: 'Evento 2',
    },
];

return (
    <div className="calendar-container">
    <Calendar
        localizer={localizer}
        events={events}
        style={{ height: '100%', width: '100%' }}
        formats={{
        dayHeaderFormat: (date) => {
            return moment(date).format('dddd - YY/MM/DD');
        },
        }}
        messages={{
        next: 'Siguiente',
        previous: 'Anterior',
        today: 'Hoy',
        month: 'Mes',
        week: 'Semana',
        day: 'Día',
        }}
    />
    </div>
);
};

export default Calendario;