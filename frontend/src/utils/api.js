import { apiConfiguration } from "./constans";

export class Api {
  constructor(options) {
    this._url = options.url;
    this._token = options.token;
  }

  _checkAnswer = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  _getToken = () => localStorage.getItem('token');

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${this._getToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkAnswer);
  }

  addCard(card) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        "Authorization": `Bearer ${this._getToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: card.name,
        link: card.link
      })
    })
      .then(this._checkAnswer)
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        "Authorization": `Bearer ${this._getToken}`,
      }
    })
      .then(this._checkAnswer)
  }

  getProfileInfo() {
    return fetch(`${this._url}/users/me`, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${this._getToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkAnswer)
  }

  patchProfileEdit(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${this._getToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      })
    })
      .then(this._checkAnswer)
  }

  toggleLike(cardId, _isLiked) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: _isLiked ? 'DELETE' : 'PUT',
      headers: {
        "Authorization": `Bearer ${this._getToken}`,
        'Content-Type': 'application/json'
      }
    })
      .then(this._checkAnswer)
  }

  updateAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        "Authorization": `Bearer ${this._getToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar,
      })
    })
      .then(this._checkAnswer)
  }
}

export const api = new Api(
  apiConfiguration
);
