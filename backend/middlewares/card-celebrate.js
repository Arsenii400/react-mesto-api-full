const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const method = (value, helper) => {
  const result = validator.isURL(value);
  if (!result) {
    return helper.message('аватар должен быть валидным url');
  } return value;
};

module.exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(method),
  }),
});

module.exports.CardByIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex(),
  }),
});
