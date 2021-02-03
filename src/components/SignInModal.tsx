import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import '../styles/SignInModal.scss';
import googleIcon from '../image/google_icon.png';
import naverIcon from '../image/naver_icon.png';
import ErrorMessage from './ErrorMessage';

interface SignInModalProps {
  signInModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
  signUpModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
  loginSuccessHandler: () => void;
  modalSwitchHandler: () => void;
}

function SignInModal({
  signInModalHandler,
  signUpModalHandler,
  loginSuccessHandler,
  modalSwitchHandler,
}: SignInModalProps) {
  // useState
  const [loginInfo, setLoginInfo] = useState({ userId: '', password: '' });
  const [isValidFail, setIsValidFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const loginButtonHandler = () => {
    axios
      .post('http://yourang-server.link:5000/user/login', {
        id: loginInfo.userId,
        password: loginInfo.password,
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('authorization', res.data.authorization);
          loginSuccessHandler();
        }
      })
      .catch((err) => {
        setIsValidFail(!isValidFail);
        setErrorMessage(
          '가입 되어있지 않은 계정입니다. 아이디와 비밀번호를 확인해 주세요'
        );
        setLoginInfo({ userId: '', password: '' });
      });
  };

  const validationCheck = (e: React.MouseEvent<HTMLElement>) => {
    // 유효성 검사 후 user가 확인 버튼을 눌렀을 때, LoginInfo를 초기화 하기 위한 로직
    if (e.currentTarget.textContent === '확인') {
      setLoginInfo({ userId: '', password: '' });
    }

    const error1 = '아이디와 비밀번호를 입력해주세요';
    const { userId, password } = loginInfo;

    if (!userId || !password) {
      setIsValidFail(!isValidFail);
      setErrorMessage(error1);
    } else {
      loginButtonHandler();
    }
  };

  //Google Login
  const googleLogInHandler = (res: any) => {
    const { name, googleId } = res.profileObj;

    axios
      .post('http://yourang-server.link:5000/user/login', {
        id: name,
        password: googleId,
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          localStorage.setItem('authorization', res.data.authorization);
          loginSuccessHandler();
        }
      })
      .catch((err) => {
        setIsValidFail(!isValidFail);
        setErrorMessage(
          '가입 되어있지 않은 계정입니다. 회원가입을 먼저 진행해 주세요.'
        );
      });
  };
  return (
    <div className="signIn_modal">
      <div className="signIn_modal_container">
        <div className="signIn_modal_container_wrap">
          <div className="signIn_modal_container_wrap_titleBar">
            <div
              className="signIn_modal_container_wrap_titleBar_title_closeBtn"
              onClick={signInModalHandler}
            >
              +
            </div>
            <div className="signIn_modal_container_wrap_titleBar_title">
              로그인
            </div>
            <div className="signIn_modal_container_wrap_titleBar_empty"></div>
          </div>

          <div className="signIn_modal_container_wrap_body">
            <input
              type="text"
              name="userId"
              value={loginInfo.userId}
              className="signIn_modal_container_wrap_body_idInput"
              placeholder="아이디"
              onChange={loginInfoHandler}
            />
            <input
              type="password"
              name="password"
              value={loginInfo.password}
              className="signIn_modal_container_wrap_body_pwInput"
              placeholder="비밀번호"
              onChange={loginInfoHandler}
            />

            <button
              className="signIn_modal_container_wrap_body_loginBtn"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                validationCheck(e);
              }}
            >
              로그인
            </button>
            <div className="social_title">or</div>
            <div className="signIn_modal_container_wrap_body_social_google">
              <GoogleLogin
                className="signIn_modal_container_wrap_body_google_oauth"
                clientId="307554420471-19f0nnr1jp6lvf9qqea85e8i07j36vjc.apps.googleusercontent.com"
                buttonText="구글 계정으로 로그인"
                icon={true}
                onSuccess={googleLogInHandler}
                onFailure={googleLogInHandler}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="signUp_btn_Container">
              <button
                name="toSignUp"
                type="button"
                value="signup"
                onClick={signUpModalHandler}
                className="signUp_btn"
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
      {isValidFail ? (
        <ErrorMessage
          validationCheck={validationCheck}
          errorMessage={errorMessage}
          modalSwitchHandler={modalSwitchHandler}
        />
      ) : null}
    </div>
  );
}

export default SignInModal;
