import React from 'react';
import '../styles/ContentsBox.scss';

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
  return (
    <div className="contentsBox" onClick={() => onModalState(title)}>
      <div className="contentsImg">
        <img
          src={imgSrc}
          alt="등록된 사진이 없습니다."
          onLoad={imgStatusHandler}
        />
      </div>
      <div className="contentsDis">
        <p>{title}</p>
        <span>{desc}</span>
      </div>
    </div>
  );
}
export default ContentsBox;
