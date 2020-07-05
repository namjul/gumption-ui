import * as React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Layout } from './layout';
import { HeaderBar } from './headerBar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment); // or globalizeLocalizer
const myEventsList = [
  {
    id: 0,
    title: 'Meeting',
    start: moment({ hours: 8 }).toDate(),
    end: moment({ hours: 10 }).toDate(),
  },
  {
    id: 1,
    title: 'Lunch',
    start: moment({ hours: 12 }).toDate(),
    end: moment({ hours: 13 }).toDate(),
  },
];

export const Kalendar = () => (
    <Layout>
      <HeaderBar path="Calendar" />
      <div style={{ height: '500px' }}>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
        />
      </div>
    </Layout>
);