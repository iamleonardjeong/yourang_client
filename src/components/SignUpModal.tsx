import React, { useState } from 'react';
import axios from 'axios';

//style
import './SignUpModal.css';
import googleIcon from '../image/google_icon.png';
import naverIcon from '../image/naver_icon.png';

//components
import ErrorMessage from './ErrorMessage';

interface SignUpModalProps {
  signInModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
  signUpModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

function SignUpModal({
  signInModalHandler,
  signUpModalHandler,
}: SignUpModalProps) {
  const [signUpInfo, setSignUpInfo] = useState({
    userId: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [isValidFail, setIsValidFail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const signUpInfoHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // input창에 입력한 내용 state로 저장하는 로직
    const { name, value } = e.currentTarget;
    setSignUpInfo({ ...signUpInfo, [name]: value });
  };

  const mobileInputHander = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // mobile전용 유효성 검사 및 입력제한 로직(출력 예시: 000-0000-0000 숫자로만 입력됨. "-"는 자동입력 됨)
    const { name, value, maxLength } = e.currentTarget;
    let reg = new RegExp('^[0-9]');
    if (reg.test(e.key)) {
      if (value.length === 3 || value.length === 8) {
        setSignUpInfo({ ...signUpInfo, [name]: value + '-' + e.key });
      } else {
        setSignUpInfo({
          ...signUpInfo,
          [name]: value.slice(0, maxLength) + e.key,
        });
      }
    }

    if (e.key === 'Backspace' && value.length === 9) {
      setSignUpInfo({ ...signUpInfo, [name]: value.substring(0, 8) });
    } else if (e.key === 'Backspace' && value.length === 4) {
      setSignUpInfo({ ...signUpInfo, [name]: value.substring(0, 3) });
    } else if (e.key === 'Backspace') {
      setSignUpInfo({
        ...signUpInfo,
        [name]: value.substring(0, value.length - 1),
      });
    }
  };

  const validationCheck = (e: React.MouseEvent<HTMLElement>) => {
    // Sign-up버튼을 눌렀을 때, signUpInfo를 바탕으로 진행하는 유효성 검사.
    const { userId, email, mobile, password, confirmPassword } = signUpInfo;

    const error1 = '입력정보를 모두 입력해 주셔야 합니다.';
    const error2 = '아이디 혹은 비밀번가 맞지않습니다. 다시 입력해 주세요.';
    const error3 = '비밀번호가 서로 일치하지 않습니다. 다시 입력해 주세요.';

    if (password !== confirmPassword) {
      setIsValidFail(!isValidFail);
      setErrorMessage(error3);
    }

    if (!userId || !email || !mobile || !password || !confirmPassword) {
      setIsValidFail(!isValidFail);
      setErrorMessage(error1);
    }

    //유효성 검사에 문제가 없고, 모든 정보가 입력이 됐을 때, 서버에 사인업 요청하는 로직을 보내야 함.
  };

  // 아이디 중복체크 함수 만들어야 함
  // 이메일 중복체크 함수 만들어야 함

  return (
    <div className="signup-modal">
      <div className="signup-modal_container">
        <div className="signup-modal_container_content">
          <div className="signup-modal_container_content_head">
            <div
              className="signup-modal_container_content_head_close-button"
              onClick={signUpModalHandler}
            >
              +
            </div>
            <div className="signup-modal_container_content_head_title">
              Sign up
            </div>
            <div className="empty-div-for-spacing"></div>
          </div>

          <div className="signup-modal_container_content_body">
            <div className="signup-modal_container_content_body_upper">
              <div className="signup-modal_container_content_body__upper_input-field">
                <div className="signup-modal_container_content_body__upper_input-field_id-group">
                  <input
                    type="text"
                    name="userId"
                    className="signup-modal_container_content_body__upper_input-field_id"
                    placeholder="User ID"
                    onChange={signUpInfoHandler}
                  />
                  <button className="signup-modal_container_content_body__upper_input-field_id_confirm">
                    중복체크
                  </button>
                </div>

                <div className="signup-modal_container_content_body__upper_input-field_email-group">
                  <input
                    type="email"
                    name="email"
                    className="signup-modal_container_content_body__upper_input-field_email"
                    placeholder="Email"
                    onChange={signUpInfoHandler}
                  />
                  <button className="signup-modal_container_content_body__upper_input-field_email_confirm">
                    중복체크
                  </button>
                </div>

                <input
                  type="tel"
                  name="mobile"
                  className="signup-modal_container_content_body__upper_input-field_mobile"
                  placeholder="Mobile"
                  value={signUpInfo.mobile}
                  // onChange={signUpInfoHandler}
                  onKeyDown={mobileInputHander}
                  maxLength={12}
                />

                <input
                  type="password"
                  name="password"
                  className="signup-modal_container_content_body__upper_input-field_password"
                  placeholder="Password"
                  onChange={signUpInfoHandler}
                />
                <input
                  type="password"
                  name="confirmPassword"
                  className="signup-modal_container_content_body__upper_input-field_password-confirm"
                  placeholder="Confirm password"
                  onChange={signUpInfoHandler}
                />
              </div>
              <button
                className="signup-modal_container_content_body__upper_login-button"
                onClick={validationCheck}
              >
                Sign up
              </button>
            </div>

            <div className="signup-modal_container_content_body_lower">
              <div className="signup-modal_container_content_body_lower_google-login">
                <img
                  src={googleIcon}
                  className="signup-modal_container_content_body_lower_google-login_icon"
                />
                <div className="signup-modal_container_content_body_lower_google-login_message">
                  Continue with Google
                </div>
              </div>
              <div className="signup-modal_container_content_body_lower_naver-login">
                <img
                  src={naverIcon}
                  className="signup-modal_container_content_body_lower_naver-login_icon"
                />
                <div className="signup-modal_container_content_body_lower_naver-login_message">
                  Continue with Naver
                </div>
              </div>

              <div className="signup-modal_container_content_body_lower_to-login-group">
                <div className="signup-modal_container_content_body_lower_ask-for-login">
                  이미 회원이시라구요?
                </div>
                <button
                  name="toSignIn"
                  type="button"
                  value="signin"
                  onClick={signInModalHandler}
                  className="signup-modal_container_content_body_lower_to-login"
                >
                  Log in
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

export default SignUpModal;
