import PropTypes from "prop-types";
import React from "react";
import {Link} from 'react-router-dom';
import Modal from "../Modal/Modal";
import EventTable from "./EventTable";
import NewEvent from "./NewEvent";
import {
  LOCATION_MAIN,
} from "./../../constants";

interface IEventsWindowState {
  showModalAddEvents: boolean;
}

// tslint:disable-next-line: no-empty-interface
interface IEventsWindowProps {
  //
}

interface IEventsWindowDispatch {
  removeAllEvents: () => void;
}

class EventsWindow extends React.Component<IEventsWindowProps & IEventsWindowDispatch, IEventsWindowState> {
  static contextTypes = {
    locale: PropTypes.string,
  };

  constructor(props: IEventsWindowProps & IEventsWindowDispatch) {
    super(props);

    this.state = {
      showModalAddEvents: false,
    };
  }

  render() {
    return (
      <div className="row">
        <div className="col s12">
          <div className="row">
            <div className="col s12">
              <h3>События</h3>
            </div>
            <div className="col s12">
              <a className="btn waves-effect waves-light" onClick={this.handleShowModalAddEvents}>Добавить</a>
              <Link to={LOCATION_MAIN} className="btn waves-effect waves-light">Начальное окно</Link>
            </div>
          </div>

          <div className="row">
            <div className="col s12">
              <EventTable />
            </div>
          </div>
        </div>
        {this.showModalAddEvents()}
      </div>
    );
  }

  showModalAddEvents = () => {
    const { showModalAddEvents } = this.state;

    if (!showModalAddEvents) {
      return;
    }

    return (
      <Modal
        isOpen={showModalAddEvents}
        header="Новое событие"
        onClose={this.handleCloseModalAddEvents}>

        <NewEvent onCancel={this.handleCloseModalAddEvents} />
      </Modal>
    );
  }

  handleShowModalAddEvents = () => {
    this.setState({ showModalAddEvents: true });
  }

  handleCloseModalAddEvents = () => {
    this.setState({ showModalAddEvents: false });
  }
}

export default EventsWindow;