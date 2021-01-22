import React, { useState, useRef } from "react";
import "./Mypage.css";
import Photo from "../image/photo.png";
import PlanList from "../components/PlanList";
import EditInfo from "../components/EditInfo";
import Navigation from "./Navigation";

function Mypage() {
  const [userinfo, setUserinfo] = useState({
    name: "이종원",
    userid: "per1215",
    email: "syd1215no@gmail.com",
    phone: "010-6418-7794",
    created: "20.11.12",
  });

  const [planList, setPlanList] = useState([
    {
      id: 0,
      planName: "부산 여행",
      inst: "부산은 역시 돼지국밥",
      created: "20.11.12",
    },
    {
      id: 1,
      planName: "서울 여행",
      inst: "서울은 역시 강남",
      created: "20.11.12",
    },
    {
      id: 2,
      planName: "강원도 여행",
      inst: "서울은 역시 감자",
      created: "20.11.12",
    },
    {
      id: 3,
      planName: "제주도 여행",
      inst: "제주도은 역시 한라봉",
      created: "20.11.12",
    },
    {
      id: 4,
      planName: "경주",
      inst: "경주은 역시 불국사",
      created: "20.11.12",
    },
    {
      id: 5,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 6,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 7,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 8,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 9,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 10,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 11,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 12,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 13,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 14,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 15,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
    {
      id: 16,
      planName: "전주",
      inst: "전주은 역시 비빔밥",
      created: "20.11.12",
    },
  ]);

  const [search, setSearch] = useState("");
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
      <div className="mypage_top">
        <div className="mypage_top_left">
          <div className="mypage_top_left_proflie">
            <img
              width="150px"
              className="mypage_top_left_proflie_photo"
              src={Photo}
              alt=""
            />
            <span className="mypage_top_left_proflie_name">{name}</span>
            <button
              className="mypage_top_left_proflie_edit"
              onClick={editOnModal}
            >
              EDIT
            </button>
          </div>
          <div className="mypage_top_left_info">
            <div className="mypage_top_left_info_title">User info</div>
            <div className="mypage_top_left_info_detail">
              <div className="mypage_top_left_info_detail_useridemail">
                <div className="mypage_top_left_info_detail_userid">
                  <div className="mypage_top_left_info_detail_userid_title">
                    UserId
                  </div>
                  <div className="mypage_top_left_info_detail_userid_value">
                    {userid}
                  </div>
                </div>
                <div className="mypage_top_left_info_detail_email">
                  <div className="mypage_top_left_info_detail_email_title">
                    Email
                  </div>
                  <div className="mypage_top_left_info_detail_email_value">
                    {email}
                  </div>
                </div>
              </div>
              <div className="mypage_top_left_info_detail_phoneplan">
                <div className="mypage_top_left_info_detail_phone">
                  <div className="mypage_top_left_info_detail_phone_title">
                    Phone
                  </div>
                  <div className="mypage_top_left_info_detail_phone_value">
                    {phone}
                  </div>
                </div>
                <div className="mypage_top_left_info_detail_plans">
                  <div className="mypage_top_left_info_detail_plans_title">
                    Plans
                  </div>
                  <div className="mypage_top_left_info_detail_plans_value">
                    {planList.length}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="empty">
          <div className="mypage_bottom_cover">
            <div className="mypage_editbar">
              <button className="mypage_editbar_add">Add</button>
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
      {/* <div className="mypage_bottom">
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
      </div> */}
    </div>
  );
}

export default Mypage;
