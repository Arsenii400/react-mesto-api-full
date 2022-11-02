import { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ProtectedRoute from './ProtectedRoute';
import Login from './Login';
import Register from './Register';
import InfoToolTip from './InfoToolTip';
import * as auth from '../utils/auth';
import approve from '../images/approve.png'
import denied from '../images/denied.png'
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/api.js';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false);
  const [isRegisterSuccessPopupOpen, setisRegisterSuccessPopupOpen] = useState(false);
  const [isRegisterDeniedPopupOpen, setisRegisterDeniedPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ isOpen: false, card: {} });
  const [cards, setCards] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const history = useHistory();

  const [email, setEmail] = useState('');

  const handleLogin = () => {
    setLoggedIn(true);
  }

  function signOut() {
    localStorage.removeItem('token');
    history.push('/sign-in');
  }

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    if (token) {
      auth.getContent(token)
        .then((res) => {
          if (res) {
            console.log('При перезагрузке сработал токен чек');
            setEmail(res.email);
            setLoggedIn(true);
            history.push('/')
          }
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  useEffect(() => {
    tokenCheck();
  }, [])

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then((res) => {
          setCards(res.card);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]
  );

  useEffect(() => {
    if (loggedIn) {
      api.getProfileInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }, [loggedIn]
  );

  function handleRegisterSuccessPopup() {
    setisRegisterSuccessPopupOpen(true);
  }

  function handleRegisterDeniedPopup() {
    setisRegisterDeniedPopupOpen(true);
  }

  function handleEditProfileClick() {
    setisEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setisEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setisEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setisEditAvatarPopupOpen(false);
    setisRegisterSuccessPopupOpen(false);
    setisRegisterDeniedPopupOpen(false);
    setSelectedCard({ isOpen: false, card: {} })
  }

  function handleCardClick(card) {
    setSelectedCard({ isOpen: true, card: card });
  }

  function handleUpdateUser(data) {
    api.patchProfileEdit(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((oldcard) =>
          oldcard._id !== card._id
        ))
      })
      .catch((err) => {
        console.log(err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.addCard(data)
      .then((res) => {
        setCards([res.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">

        <Switch>
          <Route path="/sign-up">
            <Register
              onRegisterSuccessPopup={handleRegisterSuccessPopup}
              onRegisterDeniedPopup={handleRegisterDeniedPopup}
            />
          </Route>
          <Route path="/sign-in">
            <Login handleLogin={handleLogin} />
          </Route>

          <ProtectedRoute exact path="/"
            component={Main}
            loggedIn={loggedIn}
            cards={cards}
            userMail={email}
            onSignOut={signOut}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
          />

        </Switch>

        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />

        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />

        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />

        <InfoToolTip
          p1="Вы успешно"
          p2="Зарегистрировались"
          approve={approve}
          isOpen={isRegisterSuccessPopupOpen}
          name="successReg"
          container="container"
          onClose={closeAllPopups} />

        <InfoToolTip
          p1="Что-то пошло не так!"
          p2="Попробуйте ещё раз."
          approve={denied}
          isOpen={isRegisterDeniedPopupOpen}
          name="negativeReg"
          container="container"
          onClose={closeAllPopups} />

        <PopupWithForm
          name="deleteConfirmation"
          container="dltConfirm-container"
          heading="dltConfirm-heading"
          title="Вы уверены?" buttonTitle="Да" />

        <ImagePopup
          isOpen={selectedCard.isOpen}
          card={selectedCard}
          onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
