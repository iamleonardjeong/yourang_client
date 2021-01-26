import React from 'react';
import '../styles/ErrorMessage.scss';

interface ErrorMessageProps {
  validationCheck: (e: React.MouseEvent<HTMLElement>) => void;
  errorMessage: string;
}

function ErrorMessage({ validationCheck, errorMessage }: ErrorMessageProps) {
  return (
    <div className="error-modal">
      <div className="error-modal_message">
        {errorMessage}
        <button
          className="error-modal_message_button"
          onClick={validationCheck}
        >
          확인
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;
