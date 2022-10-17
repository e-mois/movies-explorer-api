const authRouter = require('express').Router();

const { createUser, login } = require('../controllers/users');
const { createUserValidator, loginValidator } = require('../middlewares/validation');

authRouter.post('/signup', createUserValidator, createUser);
authRouter.post('/signin', loginValidator, login);

module.exports = authRouter;
