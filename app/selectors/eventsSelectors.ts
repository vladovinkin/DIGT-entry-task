import { createSelector } from "reselect";

export const eventsGetter = (state: any) => state.events.entities;

export const filteredEventsSelector = createSelector(eventsGetter, (events) => {

  return events.filter((event: any) => {
    return true;
  });
});
