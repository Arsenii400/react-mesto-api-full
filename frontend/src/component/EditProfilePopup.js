import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState({ name: '' });
  const [description, setDescription] = React.useState({ about: '' });

  function handleNameChange(e) {
    setName(e.target.value)
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value)
  }

  React.useEffect(() => {
    if (currentUser?.name && currentUser?.about) {
      setName(currentUser?.name);
      setDescription(currentUser?.about)
    }
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name: name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name="edit"
      container="container"
      heading="heading"
      title="Редактировать профиль"
      buttonTitle="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__field">
        <input
          value={name}
          onChange={handleNameChange}
          className="popup__input popup__input_type_name"
          id="title-input"
          type="text"
          name="fullName"
          minLength="2"
          maxLength="40" placeholder="Имя" required />
        <span className="popup__input-error title-input-error"></span>
      </label>
      <label className="popup__field">
        <input
          value={description}
          onChange={handleDescriptionChange}
          className="popup__input popup__input_type_about"
          id="about-input"
          type="text"
          name="about"
          minLength="2"
          maxLength="200" placeholder="О себе" required />
        <span className="popup__input-error about-input-error"></span>
      </label>
    </PopupWithForm>
  )
}

export default EditProfilePopup;
