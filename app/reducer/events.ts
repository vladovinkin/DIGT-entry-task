import { OrderedMap, Record } from "immutable";
import { 
  REMOVE_ALL_EVENTS,
  ADD_NEW_EVENT,
} from "../constants";

const EventModel = Record({
  eventDate: null,
  eventText: null,
  id: null,
});

const DefaultReducerState = Record({
  entities: OrderedMap({}),
  loaded: false,
  loading: false,
});

let defaultState = new DefaultReducerState();
defaultState = defaultState
  .setIn(["entities", 1], new EventModel({ eventDate: "2021-02-30T07:48:52.996Z", eventText: "Обсуждение новых проектов", id: 1 }))
  .setIn(["entities", 2], new EventModel({ eventDate: "2019-12-31T07:00:00.996Z", eventText: "Подведение итогов", id: 2 }))
  .setIn(["entities", 3], new EventModel({ eventDate: "2019-12-30T10:10:00.996Z", eventText: "Публикация релиза", id: 3 }))
  .setIn(["entities", 4], new EventModel({ eventDate: "2020-04-01T12:00:52.996Z", eventText: "Промежуточные итоги", id: 4 }));

export default (events = defaultState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REMOVE_ALL_EVENTS:
      return events = new DefaultReducerState();
    case ADD_NEW_EVENT:
        console.log(events);
      return events;
  }

  return events;
};
