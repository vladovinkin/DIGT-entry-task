import PropTypes from "prop-types";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter as Router } from "react-router-redux";
import {
  LOCATION_MAIN,
} from "../constants";
import history from "../history";
import store from "../store/index";
import EventsWindow from "./Events/EventsWindow";

interface IAppProps {
  locale: string;
}

class App extends React.Component<IAppProps, {}> {
  static childContextTypes = {
    locale: PropTypes.string,
  };

  getChildContext() {
    const { locale } = this.props;
    return {
      locale,
    };
  }

  render() {
    return (
      <Router history={history}>
        <React.Fragment>
          <Route path={LOCATION_MAIN} component={EventsWindow} />
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
