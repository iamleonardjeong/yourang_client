import React, { ReactNode, useState } from 'react';
import BGMusic from './BGMusic';
import SignInModal from './SignInModal';
import SignUpModal from './SignUpModal';
import './Home.css';

//Video
import backgroundVideo from '../video/yourang-home_video.mp4';

function Home() {
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const signInModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    const target = e.currentTarget.textContent;
    console.log(target);
    if (target === 'Log in') {
      setIsSignUpOpen(!isSignUpOpen);
      setIsSignInOpen(!isSignInOpen);
    } else {
      setIsSignInOpen(!isSignInOpen);
    }
  };

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
      <video className="home_video" loop muted>
        <source src={backgroundVideo} type="video/mp4" />
      </video>

      <div className="home_contents">
        <div className="home_contents_header-bar">
          <div className="home_contents_header-bar_home_music">
            <BGMusic />
          </div>
          <div
            className="home_contents_header-bar_home_signin"
            onClick={signInModalHandler}
          >
            Sign-In
          </div>
        </div>

        <div className="home_contents_incoming-texts">
          <div className="home_contents_incoming-text_title">YouRang</div>
          <div className="home_contents_incoming-text_question">
            대한민국 어디로 떠나고 싶으세요?
          </div>
          <div className="home_contents_incoming-text_input-family">
            <input
              type="text"
              placeholder="장소"
              className="home_contents_incoming-text_input"
            />
            <label
              htmlFor="place"
              className="home_contents_incoming-text_input_label"
            >
              장소
            </label>
          </div>
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
