import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "../styles/Main.scss";
import classNames from "classnames";
import ContentsBox from "./ContentsBox";
import { GrSend } from "react-icons/gr";
import Modal from "./Modal";
import axios from "axios";
import { getLocation } from "../helper/getLocation";
import setMailStyle from "../helper/setMailStyle";
import MyContentsBox from "./MyContentsBox";
import emailjs from "emailjs-com";

declare global {
  interface Window {
    google: any;
  }
}
interface menuState {
  restaurant: boolean;
  tourist_attraction: boolean;
  cafe: boolean;
  myListTap: boolean;
}
interface mainProps {
  navPlaceInfo: any;
  currentPlaceInfoHandler: (curPlaceInfo: any) => void;
  logInStatusHandler: () => void;
  getSelectedPlaceType: (placeType: string) => void;
}
// myList localStorage
// types
interface myList {
  title: string;
  desc: string;
  imgSrc: string | undefined;
  website: string | undefined;
  phone: string | undefined;
  address: string | undefined;
}

// localStorage
let data: myList[] = JSON.parse(localStorage.getItem("myList") || "[]");

// main component
function Main({
  navPlaceInfo,
  currentPlaceInfoHandler,
  logInStatusHandler,
  getSelectedPlaceType,
}: mainProps) {
  const location = useLocation<any>();
  const history = useHistory();

  const [modalState, setModalState] = useState(false); ///////체크
  const [placeInfo, setPlaceInfo] = useState<any>([]);
  const [latLng, setLatLng] = useState<any>({});
  const [imgStatus, setImgStatus] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");
  const [modalInfo, setModalInfo] = useState({});
  const [myList, setMyList] = useState<any>({
    count: 0,
    data: [],
  });
  const [emailInput, setEmailInput] = useState(true);
  const [emailAddress, setEmailAddress] = useState("");

  //Home 콤포넨트에서 입력된 장소 이름이 현재 콤포넌트로 잘 넘어오는지 테스트 하기 위함
  const [menuState, setMenuState] = useState<menuState>({
    restaurant: false,
    tourist_attraction: true,
    cafe: false,
    myListTap: false,
  });

  // google map
  const renderMap = () => {
    //지도 만들고 마커 찍는 로직
    let myLatlng = new google.maps.LatLng(
      latLng.lat || location.state.latLng.lat,
      latLng.lng || location.state.latLng.lng
    );
    // latLng;
    let mapOptions = {
      center: myLatlng,
      zoom: 15,
      // 기본 맵 옵션
      mapTypeControl: false,
      zoomControl: true,
      zoomControlOptions: {
        position: google.maps.ControlPosition.RIGHT_BOTTOM,
      },
      streetViewControl: true,
      streetViewControlOptions: {
        position: google.maps.ControlPosition.RIGHT_CENTER,
      },
    };
    const map = new window.google.maps.Map(
      document.getElementById("map") as HTMLElement,
      mapOptions
    );
    axios.post("http://yourang-server.link:5000/google/map", {
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

  //Home에서 로그인에 성공하고 Main으로 넘어올 때, MainContainer에 isLogin 상태를 true로 바꿔줌.
  useEffect(() => {
    if (location.state.isLogin) {
      logInStatusHandler();
    }
  }, []);

  // Home -> Main으로 올 때만 발생하는 맵, 콘텐츠 렌더하는 useEffect
  useEffect(() => {
    if (location.state.latLng !== undefined) {
      setLatLng(location.state.latLng);
      setPlaceInfo(location.state.placeInfo);
      // 리스트 셋업
      setMyList({
        ...myList,
        data: myList.data.concat([...location.state.placeInfo]),
      });
      setCurrentLocation(location.state.currentLocation);
      currentPlaceInfoHandler(location.state.placeInfo);
    } else {
      setLatLng(navPlaceInfo.latLng);
      setPlaceInfo(navPlaceInfo.placeInfo);
      // 리스트 셋업
      setMyList({
        ...myList,
        data: myList.data.concat([...location.state.placeInfo]),
      });
      setCurrentLocation(navPlaceInfo.currentLocation);
    }
  }, [location.state.latLng, location.state.placeInfo]);

  // latLng(좌표) 위치변화가 있을 때 만 발생하는, 새 지도를 렌더하는 useEffect.
  useEffect(() => {
    renderMap();
  }, [latLng]);

  // Main 콤포넌트 상단 검색창에서 검색하면, MainContainer에서 응답을 받고 Main 콤포넌트 placeInfo sate를 변경해주는 로직.
  useEffect(() => {
    if (navPlaceInfo.latLng !== undefined) {
      const { latLng, placeInfo, currentLocation } = navPlaceInfo;
      setPlaceInfo(placeInfo);
      setLatLng(latLng);
      setCurrentLocation(currentLocation);
      history.replace("/main", { latLng, placeInfo, currentLocation });
    }
  }, [navPlaceInfo]);

  // 새로운 장소를 검색하게 되면, 무조건 Main Container의 currentPlaceInfo state를 변경하기 위한 useEffect. 이게 필요한 상황이 한번(마이페이지 -> 메인 갈 때) 있긴한데, 이게 꼭 필요한지 생각해봐야 할 것 같음.
  useEffect(() => {
    currentPlaceInfoHandler({ latLng, placeInfo, currentLocation });
  }, [latLng, placeInfo, currentLocation]);

  // 장소 타입을 선택하면 카테고리에 맞게 검색해서 맵, 콘텐츠를 렌더하는 함수
  const placeTypeHandler = async (selectedPlaceType: string) => {
    const { latLng, placeInfo } = await getLocation(
      currentLocation,
      selectedPlaceType
    );
    setPlaceInfo(placeInfo);
    setLatLng(latLng);
    getSelectedPlaceType(selectedPlaceType);
  };

  //콘텐츠 박스의 img가 onLoad되면 상태변경 -> re-render 유도
  const imgStatusHandler = () => {
    if (imgStatus === false) setImgStatus(true);
  };

  // leftContainer MenuTap State
  const onClick = async (e: string) => {
    if (e !== "myListTap") {
      placeTypeHandler(e);
    }

    setMenuState({
      ...menuState,
      restaurant: false,
      tourist_attraction: false,
      cafe: false,
      myListTap: false,
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

  // myList append
  const setMyLists = (
    title: string,
    desc: string,
    website: string,
    phone: string,
    address: string,
    img?: string
  ): void => {
    for (let i = 0; i < data.length; i++) {
      if (data[i].title === title) {
        return;
      }
    }

    data.push({
      title: title,
      desc: desc,
      imgSrc: img || "No Images",
      website: website || "no website",
      phone: phone || "no phone number",
      address: address || "no address",
    });

    setMyList({
      ...myList,
      count: myList.count + 1,
    });

    localStorage.setItem("myList", JSON.stringify(data));
  };

  // myList remove
  const removeMyLists = (title: string): any => {
    data = data.filter((el) => title !== el.title);
    setMyList({
      ...myList,
      count: myList.count + 1,
    });
    localStorage.setItem("myList", JSON.stringify(data));
  };

  // 입력된 이메일로 MyList 전송. to_name은 향 후 변수로 바꿔야 함.
  const sendEmail = () => {
    emailjs.send(
      "service_9v5cs7d",
      "template_xcmjbtw",
      {
        to_email: emailAddress,
        to_name: "박상록",
        message: setMailStyle(data), // 메일 css스타일을 in-line으로 지정해준 모듈. helper폴더 setMailStyle 함수 참고.
      },
      "user_viAPjBua2EXqACiVlL88n"
    );
  };

  const emailInputHandler = () => {
    setEmailInput((prev) => !prev);
  };

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
            onClick={() => onClick("tourist_attraction")}
            value="tourist_attraction"
            className={classNames({
              tourist_attraction: menuState.tourist_attraction,
            })}
          >
            플레이스
          </li>
          <li
            onClick={() => onClick("cafe")}
            value="cafe"
            className={classNames({ cafe: menuState.cafe })}
          >
            카페
          </li>
          <li
            onClick={() => onClick("myListTap")}
            value="myListTap"
            className={classNames({ myListTap: menuState.myListTap })}
          >
            My List
            <span id="list_count">{data.length}</span>
          </li>
        </ul>
        <div
          id="leftContents"
          className={classNames({ myListTapContainer: menuState.myListTap })}
        >
          <div
            id="myListContents"
            className={classNames({ myListContents: menuState.myListTap })}
          >
            {data.map((el) => (
              <MyContentsBox
                title={el.title}
                imgSrc={el.imgSrc}
                desc={el.desc}
                removeMyLists={removeMyLists}
              />
            ))}
          </div>
          {menuState.tourist_attraction ||
          menuState.restaurant ||
          menuState.cafe
            ? placeInfo.map((content: any) => {
                let heartState = false;
                data.map((el) => {
                  if (el.title === content.detail.result.name) {
                    heartState = true;
                  }
                });
                return (
                  <ContentsBox
                    // key={content.place_id}
                    imgSrc={content.photoUrl}
                    title={content.detail.result.name}
                    desc={content.detail.result.rating}
                    website={content.detail.result.website}
                    phone={content.detail.result.formatted_phone_number}
                    address={content.detail.result.formatted_address}
                    onModalState={onModalState}
                    imgStatusHandler={imgStatusHandler}
                    setMyLists={setMyLists}
                    removeMyLists={removeMyLists}
                    heartState={heartState}
                  />
                );
              })
            : ""}
          <div
            className={classNames({
              inputState: emailInput,
            })}
          >
            <div
              id="send_Email_Container"
              className={classNames({
                myListTap: menuState.myListTap,
              })}
            >
              <div id="send_Email_Container_titleBar">
                <div
                  id="send_Email_Container_titleBar_title_closeBtn"
                  onClick={emailInputHandler}
                >
                  +
                </div>
                <div id="send_Email_Container_titleBar_title">
                  <input
                    id="send_Email_input"
                    placeholder="이메일 주소를 입력해주세요"
                    onChange={(e) => setEmailAddress(e.currentTarget.value)}
                  />
                </div>
                <div id="send_Email_Container_titleBar_empty">
                  <GrSend
                    size="18"
                    // color="#008f7a"
                    style={{ color: "#008f7a" }}
                    onClick={sendEmail}
                  />
                </div>
              </div>
            </div>
          </div>
          <button
            id="send_Email_Btn"
            className={classNames({ myListTap: menuState.myListTap })}
            onClick={emailInputHandler}
            // onClick={sendEmail}
          >
            My List 내 이메일로 전송
          </button>
        </div>
      </div>
      <div id="rightContainer">
        {modalState && (
          <Modal closeModalState={closeModalState} place={modalInfo} />
        )}
        <div
          id="section_myList"
          className={classNames({ onShow: modalState })}
        ></div>
        <div id="map" className={classNames({ onShow: modalState })}></div>
      </div>
    </div>
  );
}
export default Main;
