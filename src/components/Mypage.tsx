import React, { useEffect, useState } from 'react';
import { Redirect, useHistory, useLocation } from 'react-router-dom';
import '../styles/Mypage.scss';
import EditInfo from './EditInfo';
import WithdrawModal from './WithdrawModal';
import Photo from '../image/photo.png';
import axios from 'axios';

interface MypageProps {
  mainSwitchHandler: () => void;
}
function Mypage({ mainSwitchHandler }: MypageProps) {
  // fake data - user info
  const location = useLocation();
  const history = useHistory();
  const [userinfo, setUserinfo] = useState({
    // name: "",
    userid: '',
    email: '',
    phone: '',
    created: '',
    photo: '',
  });
  const [isLoggedOut, setIsloggedOut] = useState(false);
  const [isPhotoChanged, setIsPhotoChanged] = useState(false);
  const [isWithdraw, setIsWithdraw] = useState(false);

  // useState
  const [onModal, setOnModal] = useState(false);

  // user info modification pop
  const editOnModal = () => {
    setOnModal(!onModal);
  };

  const addDefaultSrc = (e: any) => {
    e.target.src = Photo;
  };

  useEffect(() => {
    const authorization = localStorage.getItem('authorization');
    axios
      .get('http://yourang-server.link:5000/user/info', {
        headers: {
          authorization,
        },
      })
      .then((res) => {
        setUserinfo({
          ...userinfo,
          userid: res.data.data.user_id,
          email: res.data.data.email,
          phone: res.data.data.phone,
          created: res.data.data.createdAt,
          photo: res.data.data.photo,
        });
      });
  }, [isPhotoChanged]);

  const photoChangeChecker = () => {
    setIsPhotoChanged(true);
  };

  const logOutButtonHandler = () => {
    localStorage.removeItem('authorization');
    localStorage.removeItem('myList');
    setIsloggedOut(true);
  };

  const withdrawHandler = () => {
    setIsWithdraw(!isWithdraw);
  };

  const { userid, email, phone, photo } = userinfo;

  return (
    <div id="mypage">
      {isLoggedOut ? <Redirect to="/" /> : null}
      {onModal && (
        <EditInfo
          editOnModal={editOnModal}
          userinfo={userinfo}
          photoChangeChecker={photoChangeChecker}
        />
      )}

      {isWithdraw && <WithdrawModal withdrawHandler={withdrawHandler} />}
      <div id="profileLeft">
        <div id="profileLeft_myInfo">
          <div id="profileLeft_myInfo_titleBar">
            <div
              id="profileLeft_myInfo_titleBar_title_closeBtn"
              onClick={mainSwitchHandler}
            >
              +
            </div>
            <div id="profileLeft_myInfo_titleBar_title">내 정보</div>
            <div id="profileLeft_myInfo_titleBar_empty"></div>
          </div>
          <div id="profileLeft_myInfo_detail">
            <div id="profileLeft_profile_userInfo">
              <img
                id="profileLeft_profile_photo"
                src={photo}
                onError={addDefaultSrc}
              />
              <h1 id="profileLeft_profile_name">{userid}</h1>
              <button id="profileLeft_profile_editBtn" onClick={editOnModal}>
                EDIT
              </button>
            </div>
            <div id="profileLeft_myInfo_detail_userId">
              <div id="detail_title">아이디</div>
              <div>{userid}</div>
            </div>
            <div id="profileLeft_myInfo_detail_email">
              <div id="detail_email">이메일</div>
              <div>{email}</div>
            </div>
            <div id="profileLeft_myInfo_detail_phone">
              <div id="detail_phone">전화번호</div>
              <div>{phone}</div>
            </div>
            <div id="profileRight_empty">
              <button id="" onClick={logOutButtonHandler}>
                로그아웃
              </button>
              <button id="" onClick={withdrawHandler}>
                회원탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
      <div id="profileRight">
        <div id="profileRight_contents">
          <div id="profileRight_contents_titleBar">Plan List</div>
          <div id="profileRight_contents_planList">
            {/* {planList.map((el) => (
              <PlanList key={el.id} user={el} onRemove={onRemove} />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Mypage;
