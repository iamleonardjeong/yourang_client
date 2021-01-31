import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Mypage from '../components/Mypage';
import Main from '../components/Main';
import Navigation from '../components/Navigation';
import { getLocation } from '../helper/getLocation';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';

const MainContainer = () => {
  // fake login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  // 기존 state
  const [navPlaceInfo, setNavPlaceInfo] = useState({});
  const [currentPlaceInfo, setCurrentPlaceInfo] = useState({});

  const curretPlaceInfoHandler = (curPlaceInfo: any) => {
    setCurrentPlaceInfo(curPlaceInfo);
  };

  const searchBarInputHandler = async (input: any) => {
    //유저가 Main콤포넌트 Nav바에 검색한 장소
    const navPlaceInput = input.target.defaultValue;

    if (input.key === 'Enter') {
      // 장소릃 입력하고 {좌표, 장소들정보 배열, 사용자가 입력한장소(string)}이 리턴 됨.
      const placeInfo = await getLocation(navPlaceInput);
      setNavPlaceInfo(placeInfo);
    }
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

  const signInModalCloseHandler = () => {
    setIsSignInOpen(!isSignInOpen);
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

  // "메인  콘테이너에서 로그인하면 프라하를 검색하고 다시 맵을 로딩";
  const loginSuccessHandler = async () => {
    const placeInfo = await getLocation('프라하');
    setNavPlaceInfo(placeInfo);
    setIsLoggedIn(!isLoggedIn);
    signInModalCloseHandler();
  };

  const logInStatusHandler = () => {
    console.log('이게 실행 되나요?');
    setIsLoggedIn(true);
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

      <Router>
        <Navigation
          searchBarInputHandler={searchBarInputHandler}
          currentPlaceInfo={currentPlaceInfo}
          isLoggedIn={isLoggedIn}
          signInModalHandler={signInModalHandler}
        />
        <Route
          path="/main"
          exact
          render={() => (
            <Main
              navPlaceInfo={navPlaceInfo}
              curretPlaceInfoHandler={curretPlaceInfoHandler}
              logInStatusHandler={logInStatusHandler}
            />
          )}
        />
        <Route path="/main/profile" exact component={Mypage} />
      </Router>
    </>
  );
};

export default MainContainer;
