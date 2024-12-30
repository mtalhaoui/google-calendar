import dayjs from "dayjs";
import React from "react";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => {},
  smallCalendarMonth: null,
  setSmallCalendarMonth: (index) => {},
  selectedDay: dayjs(),
  setSelectedDay: (day) => {},
  showEventModal: false,
  setShowEventModal: (value) => {},
});

export default GlobalContext;
