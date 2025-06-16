import React from 'react';
import { Calendar } from 'react-big-calendar';
import { momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/pt-br';

const localizer = momentLocalizer(moment);
var defaultMessages = {
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  allDay: 'Dia Todo',
  week: 'Semana',
  work_week: 'Eventos',
  day: 'Dia',
  month: 'Mês',
  previous: 'Anterior',
  next: 'Próximo',
  yesterday: 'Ontem',
  tomorrow: 'Amanhã',
  today: 'Hoje',
  agenda: 'Agenda',
  noEventsInRange: 'Não há eventos no período.',
  showMore: function showMore(total) {
    return '+' + total + ' mais';
  }
};
const myEventsList = [
  {
    id: 1,
    title: 'Reunião Databit',
    location: 'Databit Tecnologia',
    start: new Date('2024-04-09 09:00:00'),
    end: new Date('2024-04-09 09:30:00')
  },
  {
    id: 2,
    title: 'Médico',
    location: 'Eldorado',
    start: new Date('2024-04-09 15:00:00'),
    end: new Date('2024-04-09 16:30:00')
  },
  {
    id: 3,
    title: 'Fazer Compras',
    location: 'Supermercado BH',
    start: new Date('2024-04-09 19:00:00'),
    end: new Date('2024-04-09 19:30:00')
  },
  {
    id: 4,
    title: 'Viajar',
    location: 'Divinópolis',
    start: new Date(2024, 3, 8, 8, 30, 0),
    end: new Date(2024, 3, 8, 12, 30, 0)
  }
];

const Calendario = (props) => {
  return (
    <Calendar
      messages={defaultMessages}
      localizer={localizer}
      formats={{
        agendaDateFormat: 'DD/MM ddd',
        weekdayFormat: 'dddd'
      }}
      events={myEventsList}
      startAccessor="start"
      endAccessor="end"
      style={{ height: '500px', marginBottom: '20px' }}
    />
  );
};

export default Calendario;
