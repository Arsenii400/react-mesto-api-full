const user = require('express').Router();
const {
  findCurrentUser,
  findUsers,
  findUserById,
  updateUser,
  updateAvatar,
} = require('../controllers/users');
const { findUserByIdValidation, updateUserValidation, updateAvatarValidation } = require('../middlewares/user-celebrate');

user.get('/me', findCurrentUser);
user.get('/', findUsers);
user.get('/:userId', findUserByIdValidation, findUserById);
user.patch('/me', updateUserValidation, updateUser);
user.patch('/me/avatar', updateAvatarValidation, updateAvatar);

module.exports = user;
