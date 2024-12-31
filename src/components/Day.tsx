import dayjs from 'dayjs';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
import Event from '../types/Event';

interface DayProps {
  day: dayjs.Dayjs;
  weekIdx: number;
}

const Day = ({ day, weekIdx }: DayProps) => {
  const [dayEvents, setDayEvents] = useState<Event[]>([]);
  const { setSelectedDay, setShowEventModal, filteredEvents, setSelectedEvent } = useContext(GlobalContext);

  useEffect(() => {
    const events = filteredEvents.filter(evt => dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY"));
    setDayEvents(events);
  }, [filteredEvents, day]);

  const getCurrentDayClass = () => {
    return day.format('DD-MM-YY') === dayjs().format('DD-MM-YY') ? 'bg-blue-600 text-white rounded-full w-7' : '';
  };

  return (
    <div className='border border-gray-200 flex flex-col'>
      <header className='flex flex-col items-center'>
        {weekIdx === 0 && <p className='text-sm mt-1'>{day.format('ddd').toUpperCase()}</p>}
        <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>
          {day.format('DD')}
        </p>
      </header>
      <div className="flex-1 cursor-pointer" onClick={() => {
        setSelectedDay(day);
        setShowEventModal(true);
      }}>
        {dayEvents.map((evt, evtIdx) => (
          <div
            key={evtIdx}
            onClick={() => setSelectedEvent(evt)}
            className={`bg-${evt.label}-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}>
            {evt.title}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Day;