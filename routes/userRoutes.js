const { getCurrentUser, updateUser } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validation');

const userRouter = require('express').Router();

userRouter.get('/me', getCurrentUser);

userRouter.patch('/me', updateUserValidator, updateUser);

module.exports = userRouter;