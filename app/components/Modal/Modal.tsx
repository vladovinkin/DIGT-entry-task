import PropTypes from "prop-types";
import React from "react";

interface IModalProps {
  isOpen: boolean;
  header: string;
  onClose?: () => void;
  style?: any;
}

class Modal extends React.Component<IModalProps, {}> {
  static contextTypes = {
    locale: PropTypes.string,
  };

  componentWillReceiveProps(newProps: IModalProps) {
    const { isOpen } = newProps;

    if (!this.props.isOpen && !isOpen) {
      return;
    }
  }

  componentDidMount() {
    const { isOpen } = this.props;

    if (isOpen) {
      $("#modal-window").openModal({ dismissible: false });
    }
  }

  componentWillUnmount() {
    $("#modal-window").closeModal();
  }

  handleCloseModal = () => {
    const { onClose } = this.props;

    if (onClose) {
      onClose();
    }

    $("#modal-window").closeModal();
  }

  render() {
    const { isOpen, header } = this.props;

    if (!isOpen) {
      return null;
    }

    return (
      <div id="modal-window" className="modal nooverflow" style={this.props.style}>
        <React.Fragment>
          {this.props.children}
        </React.Fragment>
      </div>
    );
  }
}

export default Modal;
