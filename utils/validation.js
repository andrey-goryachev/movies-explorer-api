const { celebrate, Segments, Joi } = require('celebrate');

const validationSignIn = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .required(),
  }),
});

const validationSignUp = celebrate({
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
});

const validationUpdateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi
      .string()
      .email(),
    name: Joi
      .string()
      .min(2)
      .max(30),
  }),
});

const validationCreateMovie = celebrate({
  [Segments.BODY]: Joi.object().keys({
    country: Joi
      .string()
      .required(),
    director: Joi
      .string()
      .required(),
    year: Joi
      .string()
      .required(),
    description: Joi
      .string()
      .required(),
    duration: Joi
      .number()
      .required(),
    image: Joi
      .string()
      .uri()
      .required(),
    trailerLink: Joi
      .string()
      .uri()
      .required(),
    nameRU: Joi
      .string()
      .required(),
    nameEN: Joi
      .string()
      .required(),
    thumbnail: Joi
      .string()
      .uri()
      .required(),
    movieId: Joi
      .number()
      .required(),
  }),
});

const validationDeleteMovie = celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string()
      .hex()
      .required()
      .min(24)
      .max(24),
  }),
});

module.exports = {
  validationSignIn,
  validationSignUp,
  validationUpdateUser,
  validationCreateMovie,
  validationDeleteMovie,
};
