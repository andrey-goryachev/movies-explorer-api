const router = require('express').Router();
const { celebrate, Segments, Joi } = require('celebrate');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const userRouter = require('./users');
const moviesRouter = require('./movies');
const incorrect = require('./incorrect');

router.post('/signin', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  }),
}), login);

router.post('/signup', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
  }),
}), createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, moviesRouter);
router.use('*', incorrect);

module.exports = router;
