import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import '../styles/Home.scss';
import BGMusic from '../components/BGMusic';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';
import backgroundVideo from '../video/yourang-home_video.mp4'; // background video
import { getLocation } from '../helper/getLocation';

declare const google: any;

function Home() {
  // useState
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("프라하");

  // useHistory
  const history = useHistory();

  // useEffect(() => {
  //   // 백버튼 누르면 다시 홈 콤포넌트로 오도록 만드는 로직
  //   window.history.pushState(null, document.title, location.href);
  //   window.addEventListener('popstate', function (event) {
  //     window.history.pushState(null, document.title, location.href);
  //   });
  // });

  // Input Change
  const onChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setCurrentLocation(e.currentTarget.value);
  };

  // onEnterCount가 0일 때만 onEnterDownHander 실행. 유저가 엔터를 두, 세번 눌렀을 때 반응하지 않게 하기 위함.
  let onEnterCount = 0;
  const onEnterDownHander = async (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') {
      if (onEnterCount === 0) {
        onEnterCount++;
        const { latLng, placeInfo } = await getLocation(currentLocation);
        history.push("/main", { latLng, placeInfo, currentLocation });
      }
    }
  };

  // push main page - 체험하기 버튼
  const onExplore = async () => {
    const { latLng, placeInfo, currentLocation } = await getLocation();
    history.push("/main", { latLng, placeInfo, currentLocation });
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

  // 회원입 성공시, 로그인 모달로 자동 전환
  const modalSwitchHandler = () => {
    setIsSignUpOpen(!isSignUpOpen);
    setIsSignInOpen(!isSignInOpen);
  };

  // 로그인 성공시, Main 콤포넌트로 화면 전환. 지도에 렌더되는 데이터들은 getLocation 함수 default 값인 '프라하'.
  const loginSuccessHandler = async () => {
    const { latLng, placeInfo, currentLocation } = await getLocation();
    const isLogin = true;
    history.push("/main", {
      latLng,
      placeInfo,
      currentLocation,
      isLogin,
    });
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
export default withRouter(Home);
