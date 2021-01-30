import React, { useEffect, useState } from 'react';
import ReactDOMServer from 'react-dom/server';
import { useLocation } from 'react-router-dom';
import '../styles/Main.scss';
import classNames from 'classnames';
import ContentsBox from './ContentsBox';
import Modal from './Modal';
import axios from 'axios';
import MyContentsBox from './MyContentsBox';
import emailjs from 'emailjs-com';

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
  curretPlaceInfoHandler: (curPlaceInfo: any) => void;
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
let data: myList[] = JSON.parse(localStorage.getItem('myList') || '[]');
// main component
function Main({ navPlaceInfo, curretPlaceInfoHandler }: mainProps) {
  const location = useLocation<any>();
  const [modalState, setModalState] = useState(false); ///////체크
  const [placeInfo, setPlaceInfo] = useState<any>([]);
  const [latLng, setLatLng] = useState<any>({});
  const [imgStatus, setImgStatus] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');
  const [modalInfo, setModalInfo] = useState({});
  const [myList, setMyList] = useState<any>({
    count: 0,
    data: [],
  });
  // const [placeTypeSelect, setPlaceTypeSelect] = useState('');
  // const [placeInput, setPlaceInput] = useState('');
  let map: google.maps.Map;
  // let curLocation = location.state.place || currentLocation;
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;
  //Home 콤포넨트에서 입력된 장소 이름이 현재 콤포넌트로 잘 넘어오는지 테스트 하기 위함
  const [menuState, setMenuState] = useState<menuState>({
    restaurant: false,
    tourist_attraction: true,
    cafe: false,
    myListTap: false,
  });
  // const [modalState, setModalState] = useState({
  //   isOn: false,
  // });
  // interface myListState {
  //   count: number;
  //   data: number;
  // }
  // 좌표를 보내, 주변 정보, 사진들 받아 {좌표, 장소들정보 배열}을 리턴하는 영상
  const getLocation = async (place: any, placeType: string) => {
    let latLng;
    let places: any;
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`
      )
      .then((response) => {
        latLng = response.data.results[0].geometry.location;
        return latLng;
      })
      .then(async (latLng) => {
        console.log('좌표받기 성공', latLng);
        // 추천장소 카테고리 선택에 따라 서버로 보낼 장소 카테고리를 정하는 로직
        await axios
          .post('http://yourang-server.link:5000/google/map', {
            data: latLng,
            withCredentials: true,
            placeType: placeType,
          })
          .then(async (res) => {
            places = res.data.slice(0, 1); //응답받은 장소들
            console.log('places', places);
            const placeIds: any = [];
            places.forEach((place: any) => {
              if (place.photos !== undefined) {
                placeIds.push(place.place_id);
              }
            });
            console.log('placeIds', placeIds);
            await axios
              .post('http://yourang-server.link:5000/google/places_photo', {
                place_ids: placeIds,
                withCredentials: true,
              })
              .then((res) => {
                places = res.data;
                console.log('타입 누르고 palces', places);
                setPlaceInfo(places);
                setLatLng(latLng);
              });
          });
      });
  };
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
      document.getElementById('map') as HTMLElement,
      mapOptions
    );
    axios.post('http://yourang-server.link:5000/google/map', {
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
    if (location.state.latLng !== undefined) {
      setLatLng(location.state.latLng);
      setPlaceInfo(location.state.placeInfo);
      // 리스트 셋업
      setMyList({
        ...myList,
        data: myList.data.concat([...location.state.placeInfo]),
      });
      setCurrentLocation(location.state.currentLocation);
    }
  }, [location.state.latLng, location.state.places]);

  useEffect(() => {
    renderMap();
  }, [latLng]);
  // 메인  콤포넌트  상단 네비  바에서 검색하면, MainContainer에서 응답을 받고 메인콤포넌트 장소상태를 변경해주는 로직.
  useEffect(() => {
    if (navPlaceInfo.latLng !== undefined) {
      const { latLng, placeInfo, currentLocation } = navPlaceInfo;
      console.log(latLng, placeInfo, currentLocation);
      setPlaceInfo(placeInfo);
      setLatLng(latLng);
      setCurrentLocation(currentLocation);
    }
  }, [navPlaceInfo]);

  useEffect(() => {
    curretPlaceInfoHandler({ latLng, placeInfo, currentLocation });
  }, [latLng, placeInfo, currentLocation]);

  const placeTypeHandler = (selectedPlaceType: string) => {
    getLocation(currentLocation, selectedPlaceType);
  };
  // useEffect(() => {
  //   const { latLng, places } = getLocation(placeTypeSelect);
  //   setLatLng(latLng);
  //   setPlaceInfo(places);
  // }, [placeTypeSelect]);
  //콘텐츠 박스의 img가 onLoad되면 상태변경 -> re-render 유도
  const imgStatusHandler = () => {
    if (imgStatus === false) setImgStatus(true);
  };
  // leftContainer MenuTap State
  const onClick = async (e: string) => {
    // 사용자가 장소 카테고리를 바꾸면 거기에 맞는 장소들을 요청 및 응답, 화면을 렌더한다.
    // console.log(e);
    if (e !== 'myListTap') {
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
      imgSrc: img || 'No Images',
      website: website || 'no website',
      phone: phone || 'no phone number',
      address: address || 'no address',
    });

    setMyList({
      ...myList,
      count: myList.count + 1,
    });
    localStorage.setItem('myList', JSON.stringify(data));
    console.log(data);
  };
  // myList remove
  const removeMyLists = (title: string): any => {
    data = data.filter((el) => title !== el.title);
    setMyList({
      ...myList,
      count: myList.count + 1,
    });
    localStorage.setItem('myList', JSON.stringify(data));
  };

  // 메일 보내는 곳 인라인 Css스타일을 주기 위한 Css 스타일링 타입지정.
  const firstDiv = {
    textAlign: 'center',
    fontFamily: 'Georgia',
  } as React.CSSProperties;

  const emailContentStyle = {
    fontSize: '25px',
    textDecoration: 'none',
  } as React.CSSProperties;

  const widthEighty = {
    width: '80%',
  } as React.CSSProperties;

  const htmlString = ReactDOMServer.renderToStaticMarkup(
    <div>
      {data.map((place) => {
        return (
          <div style={firstDiv}>
            <h1>{place.title}</h1>
            <img src={place.imgSrc} alt="" />
            <h2>
              Address: <span style={emailContentStyle}>{place.address}</span>
            </h2>
            <h2>
              website: <span style={emailContentStyle}>{place.website}</span>
            </h2>
            <h2>
              Phone: <span style={emailContentStyle}>{place.phone}</span>
            </h2>
            <h2>
              Rate: <span style={emailContentStyle}>{place.desc}</span>
            </h2>
            <hr style={widthEighty} />
          </div>
        );
      })}
    </div>
  );

  const toEmail = 'srparkgogo@gmail.com';

  const sendEmail = () => {
    console.log(data);
    emailjs.send(
      'service_9v5cs7d',
      'template_xcmjbtw',
      {
        to_email: toEmail,
        to_name: '박상록',
        message: htmlString,
      },
      'user_viAPjBua2EXqACiVlL88n'
    );

    console.log('email sent');
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
            플레이스
          </li>
          <li
            onClick={() => onClick('cafe')}
            value="cafe"
            className={classNames({ cafe: menuState.cafe })}
          >
            카페
          </li>
          <li
            onClick={() => onClick('myListTap')}
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
            : ''}
          <button
            id="send_Email_Btn"
            className={classNames({ myListTap: menuState.myListTap })}
            onClick={sendEmail}
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
