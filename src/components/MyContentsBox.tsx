import React from 'react';
import '../styles/ContentsBox.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

interface MyContentsBox {
  title: string;
  imgSrc?: string;
  desc: string;
  removeMyLists: (title: string) => void;
}

const MyContentsBox = ({
  title,
  imgSrc,
  desc,
  removeMyLists,
}: MyContentsBox) => {
  return (
    <div className="contentsBox">
      <div
        className="img_container"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className="contentsImg"></div>
      </div>
      <div className="contentsDisc">
        <p className="contents_title">{title}</p>
        <div className="contents_stars">{desc || 'no'} Stars</div>
      </div>
      <div className="contents_addMyList_btn_container">
        <button className="contents_addMyList_btn">
          <AiFillHeart size="22" onClick={() => removeMyLists(title)} />
        </button>
      </div>
    </div>
  );
};

export default MyContentsBox;
