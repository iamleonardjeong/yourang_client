import React from 'react';
import '../styles/ErrorMessage.scss';

interface ErrorMessageProps {
  validationCheck: (e: React.MouseEvent<HTMLElement>) => void;
  modalSwitchHandler: () => void;
  errorMessage: string;
}

function ErrorMessage({
  validationCheck,
  modalSwitchHandler,
  errorMessage,
}: ErrorMessageProps) {
  // 회원가입에 성공하면, "회원가입에 성공하였습니다!"라는 문구가 뜨고, 확인 버튼을 누르면, Login 모달로 화면을 바꾸는 로직.
  // 확인 버튼만 누르면, 바로  모달이 닫히기 때문에, errorMessage에 할당된 메세지를 보고, 아래와 같을 때만, 회원가입이 성공했다 인지하고 모달전환.
  const modalSwitchHandlerChecker = () => {
    if (errorMessage === '회원가입에 성공하였습니다!') {
      if (modalSwitchHandler !== undefined) {
        modalSwitchHandler();
      }
    }

    return;
  };

  return (
    <div className="modal_error">
      <div className="modal_error_message">
        {errorMessage}
        <button
          className="modal_error_message_btn"
          onClick={(e: React.MouseEvent<HTMLElement>) => {
            modalSwitchHandlerChecker();
            validationCheck(e);
          }}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
