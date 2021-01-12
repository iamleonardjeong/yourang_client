import React, { MouseEvent } from 'react';
import './ContentsBox.scss';

interface ContentsBoxProps {
  imgSrc: string;
  title: string;
  onModalState: () => void;
}

function ContentsBox({ imgSrc, title, onModalState }: ContentsBoxProps) {
  return (
    <div className="contentsBox" onClick={onModalState}>
      <div className="contentsImg">
        <img src={imgSrc} alt="img" />
      </div>
      <div className="contentsDis">
        <p>{title}</p>
        <span>contents</span>
      </div>
    </div>
  );
}
export default ContentsBox;
