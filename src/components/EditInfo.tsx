import React, { useState } from "react";
import "./EditInfo.css";

type EditInfoProp = {
  editOnModal: (e: any) => void;
  userinfo: {
    name: string;
    userid: string;
    email: string;
    phone: string;
    created: string;
  };
};

function EditInfo({ editOnModal, userinfo }: EditInfoProp) {
  const [inputForm, setInputForm] = useState({
    editEmail: "",
    editPhone: "",
    password: "",
    inspect: "",
  });

  const { editEmail, editPhone, password, inspect } = inputForm;
  const { email, phone } = userinfo;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(e.target);
    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  return (
    <div className="editinfo">
      <div className="editinfo_modal">
        <div className="editinfo_modal_name">youRang</div>
        <div className="editinfo_modal_form">
          <div className="editinfo_modal_Email">
            <div className="editinfo_modal_Email_title">Email</div>
            <input
              className="editinfo_modal_Email_value"
              name="email"
              onChange={onChange}
              defaultValue={editEmail ? editEmail : email}
            />
          </div>
          <div className="editinfo_modal_phone">
            <div className="editinfo_modal_phone_title">Phone</div>
            <input
              className="editinfo_modal_phone_value"
              name="phone"
              defaultValue={editPhone ? editPhone : phone}
              onChange={onChange}
            />
          </div>
          <div className="editinfo_modal_password">
            <div className="editinfo_modal_password_title">Password</div>
            <input
              type="password"
              className="editinfo_modal_password_value1"
              name="password"
              value={password}
              onChange={onChange}
            />
            <input
              className="editinfo_modal_password_value2"
              type="password"
              name="inspect"
              value={inspect}
              onChange={onChange}
            />
          </div>
          {password !== inspect ? <div className = 'editinfo_modal_password_inspect'>작성된 비밀번호가 서로 다릅니다</div> : ""}
          <button className="editinfo_modal_btn" onClick={editOnModal}>
            작성완료
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditInfo;
