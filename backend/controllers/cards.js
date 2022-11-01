const Card = require('../models/card');
const NotFoundError = require('../errors/not-found-error');
const IncorrectIdError = require('../errors/incorrect-id-err');
const AlienCardError = require('../errors/alien-card');

module.exports.findCards = (req, res, next) => {
  Card.find({})
    .then((card) => res.send({ card }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectIdError('«Переданы некорректные данные при создании карточки»'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardById = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(() => {
      throw new NotFoundError('«Карточка по указанному _id не найдена»');
    })
    .then((card) => {
      const cardOwner = String(card.owner._id);

      if (cardOwner !== req.user._id) {
        throw new AlienCardError('«Вы не можете удалить карточку чужого пользователя»');
      }
      return Card.findByIdAndRemove(req.params.cardId);
    })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectIdError('«Введён некорректный id»'));
      }
      return next(err);
    });
};

module.exports.putLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('«Карточка по указанному _id не найдена»'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectIdError('«Введён некорректный id»'));
      }
      return next(err);
    });
};

module.exports.removeLike = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError('«Карточка по указанному _id не найдена»'));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new IncorrectIdError('«Введён некорректный id»'));
      }
      return next(err);
    });
};
