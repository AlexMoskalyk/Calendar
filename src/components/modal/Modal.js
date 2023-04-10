import React, {Component} from 'react';
import { createPortal } from 'react-dom';
import { ModalPositionWrapper } from './ModalStyled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = (e) => {
    if (e.code === "Escape") {
      this.props.closeModal();
    }
  };

  handleBackdropClick = (event) => {
    if (event.currentTarget === event.target) {
      this.props.closeModal();
    }
  };

  render() {
    return createPortal(
      <ModalPositionWrapper onClick={this.handleBackdropClick}>
        <div>{this.props.children}</div>
      </ModalPositionWrapper>,
      modalRoot
    );
  }
}

export default Modal;