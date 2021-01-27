import React, { useState } from 'react';
import '../styles/SignInModal.scss';
import googleIcon from '../image/google_icon.png';
import naverIcon from '../image/naver_icon.png';
import ErrorMessage from './ErrorMessage';
import axios from 'axios';

interface SignInModalProps {
  signInModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
  signUpModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

function SignInModal({
  signInModalHandler,
  signUpModalHandler,
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
      .post('https://localhost:5001/user/login', {
        id: loginInfo.userId,
        password: loginInfo.password,
        withCredentials: true,
      })
      .then((res) => console.log(res));
  };

  const validationCheck = (e: React.MouseEvent<HTMLElement>) => {
    // 유효성 검사 후 user가 확인 버튼을 눌렀을 때, LoginInfo를 초기화 하기 위한 로직
    if (e.currentTarget.textContent === '확인') {
      setLoginInfo({ userId: '', password: '' });
    }

    const error1 = '아이디와 비밀번호를 입력해주세요';
    const error2 = '아이디 혹은 비밀번가 맞지않습니다. 다시 입력해 주세요.';
    const { userId, password } = loginInfo;

    if (!userId || !password) {
      setIsValidFail(!isValidFail);
      setErrorMessage(error1);
    }
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
              className="signIn_modal_container_wrap_body_idInput"
              placeholder="아이디"
              onChange={loginInfoHandler}
            />
            <input
              type="password"
              name="password"
              className="signIn_modal_container_wrap_body_pwInput"
              placeholder="비밀번호"
              onChange={loginInfoHandler}
            />

            <button
              className="signIn_modal_container_wrap_body_loginBtn"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                validationCheck(e);
                loginButtonHandler();
              }}
            >
              로그인
            </button>
            <div className="social_title">or</div>
            <div className="signIn_modal_container_wrap_body_social_google">
              <img
                src={googleIcon}
                className="signIn_modal_container_wrap_body_social_google_icon"
              />
              <div className="signIn_modal_container_wrap_body_social_google_text">
                구글 계정으로 로그인
              </div>
            </div>
            <div className="signIn_modal_container_wrap_body_social_naver">
              <img
                src={naverIcon}
                className="signIn_modal_container_wrap_body_social_naver_icon"
              />
              <div className="signIn_modal_container_wrap_body_social_naver_text">
                네이버 계정으로 로그인
              </div>
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
        />
      ) : null}
    </div>
  );
}

export default SignInModal;
