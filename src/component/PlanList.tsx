// import { type } from 'os'
import React from "react";
import PlanPhoto from "../planListPhoto.jpg";
import "./PlanList.css";

type PlanListProps = {
  user: {
    id: number;
    planName: string;
    inst: string;
    created: string;
  };
  onRemove: (id: number) => void;
};

function PlanList({ user, onRemove }: PlanListProps) {
  return (
    <div className="planList">
      <img className="planList_photo" src={PlanPhoto} width="100%" alt="" />
      <div className="planList_inform">
        <div className="planList_inform_name">여행 : {user.planName}</div>
        <div className="planList_inform_inst">설명 : {user.inst}</div>
        <div className="planList_inform_remove">
          <div className="planList_inform_date">날짜 : {user.created}</div>
          <button
            className="planList_inform_remove_btn"
            onClick={() => onRemove(user.id)}
          >
            {" "}
            X{" "}
          </button>
        </div>
      </div>
    </div>
  );
}
// planList_photo
export default PlanList;
