import React, {Component} from 'react';
import {Link} from 'react-router-dom';
// import PropTypes from 'prop-types';
import {
  LOCATION_EVENTS,
} from './../../constants';

class MainWindow extends Component {
  // state = {  }
  render() {
    return <div className="row">
      <div className="col s12">
        <div className="row">
          <div className="col s12">
            <h3>Начальное окно</h3>
          </div>
          <div className="col s12">
            <Link to={LOCATION_EVENTS} className="btn waves-effect waves-light">Окно "События"</Link>
          </div>
        </div>
      </div>
    </div>
  }
}

export default MainWindow;