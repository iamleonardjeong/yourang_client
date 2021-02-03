import React, { useEffect } from 'react';
import '../styles/Modal.scss';

interface ModalProps {
  closeModalState: (e: React.MouseEvent<HTMLElement>) => void;
  place: any;
}
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

function Modal({ closeModalState, place }: ModalProps) {
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
        <div id="contents_wrap">
          <div id="contentsHeader">
            <div id="modal_title_wrap">
              <div id="modal_title">{name}</div>
              <button id="modalClose" onClick={closeModalState}>
                Close
              </button>
            </div>
          </div>
          <div id="contentsBody">
            <div
              id="contentsBody_img"
              style={{ backgroundImage: `url(${photoUrl})` }}
            ></div>
            <div id="contentsBody_contents">
              <h3 id="contentsBody_contents_title">플레이스 평점</h3>
              <div id="modal_rating"> {rating || 'No'} Stars</div>
              <h3 id="contentsBody_contents_title">주소</h3>
              <div id="modal_address">
                {formatted_address || '주소 정보가 없습니다.'}
              </div>
              <h3 id="contentsBody_contents_title">전화번호</h3>
              <div id="modal_number">
                {formatted_phone_number || '전화번호 정보가 없습니다.'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
