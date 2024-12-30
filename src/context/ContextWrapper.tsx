import { ReactNode, useEffect, useReducer, useState } from "react";
import dayjs from "dayjs";

import GlobalContext from "./GlobalContext";
import SavedEventsAction from "../types/SavedEventsAction";
import Event from "../types/Event";

interface ContextWrapperProps {
  children: ReactNode;
}

interface SavedEventsState extends Array<Event> { }

const savedEventsReducer = (state: SavedEventsState, action: SavedEventsAction): SavedEventsState => {
  switch (action.type) {
    case "push":
      return [...state, action.payload];
    case "update":
      return state.map((evt) => evt.id === action.payload.id ? action.payload : evt);
    case "delete": return state.filter((evt) => evt.id !== action.payload.id);
    default:
      throw new Error("Unknown action type");
  }
};

const initEvents = () => {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
};

const ContextWrapper = ({ children }: ContextWrapperProps) => {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState<number | null>(null);
  const [selectedDay, setSelectedDay] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [savedEvents, dispatchCallEvent] = useReducer(savedEventsReducer, [], initEvents);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  return (
    <GlobalContext.Provider value={{
      monthIndex,
      setMonthIndex,
      smallCalendarMonth,
      setSmallCalendarMonth,
      selectedDay,
      setSelectedDay,
      showEventModal,
      setShowEventModal,
      dispatchCallEvent,
      selectedEvent,
      setSelectedEvent,
      savedEvents
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;