import React, { MouseEvent, useState } from 'react';
import Map from '../components/Main/Map';
import './Main.scss';
import classNames from 'classnames';
import ContentsBox from '../components/Main/ContentsBox';
import Modal from '../components/Main/Modal';

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

  const [modalState, setModaltate] = useState({
    isOn: false,
  });

  const onClick = (e: string) => {
    setMenuState({
      ...menuState,
      restaurant: false,
      place: false,
      hotel: false,
      [e]: true,
    });
  };

  const onModalState = () => {
    setModaltate({
      ...modalState,
      isOn: true,
    });
  };

  const closeModalState = () => {
    setModaltate({
      ...modalState,
      isOn: false,
    });
  };

  console.log(menuState);
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
        <div
          id="mapContainer"
          className={classNames({ onShow: modalState.isOn })}
        >
          <Map />
        </div>
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
