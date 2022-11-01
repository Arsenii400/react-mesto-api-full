import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleLinkChange(e) {
    setLink(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      name: name,
      link: link,
    });
    setName('');
    setLink('');
  }

  return (
    <PopupWithForm
      name="add"
      container="container"
      heading="heading"
      title="Новое место"
      buttonTitle="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={name}
          onChange={handleNameChange}
          className="popup__input popup__input_type_place"
          id="name-input"
          type="text"
          name="place"
          minLength="2"
          maxLength="30"
          placeholder="Название"
          required />
        <span className="popup__input-error name-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          value={link}
          onChange={handleLinkChange}
          className="popup__input popup__input_type_link"
          id="link-input"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          required />
        <span className="popup__input-error link-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default AddPlacePopup;
