import React, { useState, useEffect } from 'react';
import Mypage from '../components/Mypage';
import Main from '../components/Main';
import Navigation from '../components/Navigation';
import { getLocation } from '../helper/getLocation';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';
import axios from 'axios';

const MainContainer = () => {
  // fake login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [isOnMypageModal, setIsOnMypageModal] = useState(false);
  const [placeType, setPlaceType] = useState('');

  // 기존 state
  const [navPlaceInfo, setNavPlaceInfo] = useState({});
  const [currentPlaceInfo, setCurrentPlaceInfo] = useState({});
  useEffect(() => {
    const authorization = localStorage.getItem("authorization");
    if (authorization) {
      axios({
        method: "post",
        url: "http://yourang-server.link:5000/user/auth",
        headers: {
          authorization: authorization,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            setIsLoggedIn(true);
          }
        })
        .catch((err) => setIsLoggedIn(false));
    } else {
      setIsLoggedIn(false);
    }
  });
  const currentPlaceInfoHandler = (curPlaceInfo: any) => {
    setCurrentPlaceInfo(curPlaceInfo);
  };
  const searchBarInputHandler = async (input: any) => {
    //유저가 Main콤포넌트 Nav바에 검색한 장소
    const navPlaceInput = input.target.defaultValue;
    if (input.key === "Enter") {
      // 장소를 입력하고 {좌표, 장소들정보 배열, 사용자가 입력한장소(string)}이 리턴 됨.
      const placeInfo = await getLocation(navPlaceInput, placeType);
      console.log('메인 콘테이너 장소', placeInfo);
      setNavPlaceInfo(placeInfo);
    }
  };
  // logIn modal pop
  const signInModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.textContent;
    if (target === "로그인 페이지로") {
      setIsSignUpOpen(!isSignUpOpen);
      setIsSignInOpen(!isSignInOpen);
    } else {
      setIsSignInOpen(!isSignInOpen);
    }
  };
  const signInModalCloseHandler = () => {
    setIsSignInOpen(!isSignInOpen);
  };
  // signUp modal pop
  const signUpModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.textContent;
    if (target === "+") {
      setIsSignUpOpen(!isSignUpOpen);
    } else if (target === "회원가입") {
      setIsSignUpOpen(!isSignUpOpen);
      setIsSignInOpen(!isSignInOpen);
    }
  };
  const modalSwitchHandler = () => {
    setIsSignUpOpen(!isSignUpOpen);
    setIsSignInOpen(!isSignInOpen);
  };
  // "메인  콘테이너에서 로그인하면 프라하를 검색하고 다시 맵을 로딩";
  const loginSuccessHandler = async () => {
    const placeInfo = await getLocation("프라하");
    setNavPlaceInfo(placeInfo);
    setIsLoggedIn(!isLoggedIn);
    signInModalCloseHandler();
  };
  const logInStatusHandler = () => {
    setIsLoggedIn(true);
  };
  const mainSwitchHandler = () => {
    setIsOnMypageModal(!isOnMypageModal);
  };

  const getSelectedPlaceType = (placeType: string) => {
    setPlaceType(placeType);
  };

  return (
    <>
      {isSignInOpen ? (
        <SignInModal
          signInModalHandler={signInModalHandler}
          signUpModalHandler={signUpModalHandler}
          modalSwitchHandler={modalSwitchHandler}
          loginSuccessHandler={loginSuccessHandler}
        />
      ) : null}
      {isSignUpOpen ? (
        <SignUpModal
          signInModalHandler={signInModalHandler}
          signUpModalHandler={signUpModalHandler}
          modalSwitchHandler={modalSwitchHandler}
        />
      ) : null}
      <Navigation
        searchBarInputHandler={searchBarInputHandler}
        currentPlaceInfo={currentPlaceInfo}
        isLoggedIn={isLoggedIn}
        signInModalHandler={signInModalHandler}
        mainSwitchHandler={mainSwitchHandler}
      />
      {isOnMypageModal ? (
        <Mypage mainSwitchHandler={mainSwitchHandler} />
      ) : null}
      <Main
        navPlaceInfo={navPlaceInfo}
        currentPlaceInfoHandler={currentPlaceInfoHandler}
        logInStatusHandler={logInStatusHandler}
        getSelectedPlaceType={getSelectedPlaceType}
      />
      {/* <Route exact path="/main/profile" render={() => <Mypage />} /> */}
    </>
  );
};
export default MainContainer;
