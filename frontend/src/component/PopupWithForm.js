import React from "react";

function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && "popup_opened"}`}>
      <div className={`popup__${props.container}`}>
        <button onClick={props.onClose} className={`popup__close popup__close_${props.name}`} type="button" aria-label="close"></button>
        <h3 className={`popup__${props.heading}`}>{props.title}</h3>
        <form onSubmit={props.onSubmit} className={`popup__form popup__form_type_${props.name}`} name="editProfileForm" noValidate>
          {props.children}
          <button className="popup__submit popup__submit_type_edit" type="submit">{props.buttonTitle}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;
