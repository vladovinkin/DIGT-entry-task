import { REMOVE_ALL_EVENTS } from "../constants";

export function removeAllEvents() {
  return {
    type: REMOVE_ALL_EVENTS,
  };
}
