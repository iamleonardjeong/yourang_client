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
  tourist_attraction: boolean;
  hotel: boolean;
}

function Main() {
  const location = useLocation<any>();

  let map: google.maps.Map;
  let curLocation = location.state.place;
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

  //Home 콤포넨트에서 입력된 장소 이름이 현재 콤포넌트로 잘 넘어오는지 테스트 하기 위함

  const [menuState, setMenuState] = useState<menuState>({
    restaurant: false,
    tourist_attraction: true,
    hotel: false,
  });

  // const [modalState, setModalState] = useState({
  //   isOn: false,
  // });

  const [modalState, setModalState] = useState(false); ///////체크

  const [placeInput, setPlaceInput] = useState('');
  const [placeInfo, setPlaceInfo] = useState<any>([]);
  const [latLng, setLatLng] = useState<any>({});
  const [imgStatus, setImgStatus] = useState(false);
  const [placeTypeSelect, setPlaceTypeSelect] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');

  const [modalInfo, setModalInfo] = useState({});

  // 좌표를 보내, 주변 정보, 사진들 받아 {좌표, 장소들정보 배열}을 리턴하는 영상
  const getLocation = (place: any, placeType: string) => {
    let latLng;
    let places: any;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`
      )
      .then((response) => {
        latLng = response.data.results[0].geometry.location;
        return latLng;
      })
      .then((latLng) => {
        console.log('좌표받기 성공', latLng);
        // 추천장소 카테고리 선택에 따라 서버로 보낼 장소 카테고리를 정하는 로직
        axios
          .post('https://localhost:5001/google/map', {
            data: latLng,
            withCredentials: true,
            placeType: { [placeType]: placeType },
          })
          .then((res) => {
            let places = res.data.slice(0, 20); //응답받은 장소들

            const placeIds: any = [];
            places.forEach((place: any) => {
              if (place.photos !== undefined) {
                placeIds.push(place.place_id);
              }
            });

            axios
              .post('https://localhost:5001/google/places_photo', {
                place_ids: placeIds,
                withCredentials: true,
              })
              .then((res) => {
                places = res.data;
                setPlaceInfo(places);
                setLatLng(latLng);
              });
          });
      });
  };

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

    placeInfo.forEach((content: any) => {
      const marker = new window.google.maps.Marker({
        position: content.detail.result.geometry.location,
        title: content.detail.result.name,
        visible: true,
      });

      marker.setMap(map);
    });
  };

  useEffect(() => {
    setLatLng(location.state.latLng);
    setPlaceInfo(location.state.places);
    setCurrentLocation(location.state.placeInput);
  }, [location.state.latLng, location.state.places]);

  useEffect(() => {
    renderMap();
  }, [latLng]);

  const placeTypeHandler = (selectedPlaceType: string) => {
    getLocation(currentLocation, selectedPlaceType);
  };

  // useEffect(() => {
  // const { latLng, places } = getLocation(placeTypeSelect);
  // setLatLng(latLng);
  // setPlaceInfo(places);
  // }, [placeTypeSelect]);

  //콘텐츠 박스의 img가 onLoad되면 상태변경 -> re-render 유도
  const imgStatusHandler = () => {
    setImgStatus(true);
  };

  // leftContainer MenuTap State
  const onClick = async (e: string) => {
    // 사용자가 장소 카테고리를 바꾸면 거기에 맞는 장소들을 요청 및 응답, 화면을 렌더한다.
    placeTypeHandler(e);

    setMenuState({
      ...menuState,
      restaurant: false,
      tourist_attraction: false,
      hotel: false,
      [e]: true,
    });
  };

  // 컨텐츠 상세 모달 on
  const onModalState = (title: string) => {
    const infoForModal = placeInfo.filter(
      (place: any) => place.detail.result.name === title
    );

    setModalInfo(infoForModal[0]);
    setModalState(!modalState);
  };

  //컨텐츠 상세 모달 off
  const closeModalState = () => {
    setModalState(!modalState);
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
            onClick={() => onClick('tourist_attraction')}
            value="tourist_attraction"
            className={classNames({
              tourist_attraction: menuState.tourist_attraction,
            })}
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
          {menuState.tourist_attraction ||
          menuState.restaurant ||
          menuState.hotel
            ? placeInfo.map((content: any) => (
                <ContentsBox
                  // key={content.place_id}
                  imgSrc={content.photoUrl}
                  title={content.detail.result.name}
                  desc={content.detail.result.rating}
                  onModalState={onModalState}
                  imgStatusHandler={imgStatusHandler}
                />
              ))
            : ''}
        </div>
      </div>
      <div id="rightContainer">
        {modalState && (
          <Modal closeModalState={closeModalState} place={modalInfo} />
        )}
        <div id="map" className={classNames({ onShow: modalState })}></div>
      </div>
    </div>
  );
}

export default Main;
