import React from 'react';
import '../styles/ErrorMessage.scss';

interface ErrorMessageProps {
  validationCheck: (e: React.MouseEvent<HTMLElement>) => void;
  errorMessage: string;
}

function ErrorMessage({ validationCheck, errorMessage }: ErrorMessageProps) {
  return (
    <div className="modal_error">
      <div className="modal_error_message">
        {errorMessage}
        <button className="modal_error_message_btn" onClick={validationCheck}>
          확인
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
