const card = require('express').Router();
const {
  findCards,
  createCard,
  deleteCardById,
  putLike, removeLike,
} = require('../controllers/cards');
const { createCardValidation, CardByIdValidation } = require('../middlewares/card-celebrate');

card.get('/', findCards);
card.post('/', createCardValidation, createCard);
card.delete('/:cardId', CardByIdValidation, deleteCardById);
card.put('/:cardId/likes', CardByIdValidation, putLike);
card.delete('/:cardId/likes', CardByIdValidation, removeLike);

module.exports = card;
