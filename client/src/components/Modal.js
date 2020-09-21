import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ title, descr, actions, onDismiss }) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className={`ui dimmer modals visible active`}>
      <div
        onClick={(event) => event.stopPropagation()}
        className={`ui standard modal visible active`}
      >
        <div className={`header`}>{title}</div>
        <div className={`content`}>{descr}</div>
        <div className={`actions`}>{actions}</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
};

export default Modal;
