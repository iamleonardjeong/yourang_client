import React, { useState } from 'react';
import '../styles/ContentsBox.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
interface ContentsBoxProps {
  imgSrc?: string;
  title: string;
  desc: string;
  website: string;
  phone: string;
  address: string;
  onModalState: (title: string) => void;
  imgStatusHandler: () => void;
  setMyLists: (
    title: string,
    desc: string,
    website: string,
    phone: string,
    address: string,
    img?: string
  ) => void;
  removeMyLists: (title: string) => void;
  heartState: boolean;
}
interface myList {
  title: string;
  desc: string;
  imgSrc: string | undefined;
  website: string;
  phone: string;
  address: string;
}
function ContentsBox({
  imgSrc,
  title,
  desc,
  website,
  phone,
  address,
  onModalState,
  imgStatusHandler,
  setMyLists,
  removeMyLists,
  heartState,
}: ContentsBoxProps) {
  const [selectState, setSelectState] = useState<boolean>(false);
  const selectClick = () => {
    setSelectState((prev) => !prev);
  };
  return (
    <div className="contentsBox">
      <div
        onClick={() => onModalState(title)}
        className="img_container"
        style={{ backgroundImage: `url(${imgSrc})` }}
        onLoad={imgStatusHandler}
      >
        <div className="contentsImg"></div>
      </div>
      <div className="contentsDisc" onClick={() => onModalState(title)}>
        <p className="contents_title">{title}</p>
        <div className="contents_stars">{desc || 'no'} Stars</div>
      </div>
      <div className="contents_addMyList_btn_container">
        <button className="contents_addMyList_btn" onClick={selectClick}>
          {heartState ? (
            <AiFillHeart size="22" onClick={() => removeMyLists(title)} />
          ) : (
            <AiOutlineHeart
              size="22"
              onClick={() =>
                setMyLists(title, desc, website, phone, address, imgSrc)
              }
            />
          )}
        </button>
      </div>
    </div>
  );
}
export default ContentsBox;
