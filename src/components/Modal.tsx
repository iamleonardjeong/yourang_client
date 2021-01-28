import axios from "axios";
import React, { useEffect } from "react";
import "../styles/Modal.scss";

interface ModalProps {
  closeModalState: (e: React.MouseEvent<HTMLElement>) => void;
  place: any;
}
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

function Modal({ closeModalState, place }: ModalProps) {
  console.log("모달안에서 place가 넘어오는지 확인", place);
  const {
    photoUrl,
    detail: {
      result: {
        name,
        formatted_address,
        formatted_phone_number,
        rating,
        geometry: {
          location: { lat, lng },
        },
      },
    },
  } = place;
  return (
    <div id="modalContainer">
      <div id="contentsModal">
        <div id="contentsHeader">
          <div id="modal_title">
            <h1>Please Travel</h1>
            <button id="modalClose" onClick={closeModalState}>
              Close
            </button>
          </div>
          <div id="modal_form">
            <img id="ifif" src={photoUrl} alt="" />
            <div id="modal_info">
              <div id="modal_name_rating">
                <div id="modal_name">{name}</div>
                <div id="modal_rating"> {rating} Stars</div>
              </div>
              <div id="modal_right">
                <div id="1">
                  <div>전화번호</div>
                  <div id="modal_number">{formatted_phone_number}</div>
                </div>
                <div id="2">
                  <div>주소</div>
                  <div id="modal_address">{formatted_address}</div>
                </div>
                <div id="3">
                  <div>좌표</div>
                  <div>{lat}</div>
                  <div>{lng}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
