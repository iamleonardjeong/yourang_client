import React, { useState } from 'react';
import './SignInModal.css';
import googleIcon from '../image/google_icon.png';
import naverIcon from '../image/naver_icon.png';
import ErrorMessage from './ErrorMessage';

interface SignInModalProps {
  signInModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
  signUpModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

function SignInModal({
  signInModalHandler,
  signUpModalHandler,
}: SignInModalProps) {
  const [loginInfo, setLoginInfo] = useState({ userId: '', password: '' });
  const [isValidFail, setIsValidFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const loginInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const validationCheck = (e: React.MouseEvent<HTMLElement>) => {
    // 유효성 검사 후 user가 확인 버튼을 눌렀을 때, LoginInfo를 초기화 하기 위한 로직
    if (e.currentTarget.textContent === '확인') {
      setLoginInfo({ userId: '', password: '' });
    }

    const error1 = '아아디와 비밀번호를 모두 입력해 주셔야 합니다.';
    const error2 = '아이디 혹은 비밀번가 맞지않습니다. 다시 입력해 주세요.';
    const { userId, password } = loginInfo;

    if (!userId || !password) {
      setIsValidFail(!isValidFail);
      setErrorMessage(error1);
    }
  };

  return (
    <div className="signin-modal">
      <div className="signin-modal_container">
        <div className="signin-modal_container_content">
          <div className="signin-modal_container_content_head">
            <div
              className="signin-modal_container_content_head_close-button"
              onClick={signInModalHandler}
            >
              +
            </div>
            <div className="signin-modal_container_content_head_title">
              Log in
            </div>
            <div className="empty-div-for-spacing"></div>
          </div>

          <div className="signin-modal_container_content_body">
            <div className="signin-modal_container_content_body_upper">
              <div className="signin-modal_container_content_body__upper_input-field">
                <input
                  type="text"
                  name="userId"
                  className="signin-modal_container_content_body__upper_input-field_id"
                  placeholder="User ID"
                  onChange={loginInfoHandler}
                />
                <input
                  type="password"
                  name="password"
                  className="signin-modal_container_content_body__upper_input-field_password"
                  placeholder="Password"
                  onChange={loginInfoHandler}
                />
              </div>
              <button
                className="signin-modal_container_content_body__upper_login-button"
                onClick={validationCheck}
              >
                Log In
              </button>
            </div>

            <div className="signin-modal_container_content_body_lower">
              <div className="signin-modal_container_content_body_lower_google-login">
                <img
                  src={googleIcon}
                  className="signin-modal_container_content_body_lower_google-login_icon"
                />
                <div className="signin-modal_container_content_body_lower_google-login_message">
                  Continue with Google
                </div>
              </div>
              <div className="signin-modal_container_content_body_lower_naver-login">
                <img
                  src={naverIcon}
                  className="signin-modal_container_content_body_lower_naver-login_icon"
                />
                <div className="signin-modal_container_content_body_lower_naver-login_message">
                  Continue with Naver
                </div>
              </div>

              <div className="signin-modal_container_content_body_lower_to-signup-group">
                <div className="signin-modal_container_content_body_lower_ask-for-signup">
                  아직 회원이 아니세요?
                </div>
                <button
                  name="toSignUp"
                  type="button"
                  value="signup"
                  onClick={signUpModalHandler}
                  className="signin-modal_container_content_body_lower_to-signup"
                >
                  Sign up
                </button>
              </div>
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
