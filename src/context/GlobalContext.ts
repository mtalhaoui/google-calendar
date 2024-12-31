import React, { Dispatch } from "react";
import dayjs, { Dayjs } from "dayjs";

import SavedEventsAction from "../types/SavedEventsAction";
import Event from "../types/Event";
import SidebarLabel from "../types/SidebarLabel";

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (_index: number) => {},
  smallCalendarMonth: null as number | null,
  setSmallCalendarMonth: (_index: number | null) => {},
  selectedDay: dayjs(),
  setSelectedDay: (_day: Dayjs) => {},
  showEventModal: false,
  setShowEventModal: (_show: boolean) => {},
  dispatchCallEvent: (() => {}) as Dispatch<SavedEventsAction>,
  selectedEvent: null as Event | null,
  setSelectedEvent: (() => {}) as Dispatch<Event | null>,
  savedEvents: [] as Event[],
  labels: [] as SidebarLabel[],
  setLabels: (() => {}) as Dispatch<SidebarLabel[]>,
  updateLabel: (_label: SidebarLabel) => {},
  filteredEvents: [] as Event[],
});

export default GlobalContext;
