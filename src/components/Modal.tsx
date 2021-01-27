import axios from 'axios';
import React, { useEffect } from 'react';
import '../styles/Modal.scss';

interface ModalProps {
  closeModalState: (e: React.MouseEvent<HTMLElement>) => void;
  place: any;
}
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

function Modal({ closeModalState, place }: ModalProps) {
  console.log('모달안에서 place가 넘어오는지 확인', place);

  return (
    <div id="modalContainer">
      <div id="contentsModal">
        <div id="contentsHeader">
          <h1>Please Travel</h1>
          <div>{place.detail.result.name}</div>
        </div>
        <button id="modalClose" onClick={closeModalState}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
