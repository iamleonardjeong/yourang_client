import React, { useEffect } from "react";
import "./Modal.scss";

interface ModalProps {
  closeModalState: (e: React.MouseEvent<HTMLElement>) => void;
  place: any;
}

function Modal({ closeModalState, place }: ModalProps) {
  useEffect(() => {
    console.log("asdadsadsdas", place);
  });
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
