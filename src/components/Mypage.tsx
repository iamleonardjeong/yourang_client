import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Mypage.scss';
import PlanList from './PlanList';
import EditInfo from './EditInfo';
import Photo from '../image/photo.png';
import axios from 'axios';

function Mypage() {
  // fake data - user info
  const location = useLocation();

  console.log('마이페이지로 넘어온 정보', location.state);
  const [userinfo, setUserinfo] = useState({
    name: '',
    userid: '',
    email: '',
    phone: '',
    created: '',
  });

  // fake data - plan list
  const [planList, setPlanList] = useState([
    {
      id: 0,
      planName: '부산 여행',
      inst: '부산은 역시 돼지국밥',
      created: '20.11.12',
    },
    {
      id: 1,
      planName: '서울 여행',
      inst: '서울은 역시 강남',
      created: '20.11.12',
    },
    {
      id: 2,
      planName: '강원도 여행',
      inst: '서울은 역시 감자',
      created: '20.11.12',
    },
    {
      id: 3,
      planName: '제주도 여행',
      inst: '제주도은 역시 한라봉',
      created: '20.11.12',
    },
    {
      id: 4,
      planName: '경주',
      inst: '경주은 역시 불국사',
      created: '20.11.12',
    },
    {
      id: 5,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 6,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 7,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 8,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 9,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 10,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 11,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 12,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 13,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 14,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 15,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
    {
      id: 16,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
  ]);

  // fake data - user info contents
  const { name, userid, email, phone } = userinfo;

  // useState
  const [onModal, setOnModal] = useState(false);

  // plan list element delete
  const onRemove = (id: number): void => {
    setPlanList(planList.filter((el) => el.id !== id));
  };

  // user info modification pop
  const editOnModal = (e: any) => {
    setOnModal(!onModal);
  };

  useEffect(() => {
    const authorization = localStorage.getItem('authorization');
    axios
      .get('http://yourang-server.link:5000/user/info', {
        headers: {
          authorization,
        },
      })
      .then((res) => console.log('유저인포로 가져온다', res));
  });

  return (
    <div id="mypage">
      {onModal && <EditInfo editOnModal={editOnModal} userinfo={userinfo} />}
      <div id="profileLeft">
        <div id="profileLeft_profile">
          <img id="profileLeft_profile_photo" src={Photo} alt="" />
          <h1 id="profileLeft_profile_name">{name}</h1>
          <button id="profileLeft_profile_editBtn" onClick={editOnModal}>
            EDIT
          </button>
        </div>
        <div id="profileLeft_myInfo">
          <div id="profileLeft_myInfo_titleBar">User info</div>
          <div id="profileLeft_myInfo_detail">
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
            <div id="profileLeft_myInfo_detail_plans">
              <div id="detail_plan">내 여행</div>
              <div>{planList.length}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="profileRight">
        <div id="profileRight_contents">
          <div id="profileRight_contents_titleBar">Plan List</div>
          <div id="profileRight_contents_planList">
            {planList.map((el) => (
              <PlanList key={el.id} user={el} onRemove={onRemove} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
