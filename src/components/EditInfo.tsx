import React, { useState, useRef } from "react";
import "../styles/EditInfo.scss";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Photo from "../image/photo.png";

type EditInfoProp = {
  editOnModal: () => void;
  userinfo: {
    // name: string;
    userid: string;
    email: string;
    phone: string;
    created: string;
  };
  photoChangeChecker: () => void;
};

function EditInfo({ editOnModal, userinfo, photoChangeChecker }: EditInfoProp) {
  const authorization = localStorage.getItem("authorization");
  const [inputForm, setInputForm] = useState({
    editEmail: "",
    currentPassword: "",
    password: "",
    inspect: "",
    editPhone: "",
  });

  const history = useHistory();
  const fileValue = useRef();

  const {
    editEmail,
    password,
    inspect,
    editPhone,
    currentPassword,
  } = inputForm;
  const { email } = userinfo;

  const [img, setImage] = useState<any>("");
  const [file, setFile] = useState<any>(null);

  const fileChangedHandler = (e: any) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const newImg = reader.result;
      if (newImg) {
        setImage(newImg.toString());
      }
    };

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setFile(e.target.files[0]); // 파일 상태 업데이트
    }
  };

  const onClickHandler = (e: any) => {
    if (img.length === 0) {
      alert("사진을 추가해주세요");
    } else {
      let form = new FormData();
      // const authorization = localStorage.getItem("authorization");
      form.append("image", file, file.name);
      axios
        .post("http://yourang-server.link:5000/user/modify-photo", form, {
          headers: {
            authorization: authorization,
          },
        })
        .then((res) => {
          localStorage.setItem("authorization", res.data.authorization);
          photoChangeChecker();
        });
    }
  };

  const submitHander = () => {
    // const authorization = localStorage.getItem("authorization");
    axios({
      url: "http://yourang-server.link:5000/user/modify-pass",
      method: "post",
      headers: {
        authorization: authorization,
      },
      data: {
        oriPassword: currentPassword,
        newPassword: password,
      },
    }).then((res) => {
      editOnModal();
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputForm({
      ...inputForm,
      [name]: value,
    });
  };

  const mobileInputHander = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // mobile전용 유효성 검사 및 입력제한 로직(출력 예시: 000-0000-0000 숫자로만 입력됨. "-"는 자동입력 됨)
    const { name, value, maxLength } = e.currentTarget;
    let reg = new RegExp("^[0-9]");
    if (reg.test(e.key)) {
      if (value.length === 3 || value.length === 8) {
        setInputForm({ ...inputForm, [name]: value + "-" + e.key });
      } else {
        setInputForm({
          ...inputForm,
          [name]: value.slice(0, maxLength) + e.key,
        });
      }
    }

    if (e.key === "Backspace" && value.length === 9) {
      setInputForm({ ...inputForm, [name]: value.substring(0, 8) });
    } else if (e.key === "Backspace" && value.length === 4) {
      setInputForm({ ...inputForm, [name]: value.substring(0, 3) });
    } else if (e.key === "Backspace") {
      setInputForm({
        ...inputForm,
        [name]: value.substring(0, value.length - 1),
      });
    }
  };

  return (
    <div className="editinfo">
      <div className="editinfo_modal_container">
        <div className="editinfo_modal_container_wrap">
          <div className="editinfo_modal_container_wrap_titleBar">
            <div
              className="editinfo_modal_container_wrap_titleBar_closeBtn"
              onClick={editOnModal}
            >
              +
            </div>
            <div className="editinfo_modal_container_wrap_titleBar_title">
              회원정보 수정
            </div>
            <div className="editinfo_modal_container_wrap_titleBar_empty"></div>
          </div>
          <div className="editinfo_modal_container_wrap_body">
            <label className="custom-file-upload">
              <input
                className="file_input_hidden"
                type="file"
                name="file"
                onChange={fileChangedHandler}
              />
              {img.length === 0 ? (
                <img className="profile_photo" src={Photo}></img>
              ) : (
                <img src={img}></img>
              )}
            </label>

            <button id="save_btn" onClick={onClickHandler}>
              저장하기
            </button>
            <input
              type="password"
              className="editinfo_modal_password_value1"
              name="currentPassword"
              placeholder="현재 비밀번호"
              value={currentPassword}
              onChange={onChange}
            />
            <input
              type="password"
              className="editinfo_modal_password_value2"
              name="password"
              placeholder="변경할 비밀번호"
              value={password}
              onChange={onChange}
            />
            <input
              className="editinfo_modal_password_value3"
              type="password"
              name="inspect"
              placeholder="변경할 비밀번호 확인"
              value={inspect}
              onChange={onChange}
            />
            {password !== inspect ? (
              <div className="editinfo_modal_password_inspect">
                작성된 비밀번호가 서로 다릅니다
              </div>
            ) : (
              ""
            )}

            <div className="editinfo_btn_container">
              <button className="editinfo_btn" onClick={submitHander}>
                변경
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditInfo;
