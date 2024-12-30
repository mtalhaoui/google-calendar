import { useContext, useEffect, useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';

import { getMonth } from '../util';
import GlobalContext from '../context/GlobalContext';
import React from 'react';

const SmallCalendar = () => {
  const [currentMonthIndex, setCurrentMonthIndex] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIndex));
  }, [currentMonthIndex]);
  const { monthIndex, setSmallCalendarMonth, selectedDay, setSelectedDay } = useContext(GlobalContext);

  useEffect(() => {
    setCurrentMonthIndex(monthIndex);
  }, [monthIndex]);

  const handlePrevMonth = () => setCurrentMonthIndex(currentMonthIndex - 1);
  const handleNextMonth = () => setCurrentMonthIndex(currentMonthIndex + 1);
  const getDayClass = (day: Dayjs) => {
    const format = "DD-MM-YY";
    const nowDay = dayjs().format(format);
    const currentDate = day.format(format);
    const daySelected = selectedDay && (selectedDay as Dayjs).format(format);

    if (nowDay === currentDate) {
      return 'bg-blue-500 rounded-full text-white';
    } else if (daySelected === currentDate) {
      return 'bg-blue-100 rounded-full text-blue-600 font-bold';
    } else {
      return '';
    }
  };

  return (
    <div className='mt-9'>
      <header className='flex justify-between'>
        <p className='text-gray-500 font-bold'>
          {dayjs(new Date(dayjs().year(), currentMonthIndex)).format("MMMM YYYY")}
        </p>
        <div>
          <button onClick={handlePrevMonth}><span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>chevron_left</span></button>
          <button onClick={handleNextMonth}><span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>chevron_right</span></button>
        </div>
      </header>
      <div className="grid grid-cols-7 grid-rows-6">
        {currentMonth[0].map((day, dayIndex) => (
          <span key={dayIndex} className='text-sm py-1 text-center'>
            {day.format('dd').charAt(0)}
          </span>
        ))}
        {currentMonth.map((week, weekIndex) => (
          <React.Fragment key={weekIndex}>
            {week.map((day, dayIndex) => (
              <button
                key={dayIndex}
                onClick={() => {
                  setSmallCalendarMonth(currentMonthIndex);
                  setSelectedDay(day);
                }}
                className={`py-1 w-full ${getDayClass(day)}`}><span className='text-sm'>{day.format('D')}</span></button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SmallCalendar;