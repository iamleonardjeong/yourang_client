import React from 'react';
import './ContentsBox.scss';

interface ContentsBoxProps {
  imgSrc?: string;
  title: string;
  desc: string;
  onModalState: () => void;
}

function ContentsBox({ imgSrc, title, desc, onModalState }: ContentsBoxProps) {
  return (
    <div className="contentsBox" onClick={onModalState}>
      <div className="contentsImg">
        <img src={imgSrc} alt="등록된 사진이 없습니다." />
      </div>
      <div className="contentsDis">
        <p>{title}</p>
        <span>{desc}</span>
      </div>
    </div>
  );
}
export default ContentsBox;
