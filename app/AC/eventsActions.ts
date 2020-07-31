import { REMOVE_ALL_EVENTS, ADD_NEW_EVENT} from "../constants";

export function removeAllEvents() {
  return {
    type: REMOVE_ALL_EVENTS,
  };
}

export function addNewEvent(newEvent={message: String, time: String}) {
  return {
    type: ADD_NEW_EVENT,
    payload: newEvent,
  };
}