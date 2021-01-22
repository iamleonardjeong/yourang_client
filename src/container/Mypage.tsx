import React, { useState, useRef } from 'react';
import './Mypage.css';
import Photo from '../image/photo.png';
import PlanList from '../components/PlanList';
import EditInfo from '../components/EditInfo';

function Mypage() {
  const [userinfo, setUserinfo] = useState({
    name: '이종원',
    userid: 'per1215',
    email: 'syd1215no@gmail.com',
    phone: '010-6418-7794',
    created: '20.11.12',
  });

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
      id: 10,
      planName: '전주',
      inst: '전주은 역시 비빔밥',
      created: '20.11.12',
    },
  ]);

  const [search, setSearch] = useState('');
  const [onModal, setOnModal] = useState(false);

  const { name, userid, email, phone } = userinfo;

  const onRemove = (id: number): void => {
    setPlanList(planList.filter((el) => el.id !== id));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    // console.log(e.target)
  };

  const editOnModal = (e: any) => {
    setOnModal(!onModal);
  };

  return (
    <div className="mypage">
      {onModal && <EditInfo editOnModal={editOnModal} userinfo={userinfo} />}
      <div className="mypage_middle">
        <div className="mypage_profile">
          <img
            className="mypage_profile_photo"
            width="250px"
            src={Photo}
            alt=""
          />
          <button onClick={editOnModal} className="mypage_profile_edit">
            회원정보 수정
          </button>
        </div>
        <div className="mypage_body">
          <p>&nbsp;&nbsp;&nbsp;&nbsp;이름 : {name}</p>
          <hr></hr>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;아이디 : {userid}</p>
          <hr></hr>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;이메일 : {email}</p>
          <hr></hr>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;전화번호 : {phone}</p>
          <hr></hr>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;여행갯수 : {planList.length}</p>
          <hr></hr>
        </div>
      </div>
      <div className="mypage_bottom">
        <div className="mypage_bottom_cover">
          <div className="mypage_editbar">
            <button className="mypage_editbar_add">추가</button>
          </div>
          <div className="mypage_planlist">
            <div className="mypage_planlist_form">
              {planList.map((el) => (
                <PlanList key={el.id} user={el} onRemove={onRemove} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;
