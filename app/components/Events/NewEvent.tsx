import PropTypes from "prop-types";
import React from "react";

interface INewEventProps {
  onCancel?: () => void;
}

interface INewEventState {
  textEvent: string;
}

class NewEvent extends React.Component<INewEventProps, INewEventState> {
  static contextTypes = {
    locale: PropTypes.string,
  };

  constructor(props: INewEventProps) {
    super(props);
    this.state = {
      textEvent: "",
    };
  }

  componentDidMount() {
    Materialize.updateTextFields();
  }

  componentWillUnmount() {
    this.handelCancel();
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
              <a className={"btn btn-outlined waves-effect waves-light modal-close "} onClick={this.handelCancel}>
                Добавить
                </a>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handelCancel = () => {
    const { onCancel } = this.props;

    if (onCancel) {
      onCancel();
    }
  }

  handleEventTextChange = (ev: any) => {
    this.setState({ textEvent: ev.target.value });
  }
}

export default NewEvent;
