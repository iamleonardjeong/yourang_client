import React, { cloneElement, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Main.scss';
import classNames from 'classnames';
import ContentsBox from '../components/ContentsBox';
import Modal from '../components/Modal';
import axios from 'axios';
import { GoogleMap, Marker } from 'react-google-maps';
import { fireEvent } from '@testing-library/react';
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
  useEffect(() => {
    map = new google.maps.Map(document.getElementById('map') as HTMLElement, {
      center: { lat: 37.49791467507743, lng: 127.0275305696762 },
      zoom: 15,
    });
    // const timer = setTimeout(() => {
    //   console.log('el');
    // }, 500);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, []);
  const [menuState, setMenuState] = useState<menuState>({
    restaurant: false,
    place: true,
    hotel: false,
  });
  const location = useLocation();
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;
  //Home 콤포넨트에서 입력된 장소 이름이 현재 콤포넌트로 잘 넘어오는지 테스트 하기 위함
  console.log(location.state);
  const [modalState, setModalState] = useState({
    isOn: false,
  });
  const [placeInput, setPlaceInput] = useState('');
  const [placeInfo, setPlaceInfo] = useState<any>([]);
  let latLng: any;
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
    console.log('장소들 배열', placeInfo);
    placeInfo.forEach((location: any) => {
      const marker = new window.google.maps.Marker({
        position: location.geometry.location,
        title: 'Hello',
        viible: true,
      });
      marker.setMap(map);
    });
  };
  useEffect(() => {
    const getLocation = async (place: any) => {
      let response = await axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`
        )
        .then((response) => {
          latLng = response.data.results[0].geometry.location;
          setPlaceInput(latLng);
          return latLng;
        })
        .then((latLng) => {
          console.log('넘어오나??', latLng);
          axios
            .post('https://localhost:5001/google/map', {
              data: latLng,
              withCredentials: true,
            })
            .then((res) => {
              console.log('이게 응답온 장소들이다', res);
              setPlaceInfo(res.data);
              const placeIds = res.data.map((placeId: any) => {
                return placeId.place_id;
              });
              axios
                .post('https://localhost:5001/google/places_photo', {
                  placeIds: placeIds,
                  withCredentials: true,
                })
                .then((res) => {
                  console.log(res.data.data);
                  const newPlaceInfo = [...placeInfo];
                  for (let i = 0; i < newPlaceInfo.length; i++) {
                    newPlaceInfo[i].photo_url = res.data.data[i];
                  }
                  console.log('포토 url이 들어왔나???', newPlaceInfo);
                  setPlaceInfo(newPlaceInfo);
                });
            });
        });
    };
    getLocation(location.state);
  }, [location.state]);
  useEffect(() => {
    if (latLng) {
      renderMap();
    }
  }, [placeInfo]);
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
