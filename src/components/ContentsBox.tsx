import React, { useEffect, useState } from 'react';
import '../styles/ContentsBox.scss';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
interface ContentsBoxProps {
  imgSrc?: string;
  title: string;
  desc: string;
  onModalState: (title: string) => void;
  imgStatusHandler: () => void;
}
function ContentsBox({
  imgSrc,
  title,
  desc,
  onModalState,
  imgStatusHandler,
}: ContentsBoxProps) {
  const [selectState, setSelectState] = useState<null | boolean>(null);
  useEffect(() => {
    if (selectState === true) {
      console.log('ok true');
    } else if (selectState === null) {
      console.log('no false');
    }
  }, [selectState]);
  const selectClick = () => {
    if (selectState === null) {
      setSelectState(true);
    } else if (selectState === true) {
      setSelectState(null);
    }
  };
  return (
    <div className="contentsBox">
      <div
        onClick={() => onModalState(title)}
        className="img_container"
        style={{ backgroundImage: `url(${imgSrc})` }}
      >
        <div className="contentsImg"></div>
      </div>
      <div className="contentsDisc" onClick={() => onModalState(title)}>
        <p className="contents_title">{title}</p>
        <div className="contents_stars">{desc || 'no'} Stars</div>
      </div>
      <div className="contents_addMyList_btn_container">
        <button className="contents_addMyList_btn" onClick={selectClick}>
          {selectState ? (
            <AiFillHeart size="22" />
          ) : (
            <AiOutlineHeart size="22" />
          )}
        </button>
      </div>
    </div>
  );
}
export default ContentsBox;
