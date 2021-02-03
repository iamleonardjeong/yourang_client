import React, { useState } from 'react';
import '../styles/WithdrawModal.scss';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

interface withdrawModalProps {
  withdrawHandler: () => void;
}
function WithdrawModal({ withdrawHandler }: withdrawModalProps) {
  const authorization = localStorage.getItem('authorization');
  const [inputForm, setInputForm] = useState({
    currentPassword: '',
  });

  const [isWithdraw, setIsWithdraw] = useState(false);

  const { currentPassword } = inputForm;

  const submitHander = () => {
    axios({
      url: 'http://yourang-server.link:5000/user/withdraw',
      method: 'post',
      headers: {
        authorization: authorization,
      },
      data: {
        password: currentPassword,
      },
    }).then((res) => {
      if (res.status === 200) {
        setIsWithdraw(true);
      }
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  return (
    <div className="editinfo">
      {isWithdraw ? <Redirect to="/" /> : null}
      <div className="editinfo_modal_container">
        <div className="editinfo_modal_container_wrap">
          <div className="editinfo_modal_container_wrap_titleBar">
            <div
              className="editinfo_modal_container_wrap_titleBar_closeBtn"
              onClick={withdrawHandler}
            >
              +
            </div>
            <div className="editinfo_modal_container_wrap_titleBar_title">
              회원탈퇴 확인
            </div>
            <div className="editinfo_modal_container_wrap_titleBar_empty"></div>
          </div>
          <div className="editinfo_modal_container_wrap_body">
            <input
              type="password"
              className="editinfo_modal_password_value1"
              name="currentPassword"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={onChange}
            />

            <div className="editinfo_btn_container">
              <button className="editinfo_btn" onClick={submitHander}>
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WithdrawModal;
