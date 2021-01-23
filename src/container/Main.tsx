import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Main.scss';
import classNames from 'classnames';
import ContentsBox from '../components/ContentsBox';
import Modal from '../components/Modal';
import { GoogleMap, Marker } from 'react-google-maps';

declare global {
  interface Window {
    google: any;
    // kakao: any;
  }
}

interface menuState {
  restaurant: boolean;
  place: boolean;
  hotel: boolean;
}

function Main() {
  const [menuState, setMenuState] = useState<menuState>({
    restaurant: false,
    place: true,
    hotel: false,
  });

  const location = useLocation();

  //Home 콤포넨트에서 입력된 장소 이름이 현재 콤포넌트로 잘 넘어오는지 테스트 하기 위함
  console.log(location.state);
  const [modalState, setModalState] = useState({
    isOn: false,
  });

  // google map
  let map: null;
  useEffect(() => {
    let mapOptions = {
      zoom: 15,
      center: { lat: 33.450701, lng: 126.570667 },
      // mapTypeId: 'satellite',
    };

    map = new window.google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );

    new window.google.maps.Marker({
      position: { lat: 33.450701, lng: 126.570667 },
      map,
      title: 'Hello',
    });
  });

  // leftContainer MenuTap State
  const onClick = (e: string) => {
    setMenuState({
      ...menuState,
      restaurant: false,
      place: false,
      hotel: false,
      [e]: true,
    });
  };

  // 컨텐츠 상세 모달 on
  const onModalState = () => {
    setModalState({
      ...modalState,
      isOn: true,
    });
  };

  // 컨텐츠 상세 모달 off
  const closeModalState = () => {
    setModalState({
      ...modalState,
      isOn: false,
    });
  };

  return (
    <div id="mainContainer">
      <div id="leftContainer">
        <ul id="leftMenu">
          <li
            onClick={() => onClick('restaurant')}
            value="restaurant"
            className={classNames({ restaurant: menuState.restaurant })}
          >
            맛집
          </li>
          <li
            onClick={() => onClick('place')}
            value="place"
            className={classNames({ place: menuState.place })}
          >
            명소
          </li>
          <li
            onClick={() => onClick('hotel')}
            value="hotel"
            className={classNames({ hotel: menuState.hotel })}
          >
            숙박
          </li>
        </ul>
        <div id="leftContents">
          {menuState.place
            ? src.map((content) => (
                <ContentsBox
                  key={content.id}
                  imgSrc={content.imgSrc}
                  title={content.title}
                  onModalState={onModalState}
                />
              ))
            : ''}
        </div>
      </div>
      <div id="rightContainer">
        {modalState.isOn ? <Modal closeModalState={closeModalState} /> : ''}
        <div id="map" className={classNames({ onShow: modalState.isOn })}></div>
      </div>
    </div>
  );
}

export default Main;

const src = [
  {
    id: 1,
    imgSrc:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1993&q=80',
    title: 'Please Travel',
  },
  {
    id: 2,
    imgSrc:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1993&q=80',
    title: 'Please Travel',
  },
  {
    id: 3,
    imgSrc:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1993&q=80',
    title: 'Please Travel',
  },
  {
    id: 4,
    imgSrc:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1993&q=80',
    title: 'Please Travel',
  },
  {
    id: 5,
    imgSrc:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1993&q=80',
    title: 'Please Travel',
  },
  {
    id: 6,
    imgSrc:
      'https://images.unsplash.com/photo-1508672019048-805c876b67e2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1993&q=80',
    title: 'Please Travel',
  },
];
