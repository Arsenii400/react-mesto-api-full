import React from "react";

function ImagePopup(props) {
  return (
    <div className={`popup popup_type_image ${props.isOpen && "popup_opened"}`}>
      <div className="popup__image-container">

        <button onClick={props.onClose} className="popup__close popup__close_image" type="button" aria-label="close"></button>
        <img className="popup__photo" src={props.card.card.link} alt={props.card.card.name} />
        <h3 className="popup__heading-image">{props.card.card.name}</h3>

      </div>
    </div>
  )
}

export default ImagePopup;
