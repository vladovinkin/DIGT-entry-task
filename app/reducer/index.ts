import {routerReducer as router} from "react-router-redux";
import {combineReducers} from "redux";
import events from "./events";

export default combineReducers({
  events,
  router,
});
