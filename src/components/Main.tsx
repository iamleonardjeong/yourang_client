import React, { cloneElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Main.scss";
import classNames from "classnames";
import ContentsBox from "./ContentsBox";
import Modal from "./Modal";
import axios from "axios";
import { GoogleMap, Marker } from "react-google-maps";
import { fireEvent } from "@testing-library/react";
import { render } from "node-sass";
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
  const [modalState, setModalState] = useState(false);
  const [placeInput, setPlaceInput] = useState("");
  const [placeInfo, setPlaceInfo] = useState<any>([]);
  const [latLng, setLatLng] = useState<any>({});
  const [imgStatus, setImgStatus] = useState(false);
  const [modalInfo, setModalInfo] = useState({});

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
      document.getElementById("map") as HTMLElement,
      mapOptions
    );

    axios.post("https://localhost:5001/google/map", {
      data: latLng,
      withCredentials: true,
    });
    placeInfo.forEach((location: any) => {
      console.log("걱정마 이건 과금 아니야", location);
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
  }, [latLng, placeInfo]);

  useEffect(() => {
    renderMap();
  }, [latLng]);

  //콘텐츠 박스의 img가 onLoad되면 상태변경 -> re-render 유도
  const imgStatusHandler = () => {
    setImgStatus(true);
  };

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
  const onModalState = (title: string) => {
    // setPlaceInfo(placeInfo.map((place: any) => place.id === id));
    console.log(
      "장소를 클릭하면 나오는 그 장소의 이름을 모달에서 출력한 것",
      title
    );

    const infoForModal = placeInfo.filter((place: any) => place.name === title);

    setModalInfo(infoForModal[0]);
    setModalState(!modalState);
  };

  //컨텐츠 상세 모달 off
  const closeModalState = () => {
    setModalState(!modalState);
  };

  // const placeDetail = () => {
  //   for (let i = 0; i < placeInfo.length; i++) {
  //     if (placeInfo[i].id === i) {
  //       return <Modal closeModalState={onModalState} place={placeInfo[i]} />;
  //     }
  //   }
  // };

  useEffect(() => {
    console.log(placeInfo);
  });

  return (
    <div id="mainContainer">
      <div id="leftContainer">
        <ul id="leftMenu">
          <li
            onClick={() => onClick("restaurant")}
            value="restaurant"
            className={classNames({ restaurant: menuState.restaurant })}
          >
            맛집
          </li>
          <li
            onClick={() => onClick("place")}
            value="place"
            className={classNames({ place: menuState.place })}
          >
            명소
          </li>
          <li
            onClick={() => onClick("hotel")}
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
                  id={content.id}
                  onModalState={onModalState}
                  imgStatusHandler={imgStatusHandler}
                />
              ))
            : ""}
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
