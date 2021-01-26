import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import '../styles/Home.scss';
import BGMusic from '../components/BGMusic';
import SignInModal from '../components/SignInModal';
import SignUpModal from '../components/SignUpModal';
import backgroundVideo from '../video/yourang-home_video.mp4'; // background video

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

  // Search & push main page
  const onEnterDownHander = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      history.push('/main', placeInput);
    }
  };

  // push main page - 체험하기 버튼
  const onExplore = () => {
    history.push('/main');
  };

  // logIn modal pop
  const signInModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.textContent;

    if (target === 'Log in') {
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
    } else if (target === 'Sign up') {
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
