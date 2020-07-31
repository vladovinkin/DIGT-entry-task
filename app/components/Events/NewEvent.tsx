import PropTypes from "prop-types";
import React from "react";
import { connect } from 'react-redux';
import { addNewEvent } from "../../AC/eventsActions";
import { filteredEventsSelector } from "../../selectors/eventsSelectors";

interface INewEventProps {
  onCancel?: () => void;
}

interface INewEventState {
  textEvent: string;
}

interface INewEventDispatch {
  addNewEvent: (newEvent: any) => void;
}

class NewEvent extends React.Component<INewEventProps & INewEventDispatch, INewEventState> {
  static contextTypes = {
    locale: PropTypes.string,
  };

  constructor(props: INewEventProps & INewEventDispatch) {
    super(props);
    this.state = {
      textEvent: "",
    };
  }

  componentDidMount() {
    Materialize.updateTextFields();
  }

  componentWillUnmount() {
   this.handleCancel();
  }

  render() {
    const { textEvent } = this.state;

    return (
      <div className="row">
        <div className="row" />
        <div className="row">
          <div className="col s12">
            <div className="row">
              <div className="input-field col s12">
                <input
                  id="textEvent"
                  type="text"
                  className={"validate"}
                  name="textEvent"
                  value={textEvent}
                  placeholder={"Введите текст"}
                  onChange={this.handleEventTextChange}
                />
                <label htmlFor="textEvent">
                  Событие
                  </label>
              </div>
            </div>
          </div>
        </div>

        <div className="row halfbottom" />

        <div className="row halfbottom">
          <div style={{ float: "right" }}>
            <div style={{ display: "inline-block", margin: "10px" }}>
              <a className={"btn btn-outlined waves-effect waves-light modal-close "} onClick={this.handleAddNewEvent}>
                Добавить
              </a>
              <a className={"btn btn-outlined waves-effect waves-light modal-close "} onClick={this.handleCancel}>
                Отмена
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleCancel = () => {
    const { onCancel } = this.props;

    if (onCancel) {
      onCancel();
    }
  }

  handleAddNewEvent = () => {
      this.props.addNewEvent({
        message: this.state.textEvent,
        time: "2020-08-30T12:24:76.456Z",
      });
  }

  handleEventTextChange = (ev: any) => {
    this.setState({ textEvent: ev.target.value });
  }
}

export default connect((state) => ({
  eventsMap: filteredEventsSelector(state),
}), { addNewEvent }) (NewEvent);