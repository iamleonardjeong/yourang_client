import React from 'react';
import './Modal.scss';

interface ModalProps {
  closeModalState: () => void;
}

function Modal({ closeModalState }: ModalProps) {
  return (
    <div id="modalContainer">
      <div id="contentsModal">
        <div id="contentsHeader">
          <h1>Please Travel</h1>
          <button id="modalClose" onClick={closeModalState}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
