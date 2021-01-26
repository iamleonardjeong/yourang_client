import React, { cloneElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Main.scss';
import classNames from 'classnames';
import ContentsBox from './ContentsBox';
import Modal from './Modal';
import axios from 'axios';
import { GoogleMap, Marker } from 'react-google-maps';
import { fireEvent } from '@testing-library/react';
import { render } from 'node-sass';
//https://yourang-server.link:5000
declare global {
  interface Window {
    google: any;
  }
}

interface menuState {
  restaurant: boolean;
  place: boolean;
  hotel: boolean;
}
function Main() {
  let map: google.maps.Map;

  const [menuState, setMenuState] = useState<menuState>({
    restaurant: false,
    place: true,
    hotel: false,
  });

  const location = useLocation<any>();
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

  //Home 콤포넨트에서 입력된 장소 이름이 현재 콤포넌트로 잘 넘어오는지 테스트 하기 위함
  console.log(location.state);
  const [modalState, setModalState] = useState({
    isOn: false,
  });
  const [placeInput, setPlaceInput] = useState('');
  const [placeInfo, setPlaceInfo] = useState<any>([]);
  const [latLng, setLatLng] = useState<any>({});

  // google map
  const renderMap = () => {
    //지도 만들고 마커 찍는 로직
    let myLatlng = new google.maps.LatLng(latLng.lat, latLng.lng);
    // latLng;
    let mapOptions = {
      center: myLatlng,
      zoom: 15,
      // mapTypeId: 'satellite',
    };
    const map = new window.google.maps.Map(
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
    axios.post('https://localhost:5001/google/map', {
      data: latLng,
      withCredentials: true,
    });

    placeInfo.forEach((location: any) => {
      console.log('걱정마 이건 과금 아니야', location);
      const marker = new window.google.maps.Marker({
        position: location.geometry.location,
        title: location.geometry.name,
        visible: true,
      });
      marker.setMap(map);
    });
  };

  useEffect(() => {
    setLatLng(location.state.latLng);
    setPlaceInfo(location.state.places);
  }, []);

  useEffect(() => {
    renderMap();
  }, [latLng, placeInfo]);

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
          {menuState.place || menuState.restaurant || menuState.hotel
            ? placeInfo.map((content: any) => (
                <ContentsBox
                  // key={content.place_id}
                  imgSrc={content.photo_url}
                  title={content.name}
                  desc={content.rating}
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
