import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.data.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `${isOwn ? 'element__trash' : 'element__trash_hidden'}`
  );
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.data.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked ? 'element__like_type_active' : 'element__like'}`
  );

  function handleClick() {
    props.onCardClick(props.data);
  };

  function handleLikeClick() {
    props.onCardLike(props.data);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.data);
  }

  return (
    <li className="element">
      <button onClick={handleDeleteClick} className={cardDeleteButtonClassName} type="button" aria-label="trash" />
      <img onClick={handleClick} src={props.data.link} alt={props.data.name} className="element__img" />
      <div className="element__wrapper">
        <h2 className="element__heading">{props.data.name}</h2>
        <div className="element__likeWrapper">
          <button onClick={handleLikeClick} className={cardLikeButtonClassName} type="button" aria-label="like" />
          <p className="element__likeCounter">{props.data.likes.length}</p>
        </div>
      </div>
    </li>
  )
}

export default Card;
