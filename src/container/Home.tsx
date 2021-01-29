import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Home.scss';
import BGMusic from '../components/BGMusic';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';
import backgroundVideo from '../video/yourang-home_video.mp4'; // background video
import axios from 'axios';

declare const google: any;
let map: google.maps.Map;
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

function Home() {
  // useState
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('프라하');

  // useHistory
  const history = useHistory();

  // Input Change
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentLocation(e.currentTarget.value);
  };

  const getLocation = async (place: any = '프라하') => {
    let latLng;
    let placeInfo;
    setCurrentLocation(place);

    await axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`
      )
      .then((response) => {
        latLng = response.data.results[0].geometry.location;
        return latLng;
      })
      .then((latLng) => {
        // 추천장소 카테고리 선택에 따라 서버로 보낼 장소 카테고리를 정하는 로직
        axios
          .post('https://localhost:5001/google/map', {
            data: latLng,
            withCredentials: true,
            placeType: 'tourist_attraction',
          })
          .then(async (res) => {
            placeInfo = res.data.slice(0, 1); //응답받은 장소들

            const placeIds: any = [];
            placeInfo.forEach((place: any) => {
              if (place.photos !== undefined) {
                placeIds.push(place.place_id);
              }
            });

            await axios
              .post('https://localhost:5001/google/places_photo', {
                place_ids: placeIds,
                withCredentials: true,
              })
              .then(async (res) => {
                placeInfo = await res.data;
                // 다음 페이지로 이동
                console.log(latLng, placeInfo, currentLocation);
                history.push('/main', { latLng, placeInfo, currentLocation });
              });
          });
      });
  };

  // onEnterCount가 0일 때만 onEnterDownHander 실행. 유저가 엔터를 두, 세번 눌렀을 때 반응하지 않게 하기 위함.
  let onEnterCount = 0;
  const onEnterDownHander = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      console.log('엔터가 몇번 눌렸나?', onEnterCount);
      if (onEnterCount === 0) {
        onEnterCount++;
        getLocation(currentLocation);
      }
      // history.push('/main', currentLocation);
    }
  };
  // push main page - 체험하기 버튼
  const onExplore = () => {
    // history.push('/main');
    getLocation();
  };

  // logIn modal pop
  const signInModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.textContent;
    if (target === '로그인 페이지로') {
      setIsSignUpOpen(!isSignUpOpen);
      setIsSignInOpen(!isSignInOpen);
    } else {
      setIsSignInOpen(!isSignInOpen);
    }
  };

  // signUp modal pop
  const signUpModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.textContent;
    if (target === '+') {
      setIsSignUpOpen(!isSignUpOpen);
    } else if (target === '회원가입') {
      setIsSignUpOpen(!isSignUpOpen);
      setIsSignInOpen(!isSignInOpen);
    }
  };

  const modalSwitchHandler = () => {
    setIsSignUpOpen(!isSignUpOpen);
    setIsSignInOpen(!isSignInOpen);
  };

  const loginSuccessHandler = () => {
    getLocation('프라하');
  };

  return (
    <div className="home">
      <video className="home_video" autoPlay loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      <div className="home_contents">
        <div className="home_contents_header">
          <div className="home_contents_header_title">YouRang</div>
          <div className="home_contents_header_bgm">
            <BGMusic />
          </div>
          <div
            className="home_contents_header_signIn"
            onClick={signInModalHandler}
          >
            로그인
          </div>
        </div>
        <div className="home_contents_body">
          <div className="home_contents_body_title">
            어디로 떠나고 싶으세요?
          </div>
          <input
            type="text"
            placeholder="떠나고 싶은 장소를 검색해보세요"
            className="home_contents_body_input"
            maxLength={20}
            onChange={onChangeHandler}
            onKeyUp={onEnterDownHander}
          />
          <button onClick={onExplore}>체험하기</button>
        </div>
        {isSignInOpen ? (
          <SignInModal
            signInModalHandler={signInModalHandler}
            signUpModalHandler={signUpModalHandler}
            loginSuccessHandler={loginSuccessHandler}
            modalSwitchHandler={modalSwitchHandler}
          />
        ) : null}
        {isSignUpOpen ? (
          <SignUpModal
            signInModalHandler={signInModalHandler}
            signUpModalHandler={signUpModalHandler}
            modalSwitchHandler={modalSwitchHandler}
          />
        ) : null}
      </div>
    </div>
  );
}
export default Home;
