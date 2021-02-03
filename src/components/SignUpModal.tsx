import React, { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import '../styles/SignUpModal.scss';
import googleIcon from '../image/google_icon.png';
import naverIcon from '../image/naver_icon.png';
import ErrorMessage from './ErrorMessage';
import { userInfo } from 'os';

interface SignUpModalProps {
  signInModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
  signUpModalHandler: (e: React.MouseEvent<HTMLElement>) => void;
  modalSwitchHandler: () => void;
}

function SignUpModal({
  signInModalHandler,
  signUpModalHandler,
  modalSwitchHandler,
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
  const [isEveryInfoCorrect, setIsEveryInfoCorrect] = useState({
    userIdCheck: false,
    emailCheck: false,
    passwordCheck: false,
    isEverythingFilled: false,
  });

  const singUpRequest = () => {
    const {
      userIdCheck,
      emailCheck,
      passwordCheck,
      isEverythingFilled,
    } = isEveryInfoCorrect;

    if (!userIdCheck) {
      setIsValidFail(!isValidFail);
      setErrorMessage('아이디 중복검사를 실행해 주세요!');
    } else if (!emailCheck) {
      setIsValidFail(!isValidFail);
      setErrorMessage('이메일 중복검사를 실행해주세요!');
    }

    const { userId, email, mobile, password } = signUpInfo;

    if (isEverythingFilled) {
      axios
        .post('http://yourang-server.link:5000/user/signup', {
          id: userId,
          email: email,
          password: password,
          phone: mobile,
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            setIsValidFail(!isValidFail);
            setErrorMessage('회원가입에 성공하였습니다!');
          }
        })
        .catch((err) => {
          console.log(`에러가 발생했습니다 ${err}`);
        });
    }
  };

  const googleSignUpHandler = (res: any) => {
    const { name, googleId, email } = res.profileObj;
    axios
      .post('http://yourang-server.link:5000/user/signup', {
        id: name,
        email: email,
        password: googleId,
        phone: 'none',
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsValidFail(!isValidFail);
          setErrorMessage('회원가입에 성공하였습니다!');
        }
      })
      .catch((err) => {
        setIsValidFail(!isValidFail);
        setErrorMessage('이미 동일 계정으로 회원가입이 되어있습니다');
      });
  };

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

  const userIdValidCheck = () => {
    axios
      .post('http://yourang-server.link:5000/user/check_id', {
        id: signUpInfo.userId,
      })
      .then((res) => {
        if (res.data.result) {
          setIsEveryInfoCorrect({ ...isEveryInfoCorrect, userIdCheck: false });
          setIsValidFail(!isValidFail);
          setErrorMessage('중복되는 아이디가 있습니다.');
        } else {
          setIsEveryInfoCorrect({ ...isEveryInfoCorrect, userIdCheck: true });
          setIsValidFail(!isValidFail);
          setErrorMessage('사용 가능한 아이디 입니다.');
        }
      });
  };

  const emailValidCheck = () => {
    axios
      .post('http://yourang-server.link:5000/user/check_email', {
        email: signUpInfo.email,
      })
      .then((res) => {
        if (res.data.result) {
          setIsEveryInfoCorrect({ ...isEveryInfoCorrect, emailCheck: false });
          setIsValidFail(!isValidFail);
          setErrorMessage('중복되는 이메일이 있습니다.');
        } else {
          setIsEveryInfoCorrect({ ...isEveryInfoCorrect, emailCheck: true });
          setIsValidFail(!isValidFail);
          setErrorMessage('사용 가능한 이메일 입니다.');
        }
      });
  };

  const validationCheck = (e: React.MouseEvent<HTMLElement>) => {
    // Sign-up버튼을 눌렀을 때, signUpInfo를 바탕으로 진행하는 유효성 검사.
    setIsValidFail(!isValidFail);
    let isValid = true;

    const { userId, email, mobile, password, confirmPassword } = signUpInfo;
    const {
      userIdCheck,
      emailCheck,
      passwordCheck,
      isEverythingFilled,
    } = isEveryInfoCorrect;
    if (password !== confirmPassword) {
      isValid = false;
      setIsValidFail(!isValidFail);
      setErrorMessage('비밀번호가 일치하지 않습니다');
      setIsEveryInfoCorrect({ ...isEveryInfoCorrect, passwordCheck: false });
    } else if (password === confirmPassword) {
      setIsEveryInfoCorrect({ ...isEveryInfoCorrect, passwordCheck: true });
    }

    if (!userId || !email || !password || !confirmPassword) {
      isValid = false;
      setIsEveryInfoCorrect({
        ...isEveryInfoCorrect,
        isEverythingFilled: false,
      });
      setIsValidFail(!isValidFail);
      setErrorMessage('입력정보를 모두 입력해 주세요');
    } else if (userIdCheck && emailCheck && passwordCheck) {
      setIsEveryInfoCorrect({
        ...isEveryInfoCorrect,
        isEverythingFilled: true,
      });
    }

    if (isValid) {
      // 모든 유효성 검사가 통과 했을 때만 서버로 로그인 request 전달
      singUpRequest();
    }
  };

  // 아이디 중복체크 함수 만들어야 함
  // 이메일 중복체크 함수 만들어야 함
  return (
    <div className="signUp_modal">
      <div className="signIn_modal_container">
        <div className="signUp_modal_container_wrap">
          <div className="signUp_modal_container_wrap_titleBar">
            <div
              className="signUp_modal_container_wrap_titleBar_title_closeBtn"
              onClick={signUpModalHandler}
            >
              +
            </div>
            <div className="signUp_modal_container_wrap_titleBar_title">
              회원가입
            </div>
            <div className="signUp_modal_container_wrap_titleBar_empty"></div>
          </div>
          <div className="signUp_modal_container_wrap_body">
            <div className="signUp_modal_container_wrap_body_field_idInput">
              <input
                type="text"
                name="userId"
                className="signUp_modal_container_wrap_body_field_idInput_input"
                placeholder="아이디"
                onChange={signUpInfoHandler}
                minLength={4}
                maxLength={12}
              />
              <button
                className="signUp_modal_container_wrap_body_field_idInput_btn"
                onClick={userIdValidCheck}
              >
                중복체크
              </button>
            </div>
            <div className="signUp_modal_container_wrap_body_field_pwInput">
              <input
                type="email"
                name="email"
                className="signUp_modal_container_wrap_body_field_pwInput_input"
                placeholder="이메일"
                onChange={signUpInfoHandler}
                maxLength={20}
              />
              <button
                className="signUp_modal_container_wrap_body_field_pwInput_btn"
                onClick={emailValidCheck}
              >
                중복체크
              </button>
            </div>
            <input
              type="tel"
              name="mobile"
              className="signIn_modal_container_wrap_body_phoneInput"
              placeholder="휴대전화"
              value={signUpInfo.mobile}
              // onChange={signUpInfoHandler}
              onKeyDown={mobileInputHander}
              maxLength={12}
            />
            <input
              type="password"
              name="password"
              className="signIn_modal_container_wrap_body_pwInput"
              placeholder="비밀번호"
              onChange={signUpInfoHandler}
              maxLength={14}
            />
            <input
              type="password"
              name="confirmPassword"
              className="signIn_modal_container_wrap_body_pwConfiemInput"
              placeholder="비밀번호 확인"
              onChange={signUpInfoHandler}
              maxLength={14}
            />
            <button
              className="signUp_modal_container_wrap_body_signUpBtn"
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                validationCheck(e);
              }}
            >
              회원가입
            </button>
            <div className="signUp_modal_container_wrap_body_social_google">
              <GoogleLogin
                className="signUp_modal_container_wrap_body_google_oauth"
                clientId="307554420471-19f0nnr1jp6lvf9qqea85e8i07j36vjc.apps.googleusercontent.com"
                buttonText="구글 계정으로 회원가입"
                icon={true}
                onSuccess={googleSignUpHandler}
                onFailure={googleSignUpHandler}
                cookiePolicy={'single_host_origin'}
              />
            </div>
            <div className="signIn_btn_Container">
              <button
                name="toSignIn"
                type="button"
                value="signin"
                onClick={signInModalHandler}
                className="signIn_btn"
              >
                로그인 페이지로
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
export default SignUpModal;
