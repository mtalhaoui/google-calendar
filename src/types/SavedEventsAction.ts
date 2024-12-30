import Event from "./Event";

type SavedEventsAction =
  | { type: "push"; payload: Event }
  | { type: "update"; payload: Event }
  | { type: "delete"; payload: Event };

export default SavedEventsAction;
