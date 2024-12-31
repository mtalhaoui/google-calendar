import { ReactNode, useEffect, useMemo, useReducer, useState } from "react";
import dayjs from "dayjs";

import GlobalContext from "./GlobalContext";
import SavedEventsAction from "../types/SavedEventsAction";
import Event from "../types/Event";
import SidebarLabel from "../types/SidebarLabel";

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
  const [labels, setLabels] = useState<SidebarLabel[]>([]);
  const [savedEvents, dispatchCallEvent] = useReducer(savedEventsReducer, [], initEvents);
  const filteredEvents = useMemo(() => {
    return savedEvents
      .filter(evt => labels.filter(lbl => lbl.checked)
        .map(lbl => lbl.label)
        .includes(evt.label));
  }, [savedEvents, labels]);

  useEffect(() => {
    if (smallCalendarMonth !== null) {
      setMonthIndex(smallCalendarMonth);
    }
  }, [smallCalendarMonth]);

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    setLabels((prevLabels) => {
      return [...new Set(savedEvents.map((evt) => evt.label))].map(
        (label) => {
          const currentLabel = prevLabels.find(
            (lbl) => lbl.label === label
          );
          return {
            label,
            checked: currentLabel ? currentLabel.checked : true,
          };
        }
      );
    });
  }, [savedEvents]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  const updateLabel = (label: SidebarLabel) => {
    setLabels(labels.map((lbl) => lbl.label === label.label ? label : lbl));
  };

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
      savedEvents,
      labels,
      setLabels,
      updateLabel,
      filteredEvents
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default ContextWrapper;