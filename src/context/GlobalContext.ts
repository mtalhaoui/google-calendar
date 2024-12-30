import React, { Dispatch } from "react";
import dayjs, { Dayjs } from "dayjs";

import SavedEventsAction from "../types/SavedEventsAction";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index: number) => {},
  smallCalendarMonth: null as number | null,
  setSmallCalendarMonth: (index: number | null) => {},
  selectedDay: dayjs(),
  setSelectedDay: (day: Dayjs) => {},
  showEventModal: false,
  setShowEventModal: (show: boolean) => {},
  dispatchCallEvent: (() => {}) as Dispatch<SavedEventsAction>,
});

export default GlobalContext;
