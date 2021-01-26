import React from "react";
import "../styles/Modal.scss";

interface ModalProps {
  closeModalState: (e: React.MouseEvent<HTMLElement>) => void;
}

function Modal({ closeModalState }: ModalProps) {
  return (
    <div id="modalContainer">
      <div id="contentsModal">
        <div id="contentsHeader">
          <h1>Please Travel</h1>
        </div>
        <button id="modalClose" onClick={closeModalState}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
