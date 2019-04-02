import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class GenericModal extends Component {
  render() {
    let title;
    if (this.props.title === "isin") {
      title = this.props.title.toUpperCase();
    } else {
      title = this.props.title.split("_").join(" ");
    }
    return (
      <Modal
        show={this.props.show}
        aria-labelledby="ModalHeader"
        animation={false}
        bsClass="modal"
      >
        <Modal.Header>
          <Modal.Title id="ModalHeader">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          {!this.props.hideActionButton && (
            <button
              className="btn btn-primary"
              onClick={this.props.actionModal}
            >
              {this.props.actionButton}
            </button>
          )}
          <button type="submit" className="btn btn-primary" onClick={this.props.closeModal}>
            {this.props.closeButton ? this.props.closeButton : "Close"}
          </button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default GenericModal;
