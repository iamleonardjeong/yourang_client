import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/Mypage.scss";
import PlanList from "./PlanList";
import EditInfo from "./EditInfo";
import Photo from "../image/photo.png";
import axios from "axios";

function Mypage() {
  // fake data - user info
  const location = useLocation();
  console.log("마이페이지로 넘어온 정보", location.state);
  const [userinfo, setUserinfo] = useState({
    // name: "",
    userid: "",
    email: "",
    phone: "",
    created: "",
    photo: "",
  });

  const [isPhotoChanged, setIsPhotoChanged] = useState(false);

  // fake data - user info contents
  const { userid, email, phone, photo } = userinfo;

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
    const authorization = localStorage.getItem("authorization");
    axios
      .get("http://yourang-server.link:5000/user/info", {
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

  useEffect(() => {
    console.log("이건 사진이야", photo);
    console.log("adsadsasddas", Photo);
  });

  const addDefaultSrc = (e: any) => {
    e.target.src = Photo;
  };

  return (
    <div id="mypage">
      {onModal && <EditInfo editOnModal={editOnModal} userinfo={userinfo} photoChangeChecker={photoChangeChecker} />}
      <div id="profileLeft">
        <div id="profileLeft_profile">
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
          </div>
        </div>
      </div>
      <div id="profileRight_empty">
        <button id="">로그아웃</button>
        <button id="">회원탈퇴</button>
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
