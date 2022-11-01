import React from "react";

function InfoToolTip(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className={`popup__${props.container}`}>
        <button onClick={props.onClose} className={`popup__close popup__close_${props.name}`} type="button" aria-label="close"></button>
        <img className="popup__result_type_image" src={props.approve} alt="approve" />
        <p className="popup__result">{props.p1}</p>
        <p className="popup__result">{props.p2}</p>
      </div>
    </div>
  );
}

export default InfoToolTip;
