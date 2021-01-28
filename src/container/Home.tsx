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
  const [placeInput, setPlaceInput] = useState('');

  // useHistory
  const history = useHistory();

  // Input Change
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setPlaceInput(e.currentTarget.value);
  };

  const getLocation = (place: any) => {
    let latLng;
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${place}&key=${apiKey}`
      )
      .then((response) => {
        latLng = response.data.results[0].geometry.location;
        console.log(latLng);
        setPlaceInput(latLng);
        return latLng;
      })
      .then((latLng) => {
        // 추천장소 카테고리 선택에 따라 서버로 보낼 장소 카테고리를 정하는 로직
        console.log('좌표', latLng);
        axios
          .post('https://localhost:5001/google/map', {
            data: latLng,
            withCredentials: true,
            placeType: { tourist_attraction: 'tourist_attraction' },
          })
          .then((res) => {
            let places = res.data.slice(0, 10); //응답받은 장소들

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
                console.log(places);
                // 다음 페이지로 이동
                history.push('/main', { latLng, places, placeInput });
              });
          });
      });
  };

  let onEnterCount = 0;
  const onEnterDownHander = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onEnterCount === 0) {
        onEnterCount++;
        console.log(e);
        getLocation(placeInput);
      }
      // history.push('/main', placeInput);
    }
  };

  // push main page - 체험하기 버튼
  const onExplore = () => {
    // history.push('/main');
    getLocation('프라하');
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
            대한민국 어디로 떠나고 싶으세요?
          </div>
          <input
            type="text"
            placeholder="떠나고 싶은 장소를 검색해보세요"
            className="home_contents_body_input"
            maxLength={20}
            onChange={onChangeHandler}
            onKeyDown={onEnterDownHander}
          />
          <button onClick={onExplore}>체험하기</button>
        </div>
        {isSignInOpen ? (
          <SignInModal
            signInModalHandler={signInModalHandler}
            signUpModalHandler={signUpModalHandler}
          />
        ) : null}

        {isSignUpOpen ? (
          <SignUpModal
            signInModalHandler={signInModalHandler}
            signUpModalHandler={signUpModalHandler}
          />
        ) : null}
      </div>
    </div>
  );
}

export default Home;
