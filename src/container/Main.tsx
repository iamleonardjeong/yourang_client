import React, { useState } from 'react';
// import Map from '../components/Main/Map';
import './Main.scss';
import classNames from 'classnames';
import ContentsBox from '../components/ContentsBox';
import Modal from '../components/Modal';

// naver map
declare global {
  interface Window {
    naver: any;
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

  const [modalState, setModaltate] = useState({
    isOn: false,
  });

  // naver map state
  /* const [mapState, setMapState] = useState({
    place: { l: 37.498114, r: 127.02764 },
  }); */

  // let map: any = null;

  // 네이버 지도 api
  /* useEffect(() => {
    // 맵 임포트 위치
    let container = document.getElementById('map');

    // 맵 옵션
    let mapOptions = {
      center: new naver.maps.LatLng(mapState.place.l, mapState.place.r),
      zoom: 16,
      mapTypeId: naver.maps.MapTypeId.NORMAL,
      mapTypeControl: true,
      mapTypeControlOptions: {
        style: naver.maps.MapTypeControlStyle.BUTTON,
        position: naver.maps.Position.TOP_RIGHT,
      },
      zoomControl: true,
      zoomControlOptions: {
        style: naver.maps.ZoomControlStyle.SMALL,
        position: naver.maps.Position.RIGHT_CENTER,
      },
      mapDataControl: true,
      mapDataControlOptions: {
        position: naver.maps.Position.BOTTOM_LEFT,
      },
      scaleControl: true,
      scaleControlOptions: {
        position: naver.maps.Position.BOTTOM_RIGHT,
      },
    };

    map = new window.naver.maps.Map(container, mapOptions);

    // 마커 생성
    let marker = new window.naver.maps.Marker({
      position: new naver.maps.LatLng(mapState.place.l, mapState.place.r),
      map: map,
    });

    // 마커 윈도우 내용
    var contentString = [
      '<div class="iw_inner">',
      `<h3>Please Travel</h3>`,
      `<p>${mapState.place.l}</p> `,
      `<p>${mapState.place.r}</p> `,
      '</div>',
    ].join('');

    // 마커 윈도우
    let infowindow = new window.naver.maps.InfoWindow({
      content: contentString,
    });

    // 마커 이벤트(윈도우 팝업)
    naver.maps.Event.addListener(marker, 'click', function (e) {
      if (infowindow.getMap()) {
        infowindow.close();
      } else {
        infowindow.open(map, marker);
      }
    });
  }, [mapState]); */

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
    setModaltate({
      ...modalState,
      isOn: true,
    });
  };

  // 컨텐츠 상세 모달 off
  const closeModalState = () => {
    setModaltate({
      ...modalState,
      isOn: false,
    });
  };

  // 지도 위, 경도 변경 함수
  /* const changePlace = (): void => {
    map.destroy();
    setMapState({
      ...mapState,
      place: {
        l: 33.3590628,
        r: 126.534361,
      },
    });
    // map.setCenter(new naver.maps.LatLng(33.3590628, 126.534361));
    // console.log('ok');
    let location = new window.naver.maps.LatLng(
      mapState.place.l,
      mapState.place.r
    );
    map.setCenter(location);
    map.setZoom(16);
  }; */

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
          {/* <Map /> */}
          <div
            style={{ width: '100%', height: '100%', background: 'gray' }}
          ></div>
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
